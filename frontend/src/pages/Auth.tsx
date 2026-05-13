// import { useState } from "react"
// import SignUpUser from "../api/signup";
// import LoginUser from "../api/login";
// import { useNavigate } from "react-router";
// import { LockIcon, MailIcon, SocialRow, UserIcon } from "../assets/svgs";
// import { useLoggedIn } from "../hooks/useLoggedIn";
// import image from "../assets/image.png";

// export default function AuthPage() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [username, setUsername] = useState("");
//     const [loginEmail, setLoginEmail] = useState("");
//     const [loginPassword, setLoginPassword] = useState("");
//     const [isLogin, setIsLogin] = useState(false);
//     const { loggedIn, loading } = useLoggedIn();
//     const navigate = useNavigate();

//     if (loading) {
//         return <div>Loading ...</div>
//     }
//     if (loggedIn) {
//         navigate("/");
//     }

//     const handleRegister = async () => {
//         if (!email || !password || !username) return;
//         const data = await SignUpUser(email, password, username);
//         localStorage.setItem("token", data.token);
//         if (data.token) navigate("/");
//     };

//     const handleLogin = async () => {
//         if (!loginEmail || !loginPassword) return;
//         const data = await LoginUser(loginEmail, loginPassword);
//         localStorage.setItem("token", data.token);
//         if (data.token) navigate("/");
//     };

//     return (
//         <div
//             className="h-screen w-screen flex items-center justify-center"
//             style={{ background: "linear-gradient(to left, #44061f, #000000)" }}
//         >
//             <div
//                 className="relative bg-[#ffc3de] overflow-hidden shadow-2xl"
//                 style={{ width: 760, height: 480, borderRadius: 20 }}
//             >
//                 <img
//                     src={image}
//                     alt="image"
//                     className="absolute top-12 left-4 w-18 h-18 ml-3 object-contain bg-transparent"
//                 />
//                 {/* registration form */}
//                 <div
//                     className="absolute top-0 left-0 flex flex-col items-center justify-center"
//                     style={{ width: "45%", height: "100%", padding: "0 36px" }}
//                 >
//                     <h1 className="text-[2.1rem] font-extrabold text-[#302F2A] ml-11 mb-6 text-center">Registration</h1>
//                     <div className="relative w-full mb-3">
//                         <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="border-none bg-[#F2F1F3] w-full h-[44px] px-[14px] pr-[44px] rounded-[10px] text-[14px] outline-none" />
//                         <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"><UserIcon /></div>
//                     </div>
//                     <div className="relative w-full mb-3">
//                         <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border-none bg-[#F2F1F3] w-full h-[44px] px-[14px] pr-[44px] rounded-[10px] text-[14px] outline-none" />
//                         <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"><MailIcon /></div>
//                     </div>
//                     <div className="relative w-full mb-4">
//                         <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="border-none bg-[#F2F1F3] w-full h-[44px] px-[14px] pr-[44px] rounded-[10px] text-[14px] outline-none" />
//                         <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"><LockIcon /></div>
//                     </div>
//                     <button onClick={handleRegister} className="w-full h-[44px] bg-[#c2216c] hover:bg-[#e86b95] text-white font-bold rounded-[8px] duration-200 text-[15px] mb-3">
//                         Register
//                     </button>
//                     <p className="text-[#4d4d4d] text-[12px] mb-2 text-center">or register with social platforms</p>
//                     <SocialRow />
//                 </div>

//                 {/* login form */}
//                 <div
//                     className="absolute top-0 right-0 flex flex-col items-center justify-center"
//                     style={{ width: "45%", height: "100%", padding: "0 36px" }}
//                 >
//                     <h1 className="text-[2rem] font-extrabold text-[#302F2A] mb-6 text-center">Login</h1>
//                     <div className="relative w-full mb-3">
//                         <input placeholder="Email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} className="border-none bg-[#F2F1F3] w-full h-[44px] px-[14px] pr-[44px] rounded-[10px] text-[14px] outline-none" />
//                         <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"><UserIcon /></div>
//                     </div>
//                     <div className="relative w-full mb-2">
//                         <input placeholder="Password" type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} className="border-none bg-[#F2F1F3] w-full h-[44px] px-[14px] pr-[44px] rounded-[10px] text-[14px] outline-none" />
//                         <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"><LockIcon /></div>
//                     </div>
//                     <a href="#" className="self-end text-[12px] text-[#f482cc] hover:text-[#d45d8b] mb-4 transition-colors">Forgot Password?</a>
//                     <button onClick={handleLogin} className="w-full h-[44px] bg-[#b02563] hover:bg-[#e86ba5] text-white font-bold rounded-[8px] duration-200 text-[15px] mb-3">
//                         Login
//                     </button>
//                     <p className="text-[#4d4d4d] text-[12px] mb-2 text-center">or login with social platforms</p>
//                     <SocialRow />
//                 </div>
//                 {/* sliding div */}
//                 <div
//                     className={`absolute top-0 h-full z-10 ${isLogin ? "overlay-to-left" : "overlay-to-right"}`}
//                     style={{ left: "45%", width: "55%", borderRadius: "140px 0 0 140px", background: "#d52081" }}
//                 >
//                     <div
//                         className="absolute rounded-full"
//                         style={{ width: 280, height: 280, top: -80, right: -80, background: "rgba(255,255,255,0.08)" }}
//                     />
//                     <div
//                         className="absolute rounded-full"
//                         style={{ width: 180, height: 180, bottom: -50, left: 110, background: "rgba(255,255,255,0.08)" }}
//                     />

//                     <div className="relative h-full w-full overflow-hidden flex items-center justify-center">

//                         <div
//                             className="absolute inset-0 flex flex-col items-center justify-center text-center px-10"
//                             style={{
//                                 transition: "opacity 0.25s 0.7s, transform 0.25s 0.7s",
//                                 opacity: isLogin ? 0 : 1,
//                                 transform: isLogin ? "scale(0.95)" : "scale(1)",
//                                 pointerEvents: isLogin ? "none" : "auto",
//                             }}
//                         >
//                             <h2 className="text-[2rem] font-extrabold text-white mb-2">Welcome Back!</h2>
//                             <p className="text-white/80 text-[14px] mb-7">Already have an account?</p>
//                             <button onClick={() => setIsLogin(true)} className="px-8 py-2 border-2 border-white text-white font-semibold text-sm rounded-md bg-transparent hover:bg-[#f46ec7] transition-all duration-300">
//                                 Login
//                             </button>
//                         </div>
//                         <div
//                             className="absolute inset-0 flex flex-col items-center justify-center text-center px-10"
//                             style={{
//                                 transition: "opacity 0.25s 0.7s, transform 0.25s 0.7s",
//                                 opacity: isLogin ? 1 : 0,
//                                 transform: isLogin ? "scale(1)" : "scale(0.95)",
//                                 pointerEvents: isLogin ? "auto" : "none",
//                             }}
//                         >
//                             <h2 className="text-[2rem] font-extrabold text-white mb-2">Welcome Back!</h2>
//                             <p className="text-white/80 text-[14px] mb-7">Don't have an account?</p>
//                             <button onClick={() => setIsLogin(false)} className="px-8 py-2 border-2 border-white text-white font-semibold text-sm rounded-md bg-transparent hover:bg-[#f46ec7] transition-all duration-300">
//                                 Register
//                             </button>
//                         </div>
//                         <div
//                             className="absolute flex items-center gap-2"
//                             style={{ top: "69%" }}
//                         >
//                             <div style={{
//                                 height: 8,
//                                 width: isLogin ? 8 : 22,
//                                 borderRadius: 10,
//                                 background: isLogin ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,1)",
//                                 transition: "all 0.9s cubic-bezier(0.65,0,0.35,1)",
//                             }} />
//                             <div style={{
//                                 height: 8,
//                                 width: isLogin ? 22 : 8,
//                                 borderRadius: 10,
//                                 background: isLogin ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.4)",
//                                 transition: "all 0.9s cubic-bezier(0.65,0,0.35,1)",
//                             }} />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
