import { useState } from "react"
import Login from "../components/Login"
import Register from "../components/Register"

export default function Auth() {
    const [currentPage, setCurrentPage] = useState(0);
    return (
        <>
            {currentPage == 0 ? <Register setCurrentPage={setCurrentPage} /> : <Login setCurrentPage={setCurrentPage} />}
        </>
    )
}