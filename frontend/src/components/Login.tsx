import type React from "react"

export default function Login({ setCurrentPage } : {
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}) {
    return (

        <>
            Login

            <button onClick={() => setCurrentPage(0)} className="bg-purple-700 h-[4vh] w-[14vw] rounded-[10px] mt-5 ml-[7vw] text-white">
                Register
            </button>

            
        </>

        
    )
}
