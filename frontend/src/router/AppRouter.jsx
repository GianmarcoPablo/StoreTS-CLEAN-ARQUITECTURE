import { Route, Routes, Navigate } from "react-router-dom";
import AuthRouter from "../auth/routes/AuthRouter";
import DashboardRouter from "../dashboard/routes/DashboardRouter";
import { useAuth } from "../context/AuthProvider";

export default function AppRouter() {


    const { check, loading } = useAuth()

    if (loading) return <h1>Loading...</h1>

    return (
        <Routes>

            <Route path="/" element={<h1>Home</h1>} />

            {
                check === "authenticated"
                    ? <Route path="/dashboard/*" element={<DashboardRouter />} />
                    : <Route path="/auth/*" element={<AuthRouter />} />
            }

            {
                check === "authenticated"
                    ? <Route path="/*" element={<Navigate to="/dashboard" />} />
                    : <Route path="/*" element={<Navigate to="/auth/login" />} />
            }

        </Routes>
    )
}
