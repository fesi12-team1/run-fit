import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';
import React, { useMemo, useState } from 'react';
import CoverImageUploader from './CoverImageUploader';
import ReviewImagesUploader from './ReviewImageUploader';
import uploadImage from './UploadImage';

function Providers({ children }: { children: React.ReactNode }) {
  const qc = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { retry: false },
          mutations: { retry: false },
        },
      }),
    []
  );

  return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
}

/** ✅ presign + storage PUT mock (Storybook용) */
const mswHandlers = [
  http.post('/api/uploads/presign', async () => {
    const id = crypto.randomUUID();

    return HttpResponse.json({
      success: true,
      data: {
        uploadUrl: `https://mock-storage.local/upload/${id}`,
        publicUrl: `https://cdn.mock.local/images/${id}`,
      },
    });
  }),

  // uploadViaPresignedUrl()에서 XHR PUT 쏘는 URL
  http.put('https://mock-storage.local/upload/:id', async () => {
    // 업로드 지연 시뮬레이션(원하면)
    await new Promise((r) => setTimeout(r, 300));
    return new HttpResponse(null, { status: 200 });
  }),
];

const meta: Meta = {
  title: 'UI/ImageUploader',
  parameters: {
    layout: 'centered',
    msw: { handlers: mswHandlers },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 420 }}>
        <Providers>
          <Story />
        </Providers>
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj;

/** -----------------------
 * Cover (선택 즉시 업로드)
 * ---------------------- */
function CoverDemo() {
  const [url, setUrl] = useState<string | undefined>(undefined);

  const upload = useMutation({
    mutationFn: async (file: File) => uploadImage(file),
    onSuccess: (res) => setUrl(res.url),
  });

  return (
    <div style={{ width: 420 }}>
      <CoverImageUploader
        onChange={(file) => {
          if (!file) return;
          upload.mutate(file);
        }}
      />
      <div style={{ marginTop: 8, fontSize: 12, opacity: 0.8 }}>
        <div>status: {upload.status}</div>
        {url && <div style={{ wordBreak: 'break-all' }}>url: {url}</div>}
      </div>
    </div>
  );
}

export const Cover: Story = {
  render: () => <CoverDemo />,
};

/** -----------------------
 * Review (선택만 / 업로드 버튼 따로)
 * ---------------------- */
function ReviewDemo() {
  const [files, setFiles] = useState<File[]>([]);
  const [urls, setUrls] = useState<string[]>([]);

  const uploadAll = useMutation({
    mutationFn: async () => {
      const results: string[] = [];
      for (const f of files) {
        const res = await uploadImage(f);
        results.push(res.url);
      }
      return results;
    },
    onSuccess: (res) => setUrls(res),
  });

  return (
    <div>
      <ReviewImagesUploader
        maxFiles={6}
        onChange={(picked) => {
          setFiles(picked ? [picked] : []);
        }}
      />

      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button
          type="button"
          onClick={() => uploadAll.mutate()}
          disabled={files.length === 0 || uploadAll.isPending}
        >
          업로드
        </button>
        <span style={{ fontSize: 12, opacity: 0.8 }}>
          status: {uploadAll.status}
        </span>
      </div>

      {urls.length > 0 && (
        <ul style={{ marginTop: 8, fontSize: 12 }}>
          {urls.map((u) => (
            <li key={u} style={{ wordBreak: 'break-all' }}>
              {u}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export const ReviewImages: Story = {
  render: () => <ReviewDemo />,
};
