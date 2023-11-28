import { Request, Response } from "express"
import { CustomError } from "../../domain";
import { CreateCategoryDto } from "../../domain";
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

}

