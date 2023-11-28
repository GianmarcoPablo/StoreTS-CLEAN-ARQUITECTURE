export class DeleteCategoryDto {
    constructor(
        public readonly id: string
    ) { }

    static create(id: string): [string?, DeleteCategoryDto?] {

        if (!id) return ["Id is required"]
        return [undefined, new DeleteCategoryDto(id)]
    }
}