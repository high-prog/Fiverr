import express from 'express'
import {  getOrders, intent, confirm} from "../controllers/order.controller.js"
import {verifyToken} from '../middleware/jwt.js';

const router = express.Router();


router.post("/create-payment-intent/:id", verifyToken, intent)
router.get("/", verifyToken, getOrders)
router.put("/", verifyToken, confirm)


export default router