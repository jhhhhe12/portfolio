FROM nginx:latest

# 작업 디렉토리 설정
WORKDIR /usr/share/nginx/html

# 기존 nginx 파일 삭제
RUN rm -rf /usr/share/nginx/html/*

# HTML 파일 복사
COPY index.html /usr/share/nginx/html/

# 포트 노출
EXPOSE 80

# nginx 실행
CMD ["nginx", "-g", "daemon off;"]
