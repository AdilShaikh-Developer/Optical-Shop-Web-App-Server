import { Product } from "../models/product.js";
import { User } from "../models/user.js";

export const authenticateUser = async (req, res) => {
  try {
    const { _id, name, email, photo } = req.body;

    const user = await User.findById(_id);
    if (user)
      return res.status(200).json({
        success: true,
        response: user,
        message: `Welcome, ${name}!`,
      });

    if (!_id || !name || !email || !photo)
      return res.status(400).json({
        success: false,
        message: "please fill out all required fields",
      });

    const newUser = await User.create({ _id, name, email, photo });
    res.status(201).json({
      success: true,
      response: newUser,
      message: `Welcome, ${newUser.name}! Your account has been created successfully!`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.body;

    const user = await User.findById(id);
    if (!user)
      return res.status(401).json({
        success: false,
        message:
          "authentication is required, please log in to access your profile",
      });

    res.status(201).json({
      success: true,
      response: user,
      message: `Welcome, ${user.name}!`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

export const getCart = async (req, res) => {
  try {
    const { userId } = req.body;

    let products = await Product.find({
      cartedBy: userId,
    });

    let cartItems = products.filter((product) => {
      return product.cartedBy.includes(userId);
    });

    cartItems = cartItems.map((cartItem) => {
      return cartItem._id;
    });

    res.status(200).json({
      success: true,
      response: cartItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const user = await User.findById(userId);
    if (!user)
      return res.status(401).json({
        success: false,
        message:
          "authentication is required, please log in to access your cart items",
      });

    const product = await Product.findById(productId);
    product.cartedBy.push(user._id);
    await product.save();

    res.status(201).json({
      success: true,
      message: `${product.name}, Added to Cart`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const user = await User.findById(userId);
    if (!user)
      return res.status(401).json({
        success: false,
        message:
          "authentication is required, please log in to access your cart items",
      });

    const product = await Product.findById(productId);
    product.cartedBy = product.cartedBy.filter((cartedBy) => {
      return cartedBy !== userId;
    });
    await product.save();

    res.status(201).json({
      success: true,
      message: `${product.name}, Removed from Cart`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

export const getLikedProducts = async (req, res) => {
  try {
    const { userId } = req.body;

    const products = await Product.find({});
    let likedProducts = products.filter((product) => {
      return product.likedBy.includes(userId);
    });

    likedProducts = likedProducts.map((likedProduct) => {
      return likedProduct._id;
    });

    res.status(200).json({
      success: true,
      response: likedProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

export const likeProduct = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const user = await User.findById(userId);
    if (!user)
      return res.status(401).json({
        success: false,
        message:
          "authentication is required, please log in to access your cart items",
      });

    const product = await Product.findById(productId);
    product.likedBy.push(user._id);
    await product.save();

    res.status(201).json({
      success: true,
      message: "Product liked! 🎉",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

export const unlikeProduct = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const user = await User.findById(userId);
    if (!user)
      return res.status(401).json({
        success: false,
        message:
          "authentication is required, please log in to access your cart items",
      });

    const product = await Product.findById(productId);
    product.likedBy = product.likedBy.filter((item) => {
      return item !== userId;
    });
    await product.save();

    res.status(201).json({
      success: true,
      message: "Product Unliked",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};
