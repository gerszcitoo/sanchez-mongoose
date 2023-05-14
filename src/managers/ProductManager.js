import ProductDao from "../dao/ProductsMongooseDao.js";

class ProductManager {
  constructor() {
    this.dao = new ProductDao();
  }

  async getProducts(limit) {
    try {
      return this.dao.getProducts(limit);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getProductById(id) {
    try {
      return this.dao.getProductById(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getProductByCode(code) {
    try {
      return this.dao.getProductByCode(code);
    } catch (error) {
      throw new Error(error);
    }
  }

  async createProduct(data) {
    try {
      return this.dao.createProduct(data);
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateProduct(id, data) {
    try {
      return this.dao.updateProduct(id, data, { new: true });
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteProduct(id) {
    try {
      return this.dao.deleteProduct(id, { status: false }, { new: true });
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default ProductManager;
