# 보안 개선 사항

## 🚨 긴급 (High Priority)

### 1. Rate Limiting 추가

**문제**: 무제한 요청으로 Brute Force 공격 가능

```bash
npm install @nestjs/throttler
```

### 2. 로그인 실패 메시지 개선

**현재 문제**:

```typescript
// ❌ 사용자 존재 여부 노출
if (!user) throw new UnauthorizedException("id 또는 passowrd가 일치하지 않습니다.");
if (!isMatch) throw new UnauthorizedException("id 또는 passowrd가 일치하지 않습니다.");
```

**해결**: 동일한 메시지로 통일됨 ✅

### 3. Refresh Token 구현

**문제**: Access Token만 사용 (탈취 시 위험)
**해결**: Refresh Token 패턴 도입

### 4. 비밀번호 정책

**문제**: 약한 비밀번호 허용
**해결**: 최소 길이, 복잡도 검증 추가

### 5. 계정 잠금 정책

**문제**: 무제한 로그인 시도 가능
**해결**: N회 실패 시 일시 잠금

---

## ⚠️ 중요 (Medium Priority)

### 6. Helmet 항상 활성화

**현재**:

```typescript
if (configService.get<string>("NODE_ENV") !== "local") app.use(helmet());
```

**개선**: 로컬에서도 활성화

### 7. CORS 화이트리스트 검증

**현재**:

```typescript
origin: process.env.LOCALHOST_URL?.split(",");
```

**개선**: 허용된 도메인만 명시적으로 설정

### 8. 쿠키 Secure 플래그

**현재**: production에서만
**개선**: 개발에서도 HTTPS 사용 권장

### 9. 에러 메시지 최소화

**현재**: Prisma 에러가 상세하게 노출
**개선**: 프로덕션에서는 일반 메시지만

### 10. XSS 방어 강화

**추가**: CSP (Content Security Policy) 헤더

---

## 💡 권장 (Low Priority)

### 11. API 버전 관리

```typescript
app.setGlobalPrefix("api/v1");
```

### 12. 감사 로그

로그인, 권한 변경, 중요 작업 로깅

### 13. 2FA (Two-Factor Authentication)

중요 계정에 대한 이중 인증

### 14. IP 화이트리스트

관리자 API에 대한 IP 제한

### 15. 파일 업로드 검증

S3 업로드 시 파일 타입, 크기 제한

---

## 📋 환경변수 보안

### 추가 필요한 환경변수

```env
# Rate Limiting
THROTTLE_TTL=60
THROTTLE_LIMIT=10

# Refresh Token
REFRESH_JWT_SECRET=different-secret-from-access
REFRESH_TOKEN_EXPIRE=604800  # 7일

# 비밀번호 정책
PASSWORD_MIN_LENGTH=8
PASSWORD_REQUIRE_UPPERCASE=true
PASSWORD_REQUIRE_NUMBER=true
PASSWORD_REQUIRE_SPECIAL=true

# 계정 잠금
LOGIN_MAX_ATTEMPTS=5
LOGIN_LOCK_TIME=900  # 15분
```

---

## 🔐 데이터베이스 보안

### 1. 민감한 데이터 암호화

- 개인정보는 암호화 저장
- PII (Personally Identifiable Information) 필드 식별

### 2. 인덱스 보안

- 민감한 컬럼은 인덱싱 주의
- 쿼리 성능과 보안 밸런스

### 3. 백업 암호화

- 데이터베이스 백업 파일 암호화

---

## 🚀 즉시 적용 가능한 개선사항 (우선순위 순)

1. Rate Limiting 추가
2. 비밀번호 정책 강화
3. Helmet 항상 활성화
4. Refresh Token 구현
5. 계정 잠금 정책
6. CORS 화이트리스트 엄격화
7. 에러 메시지 프로덕션 모드 분리
8. 감사 로그 구현
