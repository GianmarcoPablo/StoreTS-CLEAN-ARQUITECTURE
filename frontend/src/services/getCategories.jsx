import { clienteAxios } from "../config/axios";

const getCategories = async () => {
    const { data } = await clienteAxios.get("/categories");
    return data.categories;
}

export {
    getCategories
}