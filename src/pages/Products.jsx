import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
    SlidersHorizontal, X, Search, LayoutGrid, List, Filter,
    ChevronDown, ArrowRight, Star, ShoppingBag, Sparkles
} from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import { productAPI } from '../services/api';
import SEO from '../components/common/SEO';

const Products = () => {
    const [searchParams] = useSearchParams();
    const categoryFromUrl = searchParams.get('category');
    const searchFromUrl = searchParams.get('search');

    const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl || 'All');
    const [selectedAgeGroup, setSelectedAgeGroup] = useState('All');
    const [priceRange, setPriceRange] = useState([0, 2000]);
    const [showFilters, setShowFilters] = useState(false);
    const [searchQuery, setSearchQuery] = useState(searchFromUrl || '');
    const [sortBy, setSortBy] = useState('default');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await productAPI.getAll();
                setProducts(response.data.data || []);
                setError(null);
            } catch (err) {
                setError('Failed to load products. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const categories = ['All', ...new Set(products.map(p => p.category))];
    const ageGroups = ['All', ...new Set(products.map(p => p.ageGroup))];
    const maxPriceFromProducts = Math.max(...products.map(p => p.price), 2000);

    const filteredProducts = useMemo(() => {
        let list = products.filter(product => {
            const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
            const ageMatch = selectedAgeGroup === 'All' || product.ageGroup === selectedAgeGroup;
            const priceMatch = product.price <= priceRange[1];
            const searchMatch = !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase());
            return categoryMatch && ageMatch && priceMatch && searchMatch;
        });

        if (sortBy === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
        else if (sortBy === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
        else if (sortBy === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);

        return list;
    }, [products, selectedCategory, selectedAgeGroup, priceRange, searchQuery, sortBy]);

    const clearFilters = () => {
        setSelectedCategory('All');
        setSelectedAgeGroup('All');
        setPriceRange([0, maxPriceFromProducts]);
        setSearchQuery('');
        setSortBy('default');
    };

    const hasActiveFilters = selectedCategory !== 'All' || selectedAgeGroup !== 'All' || priceRange[1] < maxPriceFromProducts || searchQuery;

    return (
        <div className="bg-white min-h-screen">
            <SEO
                title={`${selectedCategory !== 'All' ? selectedCategory : 'All Products'} - Only Baby Store`}
                description="Explore our world of premium products for your little ones. Shop by age, category or rating."
                url="https://onlybaby.in/products"
            />

            {/* Header Section */}
            <header className="bg-white py-24 px-6 lg:px-12 relative overflow-hidden border-b border-[#EEF0F8]">
                <div className="absolute top-0 right-0 p-12 text-9xl opacity-10 select-none animate-float">🧩</div>
                <div className="max-w-screen-2xl mx-auto relative z-10 flex flex-col md:flex-row items-end justify-between gap-6">
                    <div className="space-y-4">
                        <span className="section-label">Safe & Certified Collection</span>
                        <h1 className="text-4xl lg:text-7xl font-black text-dark" style={{ fontFamily: "'Nunito', sans-serif" }}>
                            Explore <span className="gradient-text">Only Baby</span>
                        </h1>
                        <nav className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted">
                            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                            <span>/</span>
                            <span className="text-primary italic">Shop Everything</span>
                        </nav>
                    </div>

                    <div className="flex bg-white p-2 rounded-2xl shadow-md border border-border">
                        <div className="px-6 py-4 text-center border-r border-border">
                            <span className="text-2xl font-black text-dark block">{filteredProducts.length}</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted">Matches</span>
                        </div>
                        <div className="px-6 py-4 text-center">
                            <div className="flex gap-1 mb-1">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-secondary-yellow text-secondary-yellow" />)}
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#4CC9A0]">Top Rated</span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-16">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Filter Sidebar */}
                    <aside className={`lg:w-80 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                        <div className="sticky top-[140px] space-y-8">

                            {/* Simple Clear */}
                            <div className="flex items-center justify-between pb-4 border-b border-border">
                                <h2 className="text-lg font-black text-dark" style={{ fontFamily: "'Nunito', sans-serif" }}>
                                    Filters
                                </h2>
                                {hasActiveFilters && (
                                    <button onClick={clearFilters} className="text-[10px] font-black uppercase tracking-wider text-secondary-pink hover:bg-secondary-pink-light px-3 py-1 rounded-full transition-all">
                                        Clear All
                                    </button>
                                )}
                            </div>

                            {/* Search Local */}
                            <div className="space-y-4">
                                <label className="text-[11px] font-black uppercase tracking-widest text-muted">Search Store</label>
                                <div className="relative group">
                                    <input
                                        type="text"
                                        placeholder="Quick find..."
                                        className="w-full bg-light border border-border rounded-2xl px-12 py-4 font-bold text-sm outline-none focus:border-primary transition-all text-dark"
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                    />
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted group-focus-within:text-primary transition-colors" />
                                </div>
                            </div>

                            {/* Categories Selection */}
                            <div className="space-y-6">
                                <label className="text-[11px] font-black uppercase tracking-widest text-muted">Collection</label>
                                <div className="grid grid-cols-1 gap-2">
                                    {categories.map((cat, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`group text-left px-5 py-3 rounded-2xl transition-all flex items-center justify-between font-bold text-sm ${selectedCategory === cat
                                                ? 'bg-primary text-white shadow-xl shadow-primary/30'
                                                : 'bg-white border border-border text-dark hover:border-primary hover:text-primary'
                                                }`}
                                        >
                                            {cat}
                                            {selectedCategory === cat && <Sparkles className="w-3.5 h-3.5 animate-pulse-glow" />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Age Group Filter */}
                            <div className="space-y-6">
                                <label className="text-[11px] font-black uppercase tracking-widest text-muted">Age Range</label>
                                <div className="flex flex-wrap gap-2">
                                    {ageGroups.map((age, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setSelectedAgeGroup(age)}
                                            className={`px-4 py-2.5 rounded-xl text-xs font-black border transition-all ${selectedAgeGroup === age
                                                ? 'bg-secondary-mint border-secondary-mint text-white shadow-lg'
                                                : 'border-border text-dark hover:border-secondary-mint'
                                                }`}
                                        >
                                            {age}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Slider UI */}
                            <div className="space-y-6">
                                <label className="text-[11px] font-black uppercase tracking-widest text-muted flex justify-between">
                                    Price Limit <span>₹{priceRange[1]}</span>
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max={maxPriceFromProducts}
                                    step="50"
                                    value={priceRange[1]}
                                    onChange={e => setPriceRange([0, parseInt(e.target.value)])}
                                    className="w-full h-2 bg-light rounded-full appearance-none cursor-pointer accent-primary"
                                />
                            </div>

                        </div>
                    </aside>

                    {/* Product Listing Area */}
                    <div className="flex-1">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
                            <div className="flex items-center gap-2">
                                <button className="p-2.5 bg-primary/10 text-primary rounded-xl"><LayoutGrid className="w-5 h-5" /></button>
                                <button className="p-2.5 bg-light text-muted rounded-xl hover:text-dark transition-all"><List className="w-5 h-5" /></button>
                            </div>

                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <select
                                    value={sortBy}
                                    onChange={e => setSortBy(e.target.value)}
                                    className="flex-1 md:flex-none px-6 py-3.5 bg-white border border-border rounded-2xl font-black text-xs text-dark outline-none focus:border-primary cursor-pointer hover:shadow-md transition-all appearance-none"
                                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%235BB8F5' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'%3E%3C/path%3E%3C/svg%3E")`, backgroundPosition: 'right 1.5rem center', backgroundRepeat: 'no-repeat' }}
                                >
                                    <option value="default">Sort: Most Featured</option>
                                    <option value="price-asc">Price: Low - High</option>
                                    <option value="price-desc">Price: High - Low</option>
                                    <option value="rating">Top Rated Parents Choice</option>
                                </select>

                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="lg:hidden p-3.5 bg-[#1E1E2E] text-white rounded-2xl shadow-xl active:scale-95 transition-all"
                                >
                                    <SlidersHorizontal className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {loading ? (
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
                                {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="aspect-[4/5] rounded-[40px] skeleton" />)}
                            </div>
                        ) : error ? (
                            <div className="text-center py-24 bg-light rounded-[60px] border-2 border-dashed border-border">
                                <p className="text-muted font-black text-lg">{error}</p>
                                <button onClick={() => window.location.reload()} className="btn-primary mt-6">Reload Shop</button>
                            </div>
                        ) : filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredProducts.map(p => (
                                    <ProductCard key={p._id || p.id} product={p} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-24 bg-light rounded-[60px] border-2 border-dashed border-border space-y-6">
                                <div className="text-8xl select-none">🔍</div>
                                <h3 className="text-2xl font-black text-dark" style={{ fontFamily: "'Nunito', sans-serif" }}>No Joy Found... yet!</h3>
                                <p className="text-muted font-medium max-w-sm mx-auto">Try adjusting your filters or searching for something else like "Teddy" or "Formula".</p>
                                <button onClick={clearFilters} className="btn-outline font-black">Reset All Filters</button>
                            </div>
                        )}

                        {/* Pagination Area Placeholder */}
                        {!loading && filteredProducts.length > 0 && (
                            <div className="mt-20 flex items-center justify-center gap-3">
                                <button className="w-12 h-12 rounded-2xl border-2 border-primary bg-primary text-white font-black shadow-lg shadow-primary/20">1</button>
                                <button className="w-12 h-12 rounded-2xl border-2 border-border font-bold hover:bg-light transition-all">2</button>
                                <button className="w-12 h-12 rounded-2xl border-2 border-border font-bold flex items-center justify-center hover:bg-light transition-all">
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Floating Mobile Toggle */}
            <div className="lg:hidden fixed bottom-10 left-1/2 -translate-x-1/2 z-40">
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="bg-[#1E1E2E] text-white px-8 py-4 rounded-full font-black text-sm shadow-2xl flex items-center gap-3 active:scale-95 transition-all"
                >
                    <SlidersHorizontal className="w-5 h-5" />
                    Refine Search
                </button>
            </div>
        </div>
    );
};

export default Products;
