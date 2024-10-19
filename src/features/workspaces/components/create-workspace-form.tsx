"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { DottedSeparator } from "@/components/dotted-separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { useCreateWorkspace } from "@/features/workspaces/api/use-create-workspace";
import { createWorkspaceSchema } from "@/features/workspaces/schemas";
import { cn } from "@/lib/utils";

interface CreateWorkspaceFormProps {
  onCancel?: () => void;
}

type CreateWorkspaceFormSchema = z.infer<typeof createWorkspaceSchema>;

export function CreateWorkspaceForm({ onCancel }: CreateWorkspaceFormProps) {
  const { mutate, isPending } = useCreateWorkspace();
  const router = useRouter();
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const form = useForm<CreateWorkspaceFormSchema>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: "",
      image: "",
    },
  });

  const onSubmit = (values: CreateWorkspaceFormSchema) => {
    const finalValues = {
      ...values,
      image: values.image instanceof File ? values.image : "",
    };

    mutate(
      { form: finalValues },
      {
        onSuccess: ({ data }) => {
          form.reset();
          onCancel?.();
          router.push(`/workspaces/${data.$id}`);
        },
      }
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
    }
  };

  return (
    <Card className="h-full w-full border-none shadow-sm">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">Create Workspace</CardTitle>
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
                    <FormLabel>Workspace Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter a name for your workspace"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <div className="flex flex-col gap-y-2">
                    <div className="flex items-center gap-x-2">
                      {field.value ? (
                        <div className="relative size-[72px] overflow-hidden rounded-md">
                          <Image
                            src={
                              field.value instanceof File
                                ? URL.createObjectURL(field.value)
                                : field.value
                            }
                            alt="Workspace Image"
                            className="object-cover"
                            fill
                          />
                        </div>
                      ) : (
                        <Avatar className="size-[72px]">
                          <AvatarFallback>
                            <ImageIcon className="size-[32px] text-neutral-400" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className="flex flex-col">
                        <p className="text-sm font-medium">Workspace Icon</p>
                        <p className="text-sm font-medium text-muted-foreground">
                          JPG, PNG, SVG, or JPEG, max 1MB
                        </p>
                        <input
                          accept=".jpg, .png, .svg, .jpeg"
                          type="file"
                          ref={uploadInputRef}
                          className="hidden"
                          disabled={isPending}
                          onChange={handleImageChange}
                        />
                        {field.value ? (
                          <Button
                            disabled={isPending}
                            type="button"
                            variant="destructive"
                            size="xs"
                            className="mt-2 w-fit"
                            onClick={() => {
                              field.onChange(null);
                              if (uploadInputRef.current) {
                                uploadInputRef.current.value = "";
                              }
                            }}
                          >
                            Remove Image
                          </Button>
                        ) : (
                          <Button
                            disabled={isPending}
                            type="button"
                            variant="tertiary"
                            size="xs"
                            className="mt-2 w-fit"
                            onClick={() => uploadInputRef.current?.click()}
                          >
                            Upload Image
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
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
                  "Create Workspace"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
