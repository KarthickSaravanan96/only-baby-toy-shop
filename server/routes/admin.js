import express from 'express';
import {
    getDashboardStats,
    getAllUsers,
    deleteUser,
    getAllOrders,
    getLowStockProducts,
    updateStock
} from '../controllers/adminController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Apply protect and admin middleware to all routes in this file
router.use(protect, admin);

router.get('/stats', getDashboardStats);
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.get('/orders', getAllOrders);
router.get('/products/low-stock', getLowStockProducts);
router.put('/products/:id/stock', updateStock);

export default router;
