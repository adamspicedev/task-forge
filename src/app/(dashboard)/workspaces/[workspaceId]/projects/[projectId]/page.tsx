import { redirect } from "next/navigation";

import { protectPage } from "@/features/auth/queries";

import ProjectIdClient from "./client";

export default async function ProjectPage() {
  const user = await protectPage();
  if (!user) redirect("/sign-in");

  return <ProjectIdClient />;
}
