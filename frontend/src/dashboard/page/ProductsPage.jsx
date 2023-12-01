import { useDashBoard } from "../../context/DashBoardProvider"
import { Product } from "../components";
import { Add } from "../Icons/Icons";
import { Link } from "react-router-dom";

export default function ProductsPage() {

    const { products } = useDashBoard();

    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-black py-10">Manage your products</h1>
                <Link
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex gap-2 items-center"
                    to="/dashboard/products/add"
                >
                    <Add />
                    Add product
                </Link>
            </div>
            <div className="grid grid-cols-4 gap-3 bg-white px-10">
                {products.map(product => (
                    <Product product={product} key={product.id} />
                ))}
            </div>
        </div>
    )
}
