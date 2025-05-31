import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

function PasswordInput({ value, onChange,name }) {
    const [isShowPassword, setIsShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    };

    return (
        <div className='flex items-center bg-cyan-600/5 rounded mb-3'>
            <input
                type={isShowPassword ? "text" : "password"} // Toggle input type
                value={value}
                onChange={onChange}
                name={name}
                placeholder= 'Password'
                className='w-full text-sm bg-transparent py-3 mr-3 rounded outline-none pl-4'
            />

            {isShowPassword ? (
                <FaRegEye
                    size={22}
                    className="text-cyan-300 cursor-pointer"
                    onClick={toggleShowPassword} // Directly call the function
                />
            ) : (
                <FaRegEyeSlash
                    size={22}
                    className="text-slate-400 cursor-pointer"
                    onClick={toggleShowPassword} // Directly call the function
                />
            )}
        </div>
    );
}

export default PasswordInput;