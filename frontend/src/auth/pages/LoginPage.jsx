import { useState } from "react"
import { useAuth } from "../../context/AuthProvider"
import { Link } from "react-router-dom"


export default function LoginPage() {

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const { login } = useAuth();

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(user);
    }

    return (
        <div className="flex justify-center items-center h-screen bg-blue-800">
            <form onSubmit={handleSubmit} className="md:w-1/5 bg-white p-5 rounded-xl shadow-2xl">
                <h1 className="text-center text-blue-700 text-2xl uppercase font-black">Login Store</h1>
                <div className="my-4">
                    <label
                        className="block mb-2"
                        htmlFor="email"
                    >Email</label>
                    <input
                        className="w-full border-2 border-gray-300 p-1 rounded-md outline-none focus:border-blue-500"
                        type="email"
                        id="email"
                        placeholder="Ej. email@email.com"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="my-4">
                    <label
                        className="block mb-2"
                        htmlFor="password"
                    >Password</label>
                    <input
                        className="w-full border-2 border-gray-300 p-1 rounded-md outline-none focus:border-blue-500"
                        type="password"
                        id="password"
                        placeholder="********"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <button
                        className="w-full bg-blue-700 text-white p-2 rounded-md mt-2 uppercase font-bold hover:bg-blue-800 transition-colors"
                        type="submit"
                    >
                        Login
                    </button>
                </div>
                <div>
                    <p className="mt-2">Don't have an account? <Link to="/auth/register" className="text-blue-700 font-bold hover:underline">Register</Link></p>
                </div>
            </form>
        </div>
    )
}
