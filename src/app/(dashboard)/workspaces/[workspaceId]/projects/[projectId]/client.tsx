"use client";

import Link from "next/link";

import { Pencil1Icon } from "@radix-ui/react-icons";

import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";
import { Button } from "@/components/ui/button";
import { useGetProject } from "@/features/projects/api/use-get-project";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { useProjectId } from "@/features/projects/hooks/use-project-id";
import TaskViewSwitcher from "@/features/tasks/components/task-view-switcher";

export default function ProjectIdClient() {
  const projectId = useProjectId();
  const { data: project, isLoading, error } = useGetProject({ projectId });

  if (isLoading) return <PageLoader />;

  if (error) return <PageError message="Task not found" />;

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <ProjectAvatar
            name={project!.name}
            image={project!.image}
            className="size-8"
          />
          <p className="text-lg font-semibold">{project!.name}</p>
        </div>
        <div className="flex items-center gap-x-2">
          <Button variant="secondary" asChild size="sm">
            <Link
              href={`/workspaces/${project!.workspaceId}/projects/${project!.$id}/settings`}
            >
              <Pencil1Icon className="mr-2 size-4" />
              Edit Project
            </Link>
          </Button>
        </div>
      </div>
      <TaskViewSwitcher hideProjectFilter={true} defaultProjectId={projectId} />
    </div>
  );
}
