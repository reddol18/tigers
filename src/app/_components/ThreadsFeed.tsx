'use client';

import React, { useEffect, useState } from 'react';
import { fetchThreads } from '@/lib/api';
import { ThreadPost } from '@/interfaces/thread-post';

const ThreadsFeed = () => {
    const [posts, setPosts] = useState<ThreadPost[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadThreads = async () => {
            const fetchedPosts = await fetchThreads();
            setPosts(fetchedPosts);
            setLoading(false);
        };

        loadThreads();
    }, []);

    if (loading) {
        return <p>Loading threads...</p>;
    }

    return (
        <aside className="threads-feed">
            <h2 className="text-lg font-bold mb-4">최신 스레드</h2>
            <ul>
                {posts.map((post) => (
                    <li key={post.id} className="mb-4">
                        <p>{post.content}</p>
                        <small className="text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</small>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default ThreadsFeed;