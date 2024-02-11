import express from "express";
import { mongooseConnection } from "./middlewares/mongoose.js";
import cors from "cors";
import { config } from "dotenv";

config({
  path: "./.env",
});

// importing routes
import productRoute from "./routes/product.js";
import userRoute from "./routes/user.js";
import featuredProductRoute from "./routes/featured-product.js";
import adminDashboardRoutes from "./routes/dashboard.js";

// database connection middleware
mongooseConnection(process.env.MONGODB_URI);

// creating express app
const app = express();

// app middleware's
app.use(express.json()); // used to parse json data through request & response
app.use(
  cors({
    origin: process.env.CLIENT,
  })
);
// creating routes
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "server is online",
  });
});

app.use("/api/v1/users", userRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/featured-products", featuredProductRoute);
app.use("/api/v1/admin-dashboard", adminDashboardRoutes);

app.use("/uploads", express.static("uploads"));

// listening express app
app.listen(process.env.PORT, () => {
  console.log(`server is online on port:${process.env.PORT}`);
});
