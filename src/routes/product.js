import express from "express";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  addRating,
  updateAvailability,
} from "../controllers/product.js";
import { upload } from "../middlewares/multer.js";

const app = express.Router();

// /api/v1/products/
app.route("/").post(upload, createProduct).get(getProducts);

app.get("/categories", getCategories);

// /api/v1/products/:id
app
  .route("/:id")
  .get(getProduct)
  .put(upload, updateProduct)
  .delete(deleteProduct);

// availability
app.route("/:id/availability").put(updateAvailability);

// review & rating
app.post("/:id/ratings-and-reviews", addRating);

export default app;

// 1. **Get Product Ratings and Reviews:**
//    - Endpoint: `GET /api/v1/products/{productId}/ratings-and-reviews`

// 2. **Get User Ratings and Reviews:**
//    - Endpoint: `GET /api/v1/user/ratings-and-reviews`

// 3. **Add Rating and Review for a Product:**
//    - Endpoint: `POST /api/v1/products/{productId}/ratings-and-reviews`

// 4. **Update Rating and Review for a Product:**
//    - Endpoint: `PUT /api/v1/products/{productId}/ratings-and-reviews/{reviewId}`

// 5. **Delete Rating and Review for a Product:**
//    - Endpoint: `DELETE /api/v1/products/{productId}/ratings-and-reviews/{reviewId}`

// 6. **Get Average Rating for a Product:**
//    - Endpoint: `GET /api/v1/products/{productId}/average-rating`
