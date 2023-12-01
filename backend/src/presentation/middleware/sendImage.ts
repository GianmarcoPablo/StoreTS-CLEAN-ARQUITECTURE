import { Request, Response, NextFunction } from 'express';
import fileUpload, { UploadedFile } from 'express-fileupload';
import { randomUUID } from "crypto";
import fs from 'fs';
import path from 'path';

declare global {
    namespace Express {
        interface Request {
            file?: { filename: string };
        }
    }
}

const subirArchivo = (req: Request, res: Response, next: NextFunction) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.imagen) {
        return res.status(400).send('No files were uploaded.');
    }

    let imagen: UploadedFile;
    if (Array.isArray(req.files.imagen)) {
        imagen = req.files.imagen[0];
    } else {
        imagen = req.files.imagen;
    }

    const extension = imagen.mimetype.split("/")[1];
    const filename = `${randomUUID()}.${extension}`;
    const uploadPath = path.join(__dirname, '../../../uploads/', filename);

    imagen.mv(uploadPath, function (err) {
        if (err)
            return res.status(500).send(err);

        req.file = {
            filename: filename
        };
        next();
    });
}

export { subirArchivo };
