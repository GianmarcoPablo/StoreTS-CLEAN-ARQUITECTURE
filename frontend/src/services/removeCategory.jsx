import { clienteAxios } from "../config/axios";
export const removeCategory = async (id) => {
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

        await clienteAxios.delete(`/categories/${id}`, { headers })
    } catch (error) {
        console.log(error);
    }
}