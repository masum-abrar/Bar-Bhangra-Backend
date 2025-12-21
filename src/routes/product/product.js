import express from "express";
import multer from "multer";
import {
  banProduct,
  createBarMessage,
  createEvent,
  createHistory,
  createMenuCategory,
  createMenuItem,
  createMenuType,
  createProduct,
  createProductAttribute,
  createProductImage,
  createSlide,
  deleteEvent,
  deleteHistory,
  deleteMenuCategory,
  deleteMenuItem,
  deleteMenuType,
  deleteProduct,
  deleteProductAttribute,
  deleteProductImage,
  deleteSlide,
  getAllHistories,
  getBarMessage,
  getEvents,
  getFeaturedProductsForCustomer,
  getMenuCategories,
  getMenuItems,
  getMenuTypes,
  getProduct,
  getProductAttributes,
  getProductForCustomer,
  getProductImages,
  getProducts,
  getProductsByUser,
  getProductsForCustomer,
  getSlides,
  getTrendingProductsForCustomer,
  increaseProductViewCount,
  sendProductEmail,
  updateEvent,
  updateHistory,
  updateMenuCategory,
  updateMenuItem,
  updateMenuType,
  updateProduct,
  updateProductAttribute,
  updateProductImage,
  updateSlide,
} from "../../controllers/product/product.js";
import {
  productBan,
  productCreate,
  productEdit,
  productList,
  productRemove,
  productSingle,
  productUserList,
} from "../../utils/modules.js";
import verify from "../../utils/verifyToken.js";

// const upload = multer({ dest: "public/images/product" });
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.post(
  "/v1/products",
  productCreate,
  verify,
  upload.array("images"),
  createProduct
);
router.get("/v1/products-email/:id", verify, sendProductEmail);
router.get("/v1/products", productList, verify, getProducts);
router.get("/v1/user/products/", productUserList, verify, getProductsByUser);
router.get("/v1/products/:slug", productSingle, verify, getProduct);
router.put(
  "/v1/products/:id",
  productEdit,
  verify,
  upload.array("images"),
  updateProduct
);
router.put("/v1/products/attributes/:id", verify, updateProductAttribute);
router.put(
  "/v1/products/images/:id",
  productEdit,
  verify,
  upload.single("image"),
  updateProductImage
);
router.put("/v1/products/:id/viewCount", increaseProductViewCount);
router.put("/v1/products/:id/ban", productBan, verify, banProduct);
router.delete(
  "/v1/products/images/:id",
  productRemove,
  verify,
  deleteProductImage
);
router.delete("/v1/products/:id", productRemove, verify, deleteProduct);

//attributes
router.post("/v1/products-attributes", verify, createProductAttribute);
router.get("/v1/products-attributes/:id", verify, getProductAttributes);
router.put("/v1/products-attributes/:id", verify, updateProductAttribute);
router.delete("/v1/products-attributes/:id", verify, deleteProductAttribute);

//images
router.get("/v1/products-images/:id", verify, getProductImages);
router.post(
  "/v1/products-images",
  verify,
  upload.single("image"),
  createProductImage
);
router.delete("/v1/products-images/:id", verify, deleteProductImage);

// For Customer
router.get("/v1/customer/products", getProductsForCustomer);
router.get("/v1/customer/products/:slug", getProductForCustomer);
router.get("/v1/customer/trending-products", getTrendingProductsForCustomer);
router.get("/v1/customer/featured-products", getFeaturedProductsForCustomer);

router.post("/v1/bar-events", upload.single("image"), createEvent);
router.put("/v1/bar-events/:id", upload.single("image"), updateEvent);
router.delete("/v1/bar-events/:id", deleteEvent);
router.get("/v1/bar-events", getEvents);

//History

router.post("/v1/history", upload.single("image"), createHistory);

// Update
router.put("/v1/history/:id", upload.single("image"), updateHistory);

// Delete
router.delete("/v1/history/:id", deleteHistory);

// Get all
router.get("/v1/history", getAllHistories);

router.post("/v1/bar-contact", createBarMessage);
router.get("/v1/bar-contact", getBarMessage);

router.post("/v1/slider", upload.single("image"), createSlide);
router.get("/v1/slider", getSlides);
router.put("/v1/slider/:id", upload.single("image"), updateSlide);
router.delete("/v1/slider/:id", upload.single("image"), deleteSlide);

//menu

router.get("/v1/menu-types", getMenuTypes);
router.post("/v1/menu-types", createMenuType);
router.put("/v1/menu-types/:id", updateMenuType);
router.delete("/v1/menu-types/:id", deleteMenuType);

// ==================== CATEGORIES ====================
router.post("/v1/menu-categories", createMenuCategory);
router.get("/v1/menu-categories", getMenuCategories);
router.put("/v1/menu-categories/:id", updateMenuCategory);
router.delete("/v1/menu-categories/:id", deleteMenuCategory);

// ==================== MENU ITEMS ====================
router.get("/v1/menu-items", getMenuItems);
router.post("/v1/menu-items", upload.single("image"), createMenuItem);
router.put("/v1/menu-items/:id", upload.single("image"), updateMenuItem);
router.delete("/v1/menu-items/:id", deleteMenuItem);
export default router;
