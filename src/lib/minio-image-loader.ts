// src/lib/minio-image-loader.ts
// 이 파일은 Node.js 환경에서 실행됩니다.
import { ImageLoaderProps } from 'next/image';

// 환경 변수에서 MinIO 기본 URL을 가져옵니다.
// 이 변수는 Next.js 서버의 런타임 환경에서만 접근 가능합니다.
// (빌드 시점에는 undefined일 수 있습니다.)
// process.env.NEXT_PUBLIC_MINIO_URL은 클라이언트 컴포넌트에서도 접근 가능하지만,
// 이 로더는 서버에서 실행되므로 일반 process.env 변수를 사용해도 됩니다.
const minioBaseUrl = process.env.MINIO_BASE_URL || process.env.NEXT_PUBLIC_MINIO_URL;

export default function minioImageLoader({ src, width, quality }: ImageLoaderProps) {
    // src는 Image 컴포넌트에 전달되는 값 (예: '/news-thumbnail/2025051514393608553_l.jpg')
    // MinIO URL과 src를 조합하여 최종 이미지 URL을 생성합니다.
    const finalSrc = (src === '::DEFAULT::' ? '/assets/images/img.png' : `${minioBaseUrl}/${src}`);

    // width와 quality 파라미터를 MinIO가 지원하는 형식으로 변환하여 추가할 수 있습니다.
    // 예를 들어, MinIO가 이미지 크기 조절 API를 제공한다면 다음과 같이 할 수 있습니다.
    // if (width) {
    //   finalSrc += `?w=${width}`;
    // }
    // if (quality) {
    //   finalSrc += `${width ? '&' : '?'}q=${quality}`;
    // }

    console.log(`Loading image from: ${finalSrc}`); // 디버깅용 로그

    return finalSrc;
}