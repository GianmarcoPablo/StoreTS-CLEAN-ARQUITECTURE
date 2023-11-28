import { CustomError } from "../errors/error-custom"

export class CouponEntity {
    constructor(
        public readonly id: number,
        public readonly code: string,
        public readonly discount: number,
        public readonly isActive: boolean,
        public readonly expirationDate: Date
    ) { }

    static fromObject(object: { [key: string]: any }): CouponEntity {
        const { id, _id, code, discount, isActive, expirationDate } = object

        if (!id && _id) throw CustomError.badRequest("Coupon id not found")
        if (!code) throw CustomError.badRequest("Coupon code not found")
        if (discount === undefined) throw CustomError.badRequest("Coupon discount not found")
        if (isActive === undefined) throw CustomError.badRequest("Coupon isActive not found")
        if (!expirationDate) throw CustomError.badRequest("Coupon expirationDate not found")

        return new CouponEntity(id, code, discount, isActive, expirationDate)
    }
}

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
        public readonly coupons?: CouponEntity[]
    ) { }

    static fromObject(object: { [key: string]: any }): ProducEntity {
        const { id, _id, name, description, is_active, outstanding, img, price, category, coupons } = object

        if (!_id && id) throw CustomError.badRequest("Product id not found")
        if (!name) throw CustomError.badRequest("Product name not found")
        if (is_active === undefined) throw CustomError.badRequest("Product is_active not found")
        if (outstanding === undefined) throw CustomError.badRequest("Product outstanding not found")

        const couponsEntity = coupons?.map((coupon: any) => CouponEntity.fromObject(coupon))

        return new ProducEntity(id, name, description, is_active, outstanding, img, price, category, couponsEntity)
    }
}