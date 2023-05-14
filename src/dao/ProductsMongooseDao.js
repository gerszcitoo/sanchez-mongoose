import productSchema from "../models/productSchema.js";

class ProductDao {
  async getProducts(limit) {
    try {
      if (!limit) {
        limit = 10;
      }
      const documents = await productSchema.find({ status: true }).limit(limit);
      return documents.map((document) => ({
        id: document._id,
        title: document.title,
        description: document.description,
        code: document.code,
        price: document.price,
        status: document.status,
        stock: document.stock,
        category: document.category,
        thumbnail: document?.thumbnail,
      }));
    } catch (error) {
      throw new Error(error);
    }
  }

  async getProductById(id) {
    try {
      const document = await productSchema.findOne(id).where({ status: true });
      if (!document) return null;

      return {
        id: document._id,
        title: document.title,
        description: document.description,
        code: document.code,
        price: document.price,
        status: document.status,
        stock: document.stock,
        category: document.category,
        thumbnail: document?.thumbnail,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async getProductByCode(code) {
    try {
      const document = await productSchema.find({ code }, { status: true });
      if (document.length === 0) return null;
      return {
        id: document[0]._id,
        title: document[0].title,
        description: document[0].description,
        code: document[0].code,
        price: document[0].price,
        status: document[0].status,
        stock: document[0].stock,
        category: document[0].category,
        thumbnail: document[0]?.thumbnail,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async createProduct(data) {
    try {
      const document = await productSchema.create(data);
      return {
        id: document._id,
        title: document.title,
        description: document.description,
        code: document.code,
        price: document.price,
        status: document.status,
        stock: document.stock,
        category: document.category,
        thumbnail: document?.thumbnail,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  async updateProduct(id, data) {
    try {
      const document = await productSchema.findByIdAndUpdate(id, data, {
        new: true,
      });
      return {
        id: document._id,
        title: document.title,
        description: document.description,
        code: document.code,
        price: document.price,
        status: document.status,
        stock: document.stock,
        category: document.category,
        thumbnail: document?.thumbnail,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteProduct(id) {
    try {
      const document = await productSchema.findByIdAndUpdate(
        id,
        { status: false },
        { new: true }
      );
      if (!document) {
        throw new Error(`No se encontró un documento con el id: ${id}`);
      }
      return {
        id: document._id,
        title: document.title,
        description: document.description,
        code: document.code,
        price: document.price,
        status: document.status,
        stock: document.stock,
        category: document.category,
        thumbnail: document?.thumbnail,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default ProductDao;
