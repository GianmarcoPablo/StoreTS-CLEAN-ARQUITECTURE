import mongoose from "mongoose";

interface Options {
    mongoUri: string
}

export class MongoDatabase {
    async connect(options: Options) {
        try {
            await mongoose.connect(options.mongoUri, {
                dbName: "Store",
            })
            console.log(`Mongoose connected to ${options.mongoUri}`)
            return true
        } catch (error) {
            console.log(`Mongoose connection error`)
            throw error
        }
    }

    static async disconnect() {
        await mongoose.disconnect()
    }
}