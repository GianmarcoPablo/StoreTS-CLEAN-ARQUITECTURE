import path from "path"
import fs from "fs"
import { UploadedFile } from "express-fileupload"
import { randomUUID } from "crypto"
import { CustomError } from "../../domain"
export class FileUploadService {

    constructor(

    ) { }

    private checkFolder(folderPath: string) {
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }
    }

    public async uploadSingle(
        file: UploadedFile,
        folder: string = "uploads",
        validExtensions: string[] = ["png", "jpg", "jpeg", "gif", "webp", "avif"],
    ) {

        try {
            const fileExtension = file.name.split(".").at(-1) ?? ""
            if (!validExtensions.includes(fileExtension)) {
                throw CustomError.badRequest(`Invalid extension: ${fileExtension}, valid ones ${validExtensions}`)
            }

            const destination = path.resolve(__dirname, "../../../", folder)
            this.checkFolder(destination)

            const fileName = `${randomUUID()}.${fileExtension}`
            file.mv(`${destination}/${fileName}`)
            return {
                fileName
            }
        } catch (error) {
            throw error
        }
    }
}