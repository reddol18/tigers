'use client';

import cn from "classnames";
import Link from "next/link";

type Props = {
  title: string;
  src: string;
  slug?: string;
};

const CoverImage = ({ title, src, slug }: Props) => {
    const imageUrl = src ? `${process.env.NEXT_PUBLIC_MINIO_URL}/${src}` : '/assets/images/img.png';
  const image = (
      <div
          className={cn("relative w-full overflow-hidden", {
            // 이미지가 로드되기 전 또는 콘텐츠가 짧을 때를 위한 최소 높이
            // 필요에 따라 이 값을 조정하거나 제거할 수 있습니다.
            "xl:min-h-[150px]": true, // 예시: 최소 높이 150px (조절 가능)
          })}
      >
        <img
          src={imageUrl}
          alt={`Cover Image for ${title}`}
          style={{maxHeight: '140px', margin: '0 auto'}}
          className={cn("object-cover", {
              "border border-b-gray-100": true,
            "hover:shadow-lg transition-shadow duration-200": slug
          })}
        />
      </div>
  );
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={slug} target="_self" aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;
