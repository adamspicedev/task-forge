import { redirect } from "next/navigation";

import { protectPage } from "@/features/auth/queries";
import { MembersList } from "@/features/members/components/members-list";

export default async function MembersPage() {
  const user = await protectPage();
  if (!user) redirect("/sign-in");

  return (
    <div className="w-full max-w-xl">
      <MembersList />
    </div>
  );
}
