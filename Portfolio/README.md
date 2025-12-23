# Hamini Portfolio

개인 포트폴리오 웹사이트

## 🚀 기술 스택

- HTML5 (Semantic markup)
- CSS3 (CSS Variables, Flexbox, Grid)
- Vanilla JavaScript (ES6+)
- Nginx (Web Server)

## 📁 프로젝트 구조

```
/opt/www/
├── index.html          # 메인 HTML 파일
├── css/
│   └── style.css       # 스타일시트
├── js/
│   └── main.js         # JavaScript 로직
├── README.md           # 프로젝트 문서
└── .gitignore          # Git 제외 파일
```

## 🎨 주요 기능

- **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 기기 지원
- **부드러운 스크롤**: Smooth scrolling navigation
- **인터랙티브 애니메이션**: Intersection Observer API 활용
- **SEO 최적화**: Meta tags, Semantic HTML
- **접근성**: ARIA labels, Semantic elements
- **성능 최적화**: CSS/JS 파일 분리, Preconnect

## 🛠️ 개발 환경 설정

### 필요 사항
- Nginx
- Git (optional)

### 로컬 개발
```bash
# 파일 변경 후
sudo systemctl reload nginx
```

## 🌐 배포

현재 사이트는 AWS Lightsail에서 Nginx를 통해 호스팅되고 있습니다.

- **URL**: https://www.hamini.store
- **Server**: Nginx 1.24.0
- **SSL**: Let's Encrypt

### 배포 프로세스
1. 파일 수정
2. `/opt/www`에 업로드
3. Nginx 재시작: `sudo systemctl reload nginx`

## 📝 코드 품질

- **CSS**: CSS Variables로 중앙화된 스타일 관리
- **JavaScript**: 모듈화된 기능, 이벤트 위임
- **HTML**: Semantic markup, 접근성 고려

## 🔒 보안

- HTTPS 적용 (Let's Encrypt)
- CSP (Content Security Policy) 준비
- Input sanitization

## 📈 성능

- CSS/JS 파일 분리로 캐싱 효율화
- 이미지 최적화 (SVG 사용)
- Lazy loading 적용 가능

## 📞 연락처

- Email: hamini@hamini.store
- GitHub: https://github.com/hamini

## 📄 라이선스

© 2025 Hamini. All rights reserved.
