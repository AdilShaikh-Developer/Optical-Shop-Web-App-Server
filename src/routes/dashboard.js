import express from "express";
import {
  getCustomersData,
  getDashboardStats,
  getProductData,
  getProductsData,
} from "../controllers/dashboard.js";

const app = express.Router();

app.get("/stats", getDashboardStats);
app.get("/products-data/:id", getProductData);
app.get("/products-data", getProductsData);
app.get("/customers-data", getCustomersData);

export default app;
