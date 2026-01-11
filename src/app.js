const express=require('express');
const path = require('path');
const app=express();
const authRoutes=require('../routes/auth.routes');
const cors = require('cors');

const cookieParser = require('cookie-parser');





const fooditemRoutes=require('../routes/fooditem.routes');



const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://spiceup-1-1.onrender.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  })
);


app.use(express.json());
app.use(cookieParser());

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/food", fooditemRoutes);








module.exports=app;