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
home
├── public # 빌드 경로
└── src
    ├── assets # 콘텐츠 리소스 폴더(font,image,scss)
    ├── common
    │   ├── http.js # API 통신
    │   ├── octokit.js # github API 통신
    │   └── util.js # 유틸함수
    ├── components
    │   ├── CommitHistory # 커밋기록 컴포넌트
    │   │   ├── Detail.js
    │   │   ├── List.js
    │   │   └── index.js
    │   ├── GrassGraph # 기여도 그래프 컴포넌트(three.js)
    │   │   ├── Camera.js
    │   │   ├── Environments.js
    │   │   ├── Grass.js
    │   │   ├── GrassCanvas.js
    │   │   ├── Ground.js
    │   │   ├── Legend.js
    │   │   ├── Ticks.js
    │   │   ├── Tooltip.js
    │   │   └── index.js
    │   ├── LabBlueprint # 블루프린트 컴포넌트
    │   │   ├── Backface.js
    │   │   ├── Viewer.js
    │   │   └── index.js
    │   └── LanguageState.js # 언어사용량 크래프 컴포넌트(nivo)
    ├── hooks # 훅
    │   ├── useCard.js
    │   ├── useCommit.js
    │   ├── useError.js
    │   ├── useLab.js
    │   ├── useSpringToValue.js
    │   └── useStatistics.js
    ├── lab # lab 콘턴츠 항목
    │   └── WeatherCanvas # 날씨 시각화 페이지
    │       ├── Weather
    │       │   ├── Flakes.js
    │       │   ├── Inputs.js
    │       │   └── index.js
    │       └── Wrapper.js
    │       └── index.js
    ├── layout # 레이아웃 구성요소
    │   ├── Body.js
    │   └── Header.js
    ├── modules # 모듈 구성요소
    │   ├── BarChart.js
    │   ├── CheckboxGroup.js
    │   ├── Commit.js
    │   ├── DifferView.js
    │   ├── FlipCard.js
    │   ├── LabViewer.js
    │   ├── RadioGroup.js
    │   └── Toolbar.js
    ├── pages # 페이지 구성요소
    │   ├── Lab.js
    │   ├── Statistics.js
    │   └── Main.js
    ├── router # 라우터
    │   ├── route.js
    │   └── index.js
    ├── store # zustand 스토어
    │   └── index.ts
    ├── App.js
    └── index.js
```