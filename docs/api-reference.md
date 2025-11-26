# API Reference

## Auth

### POST /auth/signup

- **Description**: 새로운 사용자를 등록합니다.
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string",
    "name": "string"
  }
  ```
- **Success Response**:
  - **Code**: 201 Created
  - **Body**:
    ```json
    {
      "id": "string",
      "email": "string",
      "name": "string"
    }
    ```
- **Error Response**:
  - **Code**: 400 Bad Request
  - **Body**:
    ```json
    {
      "error": {
        "message": "잘못된 요청입니다."
      }
    }
    ```

### POST /auth/signin

- **Description**: 사용자 로그인을 수행합니다.
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Success Response**:
  - **Code**: 200 OK
- **Error Response**:
  - **Code**: 401 Unauthorized
  - **Body**:
    ```json
    {
      "error": {
        "message": "인증에 실패했습니다."
      }
    }
    ```

### POST /auth/signout

- **Description**: 사용자 로그아웃을 수행합니다.
- **Success Response**:
  - **Code**: 200 OK
  - **Body**:
    ```json
    {
      "message": "성공적으로 로그아웃되었습니다."
    }
    ```
- **Error Response**:
  - **Code**: 400 Bad Request
  - **Body**:
    ```json
    {
      "error": {
        "message": "잘못된 요청입니다."
      }
    }
    ```

## Crews

### GET /crews

- **Description**: 크루 목록을 조회합니다.
- **Query Parameters**:
  - `sort`: string
  - `page`: number
  - `limit`: number
  - `city`: string
  - `district`: string
- **Success Response**:
  - **Code**: 200 OK
  - **Body**: `Member[]`

### POST /crews

- **Description**: 새로운 크루를 생성합니다.
- **Request Body**:
  ```json
  {
    "name": "string",
    "description": "string",
    "city": "string",
    "district": "string",
    "image": "string"
  }
  ```
- **Success Response**:
  - **Code**: 201 Created
  - **Body**: `Crew`
- **Error Response**:
  - **Code**: 400 Bad Request
  - **Body**:
    ```json
    {
      "error": {
        "message": "잘못된 요청입니다."
      }
    }
    ```

### GET /crews/:crewId

- **Description**: ID로 특정 크루를 조회합니다.
- **Success Response**:
  - **Code**: 200 OK
  - **Body**: `Crew`
- **Error Response**:
  - **Code**: 404 Not Found
  - **Body**:
    ```json
    {
      "error": {
        "message": "크루를 찾을 수 없습니다."
      }
    }
    ```

### GET /crews/:crewId/sessions

- **Description**: 특정 크루의 세션들을 조회합니다.
- **Query Parameters**:
  - `page`: number
  - `limit`: number
- **Success Response**:
  - **Code**: 200 OK
  - **Body**: `Omit<Session, "participants" | "likedUsers" | "reviews">[]`
- **Error Response**:
  - **Code**: 404 Not Found
  - **Body**:
    ```json
    {
      "error": {
        "message": "크루를 찾을 수 없습니다."
      }
    }
    ```

### GET /crews/:crewId/members

- **Description**: 특정 크루의 멤버들을 조회합니다.
- **Query Parameters**:
  - `role`: 'leader' | 'staff' | 'member'
  - `page`: number
  - `limit`: number
- **Success Response**:
  - **Code**: 200 OK
  - **Body**: `Member[]`
- **Error Response**:
  - **Code**: 404 Not Found
  - **Body**:
    ```json
    {
      "error": {
        "message": "크루를 찾을 수 없습니다."
      }
    }
    ```

### PATCH /crews/:crewId

- **Description**: 크루 정보를 수정합니다. 크루장 또는 관리자 권한이 필요합니다.
- **Request Body**: `PostCrewsBody`
- **Success Response**:
  - **Code**: 200 OK
  - **Body**: `Crew`
- **Error Responses**:
  - **Code**: 400 Bad Request
  - **Body**:
    ```json
    {
      "error": {
        "message": "잘못된 요청입니다."
      }
    }
    ```
  - **Code**: 403 Forbidden
  - **Body**:
    ```json
    {
      "error": {
        "message": "권한이 없습니다."
      }
    }
    ```
  - **Code**: 404 Not Found
  - **Body**:
    ```json
    {
      "error": {
        "message": "크루를 찾을 수 없습니다."
      }
    }
    ```

### DELETE /crews/:crewId

- **Description**: 크루를 삭제합니다. 크루장 또는 관리자 권한이 필요합니다.
- **Success Response**:
  - **Code**: 200 OK
  - **Body**:
    ```json
    {
      "message": "크루가 성공적으로 삭제되었습니다."
    }
    ```
- **Error Responses**:
  - **Code**: 403 Forbidden
  - **Body**:
    ```json
    {
      "error": {
        "message": "권한이 없습니다."
      }
    }
    ```
  - **Code**: 404 Not Found
  - **Body**:
    ```json
    {
      "error": {
        "message": "크루를 찾을 수 없습니다."
      }
    }
    ```

## Reviews

### POST /reviews/:sessionId

- **Description**: 세션에 대한 리뷰를 작성합니다. 세션 참가자만 작성할 수 있습니다.
- **Request Body**:
  ```json
  {
    "description": "string",
    "rating": "number",
    "image": "string"
  }
  ```
- **Success Response**:
  - **Code**: 201 Created
  - **Body**: `Review`
- **Error Responses**:
  - **Code**: 400 Bad Request
  - **Body**:
    ```json
    {
      "error": {
        "message": "잘못된 요청입니다."
      }
    }
    ```
  - **Code**: 403 Forbidden
  - **Body**:
    ```json
    {
      "error": {
        "message": "권한이 없습니다."
      }
    }
    ```

### GET /reviews/:crewId

- **Description**: 특정 크루에 작성된 리뷰들을 조회합니다.
- **Success Response**:
  - **Code**: 200 OK
  - **Body**: `Review[]`
- **Error Response**:
  - **Code**: 404 Not Found
  - **Body**:
    ```json
    {
      "error": {
        "message": "리뷰를 찾을 수 없습니다."
      }
    }
    ```

### GET /reviews/:sessionId

- **Description**: 특정 세션에 작성된 리뷰들을 조회합니다.
- **Success Response**:
  - **Code**: 200 OK
  - **Body**: `Review[]`
- **Error Response**:
  - **Code**: 404 Not Found
  - **Body**:
    ```json
    {
      "error": {
        "message": "리뷰를 찾을 수 없습니다."
      }
    }
    ```

### GET /reviews/:userId

- **Description**: 특정 사용자가 작성한 리뷰들을 조회합니다.
- **Success Response**:
  - **Code**: 200 OK
  - **Body**: `Review[]`
- **Error Response**:
  - **Code**: 404 Not Found
  - **Body**:
    ```json
    {
      "error": {
        "message": "리뷰를 찾을 수 없습니다."
      }
    }
    ```

## Sessions

### GET /sessions

- **Description**: 세션 목록을 조회합니다.
- **Query Parameters**:
  - `page`: number
  - `limit`: number
  - `city`: string
  - `district`: string
  - `dateRange`: { from: string; to: string }
  - `timeRange`: { from: string; to: string }
  - `level`: '초급' | '중급' | '고급'
  - `status`: any
- **Success Response**:
  - **Code**: 200 OK
  - **Body**: `Session[]`

### POST /sessions

- **Description**: 새로운 세션을 생성합니다. 크루장 또는 관리자 권한이 필요합니다.
- **Request Body**:
  ```json
  {
    "crewId": "number",
    "userId": "number",
    "name": "string",
    "description": "string",
    "image": "string",
    "location": "string",
    "sessionAt": "string",
    "registerBy": "string",
    "level": "'초급' | '중급' | '고급'",
    "maxParticipantCount": "number"
  }
  ```
- **Success Response**:
  - **Code**: 201 Created
  - **Body**: `Session`
- **Error Responses**:
  - **Code**: 400 Bad Request
  - **Body**:
    ```json
    {
      "error": {
        "message": "잘못된 요청입니다."
      }
    }
    ```
  - **Code**: 403 Forbidden
  - **Body**:
    ```json
    {
      "error": {
        "message": "권한이 없습니다."
      }
    }
    ```

### GET /sessions/:sessionId

- **Description**: 세션 상세 정보를 조회합니다.
- **Success Response**:
  - **Code**: 200 OK
  - **Body**: `Session`
- **Error Response**:
  - **Code**: 404 Not Found
  - **Body**:
    ```json
    {
      "error": {
        "message": "세션을 찾을 수 없습니다."
      }
    }
    ```

### PATCH /sessions/:sessionId

- **Description**: 세션 정보를 수정합니다. 크루장 또는 관리자 권한이 필요합니다.
- **Request Body**:
  ```json
  {
    "name": "string",
    "description": "string",
    "image": "string",
    "city": "string",
    "district": "string",
    "sessionAt": "string",
    "registerBy": "string",
    "level": "'초급' | '중급' | '고급'"
  }
  ```
- **Success Response**:
  - **Code**: 200 OK
  - **Body**: `Session`
- **Error Responses**:
  - **Code**: 400 Bad Request
  - **Body**:
    ```json
    {
      "error": {
        "message": "잘못된 요청입니다."
      }
    }
    ```
  - **Code**: 403 Forbidden
  - **Body**:
    ```json
    {
      "error": {
        "message": "권한이 없습니다."
      }
    }
    ```
  - **Code**: 404 Not Found
  - **Body**:
    ```json
    {
      "error": {
        "message": "세션을 찾을 수 없습니다."
      }
    }
    ```

### DELETE /sessions/:sessionId

- **Description**: 세션을 삭제합니다. 크루장 또는 관리자 권한이 필요합니다.
- **Success Response**:
  - **Code**: 204 No Content
- **Error Responses**:
  - **Code**: 403 Forbidden
  - **Body**:
    ```json
    {
      "error": {
        "message": "권한이 없습니다."
      }
    }
    ```
  - **Code**: 404 Not Found
  - **Body**:
    ```json
    {
      "error": {
        "message": "세션을 찾을 수 없습니다."
      }
    }
    ```

### POST /sessions/:sessionId/register

- **Description**: 현재 사용자를 세션에 등록합니다. 크루 멤버만 등록할 수 있습니다.

### DELETE /sessions/:sessionId/register

- **Description**: 세션 등록을 취소합니다. 크루 멤버만 취소할 수 있습니다.
- **Success Response**:
  - **Code**: 200 OK
  - **Body**:
    ```json
    {
      "message": "세션 등록이 성공적으로 취소되었습니다."
    }
    ```
- **Error Responses**:
  - **Code**: 403 Forbidden
  - **Body**:
    ```json
    {
      "error": {
        "message": "권한이 없습니다."
      }
    }
    ```
  - **Code**: 404 Not Found
  - **Body**:
    ```json
    {
      "error": {
        "message": "세션을 찾을 수 없거나 등록된 사용자가 아닙니다."
      }
    }
    ```

## User

### GET /user/:userId

- **Description**: 사용자 프로필을 조회합니다.
- **Success Response**:
  - **Code**: 200 OK
  - **Body**: `Profile`
- **Error Response**:
  - **Code**: 404 Not Found
  - **Body**:
    ```json
    {
      "error": {
        "message": "사용자를 찾을 수 없습니다."
      }
    }
    ```

### PATCH /user/:userId

- **Description**: 사용자 프로필을 수정합니다. 본인만 수정할 수 있습니다.
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "image": "string",
    "introduction": "string",
    "city": "string",
    "district": "string",
    "level": "string"
  }
  ```
- **Success Response**:
  - **Code**: 200 OK
  - **Body**: `Profile`
- **Error Responses**:
  - **Code**: 400 Bad Request
  - **Body**:
    ```json
    {
      "error": {
        "message": "잘못된 요청입니다."
      }
    }
    ```
  - **Code**: 404 Not Found
  - **Body**:
    ```json
    {
      "error": {
        "message": "사용자를 찾을 수 없습니다."
      }
    }
    ```

### PUT /user/leave/

- **Description**: 크루를 탈퇴합니다.
- **Request Body**:
  ```json
  {
    "crewId": "string"
  }
  ```
- **Success Response**:
  - **Code**: 200 OK
  - **Body**:
    ```json
    {
      "message": "크루를 성공적으로 탈퇴했습니다."
    }
    ```
- **Error Responses**:
  - **Code**: 400 Bad Request
  - **Body**:
    ```json
    {
      "error": {
        "message": "잘못된 요청입니다."
      }
    }
    ```
  - **Code**: 404 Not Found
  - **Body**:
    ```json
    {
      "error": {
        "message": "크루를 찾을 수 없습니다."
      }
    }
    ```

### PUT /user/expel/

- **Description**: 크루에서 멤버를 추방합니다. 크루장만 수행할 수 있습니다.
- **Request Body**:
  ```json
  {
    "crewId": "string",
    "userId": "string"
  }
  ```
- **Success Response**:
  - **Code**: 200 OK
  - **Body**:
    ```json
    {
      "message": "멤버가 성공적으로 추방되었습니다."
    }
    ```
- **Error Responses**:
  - **Code**: 400 Bad Request
  - **Body**:
    ```json
    {
      "error": {
        "message": "잘못된 요청입니다."
      }
    }
    ```
  - **Code**: 404 Not Found
  - **Body**:
    ```json
    {
      "error": {
        "message": "사용자 또는 크루를 찾을 수 없습니다."
      }
    }
    ```

### PATCH /user/update/

- **Description**: 크루 멤버의 역할을 변경합니다. 크루장만 수행할 수 있습니다.
- **Request Body**:
  ```json
  {
    "crewId": "string",
    "userId": "string",
    "role": "string"
  }
  ```
- **Success Response**:
  - **Code**: 200 OK
  - **Body**:
    ```json
    {
      "message": "크루 멤버 역할이 성공적으로 업데이트되었습니다."
    }
    ```
- **Error Responses**:
  - **Code**: 400 Bad Request
  - **Body**:
    ```json
    {
      "error": {
        "message": "잘못된 요청입니다."
      }
    }
    ```
  - **Code**: 404 Not Found
  - **Body**:
    ```json
    {
      "error": {
        "message": "사용자 또는 크루를 찾을 수 없습니다."
      }
    }
    ```
