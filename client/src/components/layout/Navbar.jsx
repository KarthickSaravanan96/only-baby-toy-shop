import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    ShoppingCart, Search, Menu, X, Heart, User, ChevronDown,
    Sparkles, Mic, Bell, Settings, LogOut, Moon, Sun
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

const megamenu = [
    {
        title: 'Top Categories',
        items: [
            { label: '🧸 Plush Toys', link: '/products?category=Toys' },
            { label: '🧩 Educational', link: '/products?category=Toys' },
            { label: '🚗 Vehicles', link: '/products?category=Toys' },
            { label: '🎨 Art & Craft', link: '/products?category=Toys' },
        ]
    },
    {
        title: 'Baby Essentials',
        items: [
            { label: '🍼 Feeding Bottles', link: '/products?category=Feeding' },
            { label: '🥤 Sippy Cups', link: '/products?category=Feeding' },
            { label: '🧼 Baby Care', link: '/products?category=Feeding' },
            { label: '👶 Newborn Sets', link: '/products?category=Feeding' },
        ]
    },
    {
        title: 'Specialty',
        items: [
            { label: '🌱 Eco-Friendly', link: '/products' },
            { label: '🧬 STEM Toys', link: '/products' },
            { label: '🏘️ Outdoor Play', link: '/products' },
            { label: '🎁 Gift Cards', link: '/products' },
        ]
    }
];

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showMega, setShowMega] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showProfile, setShowProfile] = useState(false);
    const { getCartCount } = useCart();

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userEmail = localStorage.getItem('userEmail') || 'premium_user@example.com';
    const userName = localStorage.getItem('userName') || userEmail.split('@')[0];
    const location = useLocation();
    const navigate = useNavigate();
    const isHome = location.pathname === '/';

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        setIsMenuOpen(false);
        setShowMega(false);
        setShowProfile(false);
    }, [location]);

    const handleSignOut = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        localStorage.removeItem('userRole');
        localStorage.removeItem('token');
        window.location.reload();
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
        }
    };

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                ? 'bg-white/95 backdrop-blur-xl shadow-md border-b border-[#EEF0F8] py-2'
                : 'bg-white border-b border-[#EEF0F8] py-4'
                }`}>
                <div className="max-w-screen-3xl mx-auto px-4 lg:px-8">
                    <div className="flex items-center justify-between gap-8 h-10 lg:h-12">

                        {/* ── Shop Name Only ── */}
                        <Link to="/" className="flex items-center group relative z-10 flex-shrink-0">
                            <span className={`font-black tracking-tight transition-all duration-500 ${isScrolled ? 'text-xl lg:text-2xl' : 'text-2xl lg:text-3xl'} mb-1`}
                                style={{ color: '#FF1E5E', fontFamily: "'Nunito', sans-serif" }}>
                                only baby<span className="text-[#FF1E5E]/60 text-[10px] align-top ml-0.5">®</span>
                            </span>
                        </Link>

                        {/* ── Desktop Main Navigation ── */}
                        <div className="hidden lg:flex items-center gap-2">
                            <Link to="/" className={`px-4 py-2 rounded-2xl text-sm font-extrabold transition-all duration-300 text-[#FF1E5E] hover:text-white hover:bg-[#FF1E5E]`}
                                style={{ fontFamily: "'Nunito', sans-serif" }}>Home</Link>
                            <Link to="/products" className={`px-4 py-2 rounded-2xl text-sm font-extrabold transition-all duration-300 text-[#FF1E5E] hover:text-white hover:bg-[#FF1E5E]`}
                                style={{ fontFamily: "'Nunito', sans-serif" }}>Products</Link>

                            {/* Mega Menu Toggle */}
                            <div className="relative group/mega" onMouseEnter={() => setShowMega(true)} onMouseLeave={() => setShowMega(false)}>
                                <button className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-sm font-extrabold transition-all duration-300 text-[#FF1E5E] hover:text-white hover:bg-[#FF1E5E]`}
                                    style={{ fontFamily: "'Nunito', sans-serif" }}>
                                    Shop Collection <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${showMega ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Mega Menu Content */}
                                <div className={`absolute left-0 top-full mt-2 w-[800px] bg-white rounded-3xl shadow-2xl border border-[#EEF0F8] overflow-hidden transition-all duration-300 transform origin-top ${showMega ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 -translate-y-4 pointer-events-none'}`}>
                                    <div className="grid grid-cols-4 gap-8 p-10">
                                        {megamenu.map((section, idx) => (
                                            <div key={idx} className="space-y-4">
                                                <h4 className="text-[11px] font-black uppercase tracking-widest text-[#9898BB]">{section.title}</h4>
                                                <ul className="space-y-3">
                                                    {section.items.map((item, i) => (
                                                        <li key={i}>
                                                            <Link to={item.link} className="text-[14px] font-bold text-[#1E1E2E] hover:text-[#5BB8F5] transition-colors flex items-center gap-2 group/item">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-[#5BB8F5]/20 group-hover/item:bg-[#5BB8F5] transition-all group-hover/item:scale-150"></span>
                                                                {item.label}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <Link to="/about" className="px-4 py-2 rounded-2xl text-sm font-extrabold transition-all duration-300 text-[#1E1E2E] hover:text-[#5BB8F5] hover:bg-[#E8F5FE]"
                                style={{ fontFamily: "'Nunito', sans-serif" }}>About</Link>
                            <Link to="/contact" className="px-4 py-2 rounded-2xl text-sm font-extrabold transition-all duration-300 text-[#1E1E2E] hover:text-[#5BB8F5] hover:bg-[#E8F5FE]"
                                style={{ fontFamily: "'Nunito', sans-serif" }}>Contact</Link>
                        </div>

                        {/* ── Search Bar UI (Expanded) ── */}
                        <div className="hidden xl:flex flex-1 max-w-xl">
                            <form onSubmit={handleSearch} className={`relative w-full flex items-center gap-2 px-5 py-2.5 rounded-2xl border transition-all duration-300 bg-[#F8FAFF] border-[#EEF0F8] focus-within:bg-white focus-within:border-[#5BB8F5]`}>
                                <Search className="w-4.5 h-4.5 text-[#9898BB]" />
                                <input
                                    type="text"
                                    placeholder="Search for toys, feeding..."
                                    className="bg-transparent text-sm w-full outline-none font-bold placeholder:font-medium text-[#1E1E2E]"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button type="button" className="p-1 hover:text-[#5BB8F5] transition-colors">
                                    <Mic className="w-3.5 h-3.5 text-[#9898BB]" />
                                </button>
                            </form>
                        </div>

                        {/* ── Right Action Icons ── */}
                        <div className="flex items-center gap-3 lg:gap-5">
                            <Link to="/cart" className="p-2 rounded-xl transition-all duration-300 relative group hover:bg-[#E8F5FE]">
                                <ShoppingCart className="w-5 h-5 text-[#1E1E2E] group-hover:text-[#5BB8F5] transition-colors" />
                                {getCartCount() > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-black rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-md animate-bounce-in">
                                        {getCartCount()}
                                    </span>
                                )}
                            </Link>
                            <div className="relative group/profile">
                                <button className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#F8FAFF] hover:bg-[#EEF0F8] transition-all">
                                    <div className="w-8 h-8 rounded-xl bg-[#5BB8F5] flex items-center justify-center text-white overflow-hidden shadow-sm">
                                        {isLoggedIn ? <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=5BB8F5&color=fff`} alt={userName} /> : <User className="w-4 h-4" />}
                                    </div>
                                    <ChevronDown className="w-3 h-3 text-[#9898BB] group-hover/profile:rotate-180 transition-transform hidden sm:block" />
                                </button>

                                {/* ── Profile Dropdown ── */}
                                <div className={`absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-[#EEF0F8] py-2 transition-all duration-300 transform origin-top-right z-50 opacity-0 invisible group-hover/profile:opacity-100 group-hover/profile:visible group-hover/profile:translate-y-0 translate-y-2`}>
                                    {isLoggedIn ? (
                                        <>
                                            <div className="px-4 py-3 border-b border-[#EEF0F8] mb-1">
                                                <p className="text-xs font-black text-[#9898BB] uppercase tracking-widest">Signed in as</p>
                                                <p className="text-sm font-extrabold text-[#1E1E2E] truncate">{userEmail}</p>
                                            </div>
                                            <Link to="/orders" className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-[#1E1E2E] hover:bg-[#E8F5FE] hover:text-[#5BB8F5] transition-all">
                                                <ShoppingCart className="w-4 h-4" /> My Orders
                                            </Link>
                                            {localStorage.getItem('userRole') === 'admin' && (
                                                <Link to="/admin" className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-[#1E1E2E] hover:bg-[#E8F5FE] hover:text-[#5BB8F5] transition-all">
                                                    <Settings className="w-4 h-4" /> Admin Panel
                                                </Link>
                                            )}
                                            <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-secondary-pink hover:bg-secondary-pink-light transition-all text-left">
                                                <LogOut className="w-4 h-4" /> Sign Out
                                            </button>
                                        </>
                                    ) : (
                                        <div className="p-4 text-center">
                                            <p className="text-xs text-[#9898BB] font-bold mb-4">Welcome to Only Baby! ✨</p>
                                            <Link to="/signin" className="btn-primary w-full text-xs py-3 rounded-xl block">Sign In / Register</Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 rounded-xl text-[#1E1E2E] hover:bg-[#E8F5FE] transition-all">
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* ── Mobile Menu Overlay ── */}
            <div className={`fixed inset-0 z-[60] lg:hidden transition-all duration-500 ${isMenuOpen ? 'visible' : 'invisible pointer-events-none'}`}>
                {/* Backdrop */}
                <div className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsMenuOpen(false)} />

                {/* Content Drawer */}
                <div className={`absolute left-0 top-0 bottom-0 w-[300px] bg-white shadow-2xl transition-transform duration-500 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} p-8 flex flex-col`}>
                    <div className="flex items-center justify-between mb-12">
                        <span className="font-black text-xl text-[#FF1E5E]" style={{ fontFamily: "'Nunito', sans-serif" }}>only baby</span>
                        <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-xl bg-[#F8FAFF] text-[#1E1E2E]">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex flex-col gap-6 flex-1">
                        <Link to="/" className="text-2xl font-black text-[#1E1E2E] hover:text-[#5BB8F5] transition-all">Home</Link>
                        <Link to="/products" className="text-2xl font-black text-[#1E1E2E] hover:text-[#5BB8F5] transition-all">Products</Link>
                        <Link to="/about" className="text-2xl font-black text-[#1E1E2E] hover:text-[#5BB8F5] transition-all">About</Link>
                        <Link to="/contact" className="text-2xl font-black text-[#1E1E2E] hover:text-[#5BB8F5] transition-all">Contact</Link>
                    </div>

                    <div className="pt-8 border-t border-[#EEF0F8] space-y-4">
                        {isLoggedIn ? (
                            <button onClick={handleSignOut} className="flex items-center gap-3 text-secondary-pink font-black uppercase tracking-widest text-[10px]">
                                <LogOut className="w-4 h-4" /> Sign Out
                            </button>
                        ) : (
                            <Link to="/signin" className="btn-primary w-full text-center py-4 rounded-2xl block text-sm">Sign In</Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
