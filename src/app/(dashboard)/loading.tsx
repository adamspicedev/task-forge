import { Loader } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div className="flex h-full items-center justify-center">
      <Loader className="size-10 animate-spin text-muted-foreground" />
    </div>
  );
}
