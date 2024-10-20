import { redirect } from "next/navigation";

import { protectPage } from "@/features/auth/queries";
import { UpdateWorkspaceForm } from "@/features/workspaces/components/update-workspace-form";
import { getWorkspace } from "@/features/workspaces/queries";

interface WorkspaceIdSettingsPageProps {
  params: { workspaceId: string };
}

export default async function WorkspaceIdSettingsPage({
  params,
}: WorkspaceIdSettingsPageProps) {
  const user = await protectPage();
  if (!user) redirect("/sign-in");

  const initialValues = await getWorkspace(params.workspaceId);
  if (!initialValues) redirect(`/workspaces/${params.workspaceId}`);

  return (
    <div className="w-full max-w-xl">
      <UpdateWorkspaceForm initialValues={initialValues} />
    </div>
  );
}
