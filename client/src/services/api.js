import axios from 'axios';

// Create axios instance with base configuration
const API = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api`,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests if available
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle response errors
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/signin';
        }
        return Promise.reject(error);
    }
);

// Product API
export const productAPI = {
    // Get all products with optional filters
    getAll: (params = {}) => API.get('/products', { params }),

    // Get single product by ID
    getById: (id) => API.get(`/products/${id}`),

    // Create product (admin only)
    create: (data) => API.post('/products', data),

    // Update product (admin only)
    update: (id, data) => API.put(`/products/${id}`, data),

    // Delete product (admin only)
    delete: (id) => API.delete(`/products/${id}`)
};

// Authentication API
export const authAPI = {
    // Register new user
    register: (data) => API.post('/auth/register', data),

    // Login user
    login: (data) => API.post('/auth/login', data),

    // Get current user
    getMe: () => API.get('/auth/me')
};

// Cart API
export const cartAPI = {
    // Get user's cart
    get: () => API.get('/cart'),

    // Add item to cart
    addItem: (productId, quantity = 1) => API.post('/cart/add', { productId, quantity }),

    // Update item quantity
    updateItem: (productId, quantity) => API.put('/cart/update', { productId, quantity }),

    // Remove item from cart
    removeItem: (productId) => API.delete(`/cart/remove/${productId}`),

    // Clear cart
    clear: () => API.delete('/cart/clear')
};

// Order API
export const orderAPI = {
    // Create new order
    create: (data) => API.post('/orders', data),

    // Get user's orders
    getAll: () => API.get('/orders'),

    // Get single order
    getById: (id) => API.get(`/orders/${id}`),

    // Update order status (admin only)
    updateStatus: (id, status) => API.put(`/orders/${id}/status`, { status })
};

export default API;
