'use client';

import Link from 'next/link';
import { useSyncExternalStore } from 'react';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { signInModal } from '@/store/signinModal';

export default function SigninModalProvider() {
  const isOpen = useSyncExternalStore(
    signInModal.subscribe,
    signInModal.getState
  );

  return (
    <Modal open={isOpen} onOpenChange={(open) => !open && signInModal.close()}>
      <Modal.Content className="flex h-[200px] w-[360px] flex-col gap-7">
        <Modal.Title />
        <Modal.CloseButton onClick={() => signInModal.close()} />
        <Modal.Description>
          세션을 찜하려면 로그인이 필요해요!
        </Modal.Description>
        <Modal.Footer>
          <Modal.Close asChild>
            <Button asChild>
              <Link href={`/signin`}>로그인하러 가기</Link>
            </Button>
          </Modal.Close>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
