import { Crew, PaginationQueryParams } from '@/types';

type GetCrewsQueryParams = {
  sort?: string;
  city?: string;
  district?: string;
} & PaginationQueryParams;
export function getCrews(queryParams?: GetCrewsQueryParams) {
  // GET /crews?queryParams
  // queryParams: {
  //   sort?: string,
  //   page?: number,
  //   limit?: number,
  //   city?: string,
  //   district?: string
  // }
  // 성공시
  // response: 200 OK
  // body: Member[]
}

type CreateCrewBody = Pick<
  Crew,
  'name' | 'description' | 'city' | 'district' | 'image'
>;
export function createCrew(body: CreateCrewBody) {
  // POST /crews
  // body: { name, description, city, district, image }
  // 성공시
  // response: 201 Created
  // body: Crew
  // 실패시
  // response: 400 Bad Request
  // body: { error.message: "<에러 메시지>" }
}

export function getCrewById(crewId: string) {
  // GET /crews/:crewId
  // 성공시
  // response: 200 OK
  // body: Crew
  // 실패시
  // response: 404 Not Found
  // body: { error.message: "<에러 메시지>" }
}


type GetCrewMembersQueryParams = {
  role?: 'leader' | 'staff' | 'general';
} & PaginationQueryParams;
export function getCrewMembersById(
  crewId: string,
  queryParams?: GetCrewMembersQueryParams
) {
  // GET /crews/:crewId/members?queryParams
  // queryParams: {
  //   role?: 'leader' | 'staff' | 'member',
  //   page?: number,
  //   limit?: number
  // }
  // 성공시
  // response: 200 OK
  // body: Member[] <- leader라도 배열로 반환
  // 실패시
  // response: 404 Not Found
  // body: { error.message: "<에러 메시지>" }
}

/**
 * 아래 함수들은 getCrewMembersById로 대체 가능
export function getCrewLeadersById(crewId: string) {
  // GET /crews/:crewId/members/leaders
}
export function getCrewStaffsById(crewId: string) {
  // GET /crews/:crewId/members/staffs
}
export function getCrewMembersById(crewId: string) {
  // GET /crews/:crewId/members/general
}
*/

type PostCrewsBody = Pick<
  Crew,
  'name' | 'description' | 'city' | 'district' | 'image'
>;
export function updateCrewDetail(crewId: string, body: PostCrewsBody) {
  // PATCH /crews/:crewId
  // 권한: 크루장 또는 관리자 권한 필요
  // 성공시
  // response: 200 OK
  // body: Crew
  // 실패시
  // response: 400 Bad Request | 4권4 Not Found | 403 Forbidden
  // body: { error.message: "<에러 메시지>" }
}

export function deleteCrew(crewId: string) {
  // DELETE /crews/:crewId
  // 권한: 크루장 또는 관리자 권한 필요
  // 성공시
  // response: 200 OK
  // body: { message: "Crew deleted successfully" }
  // 실패시
  // response: 404 Not Found | 403 Forbidden
  // body: { error.message: "<에러 메시지>" }
}
