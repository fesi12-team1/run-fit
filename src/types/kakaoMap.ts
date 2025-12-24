export type Coords = {
  lat: number;
  lng: number;
};

// https://developers.kakao.com/docs/latest/ko/local/dev-guide#address-coord-response-body-document
export type Document = {
  x: string; // 경도, longitude
  y: string; // 위도, latitude
};
