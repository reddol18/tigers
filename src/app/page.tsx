import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";
import { MoreStories } from "@/app/_components/more-stories";
import { getAllPosts } from "@/lib/api";
import { PostResponse } from "@/interfaces/post-response";

export const revalidate = 0;

export default async function Index() {
  let postsResult: PostResponse = { posts: [], totalCount: 0 };
  let fetchError: string | null = null;

  try {
    postsResult = await getAllPosts(1, 20);
  } catch (error) {
    console.error("초기 게시물을 불러오는 중 오류 발생", error);
    fetchError = error instanceof Error ? error.message : "알 수 없는 오류";
  }

  const hasPosts = postsResult.posts.length > 0;

  return (
    <main>
      <Container>
        <Intro />
        {fetchError && <p>게시물을 불러오지 못했습니다.</p>}
        {!fetchError && !hasPosts && <p>게시물이 없습니다.</p>}
        {hasPosts && (
          <MoreStories
            initialPosts={postsResult.posts}
            initialTotalCount={postsResult.totalCount}
          />
        )}
      </Container>
    </main>
  );
}
