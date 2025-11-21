import { Router } from "express"
import { Register, Login, UpdateUser } from "../../controllers/user/authController"
const router = Router()

router.post('/register', Register)
router.post('/login', Login)
router.patch('/update/:id', UpdateUser)

export default router