import { Boards } from "@/lib/boardDB";
import { verifyJwt } from "@/lib/jwt";
import { parse } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookies = parse(req.headers.cookie || "");
  const token = cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized user: No token" });
  }

  const verified = verifyJwt(token);

  if (!verified) {
    return res
      .status(401)
      .json({ message: "Unauthorized user: Invalid token" });
  }

  const { id, title, description, dueDate } = req.body;

  if (!title || !dueDate) {
    return res
      .status(400)
      .json({ message: "Title and Due Date are required." });
  }

  const today = new Date().toISOString().split("T")[0];
  if (dueDate < today) {
    return res.status(400).json({ message: "Due date cannot be in the past." });
  }

  const index = Boards.findIndex((b) => b.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Board not found" });
  }

  Boards[index] = {
    ...Boards[index],
    title,
    description,
    dueDate: new Date(dueDate).getTime(),
  };
  return res.status(200).json({
    message: "Board Updated",
    board: Boards[index],
  });
}
