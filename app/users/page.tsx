"use client";

import { signOut } from "next-auth/react";

export default function User() {
  return (
    <div>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}
