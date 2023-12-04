import DropDown from "./DropDown"
import { useAuth } from "../../context/AuthProvider"

export default function Navbar() {

    const { data, logout } = useAuth()

    return (
        <nav className="flex justify-end gap-5 items-center ">

            <DropDown />

            <h1>Profile</h1>

            <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={logout}
            >
                Close session
            </button>
        </nav>
    )
}
