"use client";
import BoardForm from "@/components/board-form";
import { Button } from "@/components/ui/button";
import WithAuth from "@/components/WithAuth";
import { BoardType } from "@/lib/boardDB";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export type FormData = {
  id?: number;
  title: string;
  description?: string;
  dueDate: string;
};

function formatDate(dateStr: number): string {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2); // months are 0-based
  const day = `0${date.getDate()}`.slice(-2);
  return `${year}-${month}-${day}`;
}

const UpdateBoard = () => {
  const router = useRouter();
  const params = useParams();
  const { index } = params as unknown as { index: number };

  useEffect(() => {
    getData();
  }, []);

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
      router.replace("/");
    }
    setFormData({
      id: boards[index].id,
      title: boards[index].title,
      description: boards[index].description,
      dueDate: formatDate(boards[index].dueDate),
    });
  };

  const [formData, setFormData] = useState<FormData>({
    id: -1,
    title: "",
    description: "",
    dueDate: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const createBoard = async () => {
    if (!formData.title || !formData.dueDate) {
      toast.error("Title and Due Date are required.");
      return;
    }

    try {
      const data = await fetch("/api/update-board", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const { message } = await data.json();
      if (data.status === 200) {
        toast.success(message);
        setFormData({ id: -1, title: "", description: "", dueDate: "" });
        router.push("/");
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error("Failed to create board.");
    }
  };

  const today = new Date().toISOString().split("T")[0];
  return (
    <WithAuth>
      <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-center my-10">
          Update Board
        </h1>
        <BoardForm
          handleInputChange={handleInputChange}
          data={formData}
          today={today}
        />
        <div className="flex flex-col gap-3 my-3">
          <Button type="button" className="w-full" onClick={createBoard}>
            Update Board
          </Button>
        </div>
      </div>
    </WithAuth>
  );
};

export default UpdateBoard;
