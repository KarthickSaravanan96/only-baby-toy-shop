import express from 'express';
import {
    createOrder,
    getOrders,
    getOrder,
    updateOrderStatus,
    createRazorpayOrder,
    verifyPayment
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// All order routes require authentication
router.use(protect);

router.post('/razorpay', createRazorpayOrder);
router.post('/verify', verifyPayment);

router.route('/')
    .post(createOrder)
    .get(getOrders);

router.get('/:id', getOrder);
router.put('/:id/status', admin, updateOrderStatus);

export default router;
