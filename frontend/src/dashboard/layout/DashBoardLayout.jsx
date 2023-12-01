import { Navbar, Sidebar } from "../components"
import { Outlet } from "react-router-dom"

export default function DashBoardLayout() {
    return (
        <div className="flex">
            <Sidebar />
            <div className="w-full">
                <header className="p-3 shadow-2xl">
                    <Navbar />
                </header>
                <main className="bg-gray-200 h-screen ">
                    <div className="container mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    )
}
