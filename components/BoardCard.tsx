import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { EllipsisVertical } from "lucide-react";
import { BoardType, TaskType } from "@/lib/boardDB";
import { Progress } from "./ui/progress";

const BoardCard = ({
  data,
  index,
  setOpenModal,
  setSelectedIndex,
}: {
  data: BoardType;
  index: number;
  setOpenModal: (value: boolean) => void;
  setSelectedIndex: (value: number) => void;
}) => {
  const createdAt = new Date(data.createdAt).toLocaleDateString("en-US", {
    month: "short", // Short month name (e.g., "Nov")
    day: "numeric", // Day of the month (e.g., "2")
    year: "numeric", // Year (e.g., "2022")
  });

  const diffMs = data.dueDate - Date.now();

  const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  let completeTasks: number = 0;
  data.tasks?.map((task: TaskType) => {
    if (task.status) {
      completeTasks += 1;
    }
  });

  const ProgressValue = data.tasks?.length
    ? Math.floor((completeTasks * 100) / data.tasks?.length)
    : 0;

  return (
    <Card
      className="w-full max-w-sm py-4"
      style={{ gap: 8 }}
      onClick={() => {
        setOpenModal(true);
        setSelectedIndex(index);
      }}
    >
      <CardHeader className="px-3">
        <CardTitle className="text-2xl text-gray-400">{createdAt}</CardTitle>
        <CardAction>
          <EllipsisVertical />
        </CardAction>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-2xl">{data.title}</CardTitle>
        <CardDescription className="h-13">{data.description}</CardDescription>
        <Progress value={ProgressValue} className="my-3" />
        <CardDescription className="relative">
          Progress <span className="absolute right-0">{ProgressValue}</span>
        </CardDescription>
      </CardContent>
      <CardFooter>
        <div
          style={{
            backgroundColor: "lightgreen",
            padding: "7px 25px",
            borderRadius: 50,
          }}
        >
          {daysLeft} days left
        </div>
      </CardFooter>
    </Card>
  );
};

export default BoardCard;
