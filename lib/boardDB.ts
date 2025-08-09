export type BoardType = {
  id: number;
  title: string;
  dueDate: number;
  createdAt: number;
  status?: string;
  description?: string;
  userEmail: string;
  tasks: TaskType[];
};

export type TaskType = {
  title: string;
  status: boolean;
};

export const Boards: BoardType[] = [];
