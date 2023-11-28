import { Response, Request, NextFunction } from "express"

export class FileUploadMiddleware {
    static containFiles(req: Request, res: Response, next: NextFunction) {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ error: 'No files were uploaded' })
        }

        if (!Array.isArray(req.files.files)) {
            req.files.files = [req.files.files]
        } else {
            req.body.files = req.files.file;
        }
        next()
    }
}