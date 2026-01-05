/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://tigers.reddol18.pe.kr', // 사이트의 기본 URL
  generateRobotsTxt: true, // robots.txt 파일 생성 여부
  sitemapSize: 5000, // 각 사이트맵 파일에 포함될 최대 URL 수
  changefreq: 'daily', // 페이지 변경 빈도 (daily, weekly 등)
  priority: 0.7, // 기본 페이지 우선순위
  exclude: [
    '/admin/*', // 제외할 경로 (예: 관리자 페이지)
    '/api/*', // API 경로 제외
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*', // 모든 크롤러에 대한 규칙
        allow: '/', // 모든 경로 허용
      },
      {
        userAgent: 'Googlebot', // 특정 크롤러에 대한 규칙
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://tigers.reddol18.pe.kr/sitemap.xml', // 추가 사이트맵 경로
    ],
  },
};