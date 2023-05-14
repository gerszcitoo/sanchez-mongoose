import ProductManager from "../managers/ProductManager.js";

class ProductsController {
  static getProducts = async (req, res) => {
    try {
      const { limit } = req.query;
      const manager = new ProductManager();
      const result = await manager.getProducts(limit);
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };
}

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const manager = new ProductManager();
    const result = await manager.getProductById(id);
    res.send(result);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

export const postProduct = async (req, res) => {
  try {
    const { body } = req;
    const manager = new ProductManager();
    const result = await manager.createProduct(body);
    res
      .status(201)
      .send({ status: "succes", msg: "Producto creado exitosamente", result });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const putProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const manager = new ProductManager();
    const codeExist = await manager.getProductByCode(req.body.code);
    const result = await manager.update(id, req.body);

    res.send({ status: "succes", msg: "Producto actualizado", result });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const manager = new ProductManager();
    const result = await manager.deleteProduct(id);

    res.send({ status: "succes", msg: "Producto eliminado", result });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
export default ProductsController;
