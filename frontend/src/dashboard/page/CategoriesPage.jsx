import { Link } from "react-router-dom"
import { useDashBoard } from "../../context/DashBoardProvider"
import { Categorie } from "../components"
import { Add } from "../Icons/Icons"

export default function CategoriesPage() {

    const { categories } = useDashBoard()


    return (
        <div >
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-black py-10">Manage your Categories</h2>
                <Link
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex gap-2 items-center"
                    to="/dashboard/categories/add"
                >
                    <Add />
                    Add product
                </Link>
            </div>


            <div className="grid grid-cols-3 gap-3 bg-white px-10">
                {categories.map(category => (
                    <Categorie key={category.id} category={category} />
                ))}
            </div>
        </div>
    )
}
