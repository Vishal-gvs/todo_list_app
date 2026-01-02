const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/database');

dotenv.config();

const seedAdmin = async () => {
    try {
        await connectDB();
        
        const adminEmail = 'admin@example.com';
        const adminPassword = 'password123';
        
        let admin = await User.findOne({ email: adminEmail });
        
        if (admin) {
            console.log('Admin user already exists');
            if (admin.role !== 'admin') {
                admin.role = 'admin';
                await admin.save();
                console.log('Updated user to admin role');
            }
        } else {
            admin = new User({
                name: 'System Admin',
                email: adminEmail,
                password: adminPassword,
                role: 'admin'
            });
            await admin.save();
            console.log('Admin user created successfully');
        }
        
        console.log(`Email: ${adminEmail}`);
        console.log(`Password: ${adminPassword}`);
        
        process.exit();
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
