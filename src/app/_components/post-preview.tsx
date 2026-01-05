'use client';

import { type Author } from "@/interfaces/author";
import Link from "next/link";
import Source from "./tags";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import {PostBody} from "@/app/_components/post-body";

type Props = {
    id: number
  title: string;
  thumbnail: string;
  postdate: Date;
  tags: string;
  url: string;
  content: string;
  category: string;
};

export function PostPreview({
    id,
  title,
  thumbnail,
  postdate,
  tags,
  url,
    content,
    category,

}: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 mb-1 border-b border-b-gray-100 pb-1">
          <div className="lg:col-span-1 lg:h-full">
              <div className="flex justify-between">
              <div className="lg:hidden text-xs mb-2 xl:mb-1 text-gray-400">
                  <DateFormatter dateString={postdate.toISOString()} />
              </div>
              <Source tags={tags} category={category} on_mobile={true}/>
              </div>
              <div className="mb-2">
                  <CoverImage slug={`/post/${id}`} title={title} src={thumbnail} />
              </div>
          </div>
          <div className="lg:col-span-3">
              <h3 className="text-sm font-bold lg:text-2xl mb-2 leading-snug truncate">
                  <Link href={`/post/${id}`} target="_self" className="hover:underline">
                      {title}
                  </Link>
              </h3>
              <div className="hidden lg:flex lg:text-sm mb-2">
                  <DateFormatter dateString={postdate.toISOString()} />
              </div>
              <PostBody content={content} on_mobile={false}></PostBody>
              <PostBody content={content} on_mobile={true}></PostBody>
              <Source tags={tags} category={category} on_mobile={false} />
          </div>
      </div>
  );
}
