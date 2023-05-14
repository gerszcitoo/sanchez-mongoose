import cartSchema from "../models/cartSchema.js";

class CartDao {
  async getCartById(id) {
    try {
      const document = await cartSchema.findById(id);
      if (!document) return null;
      return {
        id: document._id,
        products: document.products.map((item) => {
          return {
            id: item._id,
            quantity: item.quantity,
          };
        }),
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async createCart(data) {
    try {
      const document = await cartSchema.create(data);
      return {
        id: document._id,
        products: document.products.map((item) => {
          return {
            id: item._id,
            quantity: item.quantity,
          };
        }),
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async insertOnCart(cid, pid) {
    try {
      const cart = await cartSchema.findOne({ _id: cid });
      if (!cart) {
        this.createCart();
      }
      const productIndex = cart.products.findIndex((item) => item._id == pid);

      if (productIndex !== -1) {
        cart.products[productIndex].quantity += 1;
      } else {
        cart.products.push({ _id: pid, quantity: 1 });
      }

      const updatedCart = await cart.save();
      return {
        id: updatedCart._id,
        products: updatedCart.products.map((item) => {
          return {
            id: item._id,
            quantity: item.quantity,
          };
        }),
      };

      /*  const updateProducts = await cartSchema.findOneAndUpdate(
        { _id: cid, "products._id": pid },
        { $inc: { "products.$.quantity": 1 } },
        { new: true }
      );

      if (!updateProducts) {
        await cartSchema.updateOne(
          { _id: cid },
          { $push: { products: { _id: pid, quantity: 1 } } }
        );
      }

      const document = await cartSchema.findOne({ _id: cid });

      return {
        id: document._id,
        products: document.products.map((item) => {
          return {
            id: item._id,
            quantity: item.quantity,
          };
        }),
      }; */
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default CartDao;
