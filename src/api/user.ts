// TODO: 실패 시나리오 별 다른 에러 메시지 필요
export function getUserProfileById(userId: string) {
  // GET /user/:userId
  // 성공시
  // response: 200 OK
  // body: Profile
  // 실패시
  // response: 404 Not Found
  // body: { error.message: "<에러 메시지>" }
}

export function updateUserProfileById(userId: string, body: any) {
  // PATCH /user/:userId
  // body: { name, email, image, introduction, city, district, level }
  // 권한 필요: 본인만 가능
  // 성공시
  // response: 200 OK
  // body: Profile
  // 실패시
  // response: 400 Bad Request | 404 Not Found
  // body: { error.message: "<에러 메시지>" }
}

export function leaveCrew(crewId: string) {
  // PUT /user/leave/:crewId
  // 권한: 본인만 가능
  // 성공시
  // response: 200 OK
  // body: { message: "Successfully left the crew" }
  // 실패시
  // response: 400 Bad Request | 404 Not Found
  // body: { error.message: "<에러 메시지>" }
}

export function expelMember(body: { crewId: string; userId: string }) {
  // PUT /user/expel/
  // body: { crewId, userId }
  // 권한: user가 crew의 leader일 때만 가능
  // 성공시
  // response: 200 OK
  // body: { message: "Successfully expelled the member" }
  // 실패시
  // response: 400 Bad Request | 404 Not Found
  // body: { error.message: "<에러 메시지>" }
}

export function updateMemberRole(body: {
  crewId: string;
  userId: string;
  role: string;
}) {
  // PATCH /user/update/
  // body: { crewId, userId, role }
  // user가 crew의 leader일 때만 가능
  // 성공시
  // response: 200 OK
  // body: { message: "Successfully updated the member role" }
  // 실패시
  // response: 400 Bad Request | 404 Not Found
  // body: { error.message: "<에러 메시지>" }
}
