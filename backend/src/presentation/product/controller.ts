import { CreateProductDto, CustomError, PaginationDto } from "../../domain";
import { Request, Response } from "express"
import { ProductService } from "../services/product.service";

export class ProductController {

    constructor(
        private readonly productService: ProductService
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ message: error.message })
        }
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }

    public createProduct = (req: Request, res: Response) => {
        const [error, createProductDto] = CreateProductDto.create(req.body)

        if (error) return res.status(400).json({ message: error })

        this.productService.createProduct(createProductDto!)
            .then((response) => res.status(201).json(response))
            .catch((error) => this.handleError(error, res))
    }

    public obtainProducts = (req: Request, res: Response) => {
        //const { category, outstanding, name } = req.query
        const { page = 1, limit = 10 } = req.query
        const [error, paginationDto] = PaginationDto.create(+page, +limit)

        if (error) return res.status(400).json({ message: error })

        this.productService.obtainProducts(paginationDto!)
            .then((response) => res.status(200).json(response))
            .catch((error) => this.handleError(error, res))
    }

    public obtainProductById = (req: Request, res: Response) => {
        const { id } = req.params
        this.productService.obtainProductById(id)
            .then((response) => res.status(200).json(response))
            .catch((error) => this.handleError(error, res))
    }

    public deleteProductById = (req: Request, res: Response) => {
        const { id } = req.params
        this.productService.deleteProductById(id)
            .then((response) => res.status(200).json(response))
            .catch((error) => this.handleError(error, res))
    }

}