import { Router } from "express"

import { Authenticate } from "../../middlewares/authenticationMiddleware"
import { Authorize } from "../../middlewares/authorizationMiddleware"
import { AdminRegister, Login, UpdateUser } from "../../controllers/admin/authController"

const router = Router()

router.post('/register', AdminRegister)
router.post('/login', Login)
router.patch('/update/:id', Authenticate, Authorize(["admin"]), UpdateUser)

export default router