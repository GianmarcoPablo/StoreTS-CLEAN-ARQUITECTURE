import { Link } from "react-router-dom"
import { useDashBoard } from "../../context/DashBoardProvider"
import Alert from "../../components/Alert"
export default function Categorie({ category }) {

    const { name, is_active, outstanding, description, id } = category

    const { alert, deleteCategory } = useDashBoard()

    return (
        <>
            <div className="bg-white rounded-md shadow-md p-5 animate-fade-down">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-black">{name}</h3>
                    <div className="flex items-center gap-3">
                        <Link to={`/dashboard/categories/edit/${id}`} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l">
                            Edit
                        </Link>
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-r"
                            onClick={() => deleteCategory(id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
                <p className="text-gray-500">{description}</p>
                <div className="flex justify-between items-center mt-5">
                    <div className="flex items-center bg-green-300 py-1 px-3 rounded-lg">
                        <span className="text-black">Outstanding</span>
                        <span className="ml-2 text-gray-800">
                            {outstanding ? 'Yes' : 'No'}
                        </span>
                    </div>
                    <div className="flex items-center bg-orange-300 py-1 px-3 rounded-lg">
                        <span className="text-black">Active</span>
                        <span className="ml-2 text-gray-800">{is_active ? 'Yes' : 'No'}</span>
                    </div>
                </div>
            </div>
            {alert.message && <Alert obj={alert} />}
        </>
    )
}
