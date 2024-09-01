import { Router } from 'express';
import ProductManager from '../productManager.js';

const productManager = new ProductManager();
const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    const limit = parseInt(req.query.limit, 10);

    if (limit) {
      res.json(products.slice(0, limit));
    } else {
      res.json(products);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const product = await productManager.getProductById(parseInt(req.params.pid, 10));

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, price, stock, category, code } = req.body;

    if (!title || !description || !price || !stock || !category || !code) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const newProduct = await productManager.addProduct({
      title,
      description,
      price,
      status: true, 
      stock,
      category,
      code
    });

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const id = parseInt(req.params.pid, 10);
    const newData = req.body;
    const updatedProduct = await productManager.updateProduct(id, newData);

    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const id = parseInt(req.params.pid, 10);
    const deleted = await productManager.deleteProduct(id);

    if (deleted) {
      res.json({ status: "success", deleted });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;