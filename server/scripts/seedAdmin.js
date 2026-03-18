import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';
import connectDB from '../config/db.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const seedAdmin = async () => {
    try {
        const credentials = {
            name: 'raja',
            email: 'onlybaby7999@gmail.com',
            password: 'onlybaby7999',
            role: 'admin'
        };

        console.log(`Checking for user: ${credentials.email}...`);

        const existingUser = await User.findOne({ email: credentials.email });

        if (existingUser) {
            console.log(`User exists. Updating role to admin...`);
            existingUser.role = 'admin';
            // We need to keep the same password, but if we want to ensure it, we re-set it.
            // Since User.js has a pre-save hook, this will re-hash it.
            existingUser.password = credentials.password;
            await existingUser.save();
            console.log('✅ User updated to admin with the requested password.');
        } else {
            console.log(`Creating new admin user...`);
            await User.create(credentials);
            console.log('✅ Admin user created successfully.');
        }

        console.log('\n✨ Task completed!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
