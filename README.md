# 먼데이 타이거즈 블로그

- 네이버 블로그에서 연재중인 기아 타이거즈 기록 관련 포스팅을 별도로 리스트업 하는 블로그 입니다.
- 이 레포지토리는 이 중에서 프런트 사이트를 구성하는 코드들의 집합니다.
  - https://tigers.reddol18.pe.kr
- 아래와 같은 기술스택으로 구성되어 있습니다.
  - TypeScript 기반 next.js (SSG)
  - Tailwind CSS
- 참고로 백엔드는 다음과 같은 기술스택으로 구성되어 있습니다.
  - minio : 썸네일 image 저장용
  - nest.js + TypeOrm + postgres : 포스팅 정보 저장 및 조회용
  - python + BeautifulSoup: 네이버 블로그 포스팅 이전용

# 앞으로의 계획

- SNS 계정 연동
- 댓글 기능
- 독자로부터 제안 받기 기능