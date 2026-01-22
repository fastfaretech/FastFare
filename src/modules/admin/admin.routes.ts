import { Router } from "express";
import {
  approveKyc,
  rejectKyc
} from "./admin.controller";

const router = Router();

router.post("/kyc/:userId/approve", approveKyc);
router.post("/kyc/:userId/reject", rejectKyc);

export default router;
