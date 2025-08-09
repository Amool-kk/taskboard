import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { FormData } from "@/app/update-board/[index]/page";

const BoardForm = ({
  today,
  data,
  handleInputChange,
}: {
  today: string;
  data: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <form>
      <div className="flex flex-col gap-6">
        <div className="grid gap-3">
          <Label htmlFor="title">Title</Label>
          <Input
            onChange={handleInputChange}
            value={data.title}
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
            value={data.description}
            id="description"
            type="text"
            placeholder="Description (optional)"
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="dueDate">Due date</Label>
          <Input
            onChange={handleInputChange}
            value={data.dueDate}
            id="dueDate"
            type="date"
            placeholder="Due date"
            min={today}
            required
          />
        </div>
      </div>
    </form>
  );
};

export default BoardForm;
