'use client';

import { useEffect, useRef, useState } from 'react';

export type ImageItem = {
  id: string;
  file: File;
  previewUrl: string;
};

type UseImagePickerOptions = {
  maxFiles: number;
  maxSizeMB: number;
  acceptMime?: string[]; // 예: ['image/jpeg','image/png','image/webp']
  initialUrl?: string | null;
};

const uid = () => crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;

export default function useImageUploader({
  maxFiles,
  maxSizeMB,
  acceptMime = ['image/jpeg', 'image/png', 'image/webp'],
  initialUrl,
}: UseImagePickerOptions) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [items, setItems] = useState<ImageItem[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const preview = items[0]?.previewUrl ?? initialUrl ?? '';
  const hasPreview = items.length > 0 || !!initialUrl;

  // preview url 정리 - blob URL 메모리 누수 방지
  useEffect(() => {
    return () => items.forEach((it) => URL.revokeObjectURL(it.previewUrl));
  }, [items]);

  const open = () => inputRef.current?.click();

  const validate = (file: File) => {
    if (!file.type.startsWith('image/'))
      return '이미지 파일만 업로드할 수 있어요.';
    if (acceptMime.length && !acceptMime.includes(file.type))
      return '허용되지 않은 이미지 형식이에요.';
    const maxBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxBytes)
      return `${maxSizeMB}MB 이하만 업로드할 수 있어요.`;
    return null;
  };

  const addFiles = (fileList: FileList | null, mode: 'replace' | 'append') => {
    if (!fileList) return;

    const nextErrors: string[] = [];
    const picked = Array.from(fileList);

    const valid: ImageItem[] = [];
    for (const f of picked) {
      const err = validate(f);
      if (err) {
        nextErrors.push(`${f.name}: ${err}`);
        continue;
      }
      valid.push({ id: uid(), file: f, previewUrl: URL.createObjectURL(f) });
    }

    setErrors(nextErrors);

    setItems((prev) => {
      const base = mode === 'replace' ? [] : prev;
      const merged = [...base, ...valid].slice(0, maxFiles);
      return merged;
    });

    // if (inputRef.current) inputRef.current.value = '';
  };

  const remove = (id: string) => {
    setItems((prev) => {
      const t = prev.find((x) => x.id === id);
      if (t) URL.revokeObjectURL(t.previewUrl);
      return prev.filter((x) => x.id !== id);
    });
  };

  const clear = () => {
    items.forEach((it) => URL.revokeObjectURL(it.previewUrl));
    setItems([]);
  };

  const acceptAttr = acceptMime.length ? acceptMime.join(',') : 'image/*';

  return {
    inputRef,
    items,
    preview,
    hasPreview,
    setItems,
    errors,
    open,
    addFiles,
    remove,
    clear,
    acceptAttr,
  };
}
