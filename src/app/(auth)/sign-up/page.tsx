import { redirect } from "next/navigation";

import { SignUpCard } from "@/features/auth/components/sign-up-card";
import { protectPage } from "@/features/auth/queries";

export default async function SignUpPage() {
  const user = await protectPage();
  if (user) redirect("/");

  return <SignUpCard />;
}
