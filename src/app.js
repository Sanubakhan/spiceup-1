const express=require('express');
const path = require('path');
const app=express();
const authRoutes=require('../routes/auth.routes');
const cors = require('cors');

const cookieParser = require('cookie-parser');





const fooditemRoutes=require('../routes/fooditem.routes');

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));


app.use(express.json());
app.use(cookieParser());

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/food", fooditemRoutes);








module.exports=app;