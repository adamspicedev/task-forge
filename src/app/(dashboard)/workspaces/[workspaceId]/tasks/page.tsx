import { redirect } from "next/navigation";

import { protectPage } from "@/features/auth/queries";
import TaskViewSwitcher from "@/features/tasks/components/task-view-switcher";

export default async function TasksPage() {
  const user = await protectPage();
  if (!user) redirect("/sign-in");

  return (
    <div className="flex h-full flex-col">
      <TaskViewSwitcher defaultUserId={user.$id} hideProjectFilter={false} />
    </div>
  );
}
