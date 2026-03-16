import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Star, Plus, Minus, Heart, Share2, ArrowLeft, Shield, Truck, RefreshCw, Check, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { productAPI } from '../services/api';
import ProductCard from '../components/product/ProductCard';
import SEO from '../components/common/SEO';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        setLoading(true);
        productAPI.getById(id)
            .then(res => setProduct(res.data.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));

        window.scrollTo(0, 0);
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center bg-light">
                <div className="text-center p-12 bg-white rounded-[40px] shadow-xl border border-border">
                    <div className="text-8xl mb-6">😕</div>
                    <h2 className="text-3xl font-black text-dark mb-6" style={{ fontFamily: "'Nunito', sans-serif" }}>
                        Product Not Found
                    </h2>
                    <Link to="/products" className="btn-primary">
                        Return to Shop
                    </Link>
                </div>
            </div>
        );
    }

    const discount = product.originalPrice > product.price
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="bg-white min-h-screen">
            <SEO
                title={`${product.name} - Only Baby Premium Store`}
                description={product.description}
                url={`https://onlybaby.in/product/${id}`}
            />

            <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-12">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-3 text-sm font-bold text-muted mb-12">
                    <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                    <span>/</span>
                    <Link to="/products" className="hover:text-primary transition-colors">Shop</Link>
                    <span>/</span>
                    <span className="text-dark truncate max-w-[200px]">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24">
                    {/* Left: Image Gallery Side */}
                    <div className="space-y-6">
                        <div className="relative aspect-square bg-light rounded-[60px] overflow-hidden flex items-center justify-center p-12 lg:p-20 border border-border group">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700 select-none"
                                onError={e => { e.target.src = 'https://placehold.co/800x800/F8FAFF/9898BB?text=🧸+No+Image'; }}
                            />

                            {/* Tags */}
                            <div className="absolute top-8 left-8 flex flex-col gap-3">
                                {discount > 0 && (
                                    <div className="bg-accent text-white font-black text-xs px-5 py-2 rounded-2xl shadow-orange uppercase tracking-widest animate-bounce-in">
                                        Save {discount}%
                                    </div>
                                )}
                                {product.rating >= 4.8 && (
                                    <div className="bg-secondary-mint text-white font-black text-[10px] px-4 py-2 rounded-2xl shadow-lg uppercase tracking-widest flex items-center gap-2">
                                        <Sparkles className="w-3.5 h-3.5" /> Best Seller
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Thumbnails placeholder */}
                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className={`aspect-square rounded-3xl border-2 transition-all cursor-pointer ${i === 1 ? 'border-primary bg-primary/5' : 'border-border bg-light opacity-50 hover:opacity-100'}`}>
                                    <img src={product.image} alt={`${product.name} thumbnail ${i}`} className="w-full h-full object-contain p-2" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Product Info Side */}
                    <div className="flex flex-col">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="bg-[#E8F5FE] text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                                {product.category}
                            </span>
                            <span className="bg-[#FFE8EE] text-secondary-pink px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                                {product.ageGroup}
                            </span>
                        </div>

                        <h1 className="text-4xl lg:text-6xl font-black text-dark mb-6 leading-[1.1]" style={{ fontFamily: "'Nunito', sans-serif" }}>
                            {product.name}
                        </h1>

                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex gap-1 bg-secondary-yellow/10 px-3 py-1.5 rounded-2xl">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-secondary-yellow text-secondary-yellow' : 'text-gray-300'}`} />
                                ))}
                                <span className="ml-2 font-black text-dark text-sm">{product.rating}</span>
                            </div>
                            <span className="text-muted font-bold text-sm">Verified 1.2k+ Satisfied Parents</span>
                        </div>

                        <div className="bg-light p-8 rounded-[40px] mb-10 border border-border">
                            <div className="flex items-baseline gap-4 mb-6">
                                <span className="text-5xl font-black text-dark" style={{ fontFamily: "'Nunito', sans-serif" }}>₹{product.price}</span>
                                {product.originalPrice > product.price && (
                                    <span className="text-2xl text-muted line-through font-bold">₹{product.originalPrice}</span>
                                )}
                            </div>

                            <p className="text-body font-medium leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        {/* Quantity & Cart Actions */}
                        <div className="space-y-6 mb-12">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center bg-light border border-border rounded-2xl overflow-hidden p-1">
                                    <button
                                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                        className="w-12 h-12 flex items-center justify-center hover:bg-white transition-all text-dark hover:shadow-sm rounded-xl"
                                    >
                                        <Minus className="w-5 h-5" />
                                    </button>
                                    <span className="w-16 text-center font-black text-lg text-dark">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(q => q + 1)}
                                        className="w-12 h-12 flex items-center justify-center hover:bg-white transition-all text-dark hover:shadow-sm rounded-xl"
                                    >
                                        <Plus className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="text-muted font-bold">
                                    Total: <span className="text-dark font-black">₹{product.price * quantity}</span>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={!product.inStock}
                                    className={`flex-1 btn-primary py-5 rounded-[40px] text-lg flex items-center gap-3 transition-all ${!product.inStock ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
                                >
                                    {added ? <Check className="w-6 h-6" /> : <ShoppingCart className="w-6 h-6" />}
                                    {added ? 'Added to Joy List!' : 'Add to Cart — Safe & Pure'}
                                </button>
                                <button
                                    onClick={() => setIsWishlisted(!isWishlisted)}
                                    className={`w-20 rounded-[40px] flex items-center justify-center border-2 transition-all ${isWishlisted ? 'bg-secondary-pink-light border-secondary-pink text-secondary-pink' : 'border-border text-muted hover:border-secondary-pink hover:text-secondary-pink'}`}
                                >
                                    <Heart className={`w-7 h-7 ${isWishlisted ? 'fill-secondary-pink' : ''}`} />
                                </button>
                            </div>
                        </div>

                        {/* Trust Badges Details */}
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { icon: <Shield className="w-5 h-5" />, label: 'BPA Free', color: 'text-[#4CC9A0]' },
                                { icon: <Truck className="w-5 h-5" />, label: 'Fast Ship', color: 'text-[#5BB8F5]' },
                                { icon: <RefreshCw className="w-5 h-5" />, label: '7-Day Return', color: 'text-[#FF8E3C]' },
                            ].map((badge, i) => (
                                <div key={i} className="flex flex-col items-center gap-3 p-5 bg-light rounded-3xl border border-border group hover:bg-white hover:shadow-lg transition-all">
                                    <div className={`${badge.color} group-hover:scale-110 transition-transform`}>{badge.icon}</div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#9898BB] text-center">{badge.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
