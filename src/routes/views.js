import { Router } from "express";
import ProductManager from "../productManager.js";



const router = Router();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    
    res.render("home", {products}); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/products", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    
    res.render("realTimeProducts", { products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
