import { Router } from "express";
import { AuthRoutes } from "./presentation/auth/routes";
import { CategoryRoutes } from "./presentation/category/routes";
import { ProductRoutes } from "./presentation/product/routes";
import { FileUploadRoutes } from "./presentation/file-uploads/routes";

export class AppRouter {
    static get routes(): Router {
        const router = Router()

        router.use("/api/auth", AuthRoutes.routes)
        router.use("/api/categories", CategoryRoutes.routes)
        router.use("/api/products", ProductRoutes.routes)
        router.use("/api/uploads", FileUploadRoutes.routes)
        return router
    }

}