import CartDao from "../dao/CartsMongooseDao.js";

class CartManager {
  constructor() {
    this.dao = new CartDao();
  }
  async getCartById(id) {
    try {
      return this.dao.getCartById(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async createCart(data) {
    try {
      return this.dao.createCart(data);
    } catch (error) {
      throw new Error(error);
    }
  }

  async addProdToCart(id, product) {
    try {
      return this.dao.insertOnCart(id, product);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default CartManager;
