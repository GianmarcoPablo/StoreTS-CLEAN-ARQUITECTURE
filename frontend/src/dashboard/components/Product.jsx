import { Edit, Delete } from "../Icons/Icons"

export default function Product({ product }) {
    return (
        <div className="grid items-center justify-center align-middle py-8 border-2 border-gray-100 shadow-2xl mt-5">
            <img className="w-80 h-80 object-cover" src={`http://localhost:4000/${product.img}`} alt={product.name} />
            <h3 className="mt-4 text-lg text-gray-700 font-bold">{product.name}</h3>
            <p className="mt-2 text-lg text-gray-700">{product.price}</p>
            <div className="flex justify-center gap-3">
                <button className="flex border py-2 px-5 text-blue-700 font-bold hover:bg-blue-700 hover:text-white transition-colors">
                    <Edit />
                    Edit
                </button>
                <button className="flex border py-2 px-5 text-red-700 font-bold hover:bg-red-700 hover:text-white transition-colors">
                    <Delete />
                    Delete
                </button>
            </div>
        </div>
    )
}
