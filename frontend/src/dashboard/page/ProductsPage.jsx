import { useDashBoard } from "../../context/DashBoardProvider"
import { Product } from "../components";
import { Add } from "../Icons/Icons";
import { Link } from "react-router-dom";

export default function ProductsPage() {

    const { products } = useDashBoard();

    return (
        <>
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-black py-10">Manage your products</h2>
                <Link
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex gap-2 items-center"
                    to="/dashboard/products/add"
                >
                    <Add />
                    Add product
                </Link>
            </div>
            <div className="grid grid-cols-4 gap-3 px-10 ">
                {
                    products.map(product => (
                        <Product key={product.id} product={product} />
                    ))
                }
            </div>
        </>
    )
}
