const foodModel=require("../models/food.model");
const storageService=require("../services/storage.service");
const { v4: uuidv4 } = require('uuid');
const uuid=uuidv4;


async function addFoodItem(req, res) {
  try {
    const { name, description } = req.body;
    const file = req.file; // ✅ CORRECT

    if (!file) {
      return res.status(400).json({ message: "Video file required" });
    }

    const food = await foodModel.create({
      name,
      description,
      vedioUrl: `/uploads/${file.filename}`,
      foodpartner: req.partner._id,
    });

    res.status(201).json({
      message: "Food item created successfully",
      food,
    });
    console.log("REQ FILE:", req.file);
console.log("REQ BODY:", req.body);

  } catch (error) {
    console.error("ADD FOOD ERROR:", error);
    res.status(500).json({ message: "Failed to add food item" });
  }
}


   
    

async function getFoodItems(req, res) {
  const foodItems = await foodModel
    .find({})
    .populate("foodpartner", "_id name avatar address");

  res.status(200).json({
    message: "Food items fetched successfully",
    foodItems,
  });
}





module.exports={addFoodItem,getFoodItems};