import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import connectDB from './config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

// Import routes
import productRoutes from './routes/products.js';
import authRoutes from './routes/auth.js';
import cartRoutes from './routes/cart.js';
import orderRoutes from './routes/orders.js';
import adminRoutes from './routes/admin.js';

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
const allowedOrigins = [
    'https://only-baby-toy-shop-git-main-karthyy9606-5656s-projects.vercel.app',
    'https://only-baby-toy-shop.vercel.app',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'http://localhost:5001',
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            return callback(new Error('CORS Policy: Origin not allowed'), false);
        }
        return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(join(__dirname, '../public')));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

// Health check route
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'Only Baby API Server',
        version: '1.0.0',
        endpoints: {
            products: '/api/products',
            auth: '/api/auth',
            cart: '/api/cart',
            orders: '/api/orders',
            health: '/api/health'
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Server error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`\n🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    console.log(`📍 API URL: http://localhost:${PORT}`);
    console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}\n`);
});
