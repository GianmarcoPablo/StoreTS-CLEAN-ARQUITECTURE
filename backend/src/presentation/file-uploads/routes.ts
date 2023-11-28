import { Router } from "express";
import { FileUploadController } from "./controller";
import { FileUploadService } from "../services/file-Upload.service";
import { FileUploadMiddleware } from "../middleware/file-upload.middleware";
import { TypeMiddleware } from "../middleware/type.middleware";

export class FileUploadRoutes {
    static get routes(): Router {
        const router = Router()
        const fileUploadService = new FileUploadService()
        const fileUploadController = new FileUploadController(fileUploadService)

        router.use(FileUploadMiddleware.containFiles)
        router.use(TypeMiddleware.validTypes(['users', 'products', "categories"]))

        router.use("/single/:type", fileUploadController.uploadFile)
        router.use("/multiple/:type", fileUploadController.multipleUpload)
        return router
    }
}