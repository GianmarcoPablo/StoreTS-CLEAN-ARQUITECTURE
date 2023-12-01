import express, { Router } from "express"
import fileUpload from "express-fileupload"
import path from "path"
import cors from "cors"

interface Options {
    port: number
    publicPath?: string
    routes: Router
}

export class Server {
    public readonly app = express()
    private serverListener?: any
    private readonly port: number
    private readonly publicPath: string
    private readonly routes: Router

    constructor(options: Options) {
        const { port, routes, publicPath = "uploads" } = options
        this.port = port
        this.publicPath = publicPath
        this.routes = routes
    }

    async serverStart() {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(fileUpload({
            limits: { fileSize: 50 * 1024 * 1024 },
        }))
        this.app.use(express.static(this.publicPath))
        this.app.use(this.routes)

        this.app.get("*", (req, res) => {
            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);
        })

        this.serverListener = this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }

    public close() {
        this.serverListener.close()
    }
}

