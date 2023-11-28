import { Request, Response } from "express";
import { FileUploadService } from "../services/file-Upload.service";
import { CustomError } from "../../domain";
import { UploadedFile } from "express-fileupload"

export class FileUploadController {
    constructor(
        private readonly fileUploadService: FileUploadService,
    ) { }


    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({
                error: error.message
            })
        }
        console.log(`${error}`);
        return res.status(500).json({ error: 'Internal server error' });
    }

    public uploadFile = async (req: Request, res: Response) => {
        const type = req.params.type
        const file = req.body.files.at(0) as UploadedFile
    }

    public multipleUpload = async (req: Request, res: Response) => { }
}