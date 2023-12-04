import { Success } from "../dashboard/Icons/Icons"
export default function Alert({ obj }) {
    const { message, type } = obj


    return (
        <div className={`fixed bottom-0 right-0 m-5 py-4 px-5 rounded-lg bg-gray-200 text-white ${type === "success" ? "bg-green-600" : "bg-red-600"}`}>
            <p className="text-lg font-bold flex items-center gap-3">
                {type === "success" ? <Success /> : null}
                {message}
            </p>
        </div>
    )
}
