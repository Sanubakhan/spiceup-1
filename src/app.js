const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("../routes/auth.routes");
const fooditemRoutes = require("../routes/fooditem.routes");

const app = express();

/* =========================
   CORS CONFIG (FINAL)
========================= */
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://spiceup-1-1.onrender.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (Postman, server-to-server)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  })
);

/* =========================
   MIDDLEWARES
========================= */
app.use(express.json());
app.use(cookieParser());

/* =========================
   STATIC FILES
========================= */
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

/* =========================
   ROUTES
========================= */
app.use("/api/auth", authRoutes);
app.use("/api/food", fooditemRoutes);

/* =========================
   EXPORT
========================= */
module.exports = app;
