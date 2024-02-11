import {
  calculatePercentage,
  getChartData,
  getInventories,
} from "../features.js";
import { Product } from "../models/product.js";
import { User } from "../models/user.js";

export const getDashboardStats = async (req, res) => {
  const today = new Date();
  const twelveMonthAgo = new Date();
  twelveMonthAgo.setMonth(twelveMonthAgo.getMonth() - 12);

  const thisMonth = {
    start: new Date(today.getFullYear(), today.getMonth(), 1),
    end: today,
  };
  const lastMonth = {
    start: new Date(today.getFullYear(), today.getMonth() - 1, 1),
    end: new Date(today.getFullYear(), today.getMonth(), 0),
  };

  const thisMonthProductsPromise = Product.find({
    createdAt: {
      $gte: thisMonth.start,
      $lte: thisMonth.end,
    },
  });
  const thisMonthUsersPromise = User.find({
    createdAt: {
      $gte: thisMonth.start,
      $lte: thisMonth.end,
    },
  });

  const lastMonthProductsPromise = Product.find({
    createdAt: {
      $gte: lastMonth.start,
      $lte: lastMonth.end,
    },
  });
  const lastMonthUsersPromise = User.find({
    createdAt: {
      $gte: lastMonth.start,
      $lte: lastMonth.end,
    },
  });

  const baseQuery = {
    createdAt: {
      $gte: twelveMonthAgo,
      $lte: today,
    },
  };

  const [
    thisMonthProducts,
    lastMonthProducts,
    thisMonthUsers,
    lastMonthUsers,
    productsCount,
    unAvailableProductsCount,
    usersCount,
    categories,
    twelveMonthProducts,
    twelveMonthUsers,
  ] = await Promise.all([
    thisMonthProductsPromise,
    lastMonthProductsPromise,
    thisMonthUsersPromise,
    lastMonthUsersPromise,
    Product.countDocuments(),
    Product.countDocuments({ availability: false }),
    User.countDocuments(),
    Product.find({}).distinct("category"),
    Product.find(baseQuery).select("createdAt"),
    User.find(baseQuery).select("createdAt"),
  ]);

  const changePercent = {
    product: calculatePercentage(
      thisMonthProducts.length,
      lastMonthProducts.length
    ),
    user: calculatePercentage(thisMonthUsers.length, lastMonthUsers.length),
  };
  const count = {
    product: productsCount,
    user: usersCount,
  };
  const categoryCount = await getInventories({
    categories,
    productsCount,
  });

  const stockAvailability = {
    available: productsCount - unAvailableProductsCount,
    unavailable: unAvailableProductsCount,
  };

  const productCounts = getChartData({
    length: 12,
    today,
    docArr: twelveMonthProducts,
  });
  const userCounts = getChartData({
    length: 12,
    today,
    docArr: twelveMonthUsers,
  });

  res.status(200).json({
    success: true,
    stats: {
      changePercent,
      count,
      categoryCount,
      stockAvailability,
    },
    chart: {
      users: userCounts,
      products: productCounts,
    },
  });
};

export const getProductData = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

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

export const getProductsData = async (req, res) => {
  try {
    const products = await Product.find({});

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

export const getCustomersData = async (req, res) => {
  try {
    const customers = await User.find({});

    return res.status(200).json({
      success: true,
      response: customers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
};
