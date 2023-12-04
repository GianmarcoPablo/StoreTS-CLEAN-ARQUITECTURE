import { useState } from "react"
import { useDashBoard } from "../../context/DashBoardProvider"
import Alert from "../../components/Alert"
import { useNavigate } from "react-router-dom"

export default function AddCategoryPage() {


    const navigate = useNavigate()
    const [data, setData] = useState({
        name: '',
        description: '',
        active: '',
        outstanding: ''
    })

    const { alert, addNewCategory } = useDashBoard()

    const handleChange = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const obj = {
            name: data.name,
            description: data.description,
            active: JSON.parse(data.active),
            outstanding: JSON.parse(data.outstanding)
        }

        await addNewCategory(obj)
        navigate('/dashboard/categories')
    }


    return (
        <>
            <div
                className="flex justify-center items-center h-screen"
            >

                <div className="bg-slate-900 shadow-2xl rounded-lg p-10 w-1/3">
                    <h1 className="text-3xl font-black text-white">Add category</h1>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 mt-5">
                        <label className='text-lg font-bold text-gray-300' htmlFor="name">Name Product</label>
                        <input
                            className="border py-2 px-5 rounded-lg placeholder-black"
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                        />

                        <label className='text-lg font-bold text-gray-300' htmlFor="description">Description Product</label>
                        <textarea
                            className="border py-2 px-5 rounded-lg placeholder-black"
                            placeholder="Description"
                            name="description"
                            value={data.description}
                            onChange={handleChange}
                        />
                        <label className='text-lg font-bold text-gray-300' htmlFor="active">Active</label>
                        <select
                            className="border py-2 px-5 rounded-lg placeholder-black"
                            name="active"
                            value={data.active}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>

                        <label className='text-lg font-bold text-gray-300' htmlFor="outstanding">Outstanding</label>
                        <select
                            className="border py-2 px-5 rounded-lg placeholder-black"
                            name="outstanding"
                            value={data.outstanding}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                        <button
                            type="submit"
                            className="bg-orange-500 hover:bg-orange-700 transition-colors duration-500 text-white font-bold py-2 px-5 rounded-lg mt-5"
                        >
                            Add Category
                        </button>
                    </form>
                </div>
            </div>
            {alert.message && <Alert obj={alert} />}
        </>
    )
}
