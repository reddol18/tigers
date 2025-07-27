// next.config.js
/** @type {import('next').NextConfig} */

const nextConfig = {
    output: 'export',
    // 여기에 Next.js 설정을 추가합니다.
    // 예시: images 설정
    images: {
        remotePatterns: [
            {
                protocol: 'http', // 또는 'https' (MinIO 서버의 프로토콜에 따라)
                hostname: '101.235.19.46', // MinIO 서버의 공인 도메인 또는 IP (예: news.reddol18.pe.kr)
                port: '29000', // MinIO가 리슨하는 포트 (만약 9000번이라면)
                pathname: '/tigers-thumbnail/**', // MinIO 버킷 경로 등 필요에 따라 조정
            },
        ],
    },
    reactStrictMode: false,
    assetPrefix: process.env.NODE_ENV === "production" ? "https://tigers.reddol18.pe.kr" : "",
    // ... 기타 설정 (예: env, webpack 등)
};

module.exports = nextConfig;