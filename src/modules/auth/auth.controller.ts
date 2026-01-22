import { Request, Response } from "express";
import { generateToken } from "../../utils/jwt";

export const login = (
  req: Request,
  res: Response
) => {
  const { userId, role } = req.body;

  const token = generateToken({
    userId,
    role
  });

  res.json({ token });
};
