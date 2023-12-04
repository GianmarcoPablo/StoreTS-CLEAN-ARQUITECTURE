import { useDashBoard } from "../../context/DashBoardProvider"
import { Categorie } from "../components"
export default function CategoriesPage() {

    const { categories } = useDashBoard()


    return (
        <div >
            <h2 className="text-3xl font-black py-10">Manage your Categories</h2>
            <div className="grid grid-cols-3 gap-3 bg-white px-10">
                {categories.map(category => (
                    <Categorie key={category.id} category={category} />
                ))}
            </div>
        </div>
    )
}
