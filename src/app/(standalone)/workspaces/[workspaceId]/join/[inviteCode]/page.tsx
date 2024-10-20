import { redirect } from "next/navigation";

import { protectPage } from "@/features/auth/queries";
import { JoinWorkspaceForm } from "@/features/workspaces/components/join-workspace-form";
import { getWorkspaceInfo } from "@/features/workspaces/queries";

interface JoinWorkspacePageProps {
  params: { workspaceId: string };
}

export default async function JoinWorkspacePage({
  params,
}: JoinWorkspacePageProps) {
  const user = await protectPage();
  if (!user) redirect("/sign-in");

  const initialValues = await getWorkspaceInfo(params.workspaceId);

  if (!initialValues) redirect(`/workspaces/${params.workspaceId}`);

  return (
    <div className="w-full lg:max-w-xl">
      <JoinWorkspaceForm initialValues={initialValues} />
    </div>
  );
}
