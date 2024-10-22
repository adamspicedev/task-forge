"use client";

import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { UpdateWorkspaceForm } from "@/features/workspaces/components/update-workspace-form";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

export default function WorkspaceIdSettingsClient() {
  const workspaceId = useWorkspaceId();
  const {
    data: workspace,
    isLoading,
    error,
  } = useGetWorkspace({ workspaceId });

  if (isLoading) return <PageLoader />;

  if (error) return <PageError message="Task not found" />;

  if (!workspace) return <PageError message="Workspace not found" />;

  return (
    <div className="w-full max-w-xl">
      <UpdateWorkspaceForm initialValues={workspace} />
    </div>
  );
}
