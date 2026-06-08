import express from "express"

import isAuth from "../middlewares/isAuth.js"
import { createOrder, verifyPayment } from "../controllers/billing.controller.js"


const billingRouter=express.Router()

billingRouter.post("/create-order",isAuth,createOrder)
billingRouter.post("/verify-payment",isAuth,verifyPayment)


export default billingRouter