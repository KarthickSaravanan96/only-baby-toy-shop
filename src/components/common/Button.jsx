import React from 'react';

const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
    const baseStyles = 'font-semibold rounded-xl transition-all duration-300 transform hover:scale-105';

    const variants = {
        primary: 'bg-primary hover:bg-red-600 text-white',
        secondary: 'bg-secondary hover:bg-teal-600 text-white',
        outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
