"use client";

import Link from "next/link";

import { formatDistanceToNow } from "date-fns";
import { CalendarIcon, DotIcon, PlusIcon, SettingsIcon } from "lucide-react";

import { Analytics } from "@/components/analytics";
import { DottedSeparator } from "@/components/dotted-separator";
import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import { Member } from "@/features/members/types";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal";
import { Project } from "@/features/projects/types";
import { useGetTasks } from "@/features/tasks/api/use-get-tasks";
import { useCreateTaskModal } from "@/features/tasks/hooks/use-create-task-modal";
import { Task } from "@/features/tasks/types";
import { useGetWorkspaceAnalytics } from "@/features/workspaces/api/use-get-workspace-analytics";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

export default function WorkspaceIdClient() {
  const workspaceId = useWorkspaceId();
  const {
    data: analytics,
    isLoading: analyticsIsLoading,
    error: analyticsError,
  } = useGetWorkspaceAnalytics({ workspaceId });
  const {
    data: tasks,
    isLoading: tasksIsLoading,
    error: tasksError,
  } = useGetTasks({ workspaceId });
  const {
    data: projects,
    isLoading: projectsIsLoading,
    error: projectsError,
  } = useGetProjects({ workspaceId });
  const {
    data: members,
    isLoading: membersIsLoading,
    error: membersError,
  } = useGetMembers({ workspaceId });

  const isLoading =
    analyticsIsLoading ||
    tasksIsLoading ||
    projectsIsLoading ||
    membersIsLoading;

  const hasError =
    analyticsError || tasksError || projectsError || membersError;

  if (isLoading) return <PageLoader />;

  if (hasError) return <PageError message="Task not found" />;

  if (!analytics || !tasks || !projects || !members)
    return <PageError message="failed to load workspace data" />;

  return (
    <div className="flex w-full flex-col space-y-4">
      <Analytics data={analytics} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <TaskList
          tasks={tasks.documents}
          totalTasks={tasks.total}
          workspaceId={workspaceId}
        />
        <ProjectList
          projects={projects.documents}
          totalProjects={projects.total}
          workspaceId={workspaceId}
        />
        <MembersList
          members={members.documents}
          totalMembers={members.total}
          workspaceId={workspaceId}
        />
      </div>
    </div>
  );
}

interface TaskListProps {
  tasks: Task[];
  totalTasks: number;
  workspaceId: string;
}

function TaskList({ tasks, totalTasks, workspaceId }: TaskListProps) {
  const { open } = useCreateTaskModal();

  return (
    <div className="col-span-1 flex flex-col gap-y-4">
      <div className="rounded-lg bg-muted p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-medium">Tasks {totalTasks}</p>
          <Button variant="muted" size="icon" onClick={open}>
            <PlusIcon className="size-4 text-neutral-400" />
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <ul className="flex flex-col gap-y-4">
          {tasks.map((task) => (
            <li key={task.id}>
              <Link
                href={`/workspaces/${workspaceId}/tasks/${task.$id}`}
                className="text-sm font-medium"
              >
                <Card className="rounded-lg shadow-none transition hover:opacity-75">
                  <CardContent className="p-4">
                    <p className="truncate text-lg font-medium">{task.name}</p>
                    <div className="flex items-center gap-x-2">
                      <p className="text-sm text-neutral-500">
                        {task.project?.name}
                      </p>
                      <DotIcon className="size-4 rounded-full text-neutral-300" />
                      <div className="flex items-center gap-x-1 text-sm text-muted-foreground">
                        <CalendarIcon className="size-3.5" />
                        <span className="truncate">
                          {formatDistanceToNow(new Date(task.dueDate))}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
          <li className="hidden text-center text-sm text-muted-foreground first-of-type:block">
            No tasks found
          </li>
        </ul>
        <Button variant="muted" className="mt-4 w-full" asChild>
          <Link href={`/workspaces/${workspaceId}/tasks`}>Show All</Link>
        </Button>
      </div>
    </div>
  );
}

interface ProjectListProps {
  projects: Project[];
  totalProjects: number;
  workspaceId: string;
}

function ProjectList({
  projects,
  totalProjects,
  workspaceId,
}: ProjectListProps) {
  const { open } = useCreateProjectModal();

  return (
    <div className="col-span-1 flex flex-col gap-y-4">
      <div className="rounded-lg border bg-white p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-medium">Projects {totalProjects}</p>
          <Button variant="secondary" size="icon" onClick={open}>
            <PlusIcon className="size-4 text-neutral-400" />
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {projects.map((project) => (
            <li key={project.id}>
              <Link
                href={`/workspaces/${workspaceId}/projects/${project.$id}`}
                className="text-sm font-medium"
              >
                <Card className="rounded-lg shadow-none transition hover:opacity-75">
                  <CardContent className="flex items-center gap-x-2.5 p-4">
                    <ProjectAvatar name={project.name} image={project.image} />
                    <p className="truncate text-lg font-medium">
                      {project.name}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
          <li className="hidden text-center text-sm text-muted-foreground first-of-type:block">
            No projects found
          </li>
        </ul>
      </div>
    </div>
  );
}

interface MembersListProps {
  members: Member[];
  totalMembers: number;
  workspaceId: string;
}

function MembersList({ members, totalMembers, workspaceId }: MembersListProps) {
  return (
    <div className="col-span-1 flex flex-col gap-y-4">
      <div className="rounded-lg border bg-white p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-medium">Members {totalMembers}</p>
          <Button asChild variant="secondary" size="icon">
            <Link href={`/workspaces/${workspaceId}/members`}>
              <SettingsIcon className="size-4 text-neutral-400" />
            </Link>
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <li key={member.id}>
              <Card className="overflow-hidden rounded-lg shadow-none">
                <CardContent className="flex items-center gap-x-2 p-3">
                  <MemberAvatar name={member.name} className="size-12" />
                  <div className="flex flex-col items-center overflow-hidden">
                    <p className="line-clamp-1 text-lg font-medium">
                      {member.name}
                    </p>
                    <p className="line-clamp-1 text-sm text-muted-foreground">
                      {member.email}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
          <li className="hidden text-center text-sm text-muted-foreground first-of-type:block">
            No members found
          </li>
        </ul>
      </div>
    </div>
  );
}
