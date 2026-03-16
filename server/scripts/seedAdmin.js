import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import connectDB from '../config/db.js';

dotenv.config();

const seedAdmin = async () => {
    try {
        await connectDB();

        // Check if admin already exists
        const adminExists = await User.findOne({ email: 'onlybaby7999@gmail.com' });

        if (adminExists) {
            console.log('Admin user already exists!');
            process.exit(0);
        }

        // Create admin user
        const adminUser = new User({
            name: 'Raja',
            email: 'onlybaby7999@gmail.com',
            password: 'onlybaby7999',
            role: 'admin' // Ensure role is admin
        });

        await adminUser.save();
        console.log('Admin user seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin user:', error);
        process.exit(1);
    }
};

seedAdmin();
