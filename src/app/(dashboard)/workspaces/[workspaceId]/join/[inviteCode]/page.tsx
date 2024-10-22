import { redirect } from "next/navigation";

import { protectPage } from "@/features/auth/queries";

import JoinWorkspacePageClient from "./client";

export default async function JoinWorkspacePage() {
  const user = await protectPage();
  if (!user) redirect("/sign-in");

  return <JoinWorkspacePageClient />;
}
