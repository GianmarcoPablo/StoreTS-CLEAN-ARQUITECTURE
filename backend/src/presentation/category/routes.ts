import { Router } from "express";
import { CategoryController } from "./controller";
import { CategoryService } from "../services/category.service";
import { AuthMiddleware } from "../middleware";

export class CategoryRoutes {
    static get routes(): Router {

        const router = Router()
        const categoryService = new CategoryService()
        const categoryController = new CategoryController(categoryService)

        router.post("/", [AuthMiddleware.validateJWT], categoryController.createCategory)

        return router
    }
}