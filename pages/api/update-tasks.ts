import { Boards, BoardType } from "@/lib/boardDB";
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

  const { id, tasks } = JSON.parse(req.body) as BoardType;

  console.log(id, tasks);

  if (!id || !tasks) {
    return res.status(400).json({ message: "Id and tasks are required" });
  }

  const index = Boards.findIndex((b) => b.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Board not found" });
  }

  Boards[index] = { ...Boards[index], tasks };

  return res
    .status(200)
    .json({ message: "Tasks updated", board: Boards[index] });
}
