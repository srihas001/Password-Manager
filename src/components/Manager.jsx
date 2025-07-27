import React from 'react'
import { useRef } from 'react'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
    const ref = useRef();
    const passwordref = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" });
    const [passwordarray, setpasswordarray] = useState([]);
    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setpasswordarray(JSON.parse(passwords));
        }
    }, []);



    const handlesavepass = () => {
        if(!form.site.trim() || !form.username.trim() || !form.password.trim()){
            alert("Invalid data")
        }
        else{
        setpasswordarray([...passwordarray, {...form, id:uuidv4()}]);
        localStorage.setItem("passwords", JSON.stringify([...passwordarray,  {...form, id:uuidv4()}]));
        setform({site:"",username:"",password:""})
        }
    }
    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    const handleclick = () => {
        passwordref.current.type = "text";
        if (ref.current.src.includes("eyecross.png")) {
            ref.current.src = "eye.png";
            passwordref.current.type = "text";
        } else {
            ref.current.src = "eyecross.png";
            passwordref.current.type = "password";
        }
    };
    const copyText=(text)=>{
        toast('Copied to clipboard!', {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
});
        navigator.clipboard.writeText(text);
    }
    const editPassword = (id) => {
         setpasswordarray(passwordarray.filter(item=>item.id!=id))
         setform(passwordarray.find(item=>item.id===id))
    }
    const deletePassword=(id)=>{
        setpasswordarray(passwordarray.filter(item=>item.id!=id))
        localStorage.setItem("passwords",JSON.stringify(passwordarray.filter(item=>item.id!=id)))
    }
    return (
        <>
        <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
            <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div class="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div></div>
            <div className='container mx-auto p-10 max-w-4xl'>
                <h1 className='font-bold text-2xl text-center'> <span className='text-green-700'>&lt;</span>
                    Vaul
                    <span className='text-green-700'>to\&gt;</span></h1>
                <p className='text-green-900 text-lg text-center font-normal'>Your Passwords Handler</p>
                <div className='flex flex-col gap-5 text-black items-center'>
                    <input value={form.site} onChange={handlechange} name='site' placeholder='Enter Web URL' className='border border-green-500 w-full rounded-full border-2 px-4 py-1' type="text" />
                    <div className='flex justify-between gap-8 w-full '>
                        <input value={form.username} onChange={handlechange} name='username' placeholder='Enter Username' className='border border-green-500 w-full rounded-full border-2 px-4 py-1' type="text" />
                        <div className='relative'>
                            <input value={form.password} ref={passwordref} onChange={handlechange} name='password' placeholder='Enter Password' className='border border-green-500 w-full rounded-full border-2 px-4 py-1' type="password" />
                            <span className='absolute right-0 top-[1px] cursor-pointer' onClick={handleclick}>
                                <img ref={ref} className='p-2' width={34} src="eye.png" alt="null" />
                            </span>
                        </div>
                    </div>

                    <button onClick={handlesavepass} className='bg-green-700 text-white rounded-full px-4 py-2 flex justify-center items-center gap-2 hover:bg-green-800 cursor-pointer transition-all duration-300 w-fit '>
                        <lord-icon
                            src="https://cdn.lordicon.com/efxgwrkc.json"
                            trigger="hover"
                        >
                        </lord-icon>
                        Add Password</button>
                </div>
                <div className='passwords'>
                    <h1 className='font-bold text-xl py-3 py-2'>Your Passwords</h1>
                    {passwordarray.length === 0 && <div>No passwords saved</div>}
                    {passwordarray.length != 0 && <div className='overflow-x-auto w-full'> <table class="table-auto w-full rounded-lg shadow-lg overflow-hidden text-sm">
                        <thead className='bg-green-700 text-white'>
                            <tr>
                                <th className='text-center py-2'>Web URL</th>
                                <th className='text-center py-2'>Username</th>
                                <th className='text-center py-2'>Password</th>
                                <th className='text-center py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordarray.map((item, index) => {
                                return (
                                    <tr key={{ index }}>
                                        <td className='py-2 border border-white text-center'>
                                            <div className='flex items-center justify-center '>
                                                <a href={item.site} target='_blank'>{item.site}</a>
                                                <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2 border border-white text-center'>
                                            <div className='flex items-center justify-center '>
                                                <span>{item.username}</span>
                                                <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2 border border-white text-center'>
                                            <div className='flex items-center justify-center '>
                                                <span>{item.password}</span>
                                                <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='justify-center py-2 border border-white text-center'>
                                        <span className='cursor-pointer mx-1' onClick={()=>{editPassword(item.id)}}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                style={{"width":"25px", "height":"25px"}}>
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-1'onClick={()=>{deletePassword(item.id)}}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{"width":"25px", "height":"25px"}}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                    </div>}


                </div>
            </div>
        </>
    )
}

export default Manager
