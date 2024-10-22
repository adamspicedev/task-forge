"use client";

import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";
import { useGetProject } from "@/features/projects/api/use-get-project";
import { UpdateProjectForm } from "@/features/projects/components/update-project-form";
import { useProjectId } from "@/features/projects/hooks/use-project-id";

export default function ProjectSettingsClient() {
  const projectId = useProjectId();

  const {
    data: initialValues,
    isLoading,
    error,
  } = useGetProject({ projectId });

  if (isLoading) return <PageLoader />;

  if (error) return <PageError message="Project not found" />;

  if (!initialValues) return <PageError message="Project not found" />;

  return (
    <div className="w-full max-w-xl">
      <UpdateProjectForm initialValues={initialValues} />
    </div>
  );
}
