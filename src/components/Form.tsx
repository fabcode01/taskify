'use client'

import { useState } from "react"
import { airplaneIcon, disableEyeIcon, eyeIcon, googleIcon } from "./icons"

interface FormProps{
    title: string
    AuthMode: string
    changeMode: () => void
}

export function Form(props: FormProps){

    const[showPassword, setShowPassword] = useState<boolean>(false)

    function switchPassword(){
        if(!showPassword){
            setShowPassword(true)
        }else{
            setShowPassword(false)
        }
    }


    function renderForm(){
       
            return (
                <div>
            <h1 className="font-bold text-2xl">{props.title}</h1>

            <div className="flex flex-col items-center">

            <label className="flex items-center border-2 w-2/3 border-black mt-5 bg-white rounded-lg p-3 ">

                    <input type="text" placeholder="Your Email" className="focus:outline-none focus:border-none bg-transparent" />

                    
            </label>

               <label className="flex justify-between items-center border-2 w-2/3 border-black mt-5 bg-white rounded-lg p-3">

                    <input type={showPassword ? 'text' : 'password'} placeholder="Password" className="focus:outline-none focus:border-none w-1/2 bg-transparent" />

                    <span onClick={switchPassword} className="cursor-pointer">{showPassword ?  disableEyeIcon : eyeIcon}</span>
               </label>

               <div className="flex gap-2 mt-5">
                    <button className="btn bg-gray-200 text-white w-32">{googleIcon}</button>
                   <button className="btn bg-azul-escuro text-azul-clarinho w-32">{airplaneIcon}</button>
               </div>

               <div className="flex mt-5 gap-2">
                <p>{props.AuthMode === 'login' ? 'Do not have an account?' : 'Do you have an account?'}</p>

                <p onClick={props.changeMode} className="text-azul-medio font-bold cursor-pointer">{props.AuthMode === 'login' ? 'Register' : 'Login'}</p>
               </div>
            </div>
        </div>
            )
        
    }

   
    

    return renderForm()
        
    
}