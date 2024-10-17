import { redirect } from "next/navigation";

import { protectPage } from "@/features/auth/actions";
import { SignUpCard } from "@/features/auth/components/sign-up-card";

export default async function SignUpPage() {
  const user = await protectPage();

  if (user) redirect("/");

  return <SignUpCard />;
}
