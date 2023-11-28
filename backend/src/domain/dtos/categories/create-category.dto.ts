export class CreateCategoryDto {
    constructor(
        public name: string,
        public description: string,
        public is_active?: boolean,
        public outstanding?: boolean,
        public img?: string,
        public user?: string
    ) { }

    public static create(obj: { [key: string]: any }): [string?, CreateCategoryDto?] {

        const { name, description, is_active, outstanding, img, user } = obj

        if (!name) return ['name is required']
        if (!description) return ['description is required']


        return [undefined, new CreateCategoryDto(name, description, is_active, outstanding, img, user)]
    }
}