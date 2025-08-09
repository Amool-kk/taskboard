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
import { Pencil, Plus, Trash2 } from "lucide-react";
import { BoardType, TaskType } from "@/lib/boardDB";
import { Progress } from "./ui/progress";
import Link from "next/link";

const BoardCard = ({
  data,
  id,
  index,
  setOpenModal,
  setDeleteModal,
  setSelectedIndex,
}: {
  data: BoardType;
  id: number;
  index: number;
  setOpenModal: (value: boolean) => void;
  setDeleteModal: (value: boolean) => void;
  setSelectedIndex: (value: number) => void;
}) => {
  const createdAt = new Date(data.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
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
    <Card className="w-full lg:w-70 max-w-sm py-4" style={{ gap: 8 }}>
      <CardHeader className="px-3">
        <CardTitle className="text-2xl text-gray-400">{createdAt}</CardTitle>
        <CardAction className="flex gap-4">
          <Plus
            size={20}
            className="cursor-pointer"
            onClick={() => {
              setOpenModal(true);
              setSelectedIndex(id);
            }}
          />
          <Link
            onClick={(e) => e.stopPropagation()}
            href={`/update-board/${index}`}
          >
            <Pencil size={20} />
          </Link>
          <Trash2
            size={20}
            color="red"
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex(id);
              setDeleteModal(true);
            }}
          />
        </CardAction>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-2xl">{data.title}</CardTitle>
        <CardDescription className="h-13">{data.description}</CardDescription>
        <Progress value={ProgressValue} className="my-3" />
        <CardDescription className="relative">
          Progress <span className="absolute right-0">{ProgressValue} %</span>
        </CardDescription>
      </CardContent>
      <CardFooter>
        <div
          style={{
            backgroundColor:
              ProgressValue === 100
                ? "lightgreen"
                : daysLeft > 1
                ? "#f6f07f"
                : "#f57a7a",
            padding: "7px 25px",
            borderRadius: 50,
          }}
        >
          {ProgressValue === 100 ? "Completed" : `${daysLeft} days left`}
        </div>
      </CardFooter>
    </Card>
  );
};

export default BoardCard;
