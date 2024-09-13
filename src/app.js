import express from "express";
import productsRouter from "./routes/products.js";
import cartsRouter from "./routes/carts.js";
import viewsRouter from "./routes/views.js";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import { Server } from "socket.io";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/home", viewsRouter);
app.use("/realtime", viewsRouter);

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Conectado al servidor ${PORT}`);
});

const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("newProduct", (product) => {
    console.log("Producto nuevo recibido:", product);
    io.emit("updateProductList", product);
  });

  socket.on("deleteProduct", (productId) => {
    console.log("Producto eliminado con id:", productId);
    io.emit("removeProduct", productId);
  });
});

export { io };
