import { clienteAxios } from "../config/axios";

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
        return data.product
    } catch (error) {
        console.log(error);
    }
}


export {
    createProduct
}