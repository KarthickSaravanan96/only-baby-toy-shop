// Temporary script to fetch and format products from Only Baby website
import fs from 'fs';

// Sample data structure based on what we scraped
// This will be populated with the actual scraped data
const scrapedProducts = [
    {
        "name": "2 pc rattle set",
        "price": "270.00",
        "originalPrice": "300.00",
        "discount": "10% OFF",
        "img": "https://res.cloudinary.com/dhkquaazr/image/upload/v1744613509/hbz1wog8q16ygotpxubj.jpg"
    }
    // ... more products will be added
];

// Function to categorize products based on name
function categorizeProduct(name) {
    const nameLower = name.toLowerCase();

    if (nameLower.includes('sebamed') || nameLower.includes('cetaphil') ||
        nameLower.includes('wash') || nameLower.includes('shampoo') ||
        nameLower.includes('lotion') || nameLower.includes('cream') ||
        nameLower.includes('soap') || nameLower.includes('oil')) {
        return 'Baby Care';
    }
    if (nameLower.includes('diaper')) {
        return 'Diapers';
    }
    if (nameLower.includes('bottle') || nameLower.includes('feeder') ||
        nameLower.includes('bowl') || nameLower.includes('spoon')) {
        return 'Feeding';
    }
    if (nameLower.includes('stroller') || nameLower.includes('car seat') ||
        nameLower.includes('walker') || nameLower.includes('high chair')) {
        return 'Gear';
    }
    if (nameLower.includes('rattle') || nameLower.includes('toy') ||
        nameLower.includes('slide') || nameLower.includes('vehicle') ||
        nameLower.includes('fidget') || nameLower.includes('construction')) {
        return 'Toys';
    }
    if (nameLower.includes('wipes') || nameLower.includes('tissue')) {
        return 'Wipes';
    }

    return 'Others';
}

// Function to determine age group based on product name
function determineAgeGroup(name) {
    const nameLower = name.toLowerCase();

    if (nameLower.includes('newborn') || nameLower.includes('0-3') ||
        nameLower.includes('infant')) {
        return '0-6 months';
    }
    if (nameLower.includes('baby')) {
        return '0-2 years';
    }
    if (nameLower.includes('toddler') || nameLower.includes('kids')) {
        return '2-5 years';
    }

    return '0-3 years'; // Default for baby products
}

// Convert scraped data to our format
function convertToAppFormat(scrapedProducts) {
    return scrapedProducts.map((product, index) => {
        const price = parseFloat(product.price);
        const originalPrice = parseFloat(product.originalPrice);
        const discountPercent = originalPrice > price
            ? Math.round(((originalPrice - price) / originalPrice) * 100)
            : 0;

        return {
            id: index + 1,
            name: product.name,
            price: Math.round(price),
            originalPrice: Math.round(originalPrice),
            category: categorizeProduct(product.name),
            ageGroup: determineAgeGroup(product.name),
            rating: (4 + Math.random() * 1).toFixed(1), // Random rating between 4.0-5.0
            image: product.img,
            description: `${product.name} - Premium quality baby product from Only Baby.`,
            reviews: Math.floor(Math.random() * 500) + 50, // Random reviews 50-550
            inStock: true,
            discount: discountPercent > 0 ? discountPercent : null
        };
    });
}

// This will be replaced with actual scraped data
console.log('Product conversion script ready');
console.log('Sample output:', JSON.stringify(convertToAppFormat(scrapedProducts), null, 2));
