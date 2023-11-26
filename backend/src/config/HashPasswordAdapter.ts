import bcrypt from "bcrypt"

export class HashPasswordAdapter {
    public static async hash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        return hash
    }

    public static async compare(password: string, hash: string) {
        const isMatch = await bcrypt.compare(password, hash)
        return isMatch
    }
}