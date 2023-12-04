import { clienteAxios } from "../config/axios";

const getProducts = async () => {
    const { data } = await clienteAxios.get("/products");
    return data.products;
}

export {
    getProducts
}