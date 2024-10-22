import { useCallback, useEffect, useState } from "react";

import {
  DragDropContext,
  Draggable,
  type DropResult,
  Droppable,
} from "@hello-pangea/dnd";

import { Task, TaskPayload, TaskStatus } from "../types";
import { KanbanCard } from "./kanban-card";
import { KanbanColumnHeader } from "./kanban-column-header";

const boards: TaskStatus[] = [
  TaskStatus.BACKLOG,
  TaskStatus.TODO,
  TaskStatus.IN_PROGRESS,
  TaskStatus.IN_REVIEW,
  TaskStatus.DONE,
];

type TaskState = {
  [key in TaskStatus]: Task[];
};

interface DataKanbanProps {
  data: Task[];
  onChange: (tasks: TaskPayload[]) => void;
}

export default function DataKanban({ data, onChange }: DataKanbanProps) {
  const [tasks, setTasks] = useState<TaskState>(() => {
    const initialTasks: TaskState = {
      [TaskStatus.BACKLOG]: [],
      [TaskStatus.TODO]: [],
      [TaskStatus.IN_PROGRESS]: [],
      [TaskStatus.IN_REVIEW]: [],
      [TaskStatus.DONE]: [],
    };

    data.forEach((task) => {
      initialTasks[task.status].push(task);
    });

    Object.keys(initialTasks).forEach((status) => {
      initialTasks[status as TaskStatus].sort(
        (a, b) => a.position - b.position
      );
    });

    return initialTasks;
  });

  useEffect(() => {
    const newTasks: TaskState = {
      [TaskStatus.BACKLOG]: [],
      [TaskStatus.TODO]: [],
      [TaskStatus.IN_PROGRESS]: [],
      [TaskStatus.IN_REVIEW]: [],
      [TaskStatus.DONE]: [],
    };

    data.forEach((task) => {
      newTasks[task.status].push(task);
    });

    Object.keys(newTasks).forEach((status) => {
      newTasks[status as TaskStatus].sort((a, b) => a.position - b.position);
    });

    setTasks(newTasks);
  }, [data]);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return;
      const { source, destination } = result;
      const sourceStatus = source.droppableId as TaskStatus;
      const destinationStatus = destination.droppableId as TaskStatus;

      let updatesPayload: TaskPayload[] = [];

      setTasks((prevTasks) => {
        const newTasks = { ...prevTasks };

        // Safely remove the task from the source column
        const sourceColumn = [...newTasks[sourceStatus]];
        const movedTask = sourceColumn.splice(source.index, 1)[0];

        //if the task is not found, return the previous tasks
        if (!movedTask) return prevTasks;

        // Safely add the task to the destination column
        const updatedMovedTask =
          sourceStatus !== destinationStatus
            ? { ...movedTask, status: destinationStatus }
            : movedTask;

        //update the source column
        newTasks[sourceStatus] = sourceColumn;

        //update the destination column
        const destinationColumn = [...newTasks[destinationStatus]];
        destinationColumn.splice(destination.index, 0, updatedMovedTask);
        newTasks[destinationStatus] = destinationColumn;

        //update the payload
        updatesPayload = [];
        updatesPayload.push({
          $id: updatedMovedTask.$id,
          status: destinationStatus,
          position: Math.min((destination.index + 1) * 1000, 1_000_000),
        });

        // Update the positions fot the affected tasks in the destination column
        newTasks[destinationStatus].forEach((task, index) => {
          if (task && task.$id !== updatedMovedTask.$id) {
            const newPosition = Math.min((index + 1) * 1000, 1_000_000);
            if (task.position !== newPosition) {
              updatesPayload.push({
                $id: task.$id,
                status: destinationStatus,
                position: newPosition,
              });
            }
          }
        });

        // Update the positions fot the affected tasks in the source column
        if (sourceStatus !== destinationStatus) {
          newTasks[sourceStatus].forEach((task, index) => {
            const newPosition = Math.min((index + 1) * 1000, 1_000_000);
            if (task.position !== newPosition) {
              updatesPayload.push({
                $id: task.$id,
                status: sourceStatus,
                position: newPosition,
              });
            }
          });
        }

        return newTasks;
      });

      onChange(updatesPayload);
    },
    [onChange]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex overflow-x-auto">
        {boards.map((board) => (
          <div
            key={board}
            className="mx-2 min-w-[200px] flex-1 rounded-md bg-muted p-1.5"
          >
            <KanbanColumnHeader board={board} taskCount={tasks[board].length} />
            <Droppable droppableId={board}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="min-h-[200px] py-2.5"
                >
                  {tasks[board].map((task, index) => (
                    <Draggable
                      key={task.$id}
                      draggableId={task.$id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <KanbanCard task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}
