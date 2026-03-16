import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Shield, Truck, RefreshCcw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import SEO from '../components/common/SEO';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const subtotal = getCartTotal();
    const shipping = subtotal >= 999 ? 0 : 99;
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + shipping + tax;
    const savings = cartItems.reduce((acc, item) => acc + ((item.originalPrice - item.price) * item.quantity), 0);

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center py-16 px-4">
                <SEO title="Shopping Cart | Only Baby" description="Your shopping cart is currently empty. Shop the best baby products in India." url="https://onlybaby.in/cart" />
                <div className="text-center">
                    <div className="w-24 h-24 bg-[#FDEAE6] rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingBag className="w-12 h-12 text-[#E8735A]" />
                    </div>
                    <h2 className="text-3xl font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Your Cart is Empty
                    </h2>
                    <p className="text-[#9898AA] mb-8">
                        You haven't added any products yet. Start shopping!
                    </p>
                    <Link to="/products" className="btn-primary inline-flex items-center gap-2 px-8 py-3.5">
                        <ShoppingBag className="w-4 h-4" />
                        Browse Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#FAFAFA] min-h-screen py-8">
            <SEO title="Shopping Cart | Only Baby" description={`You have ${cartItems.length} items in your shopping cart. Secure checkout available.`} url="https://onlybaby.in/cart" />
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <nav className="flex items-center gap-2 text-xs text-[#9898AA] mb-2">
                        <Link to="/" className="hover:text-[#E8735A]">Home</Link>
                        <span>/</span>
                        <span className="text-[#E8735A]">Shopping Cart</span>
                    </nav>
                    <h1 className="text-3xl lg:text-4xl font-bold text-[#1A1A2E]" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Shopping Cart
                    </h1>
                    <p className="text-[#9898AA] text-sm mt-1">
                        {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map(item => (
                            <div key={item._id || item.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
                                <div className="flex gap-4">
                                    {/* Image */}
                                    <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-contain p-2"
                                            onError={e => { e.target.src = 'https://via.placeholder.com/80'; }}
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-[#1A1A2E] text-sm leading-snug mb-1 line-clamp-2"
                                            style={{ fontFamily: 'Inter, sans-serif' }}>
                                            {item.name}
                                        </h3>
                                        <div className="flex items-center gap-2 mb-2">
                                            {item.category && <span className="badge badge-secondary text-[10px]">{item.category}</span>}
                                            {item.ageGroup && <span className="badge badge-primary text-[10px]">{item.ageGroup}</span>}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg font-bold text-[#E8735A]">₹{item.price}</span>
                                            {item.originalPrice > item.price && (
                                                <span className="text-xs text-[#9898AA] line-through">₹{item.originalPrice}</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Controls */}
                                    <div className="flex flex-col items-end justify-between flex-shrink-0">
                                        <button
                                            onClick={() => removeFromCart(item._id || item.id)}
                                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                                            title="Remove"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>

                                        <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                                            <button
                                                onClick={() => updateQuantity(item._id || item.id, item.quantity - 1)}
                                                className="px-2.5 py-1.5 hover:bg-gray-50 text-[#4A4A68] transition-colors"
                                            >
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="px-3 py-1.5 font-semibold text-sm text-[#1A1A2E] min-w-[32px] text-center">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item._id || item.id, item.quantity + 1)}
                                                className="px-2.5 py-1.5 hover:bg-gray-50 text-[#4A4A68] transition-colors"
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-xs text-[#9898AA]">Subtotal</p>
                                            <p className="font-bold text-[#1A1A2E] text-sm">₹{item.price * item.quantity}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="flex items-center justify-between pt-2">
                            <Link to="/products" className="text-sm font-semibold text-[#E8735A] flex items-center gap-1 hover:opacity-80">
                                ← Continue Shopping
                            </Link>
                            <button onClick={clearCart} className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors">
                                Clear Cart
                            </button>
                        </div>

                        {/* Trust Strip */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-5">
                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    { icon: <Shield className="w-4 h-4" />, text: 'Secure Checkout' },
                                    { icon: <Truck className="w-4 h-4" />, text: 'Fast Delivery' },
                                    { icon: <RefreshCcw className="w-4 h-4" />, text: '7-Day Returns' },
                                ].map((t, i) => (
                                    <div key={i} className="flex items-center gap-2 text-xs text-[#4A4A68]">
                                        <span className="text-[#E8735A]">{t.icon}</span>
                                        {t.text}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
                            <h2 className="font-bold text-[#1A1A2E] text-lg mb-5 pb-4 border-b border-gray-100" style={{ fontFamily: "'Playfair Display', serif" }}>
                                Order Summary
                            </h2>

                            <div className="space-y-3 mb-5">
                                <div className="flex justify-between text-sm text-[#4A4A68]">
                                    <span>Subtotal ({cartItems.length} items)</span>
                                    <span className="font-medium text-[#1A1A2E]">₹{subtotal}</span>
                                </div>
                                <div className="flex justify-between text-sm text-[#4A4A68]">
                                    <span>Shipping</span>
                                    <span className={`font-medium ${shipping === 0 ? 'text-green-600' : 'text-[#1A1A2E]'}`}>
                                        {shipping === 0 ? 'FREE' : `₹${shipping}`}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm text-[#4A4A68]">
                                    <span>GST (5%)</span>
                                    <span className="font-medium text-[#1A1A2E]">₹{tax}</span>
                                </div>
                                {savings > 0 && (
                                    <div className="flex justify-between text-sm text-green-600 bg-green-50 px-3 py-2 rounded-xl">
                                        <span>You Save</span>
                                        <span className="font-semibold">−₹{savings}</span>
                                    </div>
                                )}
                                {subtotal < 999 && (
                                    <div className="text-xs text-[#5B8DB8] bg-[#EAF1F8] px-3 py-2.5 rounded-xl">
                                        Add ₹{999 - subtotal} more for <strong>FREE shipping!</strong>
                                    </div>
                                )}
                            </div>

                            <div className="border-t border-gray-100 pt-4 mb-5">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-[#1A1A2E]">Total</span>
                                    <span className="font-bold text-2xl text-[#E8735A]">₹{total}</span>
                                </div>
                                <p className="text-xs text-[#9898AA] mt-1">Inclusive of all taxes</p>
                            </div>

                            {/* Checkout Button */}
                            <button
                                onClick={() => navigate('/checkout')}
                                className="btn-primary w-full justify-center py-3.5 text-sm gap-2"
                            >
                                Proceed to Checkout
                                <ArrowRight className="w-4 h-4" />
                            </button>

                            {/* Payment icons */}
                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <p className="text-[10px] text-center text-[#9898AA] mb-2">SECURED BY</p>
                                <div className="flex items-center justify-center gap-3">
                                    <img src="https://img.icons8.com/color/24/visa.png" alt="Visa" className="h-5" />
                                    <img src="https://img.icons8.com/color/24/mastercard.png" alt="MC" className="h-5" />
                                    <img src="https://img.icons8.com/color/24/upi.png" alt="UPI" className="h-5" />
                                    <Shield className="w-4 h-4 text-green-500" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
