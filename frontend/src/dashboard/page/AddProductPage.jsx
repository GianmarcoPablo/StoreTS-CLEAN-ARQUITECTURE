import { useState } from "react";
import { useDashBoard } from "../../context/DashBoardProvider"
export default function AddProductPage() {

    const { categories, createProduct } = useDashBoard();

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
        await createProduct(formData);
    };



    return (
        <div
            className="flex justify-center items-center h-screen"
        >
            <div className="bg-white shadow-2xl rounded-lg p-10">
                <h1 className="text-3xl font-black">Add product</h1>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 mt-5">
                    <label className='text-lg font-bold text-gray-400' htmlFor="name">Name Product</label>
                    <input
                        className="border py-2 px-5 rounded-lg"
                        type="text"
                        placeholder="Name"
                        name="name"
                        onChange={handleChange}
                    />
                    <label className='text-lg font-bold text-gray-400' htmlFor="price">Price Product</label>
                    <input
                        className="border py-2 px-5 rounded-lg"
                        type="text"
                        placeholder="Price"
                        name="price"
                        onChange={handleChange}
                    />
                    <label className='text-lg font-bold text-gray-400' htmlFor="img">Image Product</label>
                    <input
                        className="border py-2 px-5 rounded-lg"
                        type="file"
                        name="imagen"
                        onChange={fileSelectHandler}
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
                    <label className='text-lg font-bold text-gray-400' htmlFor="description">Description Product</label>
                    <textarea
                        className="border py-2 px-5 rounded-lg"
                        placeholder="Description"
                        name="description"
                        onChange={handleChange}
                    />
                    <label className='text-lg font-bold text-gray-400' htmlFor="category">Category Product</label>
                    <select
                        className="border py-2 px-5 rounded-lg"
                        name="category"
                        onChange={handleChange}
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
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        type="submit"
                    >
                        Add product
                    </button>
                </form>
            </div>
        </div>
    )
}
