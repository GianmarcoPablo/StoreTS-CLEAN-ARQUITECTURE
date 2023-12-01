import jwt from "jsonwebtoken"

export class GenerateTokenAdapter {
    public static generateToken(payload: any, duration: string = "30d") {
        return new Promise(resolve => {
            jwt.sign(payload, "SECRET", { expiresIn: duration }, (err, token) => {
                if (err) return resolve(null)
                resolve(token)
            })
        })
    }


    public static validateToken(token: string) {
        return new Promise(resolve => {
            jwt.verify(token, "SECRET", (err, decoded) => {
                if (err) return resolve(null)
                resolve(decoded)
            })
        })
    }
}