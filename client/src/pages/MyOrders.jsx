import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Package, Truck, CheckCircle2, XCircle, ChevronRight, Clock, MapPin, Hash } from 'lucide-react';
import { orderAPI } from '../services/api';
import SEO from '../components/common/SEO';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const response = await orderAPI.getAll();
                setOrders(response.data.data || []);
            } catch (err) {
                console.error('Error fetching orders:', err);
                setError('Failed to load your orders. Let\'s try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const getStatusStyles = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered':
                return 'bg-[#4CC9A0]/10 text-[#4CC9A0] border-[#4CC9A0]/20';
            case 'shipped':
                return 'bg-[#5BB8F5]/10 text-[#5BB8F5] border-[#5BB8F5]/20';
            case 'processing':
                return 'bg-secondary-yellow/10 text-secondary-yellow border-secondary-yellow/20';
            case 'cancelled':
                return 'bg-secondary-pink/10 text-secondary-pink border-secondary-pink/20';
            default:
                return 'bg-[#9898BB]/10 text-[#9898BB] border-[#9898BB]/20';
        }
    };

    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered': return <CheckCircle2 className="w-4 h-4" />;
            case 'shipped': return <Truck className="w-4 h-4" />;
            case 'processing': return <Clock className="w-4 h-4" />;
            case 'cancelled': return <XCircle className="w-4 h-4" />;
            default: return <Package className="w-4 h-4" />;
        }
    };

    return (
        <div className="bg-white min-h-screen">
            <SEO
                title="My Orders - Only Baby"
                description="View and track your previous orders from Only Baby."
            />

            {/* Header Section */}
            <header className="bg-[#F8FAFF] py-20 px-6 border-b border-[#EEF0F8]">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                        <div className="space-y-3">
                            <span className="inline-block px-4 py-1.5 bg-[#FF1E5E]/10 text-[#FF1E5E] text-[10px] font-black uppercase tracking-widest rounded-full">Order History</span>
                            <h1 className="text-4xl md:text-5xl font-black text-[#1E1E2E]" style={{ fontFamily: "'Nunito', sans-serif" }}>
                                My <span className="gradient-text">Joy Packages</span>
                            </h1>
                            <p className="text-[#9898BB] font-bold text-sm">Review your past orders and track current shipments.</p>
                        </div>
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#EEF0F8] flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-[#5BB8F5]/10 flex items-center justify-center text-[#5BB8F5]">
                                <ShoppingBag className="w-6 h-6" />
                            </div>
                            <div>
                                <span className="text-2xl font-black text-[#1E1E2E] block leading-none">{orders.length}</span>
                                <span className="text-[10px] font-black uppercase tracking-widest text-[#9898BB]">Total Orders</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-16">
                {loading ? (
                    <div className="space-y-8 animate-pulse">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-64 bg-[#F8FAFF] rounded-[40px] border-2 border-dashed border-[#EEF0F8]" />
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-center py-20 bg-secondary-pink-light/30 rounded-[60px] border-2 border-dashed border-secondary-pink/20">
                        <div className="text-6xl mb-6">🛰️</div>
                        <h3 className="text-2xl font-black text-[#1E1E2E] mb-2">Signal Lost!</h3>
                        <p className="text-[#9898BB] font-bold mb-8 max-w-xs mx-auto">{error}</p>
                        <button onClick={() => window.location.reload()} className="btn-primary px-10">Retry Connection</button>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-24 bg-[#F8FAFF] rounded-[60px] border-2 border-dashed border-[#EEF0F8] space-y-6">
                        <div className="text-8xl select-none grayscale opacity-50">🐣</div>
                        <h3 className="text-2xl font-black text-[#1E1E2E]" style={{ fontFamily: "'Nunito', sans-serif" }}>No Joy Found... yet!</h3>
                        <p className="text-[#9898BB] font-medium max-w-sm mx-auto">You haven't placed any orders with us. Start your shopping journey today!</p>
                        <Link to="/products" className="btn-primary inline-block px-10">Explore Our Shop</Link>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {orders.map((order) => (
                            <div key={order._id} className="group bg-white rounded-[40px] border-2 border-[#EEF0F8] hover:border-[#5BB8F5]/30 hover:shadow-2xl hover:shadow-[#5BB8F5]/10 transition-all duration-500 overflow-hidden">
                                {/* Order Status Header */}
                                <div className="p-6 md:p-8 bg-[#F8FAFF] border-b border-[#EEF0F8] flex flex-wrap items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-black uppercase tracking-wider ${getStatusStyles(order.status)}`}>
                                            {getStatusIcon(order.status)}
                                            {order.status || 'Pending'}
                                        </div>
                                        <div className="hidden sm:flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#9898BB]">
                                            <Hash className="w-3.5 h-3.5" />
                                            {order.orderNumber}
                                        </div>
                                    </div>
                                    <div className="text-[11px] font-black uppercase tracking-widest text-[#9898BB] flex items-center gap-2">
                                        <Clock className="w-3.5 h-3.5" />
                                        Ordered on {new Date(order.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="p-6 md:p-8 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            {order.items.map((item, idx) => (
                                                <div key={idx} className="flex items-center gap-4">
                                                    <div className="w-16 h-16 rounded-2xl bg-[#F8FAFF] border border-[#EEF0F8] flex-shrink-0 p-2 group-hover:bg-white transition-colors duration-500">
                                                        <img
                                                            src={item.product?.image}
                                                            alt={item.product?.name}
                                                            className="w-full h-full object-contain mix-blend-multiply"
                                                        />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h4 className="font-black text-[#1E1E2E] text-sm truncate">{item.product?.name || 'Toy Item'}</h4>
                                                        <p className="text-[11px] font-black text-[#9898BB] uppercase tracking-widest">
                                                            Qty: {item.quantity} × ₹{item.price}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Shipping Info Card */}
                                        <div className="bg-[#F8FAFF] rounded-3xl p-6 border border-[#EEF0F8] space-y-4">
                                            <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#5BB8F5]">
                                                <MapPin className="w-3.5 h-3.5" /> Shipping Address
                                            </div>
                                            <div className="text-sm font-bold text-[#1E1E2E] leading-relaxed">
                                                <p className="font-extrabold mb-1">{order.shippingAddress?.fullName}</p>
                                                <p className="text-[#9898BB]">{order.shippingAddress?.address}</p>
                                                <p className="text-[#9898BB]">{order.shippingAddress?.city}, {order.shippingAddress?.pinCode}</p>
                                                <p className="text-[#9898BB]">{order.shippingAddress?.phone}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Footer */}
                                <div className="p-6 md:p-8 bg-[#F8FAFF]/50 border-t border-[#EEF0F8] flex flex-wrap items-center justify-between gap-6">
                                    <div className="flex items-center gap-8">
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-[#9898BB]">Order Total</span>
                                            <p className="text-2xl font-black text-[#FF1E5E]">₹{order.totalAmount}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-[#9898BB]">Payment</span>
                                            <p className="text-sm font-black text-[#1E1E2E] flex items-center gap-2">
                                                <CheckCircle2 className={`w-4 h-4 ${order.paymentStatus === 'Paid' ? 'text-[#4CC9A0]' : 'text-secondary-yellow'}`} />
                                                {order.paymentStatus || 'Pending'}
                                            </p>
                                        </div>
                                    </div>
                                    <Link to={`/products`} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#5BB8F5] hover:text-[#FF1E5E] transition-all group/link">
                                        Write a Review
                                        <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default MyOrders;
