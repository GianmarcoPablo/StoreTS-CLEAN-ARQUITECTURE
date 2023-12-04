import { CustomError } from "../errors/error-custom"



export class ProducEntity {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly description: string,
        public readonly is_active: boolean,
        public readonly outstanding: boolean,
        public readonly img?: string,
        public readonly price?: number,
        public readonly category?: string,
        public readonly coupons?: {
            code: string,
            discount: number,
            expire_date: Date,
            cuupon_is_active: boolean
        }
    ) { }

    static fromObject(object: { [key: string]: any }): ProducEntity {
        const { id, _id, name, description, is_active, outstanding, img, price, category, coupons } = object

        if (!_id && id) throw CustomError.badRequest("Product id not found")
        if (!name) throw CustomError.badRequest("Product name not found")
        if (is_active === undefined) throw CustomError.badRequest("Product is_active not found")
        if (outstanding === undefined) throw CustomError.badRequest("Product outstanding not found")


        return new ProducEntity(id, name, description, is_active, outstanding, img, price, category, coupons)
    }
}