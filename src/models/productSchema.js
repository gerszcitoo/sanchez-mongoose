import { Schema, model } from "mongoose";

const productCollection = "products";

const ProductSchema = new Schema({
  title: {
    type: String,
    required: [true, "El título es obligatorio"],
  },
  description: {
    type: String,
    required: [true, "La descripción es obligatoria"],
  },
  code: {
    type: String,
    required: [true, "El código es obligatorio"],
    unique: true,
  },
  price: {
    type: Number,
    required: [true, "El precio es obligatorio"],
  },
  status: {
    type: Boolean,
    default: true,
  },
  stock: {
    type: Number,
    required: [true, "El stock es obligatorio"],
  },
  category: {
    type: String,
    required: [true, "La categoría es obligatoria"],
  },
  thumbnail: {
    type: [String],
  },
});

export default model(productCollection, ProductSchema);
