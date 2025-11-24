import { Router } from "express"

import { Authenticate } from "../../middlewares/authenticationMiddleware"
import { Authorize } from "../../middlewares/authorizationMiddleware"
import { LogisticRegister, UpdateUser } from "../../controllers/logistics/authController"

const router = Router()

router.post('/register', LogisticRegister)
router.patch('/update/:id', Authenticate, Authorize(["logistic"]), UpdateUser)

export default router