import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Heart, Eye, Check, Zap, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const [wished, setWished] = useState(false);
    const [added, setAdded] = useState(false);

    const discount = product.originalPrice > product.price
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    const handleAddToCart = (e) => {
        e.preventDefault();
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    const handleWish = (e) => {
        e.preventDefault();
        setWished(prev => !prev);
    };

    // Card accent styling by category
    const accentSettings = {
        Toys: { bg: 'bg-[#FFE8EE]', accent: '#FF6B8A', badge: 'bg-[#FF6B8A]/10 text-[#FF6B8A]' },
        Feeding: { bg: 'bg-[#E8F5FE]', accent: '#5BB8F5', badge: 'bg-[#5BB8F5]/10 text-[#5BB8F5]' },
        'Baby Care': { bg: 'bg-[#E6FAF4]', accent: '#4CC9A0', badge: 'bg-[#4CC9A0]/10 text-[#4CC9A0]' },
        default: { bg: 'bg-[#FDF9EA]', accent: '#FFD166', badge: 'bg-[#FFD166]/10 text-[#FFD166]' }
    };

    const style = accentSettings[product.category] || accentSettings.default;

    return (
        <Link to={`/product/${product._id || product.id}`} className="group block">
            <div className="bg-white rounded-[40px] border border-[#EEF0F8] p-5 lg:p-6 transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 relative overflow-hidden h-full flex flex-col">

                {/* ── Image Area ── */}
                <div className={`relative aspect-square ${style.bg} rounded-[32px] overflow-hidden mb-6 group-hover:bg-white transition-all duration-500`}>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain p-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-700"
                        onError={e => { e.target.src = 'https://placehold.co/400x400/F8FAFF/9898BB?text=🧸+No+Image'; }}
                    />

                    {/* Floating Badges */}
                    {discount > 0 && (
                        <div className="absolute top-4 left-4 bg-accent text-white font-black text-[10px] px-3 py-1 rounded-xl shadow-orange tracking-widest uppercase">
                            -{discount}% OFF
                        </div>
                    )}

                    {product.rating >= 4.8 && (
                        <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-1.5 rounded-full shadow-sm text-secondary-yellow">
                            <Sparkles className="w-4 h-4 fill-secondary-yellow" />
                        </div>
                    )}

                    {/* Quick Action Overlay */}
                    <div className="absolute inset-x-4 bottom-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                        <button onClick={handleWish} className="flex-1 h-12 rounded-2xl bg-white shadow-xl flex items-center justify-center hover:bg-secondary-pink hover:text-white transition-all group/wish">
                            <Heart className={`w-4 h-4 transition-all ${wished ? 'fill-secondary-pink text-white scale-125' : 'text-gray-400 group-hover/wish:text-white'}`} />
                        </button>
                        <button className="flex-1 h-12 rounded-2xl bg-white shadow-xl flex items-center justify-center hover:bg-[#5BB8F5] hover:text-white transition-all group/eye">
                            <Eye className="w-4 h-4 text-gray-400 group-hover/eye:text-white" />
                        </button>
                    </div>
                </div>

                {/* ── Info ── */}
                <div className="flex flex-col flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${style.badge}`}>
                            {product.category}
                        </span>
                        <div className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-secondary-yellow text-secondary-yellow" />
                            <span className="text-xs font-black text-dark">{product.rating}</span>
                        </div>
                    </div>

                    <h3 className="text-sm lg:text-base font-black text-dark line-clamp-2 leading-tight flex-1" style={{ fontFamily: "'Nunito', sans-serif" }}>
                        {product.name}
                    </h3>

                    <div className="flex items-end justify-between pt-2">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#9898BB] mb-0.5">Price</p>
                            <div className="flex items-center gap-2">
                                <span className="text-xl font-black text-dark" style={{ fontFamily: "'Nunito', sans-serif" }}>
                                    ₹{product.price}
                                </span>
                                {product.originalPrice > product.price && (
                                    <span className="text-xs text-[#9898BB] line-through font-bold">
                                        ₹{product.originalPrice}
                                    </span>
                                )}
                            </div>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            disabled={!product.inStock}
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${!product.inStock
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : added
                                        ? 'bg-secondary-mint text-white rotate-[360deg] shadow-lg shadow-[#4CC9A0]/40'
                                        : 'bg-primary text-white hover:bg-primary-dark hover:scale-110 shadow-lg shadow-[#5BB8F5]/40'
                                }`}
                        >
                            {added ? <Check className="w-5 h-5 font-black" /> : <ShoppingCart className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Out of Stock Overlay */}
                {!product.inStock && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-20 flex items-center justify-center">
                        <span className="bg-dark text-white px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest rotate-[-5deg]">
                            Out of Stock
                        </span>
                    </div>
                )}
            </div>
        </Link>
    );
};

export default ProductCard;
