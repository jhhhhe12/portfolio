# Docker Nginx 웹서버

이 프로젝트는 Dockerfile을 사용하여 Nginx 웹서버를 구축합니다.

## 파일 구조
```
docker-nginx/
├── Dockerfile          # Docker 이미지 빌드 파일
├── index.html          # 웹페이지 파일
└── README.md           # 설명 문서
```

## 빌드 및 실행 방법

### 1. Docker 이미지 빌드
```bash
cd /opt/www/docker-nginx
sudo docker build -t my-nginx-web .
```

### 2. 컨테이너 실행
```bash
# 8002 포트로 실행
sudo docker run -d -p 8002:80 --name my-nginx-container my-nginx-web

# 또는 8001 포트로 실행 (기존 컨테이너 중지 필요)
sudo docker stop webserver1
sudo docker run -d -p 8001:80 --name my-nginx-container my-nginx-web
```

### 3. 웹페이지 확인
```bash
# 브라우저에서 접속
http://localhost:8001

# 또는 curl로 확인
curl http://localhost:8001
```

## 기존 컨테이너 관리

### 현재 실행 중인 컨테이너 확인
```bash
sudo docker ps
```

### 컨테이너 중지
```bash
sudo docker stop webserver1
```

### 컨테이너 삭제
```bash
sudo docker rm webserver1
```

### 이미지 확인
```bash
sudo docker images
```

## HTML 파일 수정

1. `index.html` 파일 수정
2. 이미지 재빌드: `sudo docker build -t my-nginx-web .`
3. 기존 컨테이너 삭제: `sudo docker rm -f my-nginx-container`
4. 새 컨테이너 실행: `sudo docker run -d -p 8001:80 --name my-nginx-container my-nginx-web`

## 주의사항

- 포트 8001을 사용하려면 기존 webserver1 컨테이너를 중지해야 합니다
- Dockerfile을 수정한 후에는 반드시 이미지를 재빌드해야 합니다
