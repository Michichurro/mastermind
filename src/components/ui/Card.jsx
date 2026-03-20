import React from 'react';

const Card = ({ children, className = '', onClick, hoverEffect = false, variant = 'default', style = {} }) => {

    const variants = {
        default: "bg-white/10 backdrop-blur-lg border border-white/20 text-slate-100",
        black: "bg-slate-900 border-2 border-slate-800 text-white shadow-2xl opacity-100",
        white: "bg-white border-2 border-slate-200 text-slate-900 shadow-lg opacity-100"
    };

    const hoverClasses = hoverEffect
        ? "hover:scale-[1.02] hover:shadow-2xl cursor-pointer transition-all duration-300"
        : "";

    // Specific hover styles for white cards to maintain contrast
    const variantHover = hoverEffect && variant === 'white'
        ? "hover:bg-slate-50 hover:border-slate-300"
        : hoverEffect && variant === 'black'
            ? "hover:bg-black hover:border-slate-700"
            : "hover:bg-white/20";

    return (
        <div
            onClick={onClick}
            className={`
                rounded-2xl p-6 
                ${variants[variant] || variants.default}
                ${hoverClasses}
                ${variantHover}
                ${className}
            `}
            style={style}
        >
            {children}
        </div>
    );
};

export default Card;
