import { createContext, useContext } from "react"
import { clienteAxios } from "../config/axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {

    const login = async (user) => {
        try {
            const { data } = await clienteAxios.post("/auth/login", user);
            localStorage.setItem("token", data.token);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AuthContext.Provider value={{
            login
        }}>
            {children}
        </AuthContext.Provider>
    )
}