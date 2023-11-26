import { regularExps } from "../../../config"

export class RegisterDto {

    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
    ) { }

    static create(object: { [key: string]: any }): [string?, RegisterDto?] {

        const { name, email, password } = object

        if (!name) return ['name is required']
        if (!email) return ['email is required']
        if (!regularExps.email.test(email)) return ['email is invalid']
        if (!password) return ['password is required']
        if (password.length < 6) return ['password must be at least 6 characters']

        return [undefined, new RegisterDto(name, email, password)] // error, dto
    }
}