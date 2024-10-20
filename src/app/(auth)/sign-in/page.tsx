import { redirect } from "next/navigation";

import { SignInCard } from "@/features/auth/components/sign-in-card";
import { protectPage } from "@/features/auth/queries";

export default async function SignInPage() {
  const user = await protectPage();
  if (user) redirect("/");

  return <SignInCard />;
}
