import { Boards, BoardType } from "@/lib/boardDB";
import { verifyJwt } from "@/lib/jwt";
import { parse } from "cookie";
import { JwtPayload } from "jsonwebtoken";
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

  const verified = verifyJwt(token) as JwtPayload & { email: string };

  if (!verified) {
    return res
      .status(401)
      .json({ message: "Unauthorized user: Invalid token" });
  }

  const { title, description, dueDate } = req.body;

  if (!title || !dueDate) {
    return res
      .status(400)
      .json({ message: "Title and Due Date are required." });
  }

  const today = new Date().toISOString().split("T")[0];
  if (dueDate < today) {
    return res.status(400).json({ message: "Due date cannot be in the past." });
  }

  const userId = verified?.email;

  const newBoard: BoardType = {
    id: Boards.length + 1,
    title,
    description,
    dueDate: new Date(dueDate).getTime(),
    createdAt: new Date().getTime(),
    tasks: [],
    userEmail: userId,
  };

  Boards.push(newBoard);

  return res
    .status(201)
    .json({ message: "Board created successfully", board: newBoard });
}
