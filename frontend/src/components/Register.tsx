import React, { useState, type SetStateAction } from "react"
import { FaGoogle, FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import SignUpUser from "../api/signup";
import { useNavigate } from "react-router";


export default function Register({ setCurrentPage }: {
    setCurrentPage: React.Dispatch<SetStateAction<number>>
}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const navigate = useNavigate();
    const handleSubmit = async () => {
        if (!email || !password || !username) {
            return;
        }

        const data = await SignUpUser(email, password, username)
        console.log(data);

        if (data) {
            navigate("/")
        }
    }

    return (
        <div className="h-screen w-screen flex items-center justify-center" style={{ background: 'linear-gradient(to left, #D1DCFC, #DAE2EF)' }}>
            <div className="bg-white rounded-[20px] flex h-[500px] w-[800px] overflow-hidden shadow-2xl">

                {/* left */}
                <div className="flex flex-col w-[60%] p-10">
                    <h1 className="text-4xl font-extrabold text-[#302F2A] mb-8 pl-15">Registration</h1>

                    {/* input 1  */}
                    <div className="relative w-full mb-4">
                        <input
                            placeholder="Username"
                            className="border-none bg-[#F2F1F3] w-full h-[5vh] px-[10px] pr-[40px] rounded-[10px]"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                            </svg>
                        </div>
                    </div>
                    {/* input 2 */}
                    <div className="relative w-full mb-4">
                        <input
                            placeholder="Email"
                            className="border-none bg-[#F2F1F3] w-full h-[5vh] px-[10px] pr-[40px] rounded-[10px]"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
                            </svg>
                        </div>
                    </div>

                    {/* input 3 */}
                    <div className="relative w-full mb-6">
                        <input
                            placeholder="Password"
                            type="password"
                            className="border-none bg-[#F2F1F3] w-full h-[5vh] px-[10px] pr-[40px] rounded-[10px]"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                            </svg>
                        </div>
                    </div>

                    {/* button */}
                    <button className="w-full h-[5vh] bg-[#82A0F4] hover:bg-[#6b8de8] text-white font-semibold rounded-[6px] duration-200">
                        Register
                    </button>

                    <p className="text-[#4d4d4d] text-[13px] p-2 pl-17">or register with social platforms</p>
                    <div className="flex gap-[14px] pl-15">
                        <div className="w-[40px] h-[40px] border border-[#ccc] flex items-center justify-center text-gray-700 text-xl rounded-[5px]">
                            <FaGoogle />
                        </div>
                        <div className="w-[40px] h-[40px] border border-[#ccc] flex items-center justify-center text-gray-700 text-xl rounded-[5px]">
                            <FaFacebookF />
                        </div>
                        <div className="w-[40px] h-[40px] border border-[#ccc] flex items-center justify-center text-gray-700 text-xl rounded-[5px]">
                            <FaGithub />
                        </div>
                        <div className="w-[40px] h-[40px] border border-[#ccc] flex items-center justify-center text-gray-700 text-xl rounded-[5px]">
                            <FaLinkedinIn />
                        </div>
                    </div>
                </div>

                {/* right */}
                <div className="bg-[#82A0F4] rounded-l-[140px] w-[60%] h-full">
                </div>

            </div>
        </div>

    );
}


