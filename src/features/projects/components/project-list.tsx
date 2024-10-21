"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { RiAddCircleFill } from "react-icons/ri";

import { Skeleton } from "@/components/ui/skeleton";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { cn } from "@/lib/utils";

import { useCreateProjectModal } from "../hooks/use-create-project-modal";
import { ProjectAvatar } from "./project-avatar";

export function Projects() {
  const workspaceId = useWorkspaceId();
  const { data: projects, isPending } = useGetProjects(workspaceId);
  const pathname = usePathname();
  const { open } = useCreateProjectModal();

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Projects</p>
        <RiAddCircleFill
          onClick={() => open()}
          className="size-5 cursor-pointer text-neutral-500 transition hover:opacity-75"
        />
      </div>
      {isPending ? (
        <div className="space-y-2">
          {[1, 2, 3, 4].map((_, index) => (
            <Skeleton className="h-8 w-[200px]" key={index} />
          ))}
        </div>
      ) : projects?.documents.length === 0 ? (
        <p className="text-sm text-neutral-500">
          There are no projects yet. Create one to get started.
        </p>
      ) : (
        projects?.documents.map((project) => {
          const href = `/workspaces/${workspaceId}/projects/${project.$id}`;
          const isActive = pathname === href;

          return (
            <Link href={{ pathname: href }} key={project.$id}>
              <div
                className={cn(
                  "flex cursor-pointer items-center gap-2.5 rounded-md text-neutral-500 transition hover:opacity-75",
                  isActive &&
                    "bg-white text-primary shadow-sm hover:opacity-100"
                )}
              >
                <ProjectAvatar
                  image={project.image}
                  name={project.name}
                  fallbackClassName="bg-neutral-200"
                />
                <span className="truncate">{project.name}</span>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
}
