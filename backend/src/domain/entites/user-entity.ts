import { CustomError } from "../errors/error-custom"

export class UserEntity {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
        public readonly emailValidated: boolean,
        public readonly img?: string,
    ) { }

    static fromObject(object: { [key: string]: any }): UserEntity {
        const { id, _id, name, email, password, emailValidated, img } = object

        if (!_id && !id) throw CustomError.badRequest("User id not found")
        if (!name) throw CustomError.badRequest("User name not found")
        if (!email) throw CustomError.badRequest("User email not found")
        if (!password) throw CustomError.badRequest("User password not found")
        if (emailValidated === undefined) throw CustomError.badRequest("User emailValidated not found")

        return new UserEntity(id || _id, name, email, password, emailValidated, img)
    }
}