import { Router } from "express"

import { Authenticate } from "../../middlewares/authenticationMiddleware"
import { Authorize } from "../../middlewares/authorizationMiddleware"
import { BookShipments, GetShipments, ListShipments } from "../../controllers/user/shipment"

const router = Router()

router.post('/order/book', Authenticate, Authorize(["user"]), BookShipments)
router.get('/order/get/:shipmentId', Authenticate, Authorize(["user", "driver"]), GetShipments)


// nishant change for testing
router.get("/order/list", Authenticate, Authorize(["user","driver"]), ListShipments);

export default router