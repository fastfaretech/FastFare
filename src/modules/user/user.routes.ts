import { Router } from "express";
import {
  submitKyc,
  getKycStatus,
  resubmitKyc
} from "./user.controller";

const router = Router();

router.post("/kyc/submit", submitKyc);
router.get("/kyc/status", getKycStatus);
router.put("/kyc/resubmit", resubmitKyc);

export default router;
