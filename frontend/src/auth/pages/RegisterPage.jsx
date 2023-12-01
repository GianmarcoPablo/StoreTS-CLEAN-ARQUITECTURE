import { Link } from "react-router-dom"

export default function RegisterPage() {
    return (
        <div className="flex justify-center items-center h-screen bg-blue-800">
            <form className="md:w-1/5 bg-white p-5 rounded-xl shadow-2xl">
                <h1 className="text-center text-blue-700 text-2xl uppercase font-black">Register Store</h1>
                <div className="my-4">
                    <label
                        className="block mb-2"
                        htmlFor="name"
                    >Name</label>
                    <input
                        className="w-full border-2 border-gray-300 p-1 rounded-md outline-none focus:border-blue-500"
                        type="text"
                        id="name"
                        placeholder="Ej. John Doe"
                    />
                </div>
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
                    <p className="mt-2">Already have an account? <Link to="/auth/login" className="text-blue-700 font-bold hover:underline">Login</Link></p>
                </div>
            </form>
        </div>
    )
}
