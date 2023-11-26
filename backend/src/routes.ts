import { Router } from "express";
import { AuthRoutes } from "./presentation/auth/routes";

export class AppRouter {
    static get routes(): Router {
        const router = Router()

        router.use("/api/auth", AuthRoutes.routes)

        return router
    }

}