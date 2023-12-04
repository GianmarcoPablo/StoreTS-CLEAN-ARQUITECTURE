import { useState } from "react";
import { useDashBoard } from "../../context/DashBoardProvider"
import Alert from "../../components/Alert";

export default function AddProductPage() {

    const { alert, categories, addNewProduct } = useDashBoard();

    const [imagen, setImagen] = useState(null);
    const [previewImagen, setPreviewImagen] = useState(null);

    const coupons = {
        code: "",
        discount: "",
        expire_date: "",
        cuupon_is_active: ""
    }

    const [product, setProduct] = useState({
        name: "",
        price: "",
        description: "",
        category: "",
        is_active: "",
        outstanding: "",
        coupons: coupons
    })

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    };

    const fileSelectHandler = (e) => {
        const file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewImagen(reader.result);
        }
        setImagen(file);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("imagen", imagen, imagen.name);
        formData.append("name", product.name);
        formData.append("price", product.price);
        formData.append("description", product.description);
        formData.append("category", product.category);
        formData.append("is_active", JSON.parse(product.is_active));
        formData.append("outstanding", JSON.parse(product.outstanding));
        formData.append("code", product.coupons.code);
        formData.append("discount", product.coupons.discount);
        formData.append("expire_date", product.coupons.expire_date);
        formData.append("cuupon_is_active", JSON.parse(product.coupons.cuupon_is_active));
        await addNewProduct(formData);
        setProduct({
            name: "",
            price: "",
            description: "",
            category: "",
            is_active: "",
            outstanding: "",
            coupons: coupons
        })
        setPreviewImagen(null);
    };
    return (
        <>
            <div className="mt-10">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2">
                        <div className="flex flex-col">
                            <label className="text-gray-700" htmlFor="name">Nombre</label>
                            <input
                                className="border border-gray-300 p-2 rounded-lg"
                                type="text"
                                name="name"
                                id="name"
                                value={product.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-gray-700" htmlFor="price">Precio</label>
                            <input
                                className="border border-gray-300 p-2 rounded-lg"
                                type="number"
                                name="price"
                                id="price"
                                value={product.price}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-gray-700" htmlFor="description">Descripción</label>
                            <textarea
                                className="border border-gray-300 p-2 rounded-lg"
                                name="description"
                                id="description"
                                cols="30"
                                rows="10"
                                value={product.description}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-gray-700" htmlFor="category">Categoría</label>
                            <select
                                className="border border-gray-300 p-2 rounded-lg"
                                name="category"
                                id="category"
                                value={product.category}
                                onChange={handleChange}
                            >
                                <option value="">Seleccionar</option>
                                {
                                    categories.map((category) => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-gray-700" htmlFor="is_active">Activo</label>
                            <select
                                className="border border-gray-300 p-2 rounded-lg"
                                name="is_active"
                                id="is_active"
                                value={product.is_active}
                                onChange={handleChange}
                            >
                                <option value="">Seleccionar</option>
                                <option value="true">Sí</option>
                                <option value="false">No</option>
                            </select>
                        </div>


                        <div className="flex flex-col">
                            <label className="text-gray-700" htmlFor="outstanding">Destacado</label>
                            <select
                                className="border border-gray-300 p-2 rounded-lg"
                                name="outstanding"
                                id="outstanding"
                                value={product.outstanding}
                                onChange={handleChange}
                            >
                                <option value="">Seleccionar</option>
                                <option value="true">Sí</option>
                                <option value="false">No</option>
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-gray-700" htmlFor="code">Código de cupón</label>
                            <input
                                className="border border-gray-300 p-2 rounded-lg"
                                type="text"
                                name="code"
                                id="code"
                                value={product.coupons.code}
                                onChange={(e) => {
                                    setProduct({
                                        ...product,
                                        coupons: { ...product.coupons, code: e.target.value }
                                    })
                                }}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-gray-700" htmlFor="discount">Descuento</label>
                            <input
                                className="border border-gray-300 p-2 rounded-lg"
                                type="number"
                                name="discount"
                                id="discount"
                                value={product.coupons.discount}
                                onChange={(e) => {
                                    setProduct({
                                        ...product,
                                        coupons: { ...product.coupons, discount: e.target.value }
                                    })
                                }}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-gray-700" htmlFor="expire_date">Fecha de expiración</label>
                            <input
                                className="border border-gray-300 p-2 rounded-lg"
                                type="date"
                                name="expire_date"
                                id="expire_date"
                                value={product.coupons.expire_date}
                                onChange={(e) => {
                                    setProduct({
                                        ...product,
                                        coupons: { ...product.coupons, expire_date: e.target.value }
                                    })
                                }}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-gray-700" htmlFor="cuupon_is_active">Activo</label>
                            <select
                                className="border border-gray-300 p-2 rounded-lg"
                                name="cuupon_is_active"
                                id="cuupon_is_active"
                                value={product.coupons.cuupon_is_active}
                                onChange={(e) => {
                                    setProduct({
                                        ...product,
                                        coupons: { ...product.coupons, cuupon_is_active: e.target.value }
                                    })
                                }}

                            >
                                <option value="">Seleccionar</option>
                                <option value="true">Sí</option>
                                <option value="false">No</option>
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-gray-700" htmlFor="imagen">Imagen</label>
                            <input
                                className="border border-gray-300 p-2 rounded-lg"
                                type="file"
                                name="imagen"
                                id="imagen"
                                onChange={fileSelectHandler}
                            />
                        </div>
                        {
                            previewImagen && (
                                <div className="flex flex-col">
                                    <img src={previewImagen} alt="Imagen" className="w-40 h-40 object-cover" />
                                </div>
                            )
                        }
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            type="submit"
                        >
                            Guardar
                        </button>
                    </div>

                </form >
            </div >
            {
                alert.message && <Alert obj={alert} />
            }
        </>
    )
}
