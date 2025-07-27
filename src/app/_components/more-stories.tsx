'use client';

import { Post } from "@/models/post";
import { PostPreview } from "./post-preview";
import { useEffect, useState, useRef, useCallback } from 'react';
import {getAllPosts} from "@/lib/api";
import Footer from "@/app/_components/footer";
type Props = {
  initialPosts: Post[];
  initialTotalCount: number;
};

const PAGE_SIZE = 20;

export function MoreStories({ initialPosts, initialTotalCount }: Props) {
    const [posts, setPosts] = useState<Post[]>(initialPosts);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(initialTotalCount > initialPosts.length);
    const totalItemsRef = useRef(initialTotalCount); // 전체 아이템 수를 참조

    const loader = useRef(null);
    const isLoadingRef = useRef(false);

    const fetchMorePosts = useCallback(async () => {
        if (isLoadingRef.current || !hasMore) return;

        isLoadingRef.current = true;
        setLoading(true);
        const nextPage = page + 1;

        try {
            const data = await getAllPosts(nextPage, PAGE_SIZE);
            console.log(data);
            setPosts((prevPosts) => {
                const newPosts = [...prevPosts, ...data.posts.map((post: Post) => ({
                    ...post,
                    postdate: new Date(post.postdate), // 문자열을 Date 객체로 변환
                }))];
                // 현재까지 로드된 총 게시물 수 (newPosts.length)와 전체 게시물 수 (totalItemsRef.current) 비교
                // totalItemsRef.current는 API 응답에서 받은 data.totalCount로 즉시 업데이트됩니다.
                setHasMore(newPosts.length < data.totalCount); // <--- 이 부분 수정
                return newPosts;
            });

            setPage(nextPage);
            totalItemsRef.current = data.totalCount; // 업데이트된 전체 카운트 반영
        } catch (error) {
            console.error("게시물을 가져오는 데 실패했습니다:", error);
        } finally {
            isLoadingRef.current = false;
            setLoading(false);
        }
    }, [hasMore, page]);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0,
        };

        const observer = new IntersectionObserver((entries) => {
            const firstEntry = entries[0];
            console.log({ isIntersecting: firstEntry.isIntersecting});
            if (firstEntry.isIntersecting) {
                fetchMorePosts();
            }
        }, options);

        if (loader.current) {
            console.log("Observing element:", loader.current);
            observer.observe(loader.current);
        } else {
            console.log("Loader element is null or not rendered."); // <-- 이 라인 추가
        }

        return () => {
            observer.disconnect();
        };
    }, [fetchMorePosts, loader.current]);

    return (
    <section>
        <Footer />
      <div className="grid grid-cols-1 md:grid-cols-1 md:gap-x-16 lg:gap-x-32 gap-y-4 md:gap-y-4 mb-4">
        {posts && posts.map((post) => (
          <PostPreview
            key={post.url}
            id={post.id}
            title={post.title}
            thumbnail={post.thumbnail}
            postdate={post.postdate}
            tags={post.tags}
            url={post.url}
            content={post.content}
            category={post.category}
          />
        ))}
          <div ref={loader} style={{textAlign: 'center', padding: '20px'}}>
              {loading && <p>로딩 중...</p>}
              {!hasMore && !loading && posts.length > 0 && (
                  <p style={{color: '#888'}}>모든 게시물을 불러왔습니다.</p>
              )}
              {hasMore && !loading && ( // 더 많은 게시물이 있을 때만 표시
                  <p>스크롤하여 더 많은 게시물 로드</p>
              )}
          </div>
      </div>
    </section>
  );
}
