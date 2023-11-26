import express, { Router } from "express"
import path from "path"

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
        const { port, routes, publicPath = "public" } = options
        this.port = port
        this.publicPath = publicPath
        this.routes = routes
    }

    async serverStart() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
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

