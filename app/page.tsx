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
import WithAuth from "@/components/WithAuth";
import { useSearch } from "@/context/SearchContext";
import { BoardType, TaskType } from "@/lib/boardDB";
import { CornerDownLeft, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [boardsData, setBoardData] = useState<BoardType[]>([]);
  const [filteredBoards, setfilteredBoards] = useState<BoardType[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [taskvalue, setTaskValue] = useState<string>();
  const [selectedBoardIndex, setselectedBoardIndex] = useState<number>(-1);

  const { search } = useSearch();

  useEffect(() => {
    onSearch();
  }, [search]);

  const onSearch = () => {
    const q = search.toLowerCase();
    const searchResult = boardsData.filter((board) => {
      return (
        board.title.toLowerCase().includes(q) ||
        board.description?.toLowerCase().includes(q)
      );
    });

    setfilteredBoards(searchResult);
  };

  const router = useRouter();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const index = boardsData.findIndex((b) => b.id === selectedIndex);
    setselectedBoardIndex(index);
    if (index > -1 && boardsData[index]?.tasks?.length >= 0) {
      setTasks(boardsData[index]?.tasks);
    }
  }, [selectedIndex]);

  const getData = async () => {
    const data = await fetch("/api/getboards", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const { boards }: { boards: BoardType[] } = await data.json();
    if (data.status !== 200) {
      router.replace("/login");
    }
    setBoardData(boards);
    setfilteredBoards(boards);
  };

  const onSave = async () => {
    const data = await fetch("/api/update-tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: boardsData[selectedBoardIndex].id,
        tasks: tasks,
      }),
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

  const onDelete = async () => {
    try {
      const data = await fetch("/api/delete-board", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: boardsData[selectedBoardIndex].id,
        }),
        credentials: "include",
      });

      const { message } = await data.json();
      setDeleteModal(false);
      if (data.status === 200) {
        toast.success(message);
        getData();
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error on Delete. Please Try again");
    }
  };

  return (
    <WithAuth>
      <div className="bg-background">
        <main>
          <h1 className="text-2xl sm:text-3xl font-bold text-center my-8">
            Welcome to your dashboard
          </h1>

          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 mb-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-34">
              {filteredBoards?.map((boardData: BoardType, index: number) => (
                <BoardCard
                  key={`${boardData.userEmail}-${index}`}
                  data={boardData}
                  id={boardData.id}
                  index={index}
                  setOpenModal={setOpenModal}
                  setSelectedIndex={setSelectedIndex}
                  setDeleteModal={setDeleteModal}
                />
              ))}
            </div>
          </div>

          <Dialog open={deleteModal} onOpenChange={setDeleteModal}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Board</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this board? All tasks inside
                  it will also be removed. This action cannot be undone.
                </DialogDescription>
              </DialogHeader>

              <DialogFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setDeleteModal(false)}>
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    onDelete();
                    setDeleteModal(false); // Close modal after confirming
                  }}
                >
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog
            open={openModal}
            onOpenChange={() => {
              setOpenModal(false);
              setSelectedIndex(-1);
              setselectedBoardIndex(-1);
            }}
          >
            <DialogContent className="sm:max-w-lg w-[95%] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {boardsData?.[selectedBoardIndex]?.title ?? ""}
                </DialogTitle>
                <DialogDescription>
                  {boardsData?.[selectedBoardIndex]?.description ?? ""}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {tasks.map((task: TaskType, index: number) => (
                  <div
                    className="flex items-center gap-3 relative"
                    key={`task-${index}`}
                  >
                    <Checkbox
                      id={`task-${index}`}
                      checked={task.status}
                      onCheckedChange={() =>
                        setTasks((prevTasks) =>
                          prevTasks.map((task, i) =>
                            i === index
                              ? { ...task, status: !task.status }
                              : task
                          )
                        )
                      }
                    />
                    <Label
                      htmlFor={`task-${index}`}
                      className="truncate w-full pr-10"
                    >
                      {task.title}
                    </Label>
                    <div className="absolute right-0 flex gap-2">
                      <Pencil
                        size={20}
                        onClick={() => {
                          setTaskValue(task.title);
                          setTasks((prev) =>
                            prev.filter((_, i) => i !== index)
                          );
                        }}
                        className="cursor-pointer text-muted-foreground"
                      />
                      <Trash2
                        size={20}
                        onClick={() =>
                          setTasks((prev) => prev.filter((_, i) => i !== index))
                        }
                        className="cursor-pointer text-red-500"
                      />
                    </div>
                  </div>
                ))}

                {/* Add task input */}
                <div className="relative">
                  <Input
                    placeholder="Enter new task"
                    type="text"
                    value={taskvalue}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && taskvalue?.trim().length) {
                        setTasks((prev) => [
                          ...prev,
                          { title: taskvalue, status: false },
                        ]);
                        setTaskValue("");
                      }
                    }}
                    onChange={(e) => setTaskValue(e.target.value)}
                  />
                  <div
                    className="bg-muted p-1 absolute right-2 top-1/2 -translate-y-1/2 rounded cursor-pointer"
                    onClick={() => {
                      if (taskvalue?.trim().length) {
                        setTasks((prev) => [
                          ...prev,
                          { title: taskvalue, status: false },
                        ]);
                        setTaskValue("");
                      }
                    }}
                  >
                    <CornerDownLeft />
                  </div>
                </div>
              </div>

              <DialogFooter className="mt-6">
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
    </WithAuth>
  );
}
