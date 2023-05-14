import CartManager from "../managers/CartManager.js";
import { ObjectId } from "mongodb";

export const getCartById = async (req, res) => {
  try {
    const { cid } = req.params;
    const manager = new CartManager();
    const result = await manager.getOneCart(cid);
    res.send(result);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

export const postCart = async (req, res) => {
  try {
    const { body } = req;
    const manager = new CartManager();
    const result = await manager.createCart(body);
    res.status(201).send({ msg: "Carrito creado", result });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const postProductByCartId = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const manager = new CartManager();
    const result = await manager.insertOnCart(cid, pid);

    res.send({ status: "success", msg: "Carrito actualizado", result });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
