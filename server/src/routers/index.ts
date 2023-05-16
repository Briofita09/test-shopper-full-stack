import { Router } from "express";
import multer from "multer";
import { checkProducts, editProducts, getProducts } from "../controllers";

const router = Router();
const multerConfig = multer();

router.post("/get-products", getProducts);
router.post("/check-products", multerConfig.single("file"), checkProducts);
router.post("/edit-products", multerConfig.single("file"), editProducts);

export { router };
