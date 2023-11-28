import { Request, Response } from "express"
import { CreateCategoryDto, CustomError, PaginationDto, DeleteCategoryDto } from "../../domain";
import { CategoryService } from "../services/category.service";

export class CategoryController {

    constructor(
        private readonly categoryService: CategoryService
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ message: error.message })
        }
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }

    public createCategory = (req: Request, res: Response) => {
        const [error, createCategoryDto] = CreateCategoryDto.create(req.body)
        if (error) return res.status(400).json({ message: error })
        this.categoryService.createCategory(createCategoryDto!, req.body.user)
            .then((response) => res.status(201).json(response))
            .catch((error) => this.handleError(error, res))
    }

    public obtainCategories = (req: Request, res: Response) => {

        const { page = 1, limit = 10 } = req.query
        const [error, paginationDto] = PaginationDto.create(+page, +limit)

        if (error) return res.status(400).json({ message: error })

        this.categoryService.obtainCategories(paginationDto!)
            .then((response) => res.status(200).json(response))
            .catch((error) => this.handleError(error, res))
    }

    public obtainCategoryById = (req: Request, res: Response) => {
        const { id } = req.params
        this.categoryService.obtainCategoryById(id)
            .then((response) => res.status(200).json(response))
            .catch((error) => this.handleError(error, res))
    }

    public updateCategory = (req: Request, res: Response) => { }

    public deleteCategory = (req: Request, res: Response) => {
        const { id } = req.params
        const [error, deleteCategoryDto] = DeleteCategoryDto.create(id)
        if (error) return res.status(400).json({ message: error })

        this.categoryService.deleteCategory(deleteCategoryDto!)
            .then((response) => res.status(200).json(response))
            .catch((error) => this.handleError(error, res))
    }
}

