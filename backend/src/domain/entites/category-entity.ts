import { CustomError } from "../errors/error-custom"

export class CategoryEntity {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly description: string,
        public readonly is_active: boolean,
        public readonly outstanding: boolean,
        public readonly user: string,
        public readonly img?: string,
    ) { }

    static fromObject(object: { [key: string]: any }): CategoryEntity {
        const { id, _id, name, description, is_active, outstanding, user, img } = object

        if (!_id && id) throw CustomError.badRequest("Category id not found")
        if (!name) throw CustomError.badRequest("Category name not found")
        if (!description) throw CustomError.badRequest("Category description not found")
        if (is_active === undefined) throw CustomError.badRequest("Category is_active not found")
        if (outstanding === undefined) throw CustomError.badRequest("Category outstanding not found")
        if (!user) throw CustomError.badRequest("Category user not found")

        return new CategoryEntity(id, name, description, is_active, outstanding, user, img)
    }
}