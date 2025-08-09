import type { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";
import { verifyJwt } from "@/lib/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Parse cookies from the request headers
    const cookies = parse(req.headers.cookie || "");
    const token = cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized user: No token" });
    }

    // Assuming verifyJwt returns decoded payload or false/null on failure
    const verified = verifyJwt(token);

    if (!verified) {
      return res
        .status(401)
        .json({ message: "Unauthorized user: Invalid token" });
    }

    // If needed, you can access the user info from verified token here
    return res.status(200).json({ message: "User profile", user: verified });
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
