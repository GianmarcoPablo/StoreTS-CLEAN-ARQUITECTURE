import { Link } from "react-router-dom"
import { Edit, Delete } from "../Icons/Icons"
import { useDashBoard } from "../../context/DashBoardProvider"
import { convertMoney } from "../../helpers/convertMoney"
import Alert from "../../components/Alert"

export default function Product({ product }) {

    const { alert, deleteProduct } = useDashBoard()

    return (
        <>
            <div className="grid items-center justify-center align-middle py-8 border-2  shadow-2xl mt-5 animate-fade-right">
                <img className="w-80 h-80 object-contain" src={`http://localhost:4000/${product.img}`} alt={product.name} />
                <h3 className="mt-4 text-lg text-gray-700 font-bold text-center">{product.name}</h3>
                <p
                    className="text-gray-500 font-semibold text-lg my-2 text-center"
                >
                    {convertMoney(product.price)}
                </p>
                <div className="flex justify-center gap-3">
                    <Link
                        to={`/dashboard/products/edit/${product.id}`}
                        className="flex border py-2 px-5 text-blue-700 font-bold hover:bg-blue-700 hover:text-white transition-colors">
                        <Edit />
                        Edit
                    </Link>
                    <button
                        className="flex border py-2 px-5 text-red-700 font-bold hover:bg-red-700 hover:text-white transition-colors"
                        onClick={() => deleteProduct(product.id)}
                    >
                        <Delete />
                        Remove
                    </button>
                </div>
            </div>
            {alert.message && <Alert obj={alert} />}
        </>
    )
}
