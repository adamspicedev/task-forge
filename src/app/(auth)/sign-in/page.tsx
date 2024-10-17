import { redirect } from "next/navigation";

import { protectPage } from "@/features/auth/actions";
import { SignInCard } from "@/features/auth/components/sign-in-card";

export default async function SignInPage() {
  const user = await protectPage();

  if (user) redirect("/");

  return <SignInCard />;
}
