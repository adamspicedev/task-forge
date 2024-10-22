import { redirect } from "next/navigation";

import { protectPage } from "@/features/auth/queries";

import ProjectSettingsClient from "./client";

export default async function ProjectSettingsPage() {
  const user = await protectPage();
  if (!user) redirect("/sign-in");

  return <ProjectSettingsClient />;
}
