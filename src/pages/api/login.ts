import CONSTANTS from "@/constants/constants";
import type { NextApiRequest, NextApiResponse } from "next";

type LoginData = {
  email?: string;
  password?: string;
  status?: string;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginData>
) {
  if (req.method === "POST") {
    const { emailValue, passwordValue } = req.body;

    try {
      const response = await fetch(
        `${CONSTANTS.BASELOCALHOST}/auth/login?email=${emailValue}&password=${passwordValue}`
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      if (data.length !== 0) {
        res.status(200).json(data);
      } else {
        res
          .status(403)
          .json({ status: "Error", message: "Wrong email or password" });
      }
    } catch (error) {
      res.status(500).json({ status: "Error", message: "Log In Failed" });
    }
  } else {
    res.status(405).json({ status: "Method Not Allowed" });
  }
}
