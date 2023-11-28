import { CreateCategoryDto, CustomError, CategoryEntity, UserEntity } from "../../domain";
import { CategoryModel } from "../../database";

export class CategoryService {
    async createCategory(categoryDto: CreateCategoryDto, user: UserEntity) {
        console.log({...user});
        const existsCategory = await CategoryModel.findOne({ name: categoryDto.name })

        if (existsCategory) throw CustomError.badRequest("Category already exists")

        try {
            const category = new CategoryModel({
                ...categoryDto,
                user
            })

            await category.save()

            const categoryEntity = CategoryEntity.fromObject(category)
            return {
                category: categoryEntity,
            }
        } catch (error) {

            throw CustomError.InternalServerError(`[ERROR]: ${error}`)
        }
    }
}