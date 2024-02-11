import { FeaturedProduct } from "../models/featured-product.js";
import { Product } from "../models/product.js";

export const createFeaturedProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product)
      return res
        .status(400)
        .json({ success: false, message: "bad request, product not found" });

    const featuredProduct = await FeaturedProduct.create({
      _id: product._id,
      photo: product.photos[0],
    });

    res.status(201).json({
      success: true,
      message: `${product.name} is added to featured products successfully`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

export const deleteFeaturedProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);
    const featuredProduct = await FeaturedProduct.findByIdAndDelete(productId);

    if (!featuredProduct) {
      return res.status(400).json({
        success: false,
        message: "bad request, featured product was not found",
      });
    }

    res.status(204).json({
      success: true,
      message: `${product.name} is removed successfully from featured-products`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    const featuredProduct = await FeaturedProduct.find();

    res.status(200).json({
      success: true,
      response: featuredProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};
