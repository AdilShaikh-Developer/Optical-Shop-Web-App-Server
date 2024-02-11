import express from "express";
import {
  addToCart,
  authenticateUser,
  getCart,
  getLikedProducts,
  getUser,
  likeProduct,
  removeFromCart,
  unlikeProduct,
} from "../controllers/user.js";

const app = express.Router();

// authentication routes
app.post("/auth", authenticateUser);

// user routes
app.post("/profile", getUser);

// user's cart routes
app.post("/cart", getCart);
app.put("/cart/add", addToCart);
app.put("/cart/remove", removeFromCart);

// user's liked-products routes
app.post("/liked-products", getLikedProducts);
app.put("/liked-products/add", likeProduct);
app.put("/liked-products/remove", unlikeProduct);

export default app;
