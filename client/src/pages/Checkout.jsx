import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    MapPin, CreditCard, Smartphone, Truck,
    ChevronDown, ChevronUp, CheckCircle2, Lock, ArrowRight,
    ShieldCheck, IndianRupee
} from 'lucide-react';
import { useCart } from '../context/CartContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID;

const STEPS = ['Shipping', 'Payment', 'Review'];

const indianStates = [
    'Andhra Pradesh', 'Delhi', 'Goa', 'Gujarat', 'Haryana',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
    'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana',
    'Uttar Pradesh', 'West Bengal'
];

const Checkout = () => {
    const { cartItems, getCartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [placedOrder, setPlacedOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showOrderItems, setShowOrderItems] = useState(false);
    const [payError, setPayError] = useState('');

    const subtotal = getCartTotal();
    const shipping = subtotal >= 999 ? 0 : 99;
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + shipping + tax;

    const [address, setAddress] = useState({
        fullName: '', phone: '', email: '',
        line1: '', line2: '', city: '', state: '', pincode: ''
    });

    // payment method: 'razorpay' | 'cod'
    const [payMethod, setPayMethod] = useState('razorpay');
    const [errors, setErrors] = useState({});

    // ─── Validation ───────────────────────────────────────────
    const validateAddress = () => {
        const e = {};
        if (!address.fullName.trim()) e.fullName = 'Full name is required';
        if (!address.phone.match(/^[6-9]\d{9}$/)) e.phone = 'Enter valid 10-digit phone';
        if (!address.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Enter valid email';
        if (!address.line1.trim()) e.line1 = 'Address is required';
        if (!address.city.trim()) e.city = 'City is required';
        if (!address.state) e.state = 'Select a state';
        if (!address.pincode.match(/^\d{6}$/)) e.pincode = 'Enter valid 6-digit pincode';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const inputClass = (field) =>
        `w-full border rounded-xl px-4 py-2.5 text-sm text-[#1A1A2E] placeholder-gray-400 outline-none transition-all ${errors[field]
            ? 'border-red-400 bg-red-50 focus:border-red-400'
            : 'border-gray-200 bg-white focus:border-[#E8735A]'
        }`;

    const labelClass = 'block text-xs font-semibold text-[#4A4A68] mb-1.5 uppercase tracking-wider';

    // ─── Helpers ──────────────────────────────────────────────
    const getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        return {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        };
    };

    // ─── COD order ────────────────────────────────────────────
    const placeCODOrder = async () => {
        setLoading(true);
        setPayError('');
        try {
            const orderItems = cartItems.map(item => ({
                product: item._id || item.id,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                image: item.image
            }));

            const res = await fetch(`${API_URL}/api/orders`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify({
                    items: orderItems,
                    shippingAddress: {
                        fullName: address.fullName,
                        address: `${address.line1}${address.line2 ? ', ' + address.line2 : ''}`,
                        city: address.city,
                        state: address.state,
                        pinCode: address.pincode,
                        phone: address.phone
                    },
                    paymentMethod: 'COD',
                    totalAmount: total
                })
            });

            const data = await res.json();
            if (res.ok && data.success) {
                setPlacedOrder(data.data);
                clearCart();
                setOrderPlaced(true);
            } else {
                setPayError(data.message || 'Order failed. Please try again.');
            }
        } catch {
            setPayError('Network error. Check your connection.');
        } finally {
            setLoading(false);
        }
    };

    // ─── Razorpay flow ─────────────────────────────────────────
    const handleRazorpayPayment = async () => {
        setLoading(true);
        setPayError('');

        try {
            // Step 1: Create Razorpay order on backend
            const rpRes = await fetch(`${API_URL}/api/orders/razorpay`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify({ amount: total })
            });
            const rpData = await rpRes.json();

            if (!rpRes.ok || !rpData.success) {
                setPayError(rpData.message || 'Failed to initiate payment. Try again.');
                setLoading(false);
                return;
            }

            const razorpayOrder = rpData.data;

            // Step 2: Create the order record in our DB (status = Pending)
            const orderItems = cartItems.map(item => ({
                product: item._id || item.id,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                image: item.image
            }));

            const orderRes = await fetch(`${API_URL}/api/orders`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify({
                    items: orderItems,
                    shippingAddress: {
                        fullName: address.fullName,
                        address: `${address.line1}${address.line2 ? ', ' + address.line2 : ''}`,
                        city: address.city,
                        state: address.state,
                        pinCode: address.pincode,
                        phone: address.phone
                    },
                    paymentMethod: 'Razorpay',
                    totalAmount: total,
                    razorpayOrderId: razorpayOrder.id
                })
            });

            const orderData = await orderRes.json();
            if (!orderRes.ok || !orderData.success) {
                setPayError('Order creation failed. Please try again.');
                setLoading(false);
                return;
            }

            const dbOrder = orderData.data;

            // Step 3: Open Razorpay Checkout popup
            const options = {
                key: RAZORPAY_KEY,
                amount: razorpayOrder.amount,
                currency: razorpayOrder.currency,
                name: 'Only Baby',
                description: `Order #${dbOrder.orderNumber}`,
                image: '/assets/logo/logo.png',
                order_id: razorpayOrder.id,
                prefill: {
                    name: address.fullName,
                    email: address.email,
                    contact: address.phone
                },
                notes: {
                    orderId: dbOrder._id,
                    orderNumber: dbOrder.orderNumber
                },
                theme: {
                    color: '#E8735A'
                },
                handler: async (response) => {
                    // Step 4: Verify payment on backend
                    try {
                        const verifyRes = await fetch(`${API_URL}/api/orders/verify`, {
                            method: 'POST',
                            headers: getAuthHeaders(),
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                orderId: dbOrder._id
                            })
                        });
                        const verifyData = await verifyRes.json();

                        if (verifyRes.ok && verifyData.success) {
                            setPlacedOrder({ ...dbOrder, razorpayPaymentId: response.razorpay_payment_id });
                            clearCart();
                            setOrderPlaced(true);
                        } else {
                            setPayError('Payment verification failed. Contact support with your payment ID: ' + response.razorpay_payment_id);
                        }
                    } catch {
                        setPayError('Verification error. Save your payment ID: ' + response.razorpay_payment_id);
                    }
                    setLoading(false);
                },
                modal: {
                    ondismiss: () => {
                        setLoading(false);
                        setPayError('Payment was cancelled. Please try again.');
                    }
                }
            };

            if (!window.Razorpay) {
                setPayError('Razorpay SDK not loaded. Please refresh the page.');
                setLoading(false);
                return;
            }

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', (response) => {
                setPayError(`Payment failed: ${response.error.description}`);
                setLoading(false);
            });
            rzp.open();

        } catch {
            setPayError('Network error. Please check your connection.');
            setLoading(false);
        }
    };

    const handlePlaceOrder = () => {
        if (payMethod === 'cod') {
            placeCODOrder();
        } else {
            handleRazorpayPayment();
        }
    };

    // ─── Order Success Screen ──────────────────────────────────
    if (orderPlaced) {
        return (
            <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-4 py-16">
                <div className="max-w-md w-full bg-white rounded-3xl border border-gray-100 shadow-xl p-10 text-center">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-in">
                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>

                    <h1 className="text-2xl font-bold text-[#1A1A2E] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Order Confirmed! 🎉
                    </h1>
                    <p className="text-[#9898AA] text-sm mb-6">
                        Thank you, <strong className="text-[#1A1A2E]">{address.fullName}</strong>! Your order has been placed successfully.
                    </p>

                    <div className="bg-[#FAFAFA] rounded-2xl p-5 mb-6 text-left space-y-3 border border-gray-100">
                        {placedOrder?.orderNumber && (
                            <div className="flex justify-between text-sm">
                                <span className="text-[#9898AA]">Order ID</span>
                                <span className="font-bold text-[#1A1A2E]">#{placedOrder.orderNumber}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-sm">
                            <span className="text-[#9898AA]">Total Paid</span>
                            <span className="font-bold text-[#E8735A]">₹{total}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-[#9898AA]">Payment</span>
                            <span className="font-medium text-[#1A1A2E]">
                                {payMethod === 'razorpay' ? (
                                    <span className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
                                        Paid via Razorpay
                                    </span>
                                ) : 'Cash on Delivery'}
                            </span>
                        </div>
                        {placedOrder?.razorpayPaymentId && (
                            <div className="flex justify-between text-sm">
                                <span className="text-[#9898AA]">Payment ID</span>
                                <span className="font-mono text-xs text-[#4A4A68]">{placedOrder.razorpayPaymentId}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-sm">
                            <span className="text-[#9898AA]">Est. Delivery</span>
                            <span className="font-medium text-green-600">3–5 Business Days</span>
                        </div>
                    </div>

                    <div className="bg-[#FDEAE6] rounded-2xl p-4 mb-6 text-left">
                        <div className="flex items-center gap-2 mb-2">
                            <MapPin className="w-4 h-4 text-[#E8735A]" />
                            <span className="text-xs font-semibold text-[#E8735A] uppercase tracking-wider">Delivery To</span>
                        </div>
                        <p className="text-sm font-semibold text-[#1A1A2E]">{address.fullName}</p>
                        <p className="text-xs text-[#4A4A68] mt-0.5">{address.line1}{address.line2 ? `, ${address.line2}` : ''}</p>
                        <p className="text-xs text-[#4A4A68]">{address.city}, {address.state} – {address.pincode}</p>
                        <p className="text-xs text-[#4A4A68]">{address.phone}</p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Link to="/orders" className="btn-primary w-full justify-center py-3 text-sm">
                            View My Orders
                        </Link>
                        <Link to="/" className="btn-outline w-full justify-center py-3 text-sm">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // ─── Main Checkout Layout ──────────────────────────────────
    return (
        <div className="bg-[#FAFAFA] min-h-screen py-8">
            <div className="max-w-6xl mx-auto px-4 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <nav className="flex items-center gap-2 text-xs text-[#9898AA] mb-3">
                        <Link to="/" className="hover:text-[#E8735A]">Home</Link>
                        <span>/</span>
                        <Link to="/cart" className="hover:text-[#E8735A]">Cart</Link>
                        <span>/</span>
                        <span className="text-[#E8735A]">Checkout</span>
                    </nav>
                    <h1 className="text-3xl font-bold text-[#1A1A2E]" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Secure Checkout
                    </h1>
                </div>

                {/* Stepper */}
                <div className="flex items-center mb-8 bg-white rounded-2xl border border-gray-100 px-6 py-4">
                    {STEPS.map((s, i) => (
                        <React.Fragment key={s}>
                            <div className="flex items-center gap-2.5 flex-shrink-0">
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${i < step ? 'bg-green-500 text-white' :
                                    i === step ? 'bg-[#E8735A] text-white' :
                                        'bg-gray-100 text-gray-400'
                                    }`}>
                                    {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                                </div>
                                <span className={`text-sm font-medium hidden sm:block ${i === step ? 'text-[#E8735A]' : i < step ? 'text-green-600' : 'text-gray-400'}`}>
                                    {s}
                                </span>
                            </div>
                            {i < STEPS.length - 1 && (
                                <div className={`flex-1 h-0.5 mx-3 rounded-full transition-all ${i < step ? 'bg-green-400' : 'bg-gray-200'}`} />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
                    {/* Left Panel */}
                    <div className="lg:col-span-2">

                        {/* ─── Step 0: Shipping ─── */}
                        {step === 0 && (
                            <div className="bg-white rounded-2xl border border-gray-100 p-6">
                                <div className="flex items-center gap-2 mb-6">
                                    <MapPin className="w-5 h-5 text-[#E8735A]" />
                                    <h2 className="font-bold text-[#1A1A2E]">Shipping Address</h2>
                                </div>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className={labelClass}>Full Name *</label>
                                            <input className={inputClass('fullName')} placeholder="Priya Sharma"
                                                value={address.fullName} onChange={e => setAddress({ ...address, fullName: e.target.value })} />
                                            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                                        </div>
                                        <div>
                                            <label className={labelClass}>Phone Number *</label>
                                            <input className={inputClass('phone')} placeholder="9876543210" maxLength={10}
                                                value={address.phone} onChange={e => setAddress({ ...address, phone: e.target.value.replace(/\D/, '') })} />
                                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label className={labelClass}>Email Address *</label>
                                        <input className={inputClass('email')} placeholder="priya@email.com" type="email"
                                            value={address.email} onChange={e => setAddress({ ...address, email: e.target.value })} />
                                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                    </div>

                                    <div>
                                        <label className={labelClass}>Address Line 1 *</label>
                                        <input className={inputClass('line1')} placeholder="House / Flat No., Building Name, Colony"
                                            value={address.line1} onChange={e => setAddress({ ...address, line1: e.target.value })} />
                                        {errors.line1 && <p className="text-red-500 text-xs mt-1">{errors.line1}</p>}
                                    </div>

                                    <div>
                                        <label className={labelClass}>Address Line 2 (Optional)</label>
                                        <input className={inputClass('line2')} placeholder="Street, Landmark, Area"
                                            value={address.line2} onChange={e => setAddress({ ...address, line2: e.target.value })} />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div>
                                            <label className={labelClass}>City *</label>
                                            <input className={inputClass('city')} placeholder="Mumbai"
                                                value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} />
                                            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                                        </div>
                                        <div>
                                            <label className={labelClass}>State *</label>
                                            <select className={inputClass('state')} value={address.state}
                                                onChange={e => setAddress({ ...address, state: e.target.value })}>
                                                <option value="">Select State</option>
                                                {indianStates.map(s => <option key={s}>{s}</option>)}
                                            </select>
                                            {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                                        </div>
                                        <div>
                                            <label className={labelClass}>Pincode *</label>
                                            <input className={inputClass('pincode')} placeholder="400001" maxLength={6}
                                                value={address.pincode} onChange={e => setAddress({ ...address, pincode: e.target.value.replace(/\D/, '') })} />
                                            {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => { if (validateAddress()) setStep(1); }}
                                    className="btn-primary mt-6 py-3 px-8 gap-2"
                                >
                                    Continue to Payment <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        )}

                        {/* ─── Step 1: Payment Method ─── */}
                        {step === 1 && (
                            <div className="bg-white rounded-2xl border border-gray-100 p-6">
                                <div className="flex items-center gap-2 mb-6">
                                    <CreditCard className="w-5 h-5 text-[#E8735A]" />
                                    <h2 className="font-bold text-[#1A1A2E]">Payment Method</h2>
                                    <Lock className="w-3.5 h-3.5 text-green-500 ml-1" />
                                </div>

                                {/* Method Tabs */}
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    {/* Razorpay Option */}
                                    <button
                                        onClick={() => setPayMethod('razorpay')}
                                        className={`flex flex-col items-start gap-2 p-4 rounded-2xl border-2 transition-all text-left ${payMethod === 'razorpay'
                                            ? 'border-[#E8735A] bg-[#FFF6F4]'
                                            : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${payMethod === 'razorpay' ? 'border-[#E8735A]' : 'border-gray-300'}`}>
                                                {payMethod === 'razorpay' && <div className="w-2 h-2 bg-[#E8735A] rounded-full" />}
                                            </div>
                                            <span className="font-bold text-sm text-[#1A1A2E]">Pay Online</span>
                                        </div>
                                        <div className="flex flex-wrap gap-1.5 pl-6">
                                            {['UPI', 'Card', 'Net Banking', 'Wallet'].map(m => (
                                                <span key={m} className="text-[10px] bg-white border border-gray-200 text-[#4A4A68] px-2 py-0.5 rounded-full font-semibold">{m}</span>
                                            ))}
                                        </div>
                                        <p className="pl-6 text-[11px] text-[#9898AA]">Powered by Razorpay</p>
                                    </button>

                                    {/* COD Option */}
                                    <button
                                        onClick={() => setPayMethod('cod')}
                                        className={`flex flex-col items-start gap-2 p-4 rounded-2xl border-2 transition-all text-left ${payMethod === 'cod'
                                            ? 'border-[#E8735A] bg-[#FFF6F4]'
                                            : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${payMethod === 'cod' ? 'border-[#E8735A]' : 'border-gray-300'}`}>
                                                {payMethod === 'cod' && <div className="w-2 h-2 bg-[#E8735A] rounded-full" />}
                                            </div>
                                            <span className="font-bold text-sm text-[#1A1A2E]">Cash on Delivery</span>
                                        </div>
                                        <div className="pl-6 flex items-center gap-2">
                                            <Truck className="w-4 h-4 text-[#E8735A]" />
                                            <p className="text-[11px] text-[#9898AA]">Pay when your order arrives</p>
                                        </div>
                                        <p className="pl-6 text-[10px] text-orange-500 font-medium">₹30 COD handling fee may apply</p>
                                    </button>
                                </div>

                                {/* Razorpay detail info */}
                                {payMethod === 'razorpay' && (
                                    <div className="bg-blue-50 rounded-2xl p-4 flex items-start gap-3 mb-4">
                                        <ShieldCheck className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm font-semibold text-blue-800">Secure Payment via Razorpay</p>
                                            <p className="text-xs text-blue-600 mt-0.5">
                                                You will be redirected to Razorpay's secure checkout popup. Pay using UPI, Debit/Credit Card, Net Banking, or Wallet.
                                            </p>
                                            <div className="flex items-center gap-2 mt-2">
                                                {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map(app => (
                                                    <span key={app} className="text-[10px] bg-white border border-blue-200 text-blue-700 px-2 py-0.5 rounded-lg font-bold">{app}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex gap-3 mt-4">
                                    <button onClick={() => setStep(0)} className="btn-outline py-3 px-6 text-sm">
                                        ← Back
                                    </button>
                                    <button
                                        onClick={() => setStep(2)}
                                        className="btn-primary py-3 px-8 gap-2"
                                    >
                                        Review Order <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* ─── Step 2: Review ─── */}
                        {step === 2 && (
                            <div className="space-y-4">
                                {/* Address Review */}
                                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-[#E8735A]" />
                                            <h3 className="font-semibold text-[#1A1A2E] text-sm">Delivery Address</h3>
                                        </div>
                                        <button onClick={() => setStep(0)} className="text-xs text-[#E8735A] font-semibold hover:opacity-80">Change</button>
                                    </div>
                                    <p className="text-sm font-semibold text-[#1A1A2E]">{address.fullName} · {address.phone}</p>
                                    <p className="text-xs text-[#4A4A68] mt-1">{address.line1}{address.line2 ? `, ${address.line2}` : ''}</p>
                                    <p className="text-xs text-[#4A4A68]">{address.city}, {address.state} – {address.pincode}</p>
                                    <p className="text-xs text-[#4A4A68]">{address.email}</p>
                                </div>

                                {/* Payment Review */}
                                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <CreditCard className="w-4 h-4 text-[#E8735A]" />
                                            <h3 className="font-semibold text-[#1A1A2E] text-sm">Payment Method</h3>
                                        </div>
                                        <button onClick={() => setStep(1)} className="text-xs text-[#E8735A] font-semibold hover:opacity-80">Change</button>
                                    </div>
                                    {payMethod === 'razorpay' ? (
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                                <Smartphone className="w-4 h-4 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-[#1A1A2E]">Online Payment (Razorpay)</p>
                                                <p className="text-xs text-[#9898AA]">UPI · Card · Net Banking · Wallet</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                                                <Truck className="w-4 h-4 text-orange-500" />
                                            </div>
                                            <p className="text-sm font-semibold text-[#1A1A2E]">Cash on Delivery</p>
                                        </div>
                                    )}
                                </div>

                                {/* Items Review */}
                                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                                    <button
                                        onClick={() => setShowOrderItems(!showOrderItems)}
                                        className="flex items-center justify-between w-full"
                                    >
                                        <span className="font-semibold text-[#1A1A2E] text-sm">{cartItems.length} Items in Order</span>
                                        {showOrderItems ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                                    </button>
                                    {showOrderItems && (
                                        <div className="mt-4 space-y-3 border-t border-gray-100 pt-4">
                                            {cartItems.map(item => (
                                                <div key={item._id || item.id} className="flex items-center gap-3">
                                                    <div className="w-12 h-12 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                                                        <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1.5" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs font-medium text-[#1A1A2E] line-clamp-1">{item.name}</p>
                                                        <p className="text-xs text-[#9898AA]">Qty: {item.quantity}</p>
                                                    </div>
                                                    <p className="text-sm font-bold text-[#E8735A] flex-shrink-0">₹{item.price * item.quantity}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Error */}
                                {payError && (
                                    <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-4 rounded-2xl">
                                        ⚠️ {payError}
                                    </div>
                                )}

                                <div className="flex gap-3">
                                    <button onClick={() => setStep(1)} className="btn-outline py-3 px-6 text-sm">
                                        ← Back
                                    </button>
                                    <button
                                        onClick={handlePlaceOrder}
                                        disabled={loading}
                                        className={`btn-primary flex-1 justify-center py-3.5 text-sm gap-2 ${loading ? 'opacity-75 cursor-wait' : ''}`}
                                    >
                                        {loading ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                                {payMethod === 'razorpay' ? 'Opening Payment...' : 'Placing Order...'}
                                            </>
                                        ) : (
                                            <>
                                                {payMethod === 'razorpay' ? (
                                                    <>
                                                        <Lock className="w-4 h-4" />
                                                        Pay ₹{total} via Razorpay
                                                    </>
                                                ) : (
                                                    <>
                                                        <Truck className="w-4 h-4" />
                                                        Place COD Order · ₹{total}
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
                            <h2 className="font-bold text-[#1A1A2E] mb-4 pb-4 border-b border-gray-100 text-sm">
                                Order Summary ({cartItems.length} items)
                            </h2>

                            <div className="space-y-3 mb-4 max-h-52 overflow-y-auto">
                                {cartItems.map(item => (
                                    <div key={item._id || item.id} className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs text-[#1A1A2E] font-medium line-clamp-1">{item.name}</p>
                                            <p className="text-xs text-[#9898AA]">×{item.quantity}</p>
                                        </div>
                                        <p className="text-xs font-bold text-[#1A1A2E] flex-shrink-0">₹{item.price * item.quantity}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-2.5 border-t border-gray-100 pt-4 mb-4">
                                <div className="flex justify-between text-xs text-[#4A4A68]">
                                    <span>Subtotal</span><span className="font-medium text-[#1A1A2E]">₹{subtotal}</span>
                                </div>
                                <div className="flex justify-between text-xs text-[#4A4A68]">
                                    <span>Shipping</span>
                                    <span className={`font-medium ${shipping === 0 ? 'text-green-600' : 'text-[#1A1A2E]'}`}>
                                        {shipping === 0 ? 'FREE' : `₹${shipping}`}
                                    </span>
                                </div>
                                <div className="flex justify-between text-xs text-[#4A4A68]">
                                    <span>GST (5%)</span><span className="font-medium text-[#1A1A2E]">₹{tax}</span>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-4 mb-4">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-[#1A1A2E] text-sm">Total</span>
                                    <span className="font-bold text-xl text-[#E8735A]">₹{total}</span>
                                </div>
                            </div>

                            {/* Razorpay trust badges */}
                            <div className="bg-green-50 rounded-xl p-3 flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
                                <span className="text-xs text-green-700 font-medium">256-bit SSL encrypted · Razorpay Secured</span>
                            </div>

                            <div className="mt-3 flex items-center justify-center gap-3 opacity-60">
                                <img src="https://img.icons8.com/color/24/visa.png" alt="Visa" className="h-5" />
                                <img src="https://img.icons8.com/color/24/mastercard.png" alt="MC" className="h-5" />
                                <img src="https://img.icons8.com/color/24/upi.png" alt="UPI" className="h-5" />
                                <IndianRupee className="w-4 h-4 text-gray-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
