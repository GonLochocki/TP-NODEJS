import fs from "fs";

class ProductManager {
  static id = 0;
  static productsPath = "./files/products.json";

  constructor() {
    this.lastId();
    this.products = [];
  }

  async lastId() {
    try {
      this.products = await this.getProducts();
  
      if (this.products.length > 0) {
        ProductManager.id = Math.max(...this.products.map(p => p.id)) + 1;
      } else {
        ProductManager.id = 1;
      }
    } catch (error) {
      return error.message;
    }
  }

  async getProducts() {
    try {
      const products = await fs.promises.readFile(
        ProductManager.productsPath, "utf-8");
      return JSON.parse(products);
    } catch (error) {
      return [];
    }
  }

  async saveProducts(products) {
    await fs.promises.writeFile(ProductManager.productsPath, JSON.stringify(products));
  }

  async addProduct(product) {
    await this.lastId()
    product.id = ProductManager.id;
    const products = await this.getProducts();    
    products.push(product);
    await this.saveProducts(products);
    return product;
  }

  async getProductById(id) {
    const products = await this.getProducts();
    return products.find((product => product.id === id));
  }

  async updateProduct(id, newData) {
    try {
      const products = await this.getProducts();
      const index = products.findIndex((product) => product.id === id);

      if (index !== -1) {
        products[index] = { ...products[index], ...newData };
        await this.saveProducts(products);
        return products[index];
      }
    } catch (error) {
      return error.message;
    }
  }

  async deleteProduct(id) {
    try {
      const products = await this.getProducts();
      const index = products.findIndex((product) => product.id === id);

      if (index !== -1) {
        const deleted = products.splice(index, 1);
        await this.saveProducts(products);
        return `Product deleted`;
      }
    } catch (error) {
      return error.message;
    }
  }
}

export default ProductManager;
