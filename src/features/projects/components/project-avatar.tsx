import Image from "next/image";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ProjectAvatarProps {
  image?: string;
  name: string;
  className?: string;
  fallbackClassName?: string;
}

export function ProjectAvatar({
  image,
  name,
  className,
  fallbackClassName,
}: ProjectAvatarProps) {
  if (image) {
    return (
      <div
        className={cn("relative size-5 overflow-hidden rounded-md", className)}
      >
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
    );
  }

  return (
    <Avatar className={cn("r size-5 rounded-md", className)}>
      <AvatarFallback
        className={cn(
          "rounded-md bg-blue-600 text-sm font-semibold uppercase text-white",
          fallbackClassName
        )}
      >
        <span>{name[0]}</span>
      </AvatarFallback>
    </Avatar>
  );
}
