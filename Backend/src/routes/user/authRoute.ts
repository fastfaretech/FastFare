import { Router } from "express"

import { Authenticate } from "../../middlewares/authenticationMiddleware"
import { Authorize } from "../../middlewares/authorizationMiddleware"
import { UserRegister, Login, UpdateUser } from "../../controllers/user/authController"

const router = Router()

router.post('/register', UserRegister)
router.post('/login', Login)
router.patch('/update/:id', Authenticate, Authorize(["user"]), UpdateUser)
export default router