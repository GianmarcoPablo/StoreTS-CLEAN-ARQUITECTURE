import { Route, Routes, Navigate } from "react-router-dom";
import AuthRouter from "../auth/routes/AuthRouter";
import DashboardRouter from "../dashboard/routes/DashboardRouter";

export default function AppRouter() {

    const status = "authenticated"

    if (status === "checking") return <h1>checking</h1>

    return (
        <Routes>
            {
                status === "authenticated"
                    ? <Route path="/dashboard/*" element={<DashboardRouter />} />
                    : <Route path="/auth/*" element={<AuthRouter />} />
            }
            <Route path="/*" element={<Navigate to="/auth/login" />} />
        </Routes>
    )
}
