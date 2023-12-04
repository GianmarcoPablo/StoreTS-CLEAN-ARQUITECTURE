import { ProductModel } from "../../database/mongo/models/Product-model";
import { CreateProductDto, CustomError, PaginationDto, ProducEntity } from "../../domain";

export class ProductService {
    async createProduct(createProductDto: CreateProductDto, file: string) {
        try {

            const { code, discount, expire_date, cuupon_is_active } = createProductDto
            const exists = await ProductModel.exists({ name: createProductDto.name })

            const coupons = {
                code,
                discount,
                expire_date,
                cuupon_is_active
            }

            if (exists) throw CustomError.badRequest("Product already exists")

            const product = new ProductModel({
                ...createProductDto,
                img: file,
                coupons
            })

            await product.save()

            return {
                message: "Product created successfully",
                product: ProducEntity.fromObject(product)
            }


        } catch (error) {
            throw CustomError.InternalServerError(`[ERROR] ${error}`)
        }
    }

    async obtainProducts(paginationDto: PaginationDto) {
        const { page, limit } = paginationDto

        const query = { is_active: true }
        try {
            const [total, products] = await Promise.all([
                ProductModel.countDocuments(query),
                ProductModel.find(query)
                    .skip((page - 1) * limit)
                    .limit(limit)
            ])

            const productsEntity = products.map((product) => ProducEntity.fromObject(product))

            return {
                page: page,
                limit: limit,
                total: total,
                nextPage: `/api/products?page=${page + 1}&limit=${limit}`,
                prevPage: (page - 1) > 0 ? `/api/products?page=${page - 1}&limit=${limit}` : '',
                products: productsEntity
            }
        } catch (error) {
            throw CustomError.InternalServerError(`[ERROR] ${error}`)
        }
    }

    async obtainProductById(id: string) {
        try {
            const product = await ProductModel.findById(id)

            if (!product) throw CustomError.NotFound("Product not found")

            const productEntity = ProducEntity.fromObject(product)

            return {
                product: productEntity
            }
        } catch (error) {
            throw CustomError.InternalServerError(`[ERROR] ${error}`)
        }
    }

    async updateProduct(id: string, createProductDto: CreateProductDto) { }

    async deleteProductById(id: string) {
        try {
            const product = await ProductModel.findById(id)
            if (!product) throw CustomError.NotFound("Product not found")
            product.is_active = false
            await product.save()
            return {
                message: "Product deleted successfully"
            }
        } catch (error) {
            throw CustomError.InternalServerError(`[ERROR] ${error}`)
        }
    }
}
