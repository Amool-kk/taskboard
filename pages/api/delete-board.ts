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

  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Board Id is required." });
  }

  const boardIndex = Boards.findIndex((board) => board.id === id);

  if (boardIndex === -1) {
    return res.status(404).json({ message: "Board not found." });
  }

  // Remove the board from array
  Boards.splice(boardIndex, 1);

  return res.status(200).json({ message: "Board deleted successfully." });
}
