export class CreateProductDto {
    constructor(
        public name: string,
        public price: number,
        public category: string,
        public coupons: [
            {
                code: string,
                discount: number,
                isActive: boolean,
                expirationDate: Date,
            },
        ],
    ) { }

    public static create(obj: { [key: string]: any }): [string?, CreateProductDto?] {
        const { name, price, category, coupons } = obj

        if (!name) return ["Name is required"]
        if (!price) return ["Price is required"]
        if (isNaN(price)) return ["Price must be a number"]
        if (!category) return ["Category is required"]

        return [undefined, new CreateProductDto(name, price, category, coupons)]
    }
}