import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {
    LayoutDashboard, Package, Users, ShoppingCart, AlertCircle,
    LogOut, Edit, Trash2, Plus, X, Search, Image as ImageIcon, Home
} from 'lucide-react';

const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api`;

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [stats, setStats] = useState(null);
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState('');

    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [productForm, setProductForm] = useState({
        name: '', price: '', originalPrice: '', category: 'Toys', ageGroup: '', image: '', description: '', stock: 10
    });

    // Check auth on mount only
    useEffect(() => {
        const role = localStorage.getItem('userRole');
        if (role !== 'admin') {
            navigate('/');
        } else {
            fetchData();
        }
    }, [navigate]); // eslint-disable-line

    // Re-fetch when tab changes
    useEffect(() => {
        const role = localStorage.getItem('userRole');
        if (role === 'admin') fetchData();
    }, [activeTab]); // eslint-disable-line

    const getHeaders = () => {
        const token = localStorage.getItem('token');
        return { headers: { Authorization: `Bearer ${token}` } };
    };

    const fetchData = async () => {
        setLoading(true);
        setFetchError('');
        const token = localStorage.getItem('token');

        if (!token) {
            setFetchError('No login token found. Please sign in again as admin.');
            setLoading(false);
            return;
        }

        try {
            if (activeTab === 'dashboard') {
                const res = await axios.get(`${API_URL}/admin/stats`, getHeaders());
                setStats(res.data.data);
            } else if (activeTab === 'products') {
                const res = await axios.get(`${API_URL}/products`);
                setProducts(res.data.data || []);
            } else if (activeTab === 'users') {
                const res = await axios.get(`${API_URL}/admin/users`, getHeaders());
                setUsers(res.data.data || []);
            } else if (activeTab === 'orders') {
                const res = await axios.get(`${API_URL}/admin/orders`, getHeaders());
                setOrders(res.data.data || []);
            }
        } catch (error) {
            console.error('Error fetching data', error);
            if (error.response?.status === 401 || error.response?.status === 403) {
                setFetchError('Session expired or unauthorised. Please sign out and sign in again as admin.');
            } else if (error.code === 'ERR_NETWORK') {
                setFetchError('Cannot connect to backend server. Make sure the backend is running on port 5000.');
            } else {
                setFetchError(error.response?.data?.message || 'Failed to load data. Try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    const handleProductSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingProduct) {
                await axios.put(`${API_URL}/products/${editingProduct._id}`, productForm, getHeaders());
                alert('Product updated!');
            } else {
                await axios.post(`${API_URL}/products`, productForm, getHeaders());
                alert('Product added!');
            }
            setIsProductModalOpen(false);
            fetchData();
        } catch (error) {
            alert('Error saving product');
            console.error(error);
        }
    };

    const deleteProduct = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`${API_URL}/products/${id}`, getHeaders());
                fetchData();
            } catch (error) {
                console.error(error);
                alert('Failed to delete');
            }
        }
    };

    const deleteUser = async (id) => {
        if (window.confirm('Delete this user?')) {
            try {
                await axios.delete(`${API_URL}/admin/users/${id}`, getHeaders());
                fetchData();
            } catch (error) {
                console.error(error);
                alert('Failed to delete user');
            }
        }
    };

    const updateOrderStatus = async (id, status) => {
        try {
            await axios.put(`${API_URL}/orders/${id}/status`, { status }, getHeaders());
            fetchData();
        } catch (err) {
            console.error(err);
            alert('Failed to update status');
        }
    };

    const renderSidebar = () => (
        <div className="w-64 bg-white shadow-xl border-r border-gray-100 flex flex-col h-screen fixed">
            <div className="p-6 border-b border-gray-100">
                <span className="font-black text-2xl text-[#FF1E5E] tracking-tight" style={{ fontFamily: "'Nunito', sans-serif" }}>
                    only baby<span className="text-[#FF1E5E]/60 text-[10px] align-top ml-0.5">®</span>
                </span>
                <p className="text-xs text-gray-500 font-bold mt-1">Admin Panel</p>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {[
                    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                    { id: 'products', icon: Package, label: 'Toys & Products' },
                    { id: 'users', icon: Users, label: 'Customers' },
                    { id: 'orders', icon: ShoppingCart, label: 'Orders' },
                ].map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 font-bold text-sm ${activeTab === item.id
                            ? 'bg-[#5BB8F5] text-white shadow-md shadow-[#5BB8F5]/20'
                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                    >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                    </button>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-100 space-y-2">
                <Link
                    to="/"
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-500 hover:bg-blue-50 hover:text-[#5BB8F5] transition-all font-bold text-sm"
                >
                    <Home className="w-5 h-5" />
                    Back to Home
                </Link>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-500 hover:bg-red-50 transition-all font-bold text-sm"
                >
                    <LogOut className="w-5 h-5" />
                    Logout
                </button>
            </div>
        </div>
    );

    const renderDashboard = () => (
        <div className="animate-fade-in">
            <h2 className="text-3xl font-black text-gray-900 mb-8">Dashboard Overview</h2>
            {stats && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: 'Total Toys', value: stats.totalToys, icon: Package, color: 'text-blue-500', bg: 'bg-blue-100' },
                        { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-green-500', bg: 'bg-green-100' },
                        { label: 'Total Orders', value: stats.totalOrders, icon: ShoppingCart, color: 'text-purple-500', bg: 'bg-purple-100' },
                        { label: 'Pending Orders', value: stats.pendingOrders, icon: AlertCircle, color: 'text-orange-500', bg: 'bg-orange-100' },
                        { label: 'Low Stock Alerts', value: stats.lowStockAlerts, icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-100' },
                        { label: 'Total Revenue', value: `₹${stats.totalRevenue?.toLocaleString() || 0}`, icon: LayoutDashboard, color: 'text-[#FF1E5E]', bg: 'bg-[#FF1E5E]/10' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4 transition-transform hover:-translate-y-1">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                                <stat.icon className="w-7 h-7" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-500">{stat.label}</p>
                                <p className="text-2xl font-black text-gray-900">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    const renderProducts = () => (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-black text-gray-900">Toys & Products</h2>
                <button
                    onClick={() => {
                        setEditingProduct(null);
                        setProductForm({ name: '', price: '', originalPrice: '', category: 'Toys', ageGroup: '', image: '', description: '', stock: 10 });
                        setIsProductModalOpen(true);
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#5BB8F5] text-white font-bold rounded-2xl hover:bg-[#4AA7E4] transition-all shadow-md shadow-[#5BB8F5]/30"
                >
                    <Plus className="w-5 h-5" /> Add New
                </button>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="p-4 text-xs font-black text-gray-500 tracking-wider uppercase">Image</th>
                            <th className="p-4 text-xs font-black text-gray-500 tracking-wider uppercase">Name</th>
                            <th className="p-4 text-xs font-black text-gray-500 tracking-wider uppercase">Price</th>
                            <th className="p-4 text-xs font-black text-gray-500 tracking-wider uppercase">Stock</th>
                            <th className="p-4 text-xs font-black text-gray-500 tracking-wider uppercase">Category</th>
                            <th className="p-4 text-xs font-black text-gray-500 tracking-wider uppercase text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p) => (
                            <tr key={p._id} className="border-b border-gray-50 hover:bg-gray-50/50">
                                <td className="p-4"><img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded-xl bg-gray-100" /></td>
                                <td className="p-4 font-bold text-gray-900 max-w-[200px] truncate">{p.name}</td>
                                <td className="p-4 font-bold text-gray-900">₹{p.price}</td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${p.stock <= 5 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                        {p.stock} in stock
                                    </span>
                                </td>
                                <td className="p-4 font-semibold text-gray-500">{p.category}</td>
                                <td className="p-4 flex justify-end gap-2">
                                    <button
                                        onClick={() => {
                                            setEditingProduct(p);
                                            setProductForm({ ...p });
                                            setIsProductModalOpen(true);
                                        }}
                                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => deleteProduct(p._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderUsers = () => (
        <div className="animate-fade-in">
            <h2 className="text-3xl font-black text-gray-900 mb-8">Registered Users</h2>
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="p-4 text-xs font-black text-gray-500 tracking-wider uppercase">Name</th>
                            <th className="p-4 text-xs font-black text-gray-500 tracking-wider uppercase">Email</th>
                            <th className="p-4 text-xs font-black text-gray-500 tracking-wider uppercase">Joined</th>
                            <th className="p-4 text-xs font-black text-gray-500 tracking-wider uppercase text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="p-8 text-center text-gray-500 font-bold">
                                    No registered customers found.
                                </td>
                            </tr>
                        ) : (
                            users.map((u) => (
                                <tr key={u._id} className="border-b border-gray-50 hover:bg-gray-50/50">
                                    <td className="p-4 font-bold text-gray-900">{u.name}</td>
                                    <td className="p-4 font-semibold text-gray-500">{u.email}</td>
                                    <td className="p-4 font-semibold text-gray-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                                    <td className="p-4 text-right">
                                        <button onClick={() => deleteUser(u._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderOrders = () => (
        <div className="animate-fade-in">
            <h2 className="text-3xl font-black text-gray-900 mb-8">Orders</h2>
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[900px]">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="p-4 text-xs font-black text-gray-500 tracking-wider uppercase">Order No</th>
                            <th className="p-4 text-xs font-black text-gray-500 tracking-wider uppercase">Customer</th>
                            <th className="p-4 text-xs font-black text-gray-500 tracking-wider uppercase">Total</th>
                            <th className="p-4 text-xs font-black text-gray-500 tracking-wider uppercase">Payment</th>
                            <th className="p-4 text-xs font-black text-gray-500 tracking-wider uppercase">Payment ID</th>
                            <th className="p-4 text-xs font-black text-gray-500 tracking-wider uppercase">Date</th>
                            <th className="p-4 text-xs font-black text-gray-500 tracking-wider uppercase">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="p-8 text-center text-gray-500 font-bold">
                                    No orders found.
                                </td>
                            </tr>
                        ) : (
                            orders.map((o) => (
                                <tr key={o._id} className="border-b border-gray-50 hover:bg-gray-50/50">
                                    <td className="p-4 font-bold text-gray-900 text-sm">{o.orderNumber}</td>
                                    <td className="p-4 font-semibold text-gray-500 text-sm">{o.user?.name || 'Unknown'}</td>
                                    <td className="p-4 font-bold text-gray-900 text-sm">₹{o.totalAmount}</td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${o.paymentStatus === 'Paid'
                                            ? 'bg-green-100 text-green-700'
                                            : o.paymentStatus === 'Failed'
                                                ? 'bg-red-100 text-red-700'
                                                : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${o.paymentStatus === 'Paid' ? 'bg-green-500' :
                                                o.paymentStatus === 'Failed' ? 'bg-red-500' : 'bg-yellow-500'
                                                }`} />
                                            {o.paymentStatus || 'Pending'}
                                        </span>
                                        <p className="text-[10px] text-gray-400 mt-0.5">{o.paymentMethod}</p>
                                    </td>
                                    <td className="p-4">
                                        {o.razorpayPaymentId ? (
                                            <span className="font-mono text-[11px] text-[#4A4A68] bg-gray-100 px-2 py-0.5 rounded-lg">
                                                {o.razorpayPaymentId}
                                            </span>
                                        ) : (
                                            <span className="text-gray-300 text-xs">—</span>
                                        )}
                                    </td>
                                    <td className="p-4 font-semibold text-gray-500 text-sm">{new Date(o.createdAt).toLocaleDateString()}</td>
                                    <td className="p-4">
                                        <select
                                            value={o.status}
                                            onChange={(e) => updateOrderStatus(o._id, e.target.value)}
                                            className="bg-gray-100 text-gray-900 text-sm font-bold rounded-xl px-3 py-1 outline-none focus:ring-2 ring-[#5BB8F5]"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-[#F8FAFF]">
            {renderSidebar()}
            <div className="flex-1 ml-64 p-8 overflow-y-auto">
                {/* Error Banner */}
                {fetchError && (
                    <div className="mb-6 bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <p className="text-red-700 font-bold text-sm">{fetchError}</p>
                            <p className="text-red-500 text-xs mt-1">
                                Make sure you are logged in as <strong>Raja (admin)</strong> with a valid session.
                            </p>
                        </div>
                        <button
                            onClick={fetchData}
                            className="text-xs font-bold text-red-600 border border-red-300 px-3 py-1.5 rounded-xl hover:bg-red-100 transition-all"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="w-10 h-10 border-4 border-[#5BB8F5] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <>
                        {activeTab === 'dashboard' && renderDashboard()}
                        {activeTab === 'products' && renderProducts()}
                        {activeTab === 'users' && renderUsers()}
                        {activeTab === 'orders' && renderOrders()}
                    </>
                )}
            </div>

            {/* Product Modal */}
            {isProductModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-6 overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-black text-gray-900">{editingProduct ? 'Edit Toy' : 'Add New Toy'}</h3>
                            <button onClick={() => setIsProductModalOpen(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>
                        <form onSubmit={handleProductSubmit} className="flex-1 overflow-y-auto pr-2 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Name</label>
                                    <input required type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#5BB8F5] font-semibold text-gray-900" value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Category</label>
                                    <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#5BB8F5] font-semibold text-gray-900" value={productForm.category} onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}>
                                        {['Toys', 'Baby Care', 'Feeding', 'Diapers', 'Gear', 'Wipes', 'Others'].map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Price (₹)</label>
                                    <input required type="number" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#5BB8F5] font-semibold text-gray-900" value={productForm.price} onChange={(e) => setProductForm({ ...productForm, price: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Original Price (₹)</label>
                                    <input required type="number" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#5BB8F5] font-semibold text-gray-900" value={productForm.originalPrice} onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Stock Qty</label>
                                    <input required type="number" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#5BB8F5] font-semibold text-gray-900" value={productForm.stock} onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Age Group</label>
                                    <input required type="text" placeholder="e.g. 0-2 years" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#5BB8F5] font-semibold text-gray-900" value={productForm.ageGroup} onChange={(e) => setProductForm({ ...productForm, ageGroup: e.target.value })} />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Image URL</label>
                                    <input required type="text" placeholder="https://..." className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#5BB8F5] font-semibold text-gray-900" value={productForm.image} onChange={(e) => setProductForm({ ...productForm, image: e.target.value })} />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Description</label>
                                    <textarea required rows="3" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#5BB8F5] font-semibold text-gray-900" value={productForm.description} onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}></textarea>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-gray-100 flex gap-3 justify-end mt-4">
                                <button type="button" onClick={() => setIsProductModalOpen(false)} className="px-6 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-all">Cancel</button>
                                <button type="submit" className="px-6 py-2.5 rounded-xl font-bold bg-[#5BB8F5] text-white hover:bg-[#4AA7E4] shadow-md shadow-[#5BB8F5]/30 transition-all">{editingProduct ? 'Save Changes' : 'Publish Toy'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
