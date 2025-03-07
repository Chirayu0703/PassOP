import React from 'react'
import { useRef,useState, useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({site: "", username: "", password: ""})
    const [PasswordArray, setPasswordArray] = useState([])

    const getPasswords = async() => {
        let req = await fetch("http://localhost:3000")
        let passwords = await req.json()
        console.log(passwords)
        setPasswordArray(passwords)
        
    }

    useEffect(() => {
        getPasswords()
        
    }, [])

    const copyText = (text)=> {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
           
            });
        navigator.clipboard.writeText(text)
    }
    

    const showPassword = () => {
        passwordRef.current.type = "text"
        console.log(ref.current.src)
        if(ref.current.src.includes("hidden.png")){
            ref.current.src = "eye.png"
            passwordRef.current.type = "text"
        }
        else{
            
            ref.current.src = "hidden.png"
            passwordRef.current.type = "password"
        }
    }
    const savePassword = async() => {
        if(form.site.length >3 && form.username.length >3 && form.password.length >3){

            await fetch("http://localhost:3000",{method: "Delete", headers: { "Content-Type": "application/json"}, body: JSON.stringify({id: form.id})})

            setPasswordArray([...PasswordArray, {...form, id: uuidv4()}])
            await fetch("http://localhost:3000",{method: "POST", headers: { "Content-Type": "application/json"}, body: JSON.stringify({...form,id: uuidv4()})})
            // localStorage.setItem("passwords", JSON.stringify([...PasswordArray,{...form,id: uuidv4()}]))
            // console.log([...PasswordArray,form])
            // setform({site: "", username: "", password: ""})
            toast('Password Saved', {
                position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            
        });
    }
    else{
        toast('Error: Password not saved'
    );
    }
}

    const deletePassword = async(id) => {
        let c = confirm("Confirm that you want to delete the pasword you save")
        if(c){
        console.log("Deleting password with id", id)
        setPasswordArray(PasswordArray.filter(item=>item.id!==id))
        let res = await fetch("http://localhost:3000",{method: "Delete", headers: { "Content-Type": "application/json"}, body: JSON.stringify({id})})
        // localStorage.setItem("passwords", JSON.stringify(PasswordArray.filter(item=>item.id!==id)))
        toast('Password Deleted!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
           
            });
        }
    }

    const editPassword = (id) => {
        console.log("Editing password with id", id)
        setform({...PasswordArray.filter(i=> i.id === id)[0],id: id})
        setPasswordArray(PasswordArray.filter(item=>item.id!==id))
        
   
    }

    const handleChange = (e) => {
      setform({...form, [e.target.name]: e.target.value})
    }
    
    
  return (
    <>
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition= "Bounce"
/>
{/* Same as */}
<ToastContainer />
        <div><div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div></div>
        
        <div className="p-2 pt-3 md:p-0 md:mycontainer min-h-[88.2vh]">
            <div className='text-black flex flex-col p-4'>
                <h1 className='text-4xl text font-bold text-center'>
                <span className='text-green-700'>&lt;</span>
                <span>Pass</span><span className='text-green-700 '>OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center'>Manage your Password</p>
                <div className="flex flex-col p-4  text-black gap-8 items-center">

                <input value={form.site} onChange={handleChange} placeholder='Enter URL' className='rounded-full border border-green-500 w-full  p-4 py-1' type="text" name='site' id='site'/>
                <div className="flex flex-col md:flex-row justify-between w-full gap-8">
                    <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full  p-4 py-1' type="text" name='username' id='username' />

                    <div className="relative">

                    <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full  p-4 py-1' type="password" name='password' id='password' />
                    <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
                        <img ref={ref} className="p-1" width={26} src="eye.png" alt="eye" />
                    </span>
                    </div>
                </div>
                
                <button onClick={savePassword} className='flex justify-center items-center bg-green-500 rounded-full px-8 py-2 w-fit hover:bg-green-300 '>
                <lord-icon
        src="https://cdn.lordicon.com/jgnvfzqg.json"
        trigger="hover">
    </lord-icon>
                    Save Password</button>
                </div>

            </div>

            <div className="passwords">
                <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                {PasswordArray.length === 0 && <div> No passwords to show </div>}
                {PasswordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10 ">
                    <thead className='bg-green-800 text-white '>
                        <tr>
                        <th className='py-2 text-left '>URl</th>
                        <th className='py-2 text-left'>Username</th>
                        <th className='py-2 text-left'>Password</th>
                        <th className='py-2 text-left'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='bg-green-100'>
                        {PasswordArray.map((item, index)=>{
                        return <tr key={index}>
                        <td className='py-2 border border-white text-center '>
                            <div className="flex items-center justify-center">

                                <a href={item.site} target='_blank'>{item.site}</a>
                                    <div className='lordiconcopy size-7 cursor-pointer' onClick={()=>{copyText(item.site)}}>
                                        <lord-icon
                                            style={{"width":"25px","height":"25px","paddingTop":"3px"}}
                                            src="https://cdn.lordicon.com/depeqmsz.json"
                                            trigger="hover">
                                        </lord-icon>
                                    </div>
                            </div> 
                        </td>
                        <td className='py-2 text-center border border-white'>
                            <div className='flex items-center justify-center'>
                                <span>{item.username}</span>
                                    <div className='lordiconcopy size-7 cursor-pointer' onClick={()=>{copyText(item.username)}}>
                                        <lord-icon
                                            style={{"width":"25px","height":"25px","paddingTop":"3px"}}
                                            src="https://cdn.lordicon.com/depeqmsz.json"
                                            trigger="hover">
                                        </lord-icon>
                                    </div>
                            </div>
                        </td>
                        <td className='py-2 text-center border border-white'>
                            <div className='flex items-center justify-center'>
                                <span>{item.password}</span>
                        <div className='lordiconcopy size-7 cursor-pointer' onClick={()=>{copyText(item.password)}}>
                        <lord-icon
                        style={{"width":"25px","height":"25px","paddingTop":"3px"}}
                            src="https://cdn.lordicon.com/depeqmsz.json"
                            trigger="hover">
                        </lord-icon>
                        </div></div></td>
                        <td className='flex justify-center py-2 text-center border border-white gap-8'>
                                <span className='cursor-pointer ' onClick={()=>{editPassword(item.id)}}>
                                    <img className=' transition-transform transform hover:scale-110' src="edit.gif" alt="" style={{"width":"25px","height":"25px"}} />
                                </span>
                            <span className='cursor-pointer ' onClick={()=>{deletePassword(item.id)}}>
                                <lord-icon
                                    src="https://cdn.lordicon.com/skkahier.json"
                                    trigger="hover"
                                    style={{"width":"25px","height":"25px"}}>
                                </lord-icon>
                                </span>
                        </td>
                        </tr>
                        })}
                       
                    </tbody>
                </table>}
            </div>
        </div>
    </>
  )
  
}

export default Manager