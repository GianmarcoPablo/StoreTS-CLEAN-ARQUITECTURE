import { Router } from "express";
import { AuthRoutes } from "./presentation/auth/routes";
import { CategoryRoutes } from "./presentation/category/routes";

export class AppRouter {
    static get routes(): Router {
        const router = Router()

        router.use("/api/auth", AuthRoutes.routes)
        router.use("/api/categories", CategoryRoutes.routes)

        return router
    }

}