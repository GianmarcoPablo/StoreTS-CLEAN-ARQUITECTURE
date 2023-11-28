import { NextFunction, Request, Response } from "express";
import { GenerateTokenAdapter } from "../../config";
import { UserModel } from "../../database";
import { UserEntity } from "../../domain";

export class AuthMiddleware {
    static async validateJWT(req: Request, res: Response, next: NextFunction) {
        //TODO: Validate JWT
        const authorization = req.header('Authorization');
        if (!authorization) return res.status(401).json({ error: "Unauthorized" })
        if (!authorization.startsWith("Bearer ")) return res.status(401).json({ error: "Unauthorized" })

        const token = authorization.split(" ").at(1) || ""
        try {
            const payload = await GenerateTokenAdapter.validateToken(token)
            const { id } = payload as { id: string }
            if (!payload) return res.status(401).json({ error: "Unauthorized" })
            const user = await UserModel.findById(id)
            if (!user) return res.status(401).json({ error: "Unauthorized" })
            req.body.user = user
            next()

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server errro" })
        }
    }
}

