import Link from "next/link";

import { DottedSeparator } from "./dotted-separator";
import { Logo } from "./logo";
import { Navigation } from "./navigation";

export function Sidebar() {
  return (
    <aside className="h-full w-full bg-neutral-100 p-4">
      <Link href="/">
        <Logo />
      </Link>
      <DottedSeparator className="my-4" />
      <Navigation />
    </aside>
  );
}
