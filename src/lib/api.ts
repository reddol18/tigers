import { Post } from "@/models/post";
import he from 'he';
import { PostResponse } from "@/interfaces/post-response";
import { LinkMeta } from "@/models/link-meta";
import { ThreadPost } from '@/interfaces/thread-post';

function escapeWithoutAmpercent(str: string): string {
    return str.replaceAll('quot;', '&quot;')
        .replaceAll('hellip;', '&hellip;')
        .replaceAll('middot;', '&middot;')
        .replaceAll('lsquo;', '&lsquo;')
        .replaceAll('rsquo;', '&rsquo;')
        .replaceAll('ldquo;', '&ldquo;')
        .replaceAll('rdquo;', '&rdquo;')
        .replaceAll('nbsp;', '&nbsp;')
        .replaceAll('기사를 읽어드립니다Your browser does not support theaudioelement.0', '')
        .replaceAll('<br/>', '\n');
}

export async function getOg(url: string): Promise<LinkMeta> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_DB_API_URL}/og?url=${encodeURIComponent(url)}`);
        if (!res.ok) {
            throw new Error(`Failed to fetch post: ${res.status} ${res.statusText}`);
        }
        const data = await res.json() as LinkMeta;
        return data;

    } catch (error) {
        console.log(error);
        return {} as LinkMeta;
    }
}

export async function getPost(id: number): Promise<Post> {
    try {
        const dbApiUrl = process.env.NEXT_PUBLIC_DB_API_URL;

        if (!dbApiUrl) {
            throw new Error("NEXT_PUBLIC_DB_API_URL 환경 변수가 설정되지 않았습니다.");
        }

        const endpoint = `${dbApiUrl}/news/${id}`;
        console.log(`[getPost] Fetching post from: ${endpoint}`);

        const res = await fetch(endpoint, { cache: 'no-store' });
        if (!res.ok) {
            throw new Error(`Failed to fetch post: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        const post: Post = data;

        const minioBaseUrl = process.env.NEXT_PUBLIC_MINIO_URL;

        if (!minioBaseUrl) {
            console.error("MINIO_BASE_URL 환경 변수가 설정되지 않았습니다.");
        }

        return {
            ...post,
            title: he.decode(post.title),
            content: he.decode(post.content),
            postdate: new Date(post.postdate),
            //thumbnail: post.thumbnail ? `${post.thumbnail}` : '/assets/images/img.png',            
        };

    } catch (error) {
        console.error('[getPost] 게시글 조회 중 오류 발생', error);
        throw error;
    }
}


export async function getAllPosts(page: number = 1, limit: number = 20): Promise<PostResponse> {

    try {
        //const dataSourceInstance = await getDataSource();
        const offset = (page - 1) * limit;
        const dbApiUrl = process.env.NEXT_PUBLIC_DB_API_URL;

        if (!dbApiUrl) {
            console.error("NEXT_PUBLIC_DB_API_URL 환경 변수가 설정되지 않았습니다.");
            return { posts: [], totalCount: 0 };
        }

        const endpoint = `${dbApiUrl}/news?offset=${offset}&limit=${limit}`;
        console.log(`[getAllPosts] Fetching posts from: ${endpoint}`);

        const res = await fetch(endpoint, { cache: 'no-store' });
        if (!res.ok) {
            throw new Error(`Failed to fetch news: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        let posts: Post[] = data.news;

        /*
        const orderBySourceCase = SOURCE_ORDER_PRIORITY.map((sourceVal, index) =>
            `WHEN '${sourceVal}' THEN ${index + 1}` // 1부터 시작하는 우선순위
        ).join(' ');

        const rawQuery = `
            WITH RankedPosts AS (SELECT id,
                                        title,
                                        content,
                                        postdate,
                                        source,
                                        url,
                                        thumbnail,
                                        category,
                                        ROW_NUMBER() OVER (PARTITION BY source ORDER BY postdate DESC) as row_num
                                 FROM news -- 실제 테이블 이름
            )
            SELECT id,
                   title,
                   content,
                   postdate,
                   source,
                   url,
                   thumbnail,
                   category
            FROM RankedPosts
            ORDER BY row_num ASC,
                     CASE source ${orderBySourceCase} ELSE ${SOURCE_ORDER_PRIORITY.length + 1} END ASC
                LIMIT $1
            OFFSET $2; -- 플레이스홀더 사용
        `;


        const posts: Post[] = await dataSourceInstance.query(rawQuery, [limit, offset]);

        // 전체 게시물 수 (페이지네이션을 위해 필요할 수 있음)
        // 이 쿼리는 모든 source의 모든 게시물 수를 세야 하므로 별도로 실행
        const totalCountResult = await dataSourceInstance.query(
            `SELECT COUNT(*)
             FROM news;` // 또는 특정 source만 세고 싶다면 WHERE 절 추가
        );
        const totalCount = parseInt(totalCountResult[0].count, 10);*/
        const totalCount = data.totalCount;

        const minioBaseUrl = process.env.NEXT_PUBLIC_MINIO_URL;

        if (!minioBaseUrl) {
            console.error("MINIO_BASE_URL 환경 변수가 설정되지 않았습니다.");
            // 적절한 오류 처리 또는 기본값 설정
            return { posts: [], totalCount: 0 };
        }

        return {
            posts: posts.map(post => ({
                ...post,
                title: he.decode(escapeWithoutAmpercent(post.title)),
                content: he.decode(escapeWithoutAmpercent(post.content)),
                postdate: new Date(post.postdate),
                //thumbnail: post.thumbnail ? `${post.thumbnail}` : '/assets/images/img.png',
            })), totalCount: totalCount
        };

    } catch (error) {
        console.log(error);
        return { posts: [], totalCount: 0 };
    }
}

export async function getAllPostIds(): Promise<PostResponse> {

    try {
        //const dataSourceInstance = await getDataSource();
        console.log(`${process.env.NEXT_PUBLIC_DB_API_URL}/news/ids`);
        const res = await fetch(`${process.env.NEXT_PUBLIC_DB_API_URL}/news/ids`);
        if (!res.ok) {
            throw new Error(`Failed to fetch news: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        let posts: Post[] = data.news;
        const totalCount = data.totalCount;

        return {
            posts: posts.map(post => ({
                ...post,
            })), totalCount: totalCount
        };

    } catch (error) {
        console.log(error);
        return { posts: [], totalCount: 0 };
    }
}

export const fetchThreads = async (): Promise<ThreadPost[]> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DB_API_URL}/news/sns}`);
        if (!response.ok) {
            throw new Error('Failed to fetch threads');
        }
        const data = await response.json();
        return data.posts;
    } catch (error) {
        console.error('Error fetching threads:', error);
        return [];
    }
};