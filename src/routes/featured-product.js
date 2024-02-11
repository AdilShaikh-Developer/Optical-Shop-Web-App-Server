import express from "express";
import {
  createFeaturedProduct,
  deleteFeaturedProduct,
  getFeaturedProducts,
} from "../controllers/featured-product.js";

const app = express.Router();

app.get("/", getFeaturedProducts);
app.route("/:id").post(createFeaturedProduct).delete(deleteFeaturedProduct);

export default app;
