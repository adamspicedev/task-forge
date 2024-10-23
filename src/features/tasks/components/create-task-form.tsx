"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { DatePicker } from "@/components/date-picker";
import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { createTaskSchema } from "@/features/tasks/schemas";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { cn } from "@/lib/utils";

import { useCreateTask } from "../api/use-create-task";
import { TaskStatus } from "../types";
import { toPrettyTaskStatus } from "../utils";

interface CreateTaskFormProps {
  onCancel?: () => void;
  projectOptions: {
    id: string;
    name: string;
    image: string;
  }[];
  memberOptions: {
    id: string;
    name: string;
  }[];
}

type CreateTaskFormSchema = z.infer<typeof createTaskSchema>;

export function CreateTaskForm({
  onCancel,
  projectOptions,
  memberOptions,
}: CreateTaskFormProps) {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const { mutate, isPending } = useCreateTask();
  const form = useForm<CreateTaskFormSchema>({
    resolver: zodResolver(createTaskSchema.omit({ workspaceId: true })),
    defaultValues: {
      workspaceId,
    },
  });

  const onSubmit = (values: CreateTaskFormSchema) => {
    mutate(
      { json: { ...values, workspaceId } },
      {
        onSuccess: ({ data }) => {
          form.reset();
          onCancel?.();

          router.push(`/workspaces/${workspaceId}/tasks/${data.$id}`);
        },
      }
    );
  };

  return (
    <Card className="h-full w-full border-none shadow-sm">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">Create task</CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator className="mb-1" />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter a name for your task"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <DatePicker {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="assigneeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assign to</FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an assignee" />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage />
                      <SelectContent>
                        {memberOptions.map((member) => (
                          <SelectItem key={member.id} value={member.id}>
                            <div className="flex items-center gap-x-2">
                              <MemberAvatar name={member.name} />
                              {member.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage />
                      <SelectContent>
                        <SelectItem value={TaskStatus.BACKLOG}>
                          {toPrettyTaskStatus(TaskStatus.BACKLOG)}
                        </SelectItem>
                        <SelectItem value={TaskStatus.TODO}>
                          {toPrettyTaskStatus(TaskStatus.TODO)}
                        </SelectItem>
                        <SelectItem value={TaskStatus.IN_PROGRESS}>
                          {toPrettyTaskStatus(TaskStatus.IN_PROGRESS)}
                        </SelectItem>
                        <SelectItem value={TaskStatus.IN_REVIEW}>
                          {toPrettyTaskStatus(TaskStatus.IN_REVIEW)}
                        </SelectItem>
                        <SelectItem value={TaskStatus.DONE}>
                          {toPrettyTaskStatus(TaskStatus.DONE)}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="projectId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project</FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a project" />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage />
                      <SelectContent>
                        {projectOptions.map((project) => (
                          <SelectItem key={project.id} value={project.id}>
                            <div className="flex items-center gap-x-2">
                              <ProjectAvatar
                                name={project.name}
                                image={project.image}
                              />
                              {project.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <DottedSeparator className="py-7" />
            <div className="flex justify-between">
              <Button
                variant="secondary"
                type="button"
                onClick={onCancel}
                disabled={isPending}
                className={cn(!onCancel && "invisible")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <Loader className="size-4 animate-spin" />
                ) : (
                  "Create Task"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
