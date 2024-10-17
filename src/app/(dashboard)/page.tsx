import { redirect } from "next/navigation";

import { protectPage } from "@/features/auth/actions";

export default async function Home() {
  const user = await protectPage();
  if (!user) redirect("/sign-in");

  return (
    <div>
      <h1>This is the home page</h1>
    </div>
  );
}
