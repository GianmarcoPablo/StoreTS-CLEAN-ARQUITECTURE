import { createContext, useContext, useEffect } from "react"
import { clienteAxios } from "../config/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {


    const [initialState, setInitialState] = useState({
        check: "checking", // "checking" | "authenticated" | "not-authenticated"
        loading: true,
        error: null,
        data: null
    })

    const navigate = useNavigate();

    useEffect(() => {
        const userAuth = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setInitialState({
                    check: "not-authenticated",
                    loading: false,
                    error: null,
                    data: null
                })
                return token
            }
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
            try {
                const { data } = await clienteAxios.get("/auth/profile", config);
                setInitialState({
                    check: "authenticated",
                    loading: false,
                    error: null,
                    data
                })
            } catch (error) {
                setInitialState({
                    check: "not-authenticated",
                    loading: false,
                    error: "Error al autenticar",
                    data: null
                })
            }
        }
        userAuth()
    }, [])

    const login = async (user) => {
        try {
            const { data } = await clienteAxios.post("/auth/login", user);
            localStorage.setItem("token", data.token);
            setInitialState({
                check: "authenticated",
                loading: false,
                error: null,
                data
            })
            navigate("/dashboard")
        } catch (error) {
            console.log(error)
        }
    }

    const logout = () => {
        localStorage.removeItem("token");
        setInitialState({
            check: "not-authenticated",
            loading: false,
            error: null,
            data: null
        })
        navigate("/auth/login")
    }

    return (
        <AuthContext.Provider value={{
            check: initialState.check,
            loading: initialState.loading,
            error: initialState.error,
            data: initialState.data,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}