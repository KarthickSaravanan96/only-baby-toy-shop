import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Product from '../models/Product.js';
import connectDB from '../config/db.js';

// Load environment variables
dotenv.config();

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Connect to MongoDB
connectDB();

const seedProducts = async () => {
    try {
        console.log('🌱 Starting database seed...\n');

        // Read products from JSON file
        const productsPath = join(__dirname, '../../client/src/data/products.json');
        const productsData = JSON.parse(readFileSync(productsPath, 'utf-8'));

        console.log(`📦 Found ${productsData.length} products to seed`);

        // Clear existing products
        await Product.deleteMany({});
        console.log('🗑️  Cleared existing products');

        // Insert products
        const products = await Product.insertMany(productsData);
        console.log(`✅ Successfully seeded ${products.length} products\n`);

        // Display sample products
        console.log('Sample products:');
        products.slice(0, 5).forEach(product => {
            console.log(`  - ${product.name} (₹${product.price})`);
        });

        console.log('\n✨ Database seed completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedProducts();
