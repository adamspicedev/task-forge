import Image from "next/image";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface WorkspaceAvatarProps {
  image?: string;
  name: string;
  className?: string;
}

export function WorkspaceAvatar({
  image,
  name,
  className,
}: WorkspaceAvatarProps) {
  console.log({ image });
  if (image) {
    return (
      <div
        className={cn("relative size-10 overflow-hidden rounded-md", className)}
      >
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
    );
  }

  return (
    <Avatar className={cn("r size-10 rounded-md", className)}>
      <AvatarFallback className="rounded-md bg-blue-600 text-lg font-semibold uppercase text-white">
        <span>{name[0]}</span>
      </AvatarFallback>
    </Avatar>
  );
}
