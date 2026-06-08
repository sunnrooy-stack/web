import { PLANS } from "../config/plan.js"
import razorpay from "../config/razorpay.js"
import crypto from "crypto"
import User from "../models/user.model.js"

export const createOrder = async (req, res) => {
    try {
        const { planType } = req.body
        const plan = PLANS[planType]
        if (!plan || plan.price === 0) {
            return res.status(400).json({ message: "invalid paid plan" })
        }

        const options = {
            amount: plan.price * 100,
            currency: "INR",
            receipt: `receipt_${req.user._id}_${Date.now()}`,
            notes: {
                userId: req.user._id.toString(),
                credits: plan.credits.toString(),
                plan: plan.plan,
            },
        }

        const order = await razorpay.orders.create(options)

        return res.status(200).json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            keyId: process.env.RAZORPAY_KEY_ID,
            plan: planType,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: `razorpay order error: ${error}` })
    }
}

export const verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            planType,
        } = req.body

        const body = razorpay_order_id + "|" + razorpay_payment_id
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest("hex")

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ message: "payment verification failed" })
        }

        const plan = PLANS[planType]
        if (!plan) {
            return res.status(400).json({ message: "invalid plan" })
        }

        const user = await User.findByIdAndUpdate(
            req.user._id,
            {
                $inc: { credits: plan.credits },
                plan: plan.plan,
            },
            { new: true }
        )

        return res.status(200).json({
            message: "payment successful",
            credits: user.credits,
            plan: user.plan,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: `payment verify error: ${error}` })
    }
}