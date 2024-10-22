import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";
import { useGetWorkspaceInfo } from "@/features/workspaces/api/use-get-workspace-info";
import { JoinWorkspaceForm } from "@/features/workspaces/components/join-workspace-form";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

export default function JoinWorkspacePageClient() {
  const workspaceId = useWorkspaceId();
  const {
    data: initialValues,
    isLoading,
    error,
  } = useGetWorkspaceInfo({ workspaceId });

  if (isLoading) return <PageLoader />;

  if (error) return <PageError message="Project not found" />;

  if (!initialValues) return <PageError message="Project not found" />;
  return (
    <div className="w-full lg:max-w-xl">
      <JoinWorkspaceForm initialValues={initialValues} />
    </div>
  );
}
