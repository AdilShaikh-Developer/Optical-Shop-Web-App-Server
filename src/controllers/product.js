import { rm } from "fs";
import { Product } from "../models/product.js";

export const createProduct = async (req, res) => {
  try {
    const { name, category, size, shape, colour } = req.body;
    const photos = req.files;

    if (photos.length === 0)
      return res.status(400).json({
        success: false,
        message: "please upload product photos",
      });
    if (!name || !category) {
      photos.forEach((photo) => {
        rm(photo.path, () => {
          console.log(`${photo.path} - is deleted`);
        });
      });
      return res.status(400).json({
        success: false,
        message: "please fill out all required fields",
      });
    }

    const photosPath = [];
    photos.forEach((photo) => {
      photosPath.push(photo.path);
    });

    const product = await Product.create({
      name,
      photos: photosPath,
      category,
      size,
      shape,
      colour,
    });

    res.status(201).json({
      success: true,
      message: `product: ${product.name} is created successfully!`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ availability: true });

    return res.status(200).json({
      success: true,
      response: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.find({ _id: productId, availability: true });

    if (!product)
      return res.status(404).json({
        success: true,
        message: "product not found",
      });

    return res.status(200).json({
      success: true,
      response: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, category, size, shape, colour } = req.body;
    const photos = req.files;

    const product = await Product.findById(productId);

    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "product not found" });

    if (photos.length > 0) {
      product.photos.forEach((photo) => {
        rm(photo, () => {
          console.log("old photos deleted");
        });
      });
      product.photos = [];
      photos.forEach((photo) => {
        product.photos.push(photo.path);
      });
    }

    if (name) product.name = name;
    if (category) product.category = category;
    if (size) product.size = size;
    if (shape) product.shape = shape;
    if (colour) product.colour = colour;

    await product.save();

    res.status(200).json({
      success: true,
      message: `product: ${product.name} is updated successfully!`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findByIdAndDelete(productId);

    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "product not found" });

    product.photos.forEach((photo) => {
      rm(photo, () => {
        console.log("old photo deleted!");
      });
    });

    res.status(200).json({
      success: true,
      message: `product: ${product.name} is deleted successfully!`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

export const getCategories = async (req, res) => {
  try {
    const products = await Product.find({ availability: true }).distinct(
      "category"
    );

    return res.status(200).json({
      success: true,
      response: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

export const addRating = async (req, res) => {
  try {
    const productId = req.params.id;
    const rating = req.body;

    const products = await Product.findById(productId);

    products.rating.push(rating);
    products.save();

    return res.status(201).json({
      success: true,
      message: "Thank You for your review! Your feedback is valuable to us.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

export const updateAvailability = async (req, res) => {
  try {
    const productId = req.params.id;

    const products = await Product.findById(productId);
    products.availability = !products.availability;
    products.save();

    return res.status(201).json({
      success: true,
      response: `${products.name}'s is now ${
        products.availability ? "in-stock" : "out-of-stock"
      }`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
};
