'use client';

import SessionInfo from '../session/SessionInfo';
import Avatar from '../ui/Avatar';

// interface SessionCardProps {
//   data: Session;
// }

// export default function SessionCard({ data }: SessionCardProps) {
export default function ReviewCard() {
  return (
    <li className="flex flex-col gap-2">
      <div>stars</div>
      <div>
        러닝 너무 재미있었어요 :) 평소에 이용해보고 싶었는데 이렇게 러닝 세션
        생기니까 너무 좋아요! 프로그램이 더 많이 늘어났으면 좋겠어요.
      </div>
      <div className="flex gap-2">
        <Avatar>
          <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
          <Avatar.Fallback>CN</Avatar.Fallback>
        </Avatar>
        <div>럽윈즈올</div>
        <div>| </div>
        <div>2025.12.25</div>
      </div>
      <SessionInfo />
    </li>
  );
}
