import { verifyJwt } from "@/lib/jwt";
import { parse } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { Boards } from "@/lib/boardDB";
import { JwtPayload } from "jsonwebtoken";

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

  const data = Boards.filter((b) => b.userEmail === verified.email);
  return res.status(200).json({ message: "Get All Boards", boards: data });
}
