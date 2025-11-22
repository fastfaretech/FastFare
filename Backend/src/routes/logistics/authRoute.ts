import { Router } from "express"

import { Authenticate } from "../../middlewares/authenticationMiddleware"
import { Authorize } from "../../middlewares/authorizationMiddleware"
import { LogisticRegister, Login, UpdateUser } from "../../controllers/logistics/authController"

const router = Router()

router.post('/register', LogisticRegister)
router.post('/login', Login)
router.patch('/update/:id', Authenticate, Authorize(["logistic"]), UpdateUser)

export default router