import DropDown from "./DropDown"

export default function Navbar() {
    return (
        <nav className="flex justify-end gap-5 items-center">

            <DropDown />

            <h1>Profile</h1>

            <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
                Close session
            </button>
        </nav>
    )
}
