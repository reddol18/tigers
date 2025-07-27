'use client';

import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";
import { MoreStories } from "@/app/_components/more-stories";
import { getAllPosts } from "@/lib/api";
import { useState, useEffect } from 'react';
import {PostResponse} from "@/interfaces/post-response";

export default function Index() {
    const [posts, setPosts] = useState<PostResponse>({posts:[], totalCount: 0});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string|null>(null);
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response: PostResponse = await getAllPosts(1, 20);
                setPosts(response);
            } catch(err) {
                console.log(err);
                setError(err instanceof Error ? err.message : String(err));
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

  return (
    <main>
      <Container>
        <Intro />
          {loading === true && <p>로딩 중...</p>}
          {error != null && error.length >= 0 && <p>로딩 실패</p>}
          {loading === false && posts.posts.length > 0 && (
              <MoreStories initialPosts={posts.posts} initialTotalCount={posts.totalCount} />)}      </Container>
    </main>
  );
}
