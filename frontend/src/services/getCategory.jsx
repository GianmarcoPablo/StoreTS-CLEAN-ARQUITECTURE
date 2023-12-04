import { clienteAxios } from "../config/axios"
export const getCategory = async (id) => {
    try {
        const { data } = await clienteAxios.get(`/categories/${id}`)
        return data
    } catch (error) {
        console.log(error)
    }
}