import { Router } from "express"

import { Authenticate } from "../../middlewares/authenticationMiddleware"
import { Authorize } from "../../middlewares/authorizationMiddleware"
import { UserRegister, UpdateUser } from "../../controllers/user/authController"
import { Login, getMe } from "../../controllers/authController";

const router = Router()

router.post('/register', UserRegister)
router.post("/login", Login);
router.get("/me", Authenticate, Authorize(["user", "admin", "logistic"]), getMe);
router.patch('/update/:id', Authenticate, Authorize(["user"]), UpdateUser)
export default router