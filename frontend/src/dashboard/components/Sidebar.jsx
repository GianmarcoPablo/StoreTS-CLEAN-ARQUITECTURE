import { Link } from "react-router-dom"
import { Cart, Categories, Products, Sales, Users, Coupons } from "../Icons/Icons"

const LINKS = [
    {
        name: "Dashboard",
        path: "/dashboard",
        icon: <Cart />
    },
    {
        name: "Sales",
        path: "/dashboard/sales",
        icon: <Sales />
    },
    {
        name: "Products",
        path: "/dashboard/products",
        icon: <Products />
    },
    {
        name: "Categories",
        path: "/dashboard/categories",
        icon: <Categories />
    },
    {
        name: "Coupons",
        path: "/dashboard/coupons",
        icon: <Coupons />
    },
    {
        name: "Users",
        path: "/dashboard/users",
        icon: <Users />
    },
]

export default function Sidebar() {
    return (
        <div
            // hacer que te siga siempre el scroll
            className='w-1/6 shadow-2xl '
        >
            <h1 className="text-2xl text-center text-blue-800 uppercase font-black mt-5">Store</h1>

            <aside className="mt-5 px-5">
                {
                    LINKS.map(({ name, path, icon }, index) => (
                        <div key={index}>
                            <Link
                                to={path}
                                className="p-2 flex items-center justify-start gap-2 text-center text-gray-600 hover:bg-blue-200"
                            >
                                {icon}
                                <span>{name}</span>
                            </Link>
                        </div>
                    ))
                }
            </aside>
        </div>
    )
}