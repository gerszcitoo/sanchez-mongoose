import express from "express";
import dotenv from "dotenv";
dotenv.config();
import ProductManager from "./managers/ProductManager.js";
import productRouter from "./routes/ProductRouter.js";
import cartRouter from "./routes/CartRouter.js";
import mongoose from "mongoose";

const prodMan = new ProductManager("products.json");

void (async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:Contraseña@clustercoder.uvu1koy.mongodb.net/test",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use("/api/products", productRouter);
    app.use("/api/carts", cartRouter);

    const port = 8082;

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.log("Error: ", error);
  }
})();

export default prodMan;
