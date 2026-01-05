import Container from '@/app/_components/container';
import Footer from '@/app/_components/footer';
import { Intro } from '@/app/_components/intro';
import { getPost } from '@/lib/api';
import ThreadsFeed from '@/app/_components/ThreadsFeed';
import { Post } from '@/models/post';

export const revalidate = 0;

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const numericId = Number(id);
  if (Number.isNaN(numericId)) {
    return (
      <main>
        <Container>
          <Intro />
          <p>잘못된 게시글 ID입니다.</p>
        </Container>
      </main>
    );
  }

  let post: Post | null = null;
  let fetchError: string | null = null;

  try {
    post = await getPost(numericId);
  } catch (error) {
    console.error('[post/[id]] 게시글 조회 실패', error);
    fetchError = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
  }

  if (!post || !post.id) {
    return (
      <main>
        <Container>
          <Intro />
          <p>게시글을 불러오지 못했습니다. {fetchError ?? ''}</p>
        </Container>
      </main>
    );
  }

  const postDate = post.postdate ? new Date(post.postdate) : null;
  const safeContent = typeof post.content === 'string' ? post.content : '';

  return (
    <main>
      <Container>
        <Intro />        
        <section className="flex border-t-4 border-red-600 pt-5 pb-10">        
          <div className="flex-1">            
            <div style={{ margin: '0 auto' }}>
              <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'black', fontWeight: 'bold' }}>
                {post.title}
              </h1>
              {postDate && <p className="text-right">작성일: {postDate.toLocaleDateString()}</p>}
              <div className="prose max-w-2xl mt-8">
                <div dangerouslySetInnerHTML={{ __html: safeContent }} />
              </div>
            </div>
          </div>
          <div className="ml-8 w-64">
            {/* SNS 연동 컴포넌트 */}
            <ThreadsFeed />
          </div>
        </section>
        <Footer />
      </Container>
    </main>
  );
}