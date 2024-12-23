'use client';

import { UserProfile } from '@clerk/nextjs';

export default function ProfilePage() {
  return (
    <div className="flex flex-col justify-start items-center w-[100%] h-[100%]">
      <UserProfile />
    </div>
  );
}
