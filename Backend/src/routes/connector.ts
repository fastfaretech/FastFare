import { Router } from "express"
import userRoutes from "./user/authRoute"

const  router = Router()

router.use('/user', userRoutes)

export default router;