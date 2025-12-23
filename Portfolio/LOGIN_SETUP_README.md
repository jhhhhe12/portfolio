# 로그인 시스템 설정 가이드

## 현재 설정 상태 (2025-12-16)

### 데이터베이스
- **DB명**: web
- **테이블명**: user (주의: users가 아님!)
- **사용자**: webadmin
- **비밀번호**: Rnjsaltjs12!
- **인증 방식**: mysql_native_password (phpMyAdmin 호환)

### 비밀번호 암호화
- **방식**: bcrypt (PASSWORD_BCRYPT)
- **함수**: 
  - 회원가입: `password_hash($password, PASSWORD_BCRYPT)`
  - 로그인: `password_verify($password, $stored_hash)`

### 테스트 계정
- **아이디**: admin
- **비밀번호**: 1234
- **이메일**: admin@hamini.store

## 중요 사항

### ⚠️ 절대 하지 말아야 할 것
1. **테이블 이름 변경 금지**: `user` → `users`로 변경하면 안됨
2. **MD5 사용 금지**: 보안상 취약하며 현재 bcrypt 사용 중
3. **MySQL 인증 방식 변경 금지**: `mysql_native_password` 유지 필요

### ✅ 새 사용자 추가 방법
```sql
-- bcrypt 해시는 PHP로 생성
-- php -r "echo password_hash('비밀번호', PASSWORD_BCRYPT);"
INSERT INTO web.user (username, password, email, full_name, role) 
VALUES ('사용자명', '$2y$10$해시값...', '이메일', '이름', 'member');
```

### 🔧 문제 해결

#### 로그인 실패 시
1. 비밀번호가 bcrypt로 해시되었는지 확인
   ```bash
   mysql -u webadmin -p'Rnjsaltjs12!' -e "SELECT username, password FROM web.user;"
   ```
   - bcrypt는 `$2y$` 또는 `$2b$`로 시작
   - MD5는 32자 16진수

2. 테스트 스크립트 실행
   ```bash
   php /opt/www/test_login.php
   ```

#### phpMyAdmin 접속 실패 시
```bash
# 인증 방식 확인
mysql -u debian-sys-maint -p'7KAPU7OecHHTzmng' -e "SELECT User, Host, plugin FROM mysql.user WHERE User='webadmin';"

# mysql_native_password로 변경
mysql -u debian-sys-maint -p'7KAPU7OecHHTzmng' << 'EOF'
ALTER USER 'webadmin'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Rnjsaltjs12!';
FLUSH PRIVILEGES;
EOF
```

## 파일 구조
- `config.php`: DB 연결 설정
- `login.php`: 로그인 처리 (bcrypt 사용)
- `register.php`: 회원가입 처리 (bcrypt 사용)
- `test_login.php`: 로그인 테스트 스크립트

## 보안 권장사항
1. 프로덕션에서는 `display_errors = 0` 유지
2. 정기적으로 비밀번호 변경
3. HTTPS 사용 권장
4. 세션 타임아웃 설정

## 업데이트 이력
- 2025-12-16: bcrypt 전환, mysql_native_password 설정, 테이블명 user로 통일
