import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Facebook, Instagram, Twitter, Youtube, Mail, Phone,
    MapPin, ArrowRight, Heart, Shield, CheckCircle, Globe,
    CreditCard, Zap
} from 'lucide-react';

const Footer = () => {
    const [email, setEmail] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        alert('Welcome to the Only Baby family! ✨ Exclusive joy is on its way.');
        setEmail('');
    };

    const footerLinks = [
        {
            title: 'Shop Categories',
            links: [
                { label: '🧸 Toy Collection', to: '/products?category=Toys' },
                { label: '🍼 Baby Feeding', to: '/products?category=Feeding' },
                { label: '🧼 Baby Care', to: '/products?category=Feeding' },
                { label: '🧩 Educational', to: '/products?category=Toys' },
                { label: '🎁 Gift Sets', to: '/products' },
            ]
        },
        {
            title: 'Helpful Links',
            links: [
                { label: 'About Our Story', to: '/about' },
                { label: 'Safety Standards', to: '/about' },
                { label: 'Parenting Blog', to: '/' },
                { label: 'Store Locator', to: '/' },
                { label: 'Contact Support', to: '/contact' },
            ]
        },
        {
            title: 'Customer Care',
            links: [
                { label: 'Track Your Order', to: '/' },
                { label: 'Shipping Policy', to: '/' },
                { label: 'Returns & Refunds', to: '/' },
                { label: 'Privacy Policy', to: '/' },
                { label: 'Terms of Service', to: '/' },
            ]
        }
    ];

    const socials = [
        { icon: <Instagram className="w-5 h-5" />, color: 'hover:bg-[#E1306C]', label: 'Instagram' },
        { icon: <Facebook className="w-5 h-5" />, color: 'hover:bg-[#1877F2]', label: 'Facebook' },
        { icon: <Twitter className="w-5 h-5" />, color: 'hover:bg-[#1DA1F2]', label: 'Twitter' },
        { icon: <Youtube className="w-5 h-5" />, color: 'hover:bg-[#FF0000]', label: 'Youtube' },
    ];

    return (
        <footer className="bg-[#1E1E2E] text-white overflow-hidden pt-20">
            {/* ── Top Trust Strip ── */}
            <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 mb-20">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { icon: <Shield className="w-6 h-6" />, title: '100% Safe', desc: 'Pediatrician Approved' },
                        { icon: <Zap className="w-6 h-6" />, title: 'Fast Delivery', desc: 'Across all major cities' },
                        { icon: <CheckCircle className="w-6 h-6" />, title: 'Premium Quality', desc: 'Only the best for you' },
                        { icon: <Globe className="w-6 h-6" />, title: 'Eco-Friendly', desc: 'Sustainable materials' },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4 group cursor-default">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#5BB8F5] group-hover:scale-110 group-hover:bg-[#5BB8F5]/10 group-hover:text-white transition-all duration-300">
                                {item.icon}
                            </div>
                            <div>
                                <h4 className="text-sm font-black uppercase tracking-widest text-[#5BB8F5] mb-1">{item.title}</h4>
                                <p className="text-xs text-gray-400 font-bold">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Main Footer Contents ── */}
            <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 pb-16">
                <div className="grid lg:grid-cols-12 gap-16">

                    {/* Brand Info */}
                    <div className="lg:col-span-4 space-y-8">
                        <Link to="/">
                            <img src="/assets/logo/logo.png" alt="Only Baby" className="h-20 lg:h-28 w-auto opacity-90 hover:opacity-100 transition-opacity" />
                        </Link>
                        <p className="text-gray-400 font-medium leading-relaxed max-w-sm">
                            Where every product is a promise of joy. We curate the world's most premium baby essentials, ensuring safety, style, and development for your little ones.
                        </p>
                        <div className="flex gap-4">
                            {socials.map((s, i) => (
                                <a key={i} href="#" aria-label={s.label} className={`w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 ${s.color} hover:text-white hover:-translate-y-1`}>
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-10">
                        {footerLinks.map((section, idx) => (
                            <div key={idx} className="space-y-6">
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#5BB8F5]">{section.title}</h3>
                                <ul className="space-y-4">
                                    {section.links.map((link, i) => (
                                        <li key={i}>
                                            <Link to={link.to} className="text-sm text-gray-400 hover:text-white transition-colors font-bold flex items-center group">
                                                <span className="w-0 group-hover:w-2 h-0.5 bg-[#5BB8F5] mr-0 group-hover:mr-2 transition-all"></span>
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Contact & Newsletter */}
                    <div className="lg:col-span-3 space-y-10">
                        <div className="space-y-6">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#5BB8F5]">Talk to Us</h3>
                            <div className="space-y-4">
                                <a href="mailto:hello@onlybaby.in" className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors group">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#5BB8F5]/20 group-hover:text-[#5BB8F5]">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                    <span className="font-bold">hello@onlybaby.in</span>
                                </a>
                                <a href="tel:+919876543210" className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors group">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#4CC9A0]/20 group-hover:text-[#4CC9A0]">
                                        <Phone className="w-4 h-4" />
                                    </div>
                                    <span className="font-bold">+91 98765 43210</span>
                                </a>
                                <div className="flex items-start gap-3 text-sm text-gray-400">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                        <MapPin className="w-4 h-4" />
                                    </div>
                                    <span className="font-bold pt-2">Cyber Hub, DLF Phase 2, Gurugram, India</span>
                                </div>
                            </div>
                        </div>

                        {/* Store app buttons placeholder */}
                        <div className="flex flex-wrap gap-2 pt-4">
                            <div className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-white/10 transition-colors">
                                <div className="bg-white/10 p-1 rounded-lg">🍏</div>
                                <div className="leading-none">
                                    <p className="text-[8px] uppercase tracking-widest text-[#9898BB] font-black">App Store</p>
                                    <p className="text-[10px] font-black text-white">Download</p>
                                </div>
                            </div>
                            <div className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-white/10 transition-colors">
                                <div className="bg-white/10 p-1 rounded-lg">🤖</div>
                                <div className="leading-none">
                                    <p className="text-[8px] uppercase tracking-widest text-[#9898BB] font-black">Play Store</p>
                                    <p className="text-[10px] font-black text-white">Get It Now</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Payments & Copyright ── */}
            <div className="bg-[#151522] border-t border-white/5 py-8">
                <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-gray-500 text-xs font-bold font-['Poppins']">
                        © 2026 Only Baby E-commerce. Crafted with <Heart className="w-3 h-3 inline text-primary fill-primary" /> for babies & parents.
                    </p>
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest mr-2">Secure Payments:</span>
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="w-10 h-6 bg-white/5 border border-white/10 rounded-md flex items-center justify-center opacity-50 grayscale hover:opacity-100 transition-all cursor-pointer">
                                <CreditCard className="w-4 h-4" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
