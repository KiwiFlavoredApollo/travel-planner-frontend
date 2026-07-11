# 미니프로젝트 프론트엔드 (React + MUI)

## 개요
- React 18 + Material-UI (MUI) 기반 여행 계획 프론트엔드
- React Router v6으로 라우팅
- Axios로 백end와 통신 (JWT 자동 갱신 포함)
- Vite 빌드 도구 사용 (Vite React 템플릿)
- 환경 변수: `VITE_API_BASE` (기본 `/api/v1`)

## 주요 기능
- 로그인 / 회원가입 (JWT 토큰 저장 및 자동 갱신)
- 메인 페이지: 로그인 후 사용자 별 여행 계획 목록 표시
- 여행 계획 생성 페이지: 지역, 날짜, 목적지 키워드 입력 → AI 기반 여행 계획 생성
- 여행 계획 결과 페이지: 생성된 일정 타임라인 표시 + 계획 삭제 기능
- 플로팅 액션 버튼(FAB)으로 새 계획 생성 페이지 이동

## 디렉터리 구조
```
src/
 ├─ assets/          # 정적 이미지 등
 ├─ components/      # 재사용 UI 컴포넌트 (TopAppBar, KoreanDatePicker 등)
 ├─ pages/           # 페이지 컴포넌트 (Login, Register, Main, GeneratePlan, Result)
 ├─ context/         # React Context (AccessTokenContext)
 ├─ api/             # Axios 인스턴스 및 인터셉터
 └─ App.jsx          # 라우트 정의
```

## 설치 및 실행
```bash
# 저장소 클론 후
cd miniproject_frontend
npm install
# .env.example 을 .env 로 복사 후 VITE_API_BASE 설정 (필요시)
npm run dev   # Vite 개발 서버 (보통 http://localhost:5173)
```

## 빌드
```bash
npm run build   # dist/ 에 정적 파일 생성
```

## 주요 의존성
- react, react-dom, react-router-dom
- @mui/material, @mui/lab, @mui/icons-material
- axios, dayjs, jwt-disabled (백엔드에서 처리)
- vite

## 주의 사항
- 백엔드가 `http://localhost:8080/api/v1` (또는 Docker 등)로 실행 중이어야 함.
- CORS 설정은 백엔드에서 허용해야 함.
- 토큰은 `localStorage`에 저장되며, 로그아웃 시 삭제.

## 트러블슈팅
- **401 오류**: 토큰 만료 시 자동 갱신 시도 실패 시 로그인 페이지로 리다이렉트.
- **CORS 오류**: 백엔드 `@CrossOrigin` 또는 security config 확인.
- **모듈 파싱 오류**: `import` 문에서 기본 내보내기 여부 확인 (예: `TopAppBar`는 named export).

## 라이선스
MIT