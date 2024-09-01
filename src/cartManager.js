import fs from "fs";
import ProductManager from "./productManager.js";

class CartManager {
  static id = 0;
  static cartsPath = "./files/carts.json";

  constructor() {
    this.productManager = new ProductManager();
  }

  async lastId() {
    try {
      const carts = await this.getCarts();
  
      if (carts.length > 0) {
        CartManager.id = Math.max(...carts.map(p => p.id)) + 1;
      } else {
        CartManager.id = 1;
      }
    } catch (error) {
      CartManager.id = 1; 
    }
    return CartManager.id;  
  }

  async getCarts() {
    try {
      const carts = await fs.promises.readFile(CartManager.cartsPath, "utf-8");
      return JSON.parse(carts);
    } catch (error) {
      return [];
    }
  }

  async saveCarts(carts) {
    await fs.promises.writeFile(CartManager.cartsPath, JSON.stringify(carts, null, 2));  
  }

  async addCart() {
    const carts = await this.getCarts();
    const newCartId = await this.lastId(); 

    const newCart = {
      id: newCartId || CartManager.id,  
      products: []
    };

    carts.push(newCart);
    await this.saveCarts(carts);
    return newCart;
  }

  async getCartById(id) {
    const carts = await this.getCarts();
    return carts.find(cart => cart.id === id);
  }

  async addProductToCart(cartId, productId) {
    try {
      const carts = await this.getCarts();
      const cart = carts.find(c => c.id === cartId);
  
      if (!cart) {
        return { error: "Cart not found" };
      }  
      
      const cartProduct = cart.products.find(p => p.product === productId);
  
      if (cartProduct) {
        cartProduct.quantity += 1;
      } else {
        
        cart.products.push({ product: productId, quantity: 1 });
      }
  
      await this.saveCarts(carts);
      return cart;
    } catch (error) {
      return { error: error.message };
    }
  }
  
}

export default CartManager;
