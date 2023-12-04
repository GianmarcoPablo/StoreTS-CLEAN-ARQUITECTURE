export class CreateProductDto {
    constructor(
        public name: string,
        public price: number,
        public category: string,
        public description?: string,
        public img?: string,
        public is_active?: boolean,
        public outstanding?: boolean,
        public code?: string,
        public discount?: number,
        public expire_date?: Date,
        public cuupon_is_active?: boolean,

    ) { }

    public static create(obj: { [key: string]: any }): [string?, CreateProductDto?] {
        const { name, price, category } = obj

        if (!name) return ["Name is required"]
        if (!price) return ["Price is required"]
        if (!category) return ["Category is required"]

        return [undefined, new CreateProductDto(
            name,
            price,
            category,
            obj.description,
            obj.img,
            obj.is_active,
            obj.outstanding,
            obj.code,
            obj.discount,
            obj.expire_date,
            obj.cuupon_is_active,
        )]
    }
}