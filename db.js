
const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/Bookstore"

const connectToDatabase = async () => {
    const connected = await mongoose.connect(url);
    if (connected) {
        console.log("Successfully connected to the database");
    }
};

module.exports = {connectToDatabase}