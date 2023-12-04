import { clienteAxios } from "../config/axios";

const removeProduct = async (id) => {
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

        const { data } = await clienteAxios.delete(`/products/${id}`, { headers });
        return data.product
    } catch (error) {
        console.log(error);
    }
}

export {
    removeProduct
}