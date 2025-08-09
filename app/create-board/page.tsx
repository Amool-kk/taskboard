"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import React, { HtmlHTMLAttributes, useState } from "react";
import { toast } from "sonner";

type FormData = {
  title: string;
  description?: string;
  dueDate: string;
};
const CreateBoard = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
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
      const data = await fetch("/api/create-board", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const { message } = await data.json();
      if (data.status === 201) {
        toast.success(message);
        setFormData({ title: "", description: "", dueDate: "" });
        router.push("/");
      }
    } catch (error) {
      toast.error("Failed to create board.");
    }
  };

  const today = new Date().toISOString().split("T")[0];
  return (
    <div className="w-[50%] mx-auto my-10">
      <h1 className="my-10 font-bold text-3xl">Create New Board</h1>
      <form>
        <div className="flex flex-col gap-6">
          <div className="grid gap-3">
            <Label htmlFor="title">Title</Label>
            <Input
              onChange={handleInputChange}
              id="title"
              type="text"
              placeholder="Groceries"
              required
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="description">Description</Label>
            <Input
              onChange={handleInputChange}
              id="description"
              type="text"
              placeholder="Description (optional)"
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="dueDate">Due date</Label>
            <Input
              onChange={handleInputChange}
              id="dueDate"
              type="date"
              placeholder="Due date"
              min={today}
              required
            />
          </div>
          <div className="flex flex-col gap-3">
            <Button type="button" className="w-full" onClick={createBoard}>
              Create Board
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateBoard;
