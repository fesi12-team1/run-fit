import { getPresignedUrl } from '@/api/fetch/image';

export default async function uploadImage(
  file: File,
  opts?: { onProgress?: (pct: number) => void }
): Promise<{ url: string }> {
  const { presignedUrl, imageUrl } = await getPresignedUrl({
    imageName: file.name,
  });

  // 2) PUT 업로드 (XHR로 progress)
  await new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', presignedUrl);

    xhr.setRequestHeader('Content-Type', file.type);

    xhr.upload.onprogress = (e) => {
      if (!e.lengthComputable) return;
      const pct = Math.round((e.loaded / e.total) * 100);
      opts?.onProgress?.(pct);
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) resolve();
      else reject(new Error(`upload failed: ${xhr.status}`));
    };

    xhr.onerror = () => reject(new Error('upload network error'));
    xhr.send(file);
  });

  return { url: imageUrl };
}
