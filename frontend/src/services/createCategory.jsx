import { clienteAxios } from "../config/axios"

export const createCategory = async (category) => {
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

        const { data } = await clienteAxios.post("/categories", category, { headers });
        return data
    } catch (error) {
        console.log(error);
    }
}