import { useState } from "react";
import { useDashBoard } from "../../context/DashBoardProvider"
import Alert from "../../components/Alert";

export default function AddProductPage() {

    const { alert, categories, addNewProduct } = useDashBoard();

    const [imagen, setImagen] = useState(null);
    const [previewImagen, setPreviewImagen] = useState(null);

    const [product, setProduct] = useState({
        name: "",
        price: "",
        description: "",
        category: ""
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
        await addNewProduct(formData);
        setProduct({
            name: "",
            price: "",
            description: "",
            category: ""
        })
        setPreviewImagen(null);
    };


    return (
        <>
            <div
                className="flex justify-center items-center h-screen"
            >

                <div className="bg-slate-900 shadow-2xl rounded-lg p-10 ">
                    <h1 className="text-3xl font-black text-white">Add product</h1>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 mt-5">
                        <label className='text-lg font-bold text-gray-300' htmlFor="name">Name Product</label>
                        <input
                            className="border py-2 px-5 rounded-lg placeholder-black"
                            type="text"
                            placeholder="Name"
                            name="name"
                            onChange={handleChange}
                            value={product.name}
                        />
                        <label className='text-lg font-bold text-gray-300' htmlFor="price">Price Product</label>
                        <input
                            className="border py-2 px-5 rounded-lg placeholder-black"
                            type="text"
                            placeholder="Price"
                            name="price"
                            onChange={handleChange}
                            value={product.price}
                        />
                        <label className='text-lg font-bold text-gray-300' htmlFor="img">Image Product</label>
                        <input
                            className="border py-2 px-5 rounded-lg placeholder-black bg-white"
                            type="file"
                            name="imagen"
                            onChange={fileSelectHandler}
                            value={product.img}
                        />
                        {
                            previewImagen && (
                                <img
                                    className="w-32 h-32 rounded-full object-cover"
                                    src={previewImagen}
                                    alt="preview"
                                />
                            )
                        }
                        <label className='text-lg font-bold text-gray-300' htmlFor="description">Description Product</label>
                        <textarea
                            className="border py-2 px-5 rounded-lg placeholder-black"
                            placeholder="Description"
                            name="description"
                            onChange={handleChange}
                            value={product.description}
                        />
                        <label className='text-lg font-bold text-gray-300' htmlFor="category">Category Product</label>
                        <select
                            className="border py-2 px-5 rounded-lg"
                            name="category"
                            onChange={handleChange}
                            value={product.category}
                        >
                            <option value="">Select</option>
                            {
                                categories.map(category => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))
                            }
                        </select>
                        <button
                            type="submit"
                            className="bg-orange-500 hover:bg-orange-700 transition-colors duration-500 text-white font-bold py-2 px-5 rounded-lg mt-5"
                        >
                            Add product
                        </button>
                    </form>
                </div>
            </div>
            {
                alert.message && <Alert obj={alert} />
            }
        </>
    )
}
