import { Users } from "@/lib/userDB";
import { NextApiRequest, NextApiResponse } from "next";
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

    if (!existedUser) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existedUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    return res.status(200).json({ message: "Login successful" });
  }
}
