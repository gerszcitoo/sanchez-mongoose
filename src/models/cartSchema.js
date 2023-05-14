import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";

const cartCollection = "carts";

const ProductSchema = new Schema(
  {
    id: { type: Schema.Types.String, require: true },
    quantity: { type: Schema.Types.Number, require: true, default: 0 },
  },
  { _id: false }
);
const CartSchema = new Schema({
  /*products: {
    type: [
      {
        _id: {
          type: ObjectId,
          required: [true, "El ID del producto es obligatorio"],
        },
        quantity: {
          type: Number,
          required: [true, "Es obligatorio ingresar una cantidad"],
        },
      },
    ],
    
    required: [true, "Un carrito debe tener al menos un producto"],
  },*/
  products: [ProductSchema],
  enable: { type: Schema.Types.Boolean, require: true },
});

export default model(cartCollection, CartSchema);
