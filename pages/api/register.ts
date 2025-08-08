import type { NextApiRequest, NextApiResponse } from "next";
import { Users } from "@/lib/userDB";
import bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = JSON.parse(req.body);

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and Password are required",
      });
    }

    const existedUser = Users.find((user) => user.email === email);

    if (existedUser) {
      return res.status(400).json({
        message: "User is already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    Users.push({
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User registered",
      data: {
        email,
        password: hashedPassword,
      },
    });
  }
}
