import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, Star } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const HeroCarousel = () => {
    const slides = [
        {
            image: 'https://cdn.shopify.com/s/files/1/0766/8141/2807/files/E-COM01_17e520f7-2f53-46cb-83ea-5c5d1d9353af.webp',
            tag: 'New Arrival',
            title: 'Safe & Gentle\nFeeding Essentials',
            description: 'BPA-free bottles and spill-proof sippy cups designed with love for your little one\'s comfort.',
            cta: 'Shop Feeding',
            bg: 'from-[#FFF5F3] to-[#FEE9E4]',
            accent: '#E8735A',
            stat: { value: '100%', label: 'BPA Free' }
        },
        {
            image: 'https://cdn.shopify.com/s/files/1/0766/8141/2807/files/18825_Tinny_Giffy_Sippy_Cup_-_Purple_A__2.webp',
            tag: 'Best Seller',
            title: 'Transition Cups\nThey\'ll Love',
            description: 'Soft silicone straws with anti-spill valves help babies drink independently with confidence.',
            cta: 'Explore Sippers',
            bg: 'from-[#F3F8FF] to-[#E4EFFD]',
            accent: '#5B8DB8',
            stat: { value: '4.5★', label: 'Avg Rating' }
        },
        {
            image: 'https://cdn.shopify.com/s/files/1/0766/8141/2807/files/E-COM01_8e118b38-162f-4a70-980e-6a59d4b70879.webp',
            tag: 'Top Rated',
            title: 'Everything Your\nBaby Needs',
            description: 'Premium quality baby care products trusted by thousands of parents across India.',
            cta: 'Shop All',
            bg: 'from-[#FFFBF0] to-[#FEF5D4]',
            accent: '#D4900A',
            stat: { value: '5000+', label: 'Happy Families' }
        },
    ];

    return (
        <section className="relative">
            <Swiper
                modules={[Autoplay, Pagination, Navigation, EffectFade]}
                slidesPerView={1}
                effect="fade"
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation
                loop
                className="hero-carousel"
            >
                {slides.map((slide, i) => (
                    <SwiperSlide key={i}>
                        <div className={`min-h-[580px] lg:min-h-[620px] bg-gradient-to-br ${slide.bg} flex items-center`}>
                            <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full py-16 lg:py-20">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                                    {/* Left: Text */}
                                    <div className="animate-slide-left space-y-6 max-w-xl">
                                        {/* Tag */}
                                        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border"
                                            style={{ color: slide.accent, borderColor: `${slide.accent}40`, background: `${slide.accent}12` }}>
                                            {slide.tag}
                                        </span>

                                        {/* Title */}
                                        <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.15] text-[#1A1A2E]"
                                            style={{ fontFamily: "'Playfair Display', serif", whiteSpace: 'pre-line' }}>
                                            {slide.title}
                                        </h1>

                                        {/* Description */}
                                        <p className="text-base lg:text-lg text-[#4A4A68] leading-relaxed">
                                            {slide.description}
                                        </p>

                                        {/* Trust badges */}
                                        <div className="flex flex-wrap items-center gap-4 pt-1">
                                            <div className="flex items-center gap-1.5 text-sm text-[#4A4A68]">
                                                <ShieldCheck className="w-4 h-4" style={{ color: slide.accent }} />
                                                <span>Certified Safe</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-sm text-[#4A4A68]">
                                                <Truck className="w-4 h-4" style={{ color: slide.accent }} />
                                                <span>Free Shipping ₹999+</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-sm text-[#4A4A68]">
                                                <Star className="w-4 h-4 fill-current" style={{ color: slide.accent }} />
                                                <span>{slide.stat.value} {slide.stat.label}</span>
                                            </div>
                                        </div>

                                        {/* CTAs */}
                                        <div className="flex flex-wrap gap-4 pt-2">
                                            <Link
                                                to="/products"
                                                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white text-sm transition-all hover:-translate-y-1"
                                                style={{ background: slide.accent, boxShadow: `0 8px 24px ${slide.accent}40` }}
                                            >
                                                {slide.cta}
                                                <ArrowRight className="w-4 h-4" />
                                            </Link>
                                            <Link
                                                to="/products"
                                                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm border-2 transition-all hover:bg-white"
                                                style={{ borderColor: `${slide.accent}50`, color: slide.accent }}
                                            >
                                                View All Products
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Right: Image */}
                                    <div className="hidden lg:flex justify-center items-center animate-slide-right">
                                        <div className="relative">
                                            {/* Decorative circle */}
                                            <div className="absolute inset-0 rounded-full blur-3xl opacity-30 scale-90"
                                                style={{ background: `radial-gradient(circle, ${slide.accent}, transparent)` }}></div>

                                            {/* Stat card */}
                                            <div className="absolute -top-4 -right-4 bg-white rounded-2xl px-4 py-3 shadow-lg border border-gray-100 z-10">
                                                <div className="text-lg font-bold text-[#1A1A2E]">{slide.stat.value}</div>
                                                <div className="text-xs text-[#9898AA]">{slide.stat.label}</div>
                                            </div>

                                            {/* Product image */}
                                            <img
                                                src={slide.image}
                                                alt={slide.title}
                                                className="relative w-[420px] h-[420px] object-contain animate-float drop-shadow-2xl"
                                                onError={e => { e.target.style.display = 'none'; }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default HeroCarousel;
