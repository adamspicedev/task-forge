import { redirect } from "next/navigation";

import { protectPage } from "@/features/auth/queries";

import WorkspaceIdSettingsClient from "./client";

export default async function WorkspaceIdSettingsPage() {
  const user = await protectPage();
  if (!user) redirect("/sign-in");

  return <WorkspaceIdSettingsClient />;
}
