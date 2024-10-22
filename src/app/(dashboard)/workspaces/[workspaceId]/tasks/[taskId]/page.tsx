import { redirect } from "next/navigation";

import { protectPage } from "@/features/auth/queries";

import TaskIdClient from "./client";

export default async function TaskIdPage() {
  const user = await protectPage();
  if (!user) redirect("/sign-in");

  return <TaskIdClient />;
}
