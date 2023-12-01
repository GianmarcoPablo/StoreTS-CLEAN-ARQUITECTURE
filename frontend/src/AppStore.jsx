import AppRouter from "./router/AppRouter"
import DashBoardProvider from "./context/DashBoardProvider"
import AuthProvider from "./context/AuthProvider"

export default function AppStore() {
    return (
        <AuthProvider>
            <DashBoardProvider>
                <AppRouter />
            </DashBoardProvider>
        </AuthProvider>
    )
}
