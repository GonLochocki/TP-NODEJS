import {Router} from "express"
import CartManager from "../cartManager.js"
const router = Router()
const cartManager = new CartManager()

router.get("/", async (req, res) => {
    try {
      const carts = await cartManager.getCarts();
      res.status(200).json(carts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

router.get("/:cid", async (req, res) => {
  try {
    const newCart = await cartManager.getCartById(parseInt(req.params.cid))
    res.status(200).json(newCart)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

router.post("/", async (req, res) => {
    try {
      const newCart = await cartManager.addCart();
      res.status(201).json(newCart);
    } catch (error) {
      res.status(500).json({ message: "No se creó el carrito", error: error.message });
    }
  });

router.post("/:cid/product/:pid", async (req, res) => {
    try {

        const cartId = parseInt(req.params.cid)
        const productId = parseInt(req.params.pid)

        const cartProduct = await cartManager.addProductToCart(cartId, productId)

        if(cartProduct) {
            res.status(200).json(cartProduct)
        } else {
            res.status(404).json({message: "Cart or product not found"})
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

export default router