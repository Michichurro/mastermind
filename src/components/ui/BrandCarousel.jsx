import React from 'react';

const BrandCarousel = ({ brands }) => {
    // 1. Safe array check
    const safeBrands = Array.isArray(brands) ? brands : [];

    // 2. Filter for valid strings only
    const validBrands = safeBrands.filter(b => typeof b === 'string' && b.length > 0);

    // 3. Fallback if no brands
    if (validBrands.length === 0) return null;

    // 4. Duplicate for loop
    const carouselItems = [...validBrands, ...validBrands];

    const getLogoPath = (brandName) => {
        try {
            const slug = brandName
                .toLowerCase()
                .replace(/&/g, 'and')
                .replace(/[^a-z0-9-]/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '');
            return `/images/logos/${slug}.png`;
        } catch (err) {
            return '/images/logos/placeholder.png';
        }
    };

    const handleImageError = (e) => {
        try {
            // If already placeholder, hide to prevent loop
            if (e.target.src.indexOf('placeholder.png') !== -1) {
                e.target.style.visibility = 'hidden';
                return;
            }
            e.target.src = '/images/logos/placeholder.png';
            e.target.classList.add('opacity-50');
        } catch (err) {
            e.target.style.display = 'none';
        }
    };

    return (
        <div className="w-full overflow-hidden mask-linear-fade mt-2">
            <div className="flex animate-scroll whitespace-nowrap items-center gap-8 py-2">
                {carouselItems.map((brand, index) => (
                    <div
                        key={`${brand}-${index}`}
                        className="flex-shrink-0 flex items-center justify-center transition-all duration-300 opacity-60 hover:opacity-100"
                    >
                        <span className="text-xl md:text-2xl font-gabarito font-bold text-white uppercase tracking-wider whitespace-nowrap px-4">
                            {brand}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BrandCarousel;
