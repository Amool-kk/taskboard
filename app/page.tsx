"use client";
import BoardCard from "@/components/BoardCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BoardType, TaskType } from "@/lib/boardDB";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [boardsData, setBoardData] = useState<BoardType[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const router = useRouter();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (boardsData[selectedIndex]?.tasks.length) {
      setTasks(boardsData[selectedIndex]?.tasks);
    }
  }, [selectedIndex]);

  const getData = async () => {
    const data = await fetch("/api/getboards", {
      method: "GET",
      credentials: "include",
    });

    const { boards }: { boards: BoardType[] } = await data.json();
    if (data.status !== 200) {
      router.replace("/login");
    }
    setBoardData(boards);
  };

  const onSave = async () => {
    console.log(boardsData[selectedIndex], boardsData, selectedIndex);

    const data = await fetch("/api/update-tasks", {
      method: "POST",
      body: JSON.stringify({ id: boardsData[selectedIndex].id, tasks: tasks }),
      credentials: "include",
    });

    const { message } = await data.json();
    if (data.status === 200) {
      toast.success(message);
      setOpenModal(false);
      getData();
    } else {
      toast.error(message);
    }
  };

  return (
    <div className="bg-background">
      <main>
        <h1 className="text-2xl mx-auto my-10 w-fit font-bold">
          Welcome to your dashboard
        </h1>
        <div className="sm:max-w-3/4 mx-auto grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 p-4">
          {boardsData?.map((boardData: BoardType, index: number) => (
            <BoardCard
              data={boardData}
              index={index}
              setOpenModal={setOpenModal}
              setSelectedIndex={setSelectedIndex}
              key={`${boardData.userEmail}-${index}`}
            />
          ))}
        </div>

        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {boardsData?.[selectedIndex]
                  ? boardsData?.[selectedIndex]?.title
                  : null}
              </DialogTitle>
              <DialogDescription>
                {boardsData?.[selectedIndex]
                  ? boardsData?.[selectedIndex].description
                  : null}
              </DialogDescription>
            </DialogHeader>
            <div>
              {/* {boardsData?.[selectedIndex]?.tasks
                ? boardsData?.[selectedIndex].tasks?.map((task: TaskType) => {
                    return <>{task.title}</>;
                  })
                : null} */}
              {tasks.map((task: TaskType, index: number) => (
                <div
                  className="flex items-center gap-3 my-2"
                  key={`task-${index}`}
                >
                  <Checkbox
                    id={`task-${index}`}
                    checked={task.status}
                    onCheckedChange={() =>
                      setTasks((prevTasks) =>
                        prevTasks.map((task, i) =>
                          i === index ? { ...task, status: !task.status } : task
                        )
                      )
                    }
                  />
                  <Label htmlFor={`task-${index}`}>{task.title}</Label>
                </div>
              ))}
              <Input
                placeholder="Enter new Task"
                type="text"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const value = e.currentTarget.value;
                    setTasks((prevTask) => [
                      ...prevTask,
                      { title: value, status: false },
                    ]);
                    e.currentTarget.value = "";
                  }
                }}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={onSave} type="button">
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
