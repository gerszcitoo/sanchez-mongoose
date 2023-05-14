import { Router } from "express";
import ProductsController, {
  getProductById,
  postProduct,
  putProduct,
  deleteProduct,
} from "../controllers/productsController.js";

const router = Router();

router.get("/", ProductsController.getProducts);

router.get("/:pid", getProductById);

router.post("/", postProduct);

router.put("/:id", putProduct);

router.delete("/:id", deleteProduct);

export default router;
