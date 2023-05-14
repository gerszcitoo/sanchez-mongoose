import express from "express";
import path from "path";
import { Server } from "socket.io";
import ProductManager from "../managers/ProductManager.js";
import * as fs from "fs/promises";

const viewsRouter = express.Router();
const productManager = new ProductManager();
const server = express();

server.set("view engine", "hbs");

server.set("views", path.join(process.cwd(), "views"));

// static products view
viewsRouter.get("/", async (req, res) => {
  let limit = +req.query.limit;
  if (!limit) {
    const viewProducts = await productManager.getProducts();
    res.render("home", { viewProducts });
  } else {
    const viewProducts = [];
    const products = await productManager.getProducts();
    for (let i = 0; i < limit; i++) {
      viewProducts.push(products[i]);
    }
    res.render("home", { viewProducts });
  }
});

viewsRouter.get("/realtimeproducts", async (req, res) => {
  res.render("realTimeProducts", {
    products: await productManager.getProducts(),
  });
});

const socketServer = new Server();

socketServer.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado");
  socket.emit("products", await productManager.getProducts());
  fs.watchFile(productManager.path, async () => {
    console.log("Productos actualizados");
    const products = await productManager.getProducts();
    socketServer.emit("products", products);
  });
});

export default viewsRouter;
