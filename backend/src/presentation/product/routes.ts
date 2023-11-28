import { Router } from "express";
import { AuthMiddleware } from "../middleware";
import { ProductController } from "./controller";
import { ProductService } from "../services/product.service";

export class ProductRoutes {
    static get routes(): Router {

        const router = Router()

        const productService = new ProductService()
        const productController = new ProductController(productService)
        router.post("/", AuthMiddleware.validateJWT, productController.createProduct)
        router.get("/", productController.obtainProducts)
        router.get("/:id", productController.obtainProductById)
        router.delete("/:id", AuthMiddleware.validateJWT, productController.deleteProductById)

        return router
    }
}