import { Server } from "./presentation/server"
import { envs } from "./config/"
import { AppRouter } from "./routes"
import { MongoDatabase } from "./database/mongo/db-connection"

(async () => {
    await main()
})()

async function main() {

    const mongo = new MongoDatabase()
    mongo.connect({
        mongoUri: envs.MONGO_URI
    })

    const server = new Server({
        port: envs.PORT,
        routes: AppRouter.routes
    })
    await server.serverStart()
}

