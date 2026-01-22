import { Request, Response } from "express";
import * as kycService from "../kyc/kyc.service";

export const approveKyc = async (req: Request, res: Response) => {
  const { userId } = req.params;
  res.json(await kycService.approveKyc(userId));
};

export const rejectKyc = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { reason } = req.body;

  res.json(await kycService.rejectKyc(userId, reason));
};
