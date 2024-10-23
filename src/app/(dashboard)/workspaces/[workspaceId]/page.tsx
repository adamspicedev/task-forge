import { redirect } from "next/navigation";

import { protectPage } from "@/features/auth/queries";

import WorkspaceIdClient from "./client";

export default async function WorkspaceIdPage() {
  const user = await protectPage();
  if (!user) redirect("/sign-in");

  return <WorkspaceIdClient />;
}
