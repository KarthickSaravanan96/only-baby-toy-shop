import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category, icon, color, count }) => {
    return (
        <Link to={`/products?category=${encodeURIComponent(category)}`}>
            <div className={`bg-gradient-to-br ${color} rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105`}>
                <div className="flex flex-col items-center text-center space-y-3">
                    {/* Icon */}
                    <div className="text-6xl">{icon}</div>

                    {/* Category Name */}
                    <h3 className="font-display font-bold text-xl text-white">
                        {category}
                    </h3>

                    {/* Product Count */}
                    <p className="text-white/80 text-sm">
                        {count} products
                    </p>

                    {/* Explore Button */}
                    <button className="mt-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-2 rounded-full font-semibold transition-all">
                        Explore →
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default CategoryCard;
