const mongoose = require('mongoose');

// async as moongoos
const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
}

module.exports = connectDB;