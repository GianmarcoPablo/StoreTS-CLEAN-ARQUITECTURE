import { useContext, createContext, useEffect, useState } from "react";
import { getProducts } from "../services/getProducts";
import { createProduct } from "../services/createProduct";
import { getCategories } from "../services/getCategories";
import { removeProduct } from "../services/removeProduct";
import { getCategory } from "../services/getCategory";
import { createCategory } from "../services/createCategory";
import { removeCategory } from "../services/removeCategory";

const DashBoardContext = createContext();

export const useDashBoard = () => useContext(DashBoardContext);

export default function DashBoardProvider({ children }) {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState({});
    const [alert, setAlert] = useState({});

    const addNewProduct = async (product) => {
        const newProduct = await createProduct(product)
        setProducts([...products, newProduct])
        setAlert({
            message: 'Product added successfully',
            type: 'success'
        })
        setTimeout(() => {
            setAlert({})
        }, 3000);
    }

    const addNewCategory = async (category) => {
        const newCategory = await createCategory(category)
        const { category: categ } = newCategory
        setCategories([...categories, categ])
        setAlert({
            message: 'Category added successfully',
            type: 'success'
        })
        setTimeout(() => {
            setAlert({})
        }, 3000);
    }

    const deleteProduct = async (id) => {
        await removeProduct(id)
        const productsUpdated = products.filter(product => product.id !== id)
        setProducts(productsUpdated)
        setAlert({
            message: 'Product removed successfully',
            type: 'success'
        })
        setTimeout(() => {
            setAlert({})
        }, 3000);
    }

    const deleteCategory = async (id) => {
        await removeCategory(id)
        const categoriesUpdated = categories.filter(category => category.id !== id)
        setCategories(categoriesUpdated)
        setAlert({
            message: 'Category removed successfully',
            type: 'success'
        })
        setTimeout(() => {
            setAlert({})
        }, 3000);
    }

    const getProductsData = async () => {
        try {
            const products = await getProducts()
            setProducts(products)
        } catch (error) {
            console.log(error)
        }
    }

    const getCategoriesData = async () => {
        try {
            const categories = await getCategories()
            setCategories(categories)
        } catch (error) {
            console.log(error)
        }
    }

    const getCategoryById = async (id) => {
        try {
            const category = await getCategory(id)
            const { category: categ } = category
            setCategory(categ)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getProductsData()
        getCategoriesData()
    }, [])


    return (
        <DashBoardContext.Provider
            value={{
                products,
                categories,
                addNewProduct,
                deleteProduct,
                alert,
                getCategoryById,
                category,
                addNewCategory,
                deleteCategory
            }}>
            {children}
        </DashBoardContext.Provider>
    )
}

