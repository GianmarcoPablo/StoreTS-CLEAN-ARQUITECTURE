import { Router } from "express";
import { AuthMiddleware } from "../middleware";
import { ProductController } from "./controller";
import { ProductService } from "../services/product.service";
import { subirArchivo } from "../middleware/sendImage";
export class ProductRoutes {
    static get routes(): Router {

        const router = Router()

        const productService = new ProductService()
        const productController = new ProductController(productService)
        router.post("/", [AuthMiddleware.validateJWT, subirArchivo], productController.createProduct)
        router.get("/", productController.obtainProducts)
        router.get("/:id", productController.obtainProductById)
        router.delete("/:id", AuthMiddleware.validateJWT, productController.deleteProductById)

        return router
    }
}