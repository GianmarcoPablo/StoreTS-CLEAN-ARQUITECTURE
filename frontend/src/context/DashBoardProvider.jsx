import { useContext, createContext, useEffect, useState } from "react";
import { clienteAxios } from "../config/axios";
const DashBoardContext = createContext();

export const useDashBoard = () => useContext(DashBoardContext);

export default function DashBoardProvider({ children }) {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const getProducts = async () => {
        const { data } = await clienteAxios.get("/products");
        setProducts(data.products);
    }

    const createProduct = async (product) => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                console.log("no hay token");
                return;
            }

            const headers = {
                "Accept": "application/json",
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }

            const { data } = await clienteAxios.post("/products", product, { headers });
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    const getCategories = async () => {
        const { data } = await clienteAxios.get("/categories");
        setCategories(data.categories);
    }

    useEffect(() => {
        getProducts();
        getCategories();
    }, [])


    return (
        <DashBoardContext.Provider value={{
            products,
            categories,
            createProduct
        }}>
            {children}
        </DashBoardContext.Provider>
    )
}

