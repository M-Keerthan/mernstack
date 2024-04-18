const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://keerthanmm55:Vvce12345@cluster0.mnhgrnj.mongodb.net/goFoodmern?retryWrites=true&w=majority&appName=Cluster0";

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true });
        console.log("Connected to MongoDB");

        // Fetch collections
        const foodCollection = mongoose.connection.db.collection("food-items");
        const categoryCollection = mongoose.connection.db.collection("foodCategory");

        // Fetch data
        const foodData = await foodCollection.find({}).toArray();
        const categoryData = await categoryCollection.find({}).toArray();

        // Store data in global variables
        global.food_items = foodData;
        global.foodCategory = categoryData;

        
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
};

module.exports = mongoDB;
