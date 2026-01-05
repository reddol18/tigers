'use client';

import { Post } from "@/models/post";
import { PostPreview } from "./post-preview";
import { useEffect, useState, useRef, useCallback } from 'react';
import { getAllPosts } from "@/lib/api";
import Footer from "@/app/_components/footer";
import { usePostStore } from "@/store/postStore";
import { useRouter } from "next/navigation";
import ThreadsFeed from './ThreadsFeed';

type Props = {
    initialPosts: Post[];
    initialTotalCount: number;
};

const PAGE_SIZE = 20;

export function MoreStories({ initialPosts, initialTotalCount }: Props) {
    const { posts, totalCount, page, scrollPosition, setPosts, setScrollPosition } = usePostStore();
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(totalCount == 0 ? initialTotalCount > posts.length : totalCount > posts.length);
    const loader = useRef<HTMLDivElement | null>(null);
    const isLoadingRef = useRef(false);
    const router = useRouter();

    // 초기 상태 설정
    useEffect(() => {
        if (posts.length === 0) {
            // posts가 비어 있으면 initialPosts를 상태에 저장
            setPosts(initialPosts, initialTotalCount, 1);
        }
    }, [posts, initialPosts, initialTotalCount, setPosts]);

    // 새로고침 또는 URL 직접 입력 시 스크롤 위치 초기화
    useEffect(() => {
        const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
        if (navigationEntry?.type === 'reload') {
            setScrollPosition(0); // zustand 상태 초기화
            window.scrollTo(0, 0); // 스크롤을 맨 위로 이동
        }
    }, [setScrollPosition]);

    // 페이지 로드 시 스크롤 위치 복원
    useEffect(() => {
        if (scrollPosition > 0) {
            console.log("복원된 스크롤 위치:", scrollPosition);
            window.scrollTo(0, scrollPosition);
        }
    }, [scrollPosition]);

    // 뒤로가기 시 스크롤 위치 복원
    useEffect(() => {
        const handleRouteChange = () => {
            setScrollPosition(window.scrollY); // 현재 스크롤 위치 저장
        };

        const handleRouteComplete = () => {
            if (scrollPosition > 0) {
                window.scrollTo(0, scrollPosition); // 저장된 스크롤 위치로 이동
            }
        };
    }, [router, scrollPosition, setScrollPosition]);


    const fetchMorePosts = useCallback(async () => {
        if (isLoadingRef.current || !hasMore) return;

        isLoadingRef.current = true;
        setLoading(true);
        const nextPage = page + 1;

        try {
            const data = await getAllPosts(nextPage, PAGE_SIZE);
            const newPosts = [...posts, ...data.posts.map((post: Post) => ({
                ...post,
                postdate: new Date(post.postdate),
            }))];

            setPosts(newPosts, data.totalCount, nextPage);
            setHasMore(newPosts.length < data.totalCount);
        } catch (error) {
            console.error("게시물을 가져오는 데 실패했습니다:", error);
        } finally {
            isLoadingRef.current = false;
            setLoading(false);
        }
    }, [hasMore, page, posts, setPosts]);

    useEffect(() => {
        if (!loader.current) {
            console.error("Loader ref is not set");
            return;
        }
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0,
        };

        const observer = new IntersectionObserver((entries) => {
            const firstEntry = entries[0];
            if (firstEntry.isIntersecting) {
                fetchMorePosts();
            }
        }, options);

        if (loader.current) {
            observer.observe(loader.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [fetchMorePosts]);

    // 스크롤 위치 저장
    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [setScrollPosition]);

    return (
        <section>
            <Footer />
            <div className="grid grid-cols-1 md:grid-cols-1 md:gap-x-16 lg:gap-x-32 gap-y-4 md:gap-y-4 mb-4">
                {posts.map((post) => (
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
                <div ref={loader} style={{ textAlign: 'center', padding: '20px' }}>
                    {loading && <p>로딩 중...</p>}
                    {!hasMore && !loading && posts.length > 0 && (
                        <p style={{ color: '#888' }}>모든 게시물을 불러왔습니다.</p>
                    )}
                    {hasMore && !loading && (
                        <p>스크롤하여 더 많은 게시물 로드</p>
                    )}
                </div>
            </div>
            <div className="ml-8 w-64">
                {/* SNS 연동 컴포넌트 */}
                <ThreadsFeed />
            </div>
        </section>
    );
}
