import { redirect } from "next/navigation";

import { protectPage } from "@/features/auth/queries";
import { UpdateProjectForm } from "@/features/projects/components/update-project-form";
import { getProject } from "@/features/projects/queries";

interface ProjectSettingsPageProps {
  params: { projectId: string };
}

export default async function ProjectSettingsPage({
  params,
}: ProjectSettingsPageProps) {
  const user = await protectPage();
  if (!user) redirect("/sign-in");

  const initialValues = await getProject({ projectId: params.projectId });

  return (
    <div className="w-full max-w-xl">
      <UpdateProjectForm initialValues={initialValues} />
    </div>
  );
}
