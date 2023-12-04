import { Navbar, Sidebar } from "../components"
import { Outlet } from "react-router-dom"

export default function DashBoardLayout() {
    return (
        <div className="flex">
            <Sidebar />
            <div className="w-full">
                <header className="p-3 shadow-2xl bg-slate-900">
                    <Navbar />
                </header>
                <main >
                    <div className="container mx-auto mb-10">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    )
}
