"use client";

import { useEffect } from "react";

import { FolderIcon, ListCheckIcon, UserIcon } from "lucide-react";

import { DatePicker } from "@/components/date-picker";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { cn } from "@/lib/utils";

import { useTaskFilters } from "../hooks/use-task-filters";
import { TaskStatus } from "../types";
import { toPrettyTaskStatus } from "../utils";

interface DataFiltersProps {
  hideProjectFilter?: boolean;
  defaultProjectId?: string;
  defaultAssigneeId?: string;
}

export function DataFilters({
  hideProjectFilter,
  defaultProjectId,
  defaultAssigneeId,
}: DataFiltersProps) {
  const workspaceId = useWorkspaceId();
  const { data: projects, isLoading: isLoadingProjects } = useGetProjects({
    workspaceId,
  });
  const { data: members, isLoading: isLoadingMembers } = useGetMembers({
    workspaceId,
  });
  const isLoading = isLoadingProjects || isLoadingMembers;

  const projectOptions = projects?.documents.map((project) => ({
    label: project.name,
    value: project.$id,
  }));
  const memberOptions = members?.documents.map((member) => ({
    label: member.name,
    value: member.$id,
  }));

  const [
    { projectId, status, assigneeId, search: _search, dueDate },
    setTaskFilters,
  ] = useTaskFilters();

  const onStatusChange = (value: string) => {
    setTaskFilters({ status: value === "all" ? null : (value as TaskStatus) });
  };
  const onAssigneeChange = (value: string) => {
    setTaskFilters({ assigneeId: value === "all" ? null : value });
  };
  const onProjectChange = (value: string) => {
    setTaskFilters({ projectId: value === "all" ? null : value });
  };

  useEffect(() => {
    if (defaultProjectId) {
      setTaskFilters({ projectId: defaultProjectId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultProjectId]);

  useEffect(() => {
    if (defaultAssigneeId) {
      setTaskFilters({ assigneeId: defaultAssigneeId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultAssigneeId]);

  if (isLoading) return null;

  return (
    <div className="flex flex-col gap-2 lg:flex-row">
      <Select defaultValue={status ?? undefined} onValueChange={onStatusChange}>
        <SelectTrigger className="h-8 w-full lg:w-auto">
          <div className="flex items-center pr-2">
            <ListCheckIcon className="mr-2 size-4" />
            <SelectValue placeholder="All statuses" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          <SelectSeparator />
          {Object.values(TaskStatus).map((status) => (
            <SelectItem key={status} value={status}>
              {toPrettyTaskStatus(status)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        defaultValue={
          defaultAssigneeId ? defaultAssigneeId : (assigneeId ?? undefined)
        }
        onValueChange={onAssigneeChange}
      >
        <SelectTrigger className="h-8 w-full lg:w-auto">
          <div className="flex items-center pr-2">
            <UserIcon className="mr-2 size-4" />
            <SelectValue placeholder="All assignees" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All assignees</SelectItem>
          <SelectSeparator />
          {memberOptions?.map((member) => (
            <SelectItem key={member.value} value={member.value}>
              {member.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {!hideProjectFilter && (
        <Select
          defaultValue={
            defaultProjectId ? defaultProjectId : (projectId ?? undefined)
          }
          onValueChange={onProjectChange}
        >
          <SelectTrigger className={cn("h-8 w-full lg:w-auto")}>
            <div className="flex items-center pr-2">
              <FolderIcon className="mr-2 size-4" />
              <SelectValue placeholder="All projects" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All projects</SelectItem>
            <SelectSeparator />
            {projectOptions?.map((project) => (
              <SelectItem key={project.value} value={project.value}>
                {project.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      <div className="flex flex-row items-center gap-x-1">
        <DatePicker
          placeholder="Due date"
          className="h-8 w-full flex-1 lg:w-auto"
          value={dueDate ? new Date(dueDate) : undefined}
          onChange={(date) =>
            setTaskFilters({ dueDate: date ? date.toISOString() : null })
          }
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => setTaskFilters({ dueDate: null })}
        >
          X
        </Button>
      </div>
    </div>
  );
}
