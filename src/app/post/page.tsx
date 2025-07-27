'use client';
import { useState, useEffect, Suspense } from 'react';
import { getPost } from '@/lib/api';
import { Intro } from '@/app/_components/intro';
import Container from '@/app/_components/container';
import { Post } from '@/models/post';
import { SearchParamsWrapper } from '@/app/_components/SearchParamWrapper';

export default function PostPage() {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const fetchPost = async (id: string | null) => {
        if (!id) {
            setError('ID가 제공되지 않았습니다.');
            setLoading(false);
            return;
        }
        try {
            const data: Post = await getPost(parseInt(id, 10));
            setPost(data);
        } catch (err) {
            setError('게시글 불러오기 실패');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <Suspense fallback={<p>로딩 중...</p>}>
                <SearchParamsWrapper>
                    {(id) => (
                        <Container>
                            <Intro />
                            {loading && <p>로딩 중...</p>}
                            {error && <p>{error}</p>}
                            {!loading && post && (
                                <div style={{ width: '60%', margin: '0 auto' }}>
                                    <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'black', fontWeight: 'bold' }}>
                                        {post?.title}
                                    </h1>
                                    <p className="text-right">작성일: {new Date(post?.postdate).toLocaleDateString()}</p>
                                    <div className="prose max-w-2xl mx-auto mt-8">
                                        <div dangerouslySetInnerHTML={{ __html: post?.content }} />
                                    </div>
                                </div>
                            )}
                        </Container>
                    )}
                </SearchParamsWrapper>
            </Suspense>
        </main>
    );
}