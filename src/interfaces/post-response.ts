import {Post} from "@/models/post";

export type PostResponse = {
    posts: Post[],
    totalCount: number,
}