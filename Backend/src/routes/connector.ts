import { Router } from "express"

import userRoutes from "./user/authRoute"
import adminRoutes from "./admin/authRoute"
import logisticRoutes from "./logistics/authRoute"
import shipment from "./user/shipmentRoute"
import { Login }  from "../controllers/authController"
const  router = Router()

router.use('/login', Login)
router.use('/user', userRoutes)
router.use('/admin', adminRoutes)
router.use('/logistic', logisticRoutes)
router.use('/user', shipment)

export default router;