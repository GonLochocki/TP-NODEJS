const socket = io();

socket.on("updateProductList", (product) => {

  console.log(`producto recibido: ${product}`)
 
  const productList = document.getElementById("product-list");
  const newProduct = document.createElement("li");
  newProduct.id = `product-${product.id}`;
  newProduct.textContent = `${product.title} - $${product.price}`;
  productList.appendChild(newProduct);
});

socket.on("removeProduct", (productId) => {
  
  const product = document.getElementById(`product-${productId}`);
  if (product) {
    product.remove();
  }
});
