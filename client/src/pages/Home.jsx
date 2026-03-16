import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Star, Truck, Shield, HeadphonesIcon, RefreshCcw, ArrowRight,
    ChevronRight, Sparkles, Heart, Play, Check, Zap, Eye,
    ShoppingBag, Award, Baby, Activity, Info, Instagram, Twitter,
    Facebook, Youtube, Search, Mic, Filter
} from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import { productAPI } from '../services/api';
import SEO from '../components/common/SEO';

/* ─── Hero Config ─── */
const heroSlides = [
    {
        badge: '✨ New Arrivals 2026',
        title: 'Nurture with',
        highlight: 'Safe & Pure Care',
        desc: 'Anti-colic feeding bottles, sippy cups & teethers — BPA-free & pediatrician recommended for your little one\'s comfort.',
        ctaPrimary: 'Shop Baby Essentials',
        ctaSecondary: 'Browse Collection',
        image: '🍼', // Placeholder for 3D icon or illustration
        gradient: 'from-[#E8F5FE] via-[#F0F8FF] to-[#FFFFFF]'
    },
    {
        badge: '🧸 Play & Learn',
        title: 'Sparking Joy In',
        highlight: 'Every Childhood',
        desc: 'Discover our premium collection of educational toys, soft plushies and interactive games designed to boost development.',
        ctaPrimary: 'Explore Toys',
        ctaSecondary: 'View Offers',
        image: '🧸',
        gradient: 'from-[#FFE8EE] via-[#FFF5F8] to-[#FFFFFF]'
    }
];

/* ─── Sections Data ─── */
const categories = [
    { name: 'Educational Toys', icon: '🧩', color: 'bg-[#E8F5FE]', text: 'text-[#5BB8F5]' },
    { name: 'Feeding Bottles', icon: '🍼', color: 'bg-[#FFF8E1]', text: 'text-[#FFD166]' },
    { name: 'Plush Toys', icon: '🧸', color: 'bg-[#FFE8EE]', text: 'text-[#FF6B8A]' },
    { name: 'Outdoor Play', icon: '🏃', color: 'bg-[#E6FAF4]', text: 'text-[#4CC9A0]' },
    { name: 'STEM Toys', icon: '🧪', color: 'bg-[#F0F8FF]', text: 'text-[#5BB8F5]' },
];

const ageGroups = [
    { label: '0–1 Years', desc: 'Newborn Essentials', icon: '👶', color: 'bg-[#E8F5FE]', border: 'border-[#5BB8F5]/20' },
    { label: '1–3 Years', desc: 'Toddler Fun', icon: '🧒', color: 'bg-[#FFE8EE]', border: 'border-[#FF6B8A]/20' },
    { label: '3–6 Years', desc: 'Pre-School Magic', icon: '🎨', color: 'bg-[#E6FAF4]', border: 'border-[#4CC9A0]/20' },
    { label: '6–12 Years', desc: 'Active Learners', icon: '🚀', color: 'bg-[#FFF8E1]', border: 'border-[#FFD166]/20' },
];

const blogPosts = [
    { title: 'The Importance of BPA-Free Products', category: 'Baby Care', date: 'Mar 15, 2026', image: '🍼' },
    { title: 'Choosing the Right Toy for Every Age', category: 'Parenting', date: 'Mar 12, 2026', image: '🧩' },
    { title: 'Transitioning to Sippy Cups: A Guide', category: 'Feeding', date: 'Mar 10, 2026', image: '🥤' },
];

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [heroIdx, setHeroIdx] = useState(0);

    useEffect(() => {
        productAPI.getAll()
            .then(res => setProducts(res.data.data || []))
            .catch(() => setProducts([]))
            .finally(() => setLoading(false));

        const interval = setInterval(() => {
            setHeroIdx(prev => (prev + 1) % heroSlides.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    const featuredProducts = products.slice(0, 8);
    const currentHero = heroSlides[heroIdx];

    return (
        <div className="bg-white">
            <SEO
                title="Only Baby - Premium Baby Toys, Bottles & Care"
                description="Shop top-rated baby toys, feeding bottles, sippy cups & BPA-free baby care. Advanced modern UI for the best shopping experience."
                url="https://onlybaby.in/"
            />

            {/* 1. Navbar is handled by Layout, but Home can have custom behavior if needed. 
                Prompt says "Sticky Transparent", which we implemented in Navbar.jsx */}

            {/* 2. Animated Hero Section */}
            <section className={`relative min-h-[85vh] flex items-center transition-all duration-1000 bg-gradient-to-br ${currentHero.gradient}`}>
                {/* Floating illustrations (using emojis as placeholders for 3D icons) */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[20%] left-[10%] text-6xl lg:text-8xl animate-float-slow opacity-20">🎈</div>
                    <div className="absolute bottom-[10%] right-[15%] text-6xl lg:text-8xl animate-float opacity-20">☁️</div>
                    <div className="absolute top-[40%] right-[10%] text-6xl lg:text-8xl animate-wiggle opacity-10">✨</div>
                    <div className="absolute bottom-[30%] left-[5%] text-5xl lg:text-7xl animate-float-slow opacity-20">🌈</div>
                </div>

                <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 w-full pt-20">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8 animate-fade-in">
                            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-xl border border-white/40 rounded-full px-5 py-2 text-sm font-black text-[#5BB8F5] shadow-sm"
                                style={{ fontFamily: "'Nunito', sans-serif" }}>
                                <Sparkles className="w-4 h-4" />
                                {currentHero.badge}
                            </div>
                            <h1 className="text-5xl lg:text-8xl font-black text-[#1E1E2E] leading-[0.9] tracking-tighter"
                                style={{ fontFamily: "'Nunito', sans-serif" }}>
                                {currentHero.title} <br />
                                <span className="gradient-text">{currentHero.highlight}</span>
                            </h1>
                            <p className="text-lg lg:text-xl text-[#4A4A68] font-medium max-w-lg leading-relaxed">
                                {currentHero.desc}
                            </p>
                            <div className="flex flex-wrap gap-5">
                                <Link to="/products" className="btn-primary flex items-center gap-2">
                                    {currentHero.ctaPrimary} <ShoppingBag className="w-5 h-5" />
                                </Link>
                                <Link to="/about" className="px-8 py-4 rounded-2xl bg-white border border-[#EEF0F8] text-[#1E1E2E] font-extrabold text-sm hover:shadow-lg transition-all">
                                    {currentHero.ctaSecondary}
                                </Link>
                            </div>
                        </div>

                        {/* Large 3D style illustration area */}
                        <div className="relative flex justify-center items-center h-[500px]">
                            <div className="absolute w-[400px] h-[400px] bg-[#5BB8F5]/10 rounded-full blur-[100px] animate-pulse-glow"></div>
                            <span className="text-[180px] lg:text-[280px] select-none animate-float drop-shadow-2xl">
                                {currentHero.image}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Smart Category Section */}
            <section className="py-24 px-6 lg:px-12 max-w-screen-2xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="space-y-4">
                        <span className="section-label section-label-sky">Explore World</span>
                        <h2 className="text-4xl lg:text-5xl font-black text-[#1E1E2E]" style={{ fontFamily: "'Nunito', sans-serif" }}>
                            Shop by <span className="text-[#5BB8F5] italic">Category</span>
                        </h2>
                    </div>
                    <Link to="/products" className="text-sm font-black text-[#5BB8F5] flex items-center gap-2 hover:translate-x-1 transition-transform">
                        See All Categories <ChevronRight className="w-5 h-5" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
                    {categories.map((cat, i) => (
                        <Link key={i} to="/products" className="group">
                            <div className={`${cat.color} rounded-[40px] p-8 lg:p-10 text-center transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 cursor-pointer relative overflow-hidden h-full flex flex-col items-center justify-center`}>
                                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="text-5xl mb-6 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500">
                                    {cat.icon}
                                </div>
                                <h3 className={`text-lg font-black ${cat.text}`} style={{ fontFamily: "'Nunito', sans-serif" }}>
                                    {cat.name}
                                </h3>
                                <p className="text-[10px] uppercase font-black tracking-widest text-[#9898BB] mt-2 group-hover:text-[#1E1E2E]">Explore &rarr;</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* 4. Featured Products Section */}
            <section className="py-24 bg-[#F8FAFF] px-6 lg:px-12">
                <div className="max-w-screen-2xl mx-auto">
                    <div className="text-center mb-16 space-y-4">
                        <span className="section-label">Most Popular</span>
                        <h2 className="text-4xl lg:text-5xl font-black text-[#1E1E2E]" style={{ fontFamily: "'Nunito', sans-serif" }}>
                            Featured <span className="text-[#5BB8F5]">Products</span>
                        </h2>
                        <p className="text-[#4A4A68] max-w-xl mx-auto font-medium">Trusted by parents, loved by kids. Discover our top-rated essentials.</p>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                            {[1, 2, 3, 4].map(i => <div key={i} className="h-96 rounded-[32px] skeleton" />)}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                            {featuredProducts.length > 0 ? featuredProducts.map(p => (
                                <ProductCard key={p._id || p.id} product={p} />
                            )) : products.slice(0, 4).map(p => (
                                <ProductCard key={p._id || p.id} product={p} />
                            ))}
                        </div>
                    )}

                    <div className="mt-16 text-center">
                        <Link to="/products" className="btn-primary group">
                            Explore All Shop <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* 5. Age-based shopping section */}
            <section className="py-24 px-6 lg:px-12 max-w-screen-2xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <span className="section-label section-label-mint">Perfect Match</span>
                    <h2 className="text-4xl lg:text-5xl font-black text-[#1E1E2E]" style={{ fontFamily: "'Nunito', sans-serif" }}>
                        Shop by <span className="text-[#4CC9A0]">Age Group</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {ageGroups.map((age, i) => (
                        <Link key={i} to="/products" className={`group relative p-10 rounded-[40px] border-2 ${age.border} ${age.color} overflow-hidden transition-all duration-500 hover:shadow-2xl`}>
                            <div className="relative z-10">
                                <span className="text-5xl block mb-6 animate-float" style={{ animationDelay: `${i * 0.3}s` }}>{age.icon}</span>
                                <h3 className="text-2xl font-black text-[#1E1E2E] mb-2" style={{ fontFamily: "'Nunito', sans-serif" }}>{age.label}</h3>
                                <p className="text-[#4A4A68] font-medium text-sm">{age.desc}</p>
                                <div className="mt-8 flex items-center text-xs font-black text-[#1E1E2E] opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0">
                                    Explore More <ChevronRight className="w-4 h-4 ml-1" />
                                </div>
                            </div>
                            <div className="absolute -right-8 -bottom-8 text-[120px] opacity-10 group-hover:opacity-20 transition-all group-hover:scale-110">
                                {age.icon}
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* 6. Baby Care Section (Special Showcase) */}
            <section className="py-24 bg-[#1E1E2E] relative overflow-hidden">
                <div className="absolute inset-0 bg-[#5BB8F5]/5 opacity-50 blur-[120px]"></div>
                <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <span className="section-label" style={{ background: 'rgba(91, 184, 245, 0.1)', color: '#5BB8F5' }}>BPA-Free Certified</span>
                            <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight" style={{ fontFamily: "'Nunito', sans-serif" }}>
                                Premium <span className="text-[#5BB8F5] italic">Feeding</span> <br /> Collection
                            </h2>
                            <p className="text-gray-400 text-lg font-medium leading-relaxed">
                                Our bottles are crafted from clinical-grade materials, ensuring a natural feeling and safe feeding experience for your newborn.
                            </p>

                            <div className="grid grid-cols-2 gap-6 pt-4">
                                <div className="flex items-center gap-4 bg-white/5 p-5 rounded-3xl border border-white/10 glass">
                                    <div className="w-12 h-12 rounded-2xl bg-[#5BB8F5]/20 flex items-center justify-center text-[#5BB8F5]">
                                        <Award className="w-6 h-6" />
                                    </div>
                                    <span className="text-white font-black text-sm uppercase tracking-widest">Baby Safe</span>
                                </div>
                                <div className="flex items-center gap-4 bg-white/5 p-5 rounded-3xl border border-white/10 glass">
                                    <div className="w-12 h-12 rounded-2xl bg-[#4CC9A0]/20 flex items-center justify-center text-[#4CC9A0]">
                                        <Activity className="w-6 h-6" />
                                    </div>
                                    <span className="text-white font-black text-sm uppercase tracking-widest">Anti-Colic</span>
                                </div>
                            </div>

                            <Link to="/products?category=Feeding" className="btn-primary inline-block">Explore Bottles</Link>
                        </div>

                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#5BB8F5]/40 to-transparent blur-[80px] rounded-full group-hover:blur-[100px] transition-all"></div>
                            <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[60px] p-12 lg:p-20 overflow-hidden transform group-hover:rotate-1 transition-all duration-700">
                                <span className="text-[200px] block text-center drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform group-hover:scale-110 transition-transform duration-700">🍼</span>
                                <div className="absolute top-8 right-8 bg-[#FF8E3C] text-white font-black px-6 py-2 rounded-2xl shadow-lg animate-bounce-in">
                                    New In
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. Special Offers Banner */}
            <section className="py-24 px-6 lg:px-12 max-w-screen-2xl mx-auto">
                <div className="bg-gradient-to-r from-[#5BB8F5] to-[#45A1E5] rounded-[40px] p-12 lg:p-20 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-white/10 skew-x-12 translate-x-1/2"></div>
                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="space-y-6 text-center lg:text-left">
                            <div className="px-6 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-black uppercase tracking-widest w-fit mx-auto lg:mx-0">
                                Weekend Special
                            </div>
                            <h2 className="text-4xl lg:text-6xl font-black text-white" style={{ fontFamily: "'Nunito', sans-serif" }}>
                                Flat <span className="text-[#FFD166] underline decoration-wavy decoration-white/40">30% OFF</span> <br />
                                everything!
                            </h2>
                            <p className="text-white/80 font-bold max-w-md">Use code: <span className="bg-white/10 px-4 py-1 rounded-xl text-[#FFD166] select-all">ONLYBABY30</span></p>
                        </div>
                        <div className="flex gap-4">
                            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[32px] text-center transform hover:-translate-y-2 transition-transform">
                                <span className="text-4xl block mb-2 font-black text-white">48+</span>
                                <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Hours Left</span>
                            </div>
                            <button className="bg-white text-[#5BB8F5] btn-white hover:bg-white/90 hover:scale-105 transition-all text-lg px-12 py-6 rounded-2xl font-black">
                                Grab It Now
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. Customer Reviews */}
            <section className="py-24 bg-[#F8FAFF] px-6 lg:px-12">
                <div className="max-w-screen-2xl mx-auto">
                    <div className="text-center mb-16 space-y-4">
                        <span className="section-label section-label-purple">Wall of Love</span>
                        <h2 className="text-4xl lg:text-5xl font-black text-[#1E1E2E]" style={{ fontFamily: "'Nunito', sans-serif" }}>
                            What Our <span className="text-purple-500">Parents say</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: 'Aditi Rao', role: 'Mother of 2', text: 'The quality of toys is unmatched. My twins are obsessed with the interactive puzzles!', avatar: 'A', color: 'bg-[#5BB8F5]' },
                            { name: 'Karan Mehra', role: 'Happy Dad', text: 'I was worried about safety, but the BPA-free certifications gave me peace of mind. Great service!', avatar: 'K', color: 'bg-[#4CC9A0]' },
                            { name: 'Sarah Khan', role: 'New Mom', text: 'Fast delivery and the packaging was so cute. The feeding bottles are actually anti-colic. Lifesaver!', avatar: 'S', color: 'bg-[#FFD166]' },
                        ].map((rev, i) => (
                            <div key={i} className="bg-white p-10 rounded-[40px] shadow-sm hover:shadow-xl transition-all border border-[#EEF0F8] group">
                                <div className="flex gap-1 mb-6">
                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-[#FFD166] text-[#FFD166]" />)}
                                </div>
                                <p className="text-[#4A4A68] font-medium italic mb-8 leading-relaxed">"{rev.text}"</p>
                                <div className="flex items-center gap-4 border-t border-[#EEF0F8] pt-6">
                                    <div className={`w-12 h-12 rounded-2xl ${rev.color} flex items-center justify-center text-white font-black shadow-lg`}>
                                        {rev.avatar}
                                    </div>
                                    <div>
                                        <h4 className="font-black text-[#1E1E2E] text-sm">{rev.name}</h4>
                                        <p className="text-xs text-[#9898BB] font-bold tracking-wide uppercase">{rev.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 9. Parenting Tips Blog Section */}
            <section className="py-24 px-6 lg:px-12 max-w-screen-2xl mx-auto">
                <div className="flex items-end justify-between mb-16 gap-6">
                    <div className="space-y-4">
                        <span className="section-label">Read & Learn</span>
                        <h2 className="text-4xl lg:text-5xl font-black text-[#1E1E2E]" style={{ fontFamily: "'Nunito', sans-serif" }}>
                            Parenting <span className="text-[#5BB8F5] italic">Journal</span>
                        </h2>
                    </div>
                    <button className="text-sm font-black text-[#5BB8F5] border-b-2 border-[#5BB8F5]/20 hover:border-[#5BB8F5] transition-all">Visit Blog</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {blogPosts.map((post, i) => (
                        <div key={i} className="group cursor-pointer">
                            <div className="relative h-64 bg-[#F8FAFF] rounded-[40px] overflow-hidden mb-6">
                                <div className="absolute inset-0 flex items-center justify-center text-8xl grayscale group-hover:grayscale-0 transition-all group-hover:scale-110">
                                    {post.image}
                                </div>
                                <div className="absolute top-4 left-4">
                                    <span className="bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-[#9898BB]">
                                        {post.category}
                                    </span>
                                </div>
                            </div>
                            <h3 className="text-xl font-black text-[#1E1E2E] group-hover:text-[#5BB8F5] transition-colors leading-tight px-2">
                                {post.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-3 px-2 text-xs font-bold text-[#9898BB]">
                                <span>{post.date}</span>
                                <span className="w-1 h-1 rounded-full bg-[#EEF0F8]"></span>
                                <span>5 min read</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 10. Instagram / Social Gallery */}
            <section className="py-24 bg-[#FAF7FF] overflow-hidden">
                <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 text-center mb-16">
                    <Instagram className="w-10 h-10 text-[#5BB8F5] mx-auto mb-4" />
                    <h2 className="text-3xl lg:text-4xl font-black text-[#1E1E2E] mb-2" style={{ fontFamily: "'Nunito', sans-serif" }}>
                        Follow <span className="text-[#E1306C]">@onlybaby.shop</span>
                    </h2>
                    <p className="text-[#9898BB] font-bold">Tag us on Instagram to get featured!</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-6 gap-2 px-2">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="aspect-square bg-[#F8FAFF] relative group cursor-pointer overflow-hidden rounded-3xl lg:rounded-none lg:first:rounded-l-[40px] lg:last:rounded-r-[40px]">
                            <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-20 filter grayscale">🧸</div>
                            <div className="absolute inset-0 bg-[#5BB8F5]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Instagram className="text-white w-8 h-8 scale-0 group-hover:scale-100 transition-transform" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 11. Newsletter section */}
            <section className="py-24 px-6 lg:px-12 max-w-screen-2xl mx-auto relative overflow-hidden">
                <div className="absolute -left-20 -top-20 w-80 h-80 bg-[#5BB8F5]/5 rounded-full blur-[100px]"></div>
                <div className="bg-white border-2 border-[#EEF0F8] p-12 lg:p-20 rounded-[60px] text-center relative z-10 overflow-hidden shadow-xl">
                    <div className="absolute top-0 right-0 p-8 text-8xl opacity-10 rotate-12">💌</div>
                    <div className="max-w-2xl mx-auto space-y-8">
                        <span className="section-label">Family Circle</span>
                        <h2 className="text-4xl lg:text-5xl font-black text-[#1E1E2E] leading-tight" style={{ fontFamily: "'Nunito', sans-serif" }}>
                            Join the <span className="gradient-text">Only Baby</span> Family
                        </h2>
                        <p className="text-[#4A4A68] font-medium">Get early access to new arrivals, weekly parenting tips and exclusive discounts. No spam, just joy.</p>

                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Your best email..."
                                className="flex-1 px-8 py-5 rounded-3xl bg-[#F8FAFF] border border-[#EEF0F8] focus:bg-white focus:border-[#5BB8F5] outline-none font-bold text-sm"
                            />
                            <button className="btn-primary flex items-center justify-center gap-2 px-10">
                                Subscribe <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-[10px] uppercase font-black tracking-widest text-[#9898BB]">Join 12k+ Smart Parents Today</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
