## home
홈: 포트폴리오 웹

### 실행
```bash
# node v16.15.1
npm install
npm run dev
```

### 폴더구조
```bash
gojiri
├── public # 빌드 경로
└── src
	├── assets # 콘텐츠 리소스 폴더(font,image,scss)
	├── common
	│   ├── http.js # API 통신
	│   ├── octokit.js # github API 통신
	│   └── util.js # 유틸함수
	├─ components
	│   ├── Statistics # three.js 통계(작업중)
	│   │   ├── Camera.js
	│   │   ├── datas.js
	│   │   ├── Environments.js
	│   │   ├── Grass.js
	│   │   └── index.js
	│   ├── Card.js # 카드 컴포넌트
	├── hooks # 훅
  │   ├── useCards.js
	│   └── useError.js
	├── layout # 레이아웃 구성요소
	│   ├── Body.js
	│   └── Header.js
	├── pages # 페이지 구성요소
	│   ├── Analysis.js
	│   └── Main.js
	├── router # 라우터
	│   └── route.js
	├── store # zustand 스토어
	│   └── index.ts
	├── App.js
	└── index.js
```