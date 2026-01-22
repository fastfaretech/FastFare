import { Request, Response } from "express";
import * as userService from "./user.service";

export const submitKyc = (req: Request, res: Response) => {
  try {
    const result = userService.submitKyc(req.body);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getKycStatus = (_: Request, res: Response) => {
  res.json(userService.getKycStatus());
};

export const resubmitKyc = (_: Request, res: Response) => {
  res.json(userService.resubmitKyc());
};
