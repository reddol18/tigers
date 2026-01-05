import { Post } from '@/models/post';
import { create } from 'zustand';

interface PostStoreState {
    posts: Post[]; // 가져온 글 리스트
    totalCount: number; // 전체 게시물 수
    page: number; // 현재 페이지
    scrollPosition: number; // 스크롤 위치
    setPosts: (posts: Post[], totalCount: number, page: number) => void;
    setScrollPosition: (position: number) => void;
}

export const usePostStore = create<PostStoreState>((set: (arg0: { posts?: any; totalCount?: any; page?: any; scrollPosition?: any; }) => any) => ({
    posts: [],
    totalCount: 0,
    page: 1,
    scrollPosition: 0,
    setPosts: (posts: any, totalCount: any, page: any) =>
        set({ posts, totalCount, page }),
    setScrollPosition: (position: any) =>
        set({ scrollPosition: position }),
}));