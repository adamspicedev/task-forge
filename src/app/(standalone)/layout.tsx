import Link from "next/link";

import { Logo } from "@/components/logo";
import { UserButton } from "@/features/auth/components/user-button";

export default function StandaloneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-neutral-100">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex h-[73px] items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>
          <UserButton />
        </nav>
        <div className="flex flex-col items-center justify-center py-4">
          {children}
        </div>
      </div>
    </main>
  );
}
