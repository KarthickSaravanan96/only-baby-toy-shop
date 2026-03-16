import React, { useState, useEffect } from 'react';
import { X, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';

const SignInNotification = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const checkLoginAndShow = () => {
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            if (!isLoggedIn) {
                setIsVisible(true);
            }
        };

        // Show initially after 3 seconds
        const initialTimer = setTimeout(checkLoginAndShow, 3000);

        // Then repeat every 20 seconds
        const repeatInterval = setInterval(checkLoginAndShow, 20000);

        return () => {
            clearTimeout(initialTimer);
            clearInterval(repeatInterval);
        };
    }, []);

    const handleClose = () => {
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
            <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl shadow-2xl p-6 max-w-sm relative">
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-3 right-3 text-white hover:text-gray-200 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Content */}
                <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-full">
                        <Gift className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-display font-bold text-xl text-white mb-2">
                            Exclusive Offers! 🎁
                        </h3>
                        <p className="text-white/90 text-sm mb-4">
                            Sign in to unlock special discounts and member-only deals on your favorite toys!
                        </p>
                        <div className="flex gap-3">
                            <Link
                                to="/signin"
                                className="bg-white text-primary px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm"
                            >
                                Sign In
                            </Link>
                            <Link
                                to="/signup"
                                className="bg-accent text-dark px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors text-sm"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInNotification;
