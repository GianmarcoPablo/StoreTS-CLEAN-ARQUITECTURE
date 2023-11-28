import { CreateCategoryDto, CustomError, CategoryEntity, UserEntity, PaginationDto, DeleteCategoryDto } from "../../domain";
import { CategoryModel } from "../../database";

export class CategoryService {

    async createCategory(categoryDto: CreateCategoryDto, user: UserEntity) {
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

    async obtainCategories(paginationDto: PaginationDto) {
        const { page, limit } = paginationDto

        //view if category is_active
        const query = { is_active: true }

        try {
            const [total, categories] = await Promise.all([
                CategoryModel.countDocuments(query),
                CategoryModel.find(query)
                    .skip((page - 1) * limit)
                    .limit(limit)
                    .populate('user', ['name', 'email'])
            ])

            return {
                page: page,
                limit: limit,
                total: total,
                nextPage: `/api/categories?page=${page + 1}&limit=${limit}`,
                prevPage: (page - 1) > 0 ? `/api/categories?page=${page - 1}&limit=${limit}` : '',
                categories: categories
            }

            //const categoriesEntity = categories.map(category => CategoryEntity.fromObject(category))
        } catch (error) {
            throw CustomError.InternalServerError(`[ERROR]: ${error}`)
        }
    }

    async obtainCategoryById(id: string) {
        try {
            const category = await CategoryModel.findById(id).populate('user', ['name', 'email'])

            if (!category) throw CustomError.NotFound("Category not found")

            const categoryEntity = CategoryEntity.fromObject(category)

            return {
                category: categoryEntity
            }
        } catch (error) {
            throw CustomError.InternalServerError(`[ERROR]: ${error}`)
        }
    }

    async updateCategory(id: string, categoryDto: CreateCategoryDto) {

    }

    async deleteCategory(deleteCategoryDto: DeleteCategoryDto) {
        const { id } = deleteCategoryDto

        try {
            const category = await CategoryModel.findById(id)

            if (!category) throw CustomError.NotFound("Category not found")

            category.is_active = false

            await category.save()

            const categoryEntity = CategoryEntity.fromObject(category)

            return {
                message: "Category deleted successfully",
                category: categoryEntity
            }
        } catch (error) {
            throw CustomError.InternalServerError(`[ERROR]: ${error}`)
        }
    }
}