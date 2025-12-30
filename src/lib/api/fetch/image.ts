import request from './request';

export type GetPresignedUrlRequest = {
  imageName: string; // ex) 'cover.png', 'review.jpg'
};

export type GetPresignedUrlResponse = {
  presignedUrl: string; // PUT 요청을 통해 이미지를 업로드할 주소
  imageUrl: string; // 이미지 업로드 이후 이미지 사용을 위한 public URL
};

export type GetPresignedUrlResult = GetPresignedUrlResponse;
export async function getPresignedUrl(body: GetPresignedUrlRequest) {
  return request<GetPresignedUrlResult>(`/api/images/presigned-url`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

export type UploadToPresignedUrlParams = {
  uploadUrl: string;
  file: File | Blob;
  contentType?: string;
};

export type UploadToPresignedUrlResponse = {
  etag: string | null;
  status: number;
};

export async function uploadToPresignedUrl({
  uploadUrl,
  file,
  contentType,
}: UploadToPresignedUrlParams): Promise<UploadToPresignedUrlResponse> {
  const response = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type':
        contentType ??
        (file instanceof File ? file.type : 'application/octet-stream'),
    },
    body: file,
  });

  // presigned 업로드는 백엔드 서버 API가 아니라서 request()를 사용 불가
  if (!response.ok) {
    throw new Error('이미지 업로드에 실패했습니다.');
  }

  return {
    etag: response.headers.get('ETag'),
    status: response.status,
  };
}
