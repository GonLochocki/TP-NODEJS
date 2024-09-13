const socket = io();

socket.on("updateProductList", (newProduct) => {
 
  const productList = document.getElementById("product-list");
  const nuevoProducto = document.createElement("li");
  nuevoProducto.id = `product-${newProductroduct.id}`;
  nuevoProducto.textContent = `${newProduct.title} - $${newProduct.price}`;
  productList.appendChild(nuevoProducto);
});

socket.on("removeProduct", (productId) => {
  
  const product = document.getElementById(`product-${productId}`);
  if (product) {
    product.remove();
  }
});
