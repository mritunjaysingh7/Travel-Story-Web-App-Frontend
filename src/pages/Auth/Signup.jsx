import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import { validatEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
function Signup() {
    const [formData,setFormData]=useState({
        fullName:"",
        email:"",
        password:""
    })
    const [err,setErr]=useState("")
    const changeHandle=(e)=>{
        const {name,value} = e.target
        console.log(name,value)
        setFormData({...formData,[name]:value})
    }
    const navigate = useNavigate();
    
    const handleSignup=async (e)=>{
        e.preventDefault();
        if(!formData.fullName){
            setErr('Please enter the full name')
            return;
        }
        if(!validatEmail(formData.email)){
            setErr('Please enter a valid email')
            return;
        }

        // // Validation
        if (!formData.password) {
            setErr('Please enter the  password')
            return;
        }
        setErr("")
        try{
            const response= await axiosInstance.post('/create-account',formData)
            // console.log(response)
            if(response.data && response.data.accessToken){
                localStorage.setItem('token',response.data.accessToken)
                navigate('/dashboard')
               
            }
        }catch(err){
          
            if(err.response && 
                err.response.data && 
                err.response.data.message){
                setErr(err.response.data.message)
            }else{
                setErr('Something went wrong. Please try again later')
            } 
        }


    }
    // const navigate = useNavigate();
    return (
        <div className='h-screen bg-cyan-50 overflow-hidden relative'>
            <div className="login-ui-box right-10 -top-40" />
            <div className="login-ui-box bd-cyan-200 -bottom-40 right-1/2" />
            <div className='container h-screen flex items-center justify-center px-20 mx-auto'>
                <div className='w-2/4 h-[90vh] flex items-center bg-login-img bg-cover bg-center rounded-lg p-10 z-50 '>
                    <div>
                        <h4 className='text-5xl text-fuchsia-900 font-semibold leading-[58px]'>
                            Join the  <br />Adventure
                        </h4>
                        <p className='text-[15px] text-fuchsia-900 leading-6 pr-7 mt-4'>
                            Create an account to start documenting your travels 
                            and preserving your memories in your personal travel journel.
                        </p>
                    </div>
                </div>
                <div className='w-2/4 h-[75vh] bg-white rounded-r-lg relative p-16 shadow-lg shadow-cyan-200/20 '>
                    <form onSubmit={handleSignup}>
                        <h4 className='text-2xl font-semibold mb-7'>Signup</h4>
                        <input
                            type="text"
                            placeholder="Full Name"
                            className='input-box'
                            value={formData.fullName}
                            onChange={changeHandle}
                            name="fullName"
                        />
                        <input
                            type="text"
                            placeholder="Email"
                            className='input-box'
                            value={formData.email}
                            onChange={changeHandle}
                            name="email"
                        />
                        <PasswordInput
                            value={formData.password}
                            onChange={changeHandle}
                            name="password"
                        />
                        {err && <p className='text-red-500 text-xs'>{err}</p>}
                        <button type="submit" className='btn-primary'>
                        CREATE ACCOUNT
                        </button>
                        <p className='text-xs text-slate-500 text-center my-4'>Or</p>
                        <button
                            type="button"
                            className='btn-primary btn-light'
                            onClick={()=>navigate('/login')} // Directly call the function

                        >
                            LOGIN
                        </button>

                    </form>


                </div>


            </div>

        </div>

    )
}

export default Signup;