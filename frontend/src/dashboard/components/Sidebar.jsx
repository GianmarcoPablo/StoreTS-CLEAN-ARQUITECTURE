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
            className='w-1/6 flex flex-col h-screen sticky top-0 shadow-2xl bg-slate-900 overflow-y-auto'
        >
            <h1 className="text-2xl text-center text-orange-400 uppercase font-black mt-5">Store</h1>

            <aside className="mt-5 px-5 flex-1">
                {
                    LINKS.map(({ name, path, icon }, index) => (
                        <div key={index}>
                            <Link
                                to={path}
                                className="p-2 flex items-center justify-start gap-2 text-center text-white hover:bg-orange-600 font-semibold rounded-md transition duration"
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
