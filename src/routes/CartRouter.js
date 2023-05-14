import { Router } from "express";
import CartManager from "../managers/CartManager.js";

const cartRouter = Router();
const cartManager = new CartManager();

cartRouter.post("/", async (req, res) => {
  const newCart = await cartManager.createCart();
  res.status(200).json(newCart);
});

cartRouter.get("/:cid", async (req, res) => {
  const cid = req.params.cid;
  const cartById = await cartManager.getCartById(cid);
  res.status(200).json(cartById);
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const cart = await cartManager.getCartById(cid);
  if (!cart) {
    const newCart = await cartManager.createCart();
    await cartManager.addProdToCart(newCart.id, pid);
    res.status(200).json(newCart);
  } else {
    await cartManager.addProdToCart(cid, pid);
    const updatedCart = await cartManager.getCartById(cid);
    res.status(200).json(updatedCart);
  }
});

export default cartRouter;
