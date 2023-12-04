import { Router } from "express";
import { AuthService } from "../services/auth.service";
import { AuthController } from "./controller";
import { AuthMiddleware } from "../middleware";


export class AuthRoutes {

    static get routes(): Router {

        const router = Router()
        const authService = new AuthService()
        const authController = new AuthController(authService)

        router.post('/login', authController.loginUser)
        router.post('/register', authController.registerUser)
        router.get("/profile", AuthMiddleware.validateJWT, authController.getProfile)
        router.get("/validate-email/:token", authController.validateEmail)

        return router
    }

}