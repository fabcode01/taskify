'use client'

import { airplaneIcon, googleIcon } from "./icons"
import Input from "./Input"
import Button from "./Button"
import { useContext, useState } from "react"
import AuthContext from "@/context/AuthContext"



interface FormProps{
    title: string
    AuthMode: string
    changeMode: () => void
}

export function Form(props: FormProps){

    const{loginGoogle} = useContext(AuthContext)
    
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')

    function loginWithEmail(){
        console.log(email, password);
        
    }



    return (
        <div>
            <h1 className="font-bold text-2xl">{props.title}</h1>

            <div className="flex flex-col items-center">

                <Input inputType="text" placeholder="yourEmail@exemple.com" onChange={setEmail}/>
                <Input inputType="password" placeholder="Password" onChange={setPassword}/>

                <div className="flex gap-2">
                    
                    <Button onClick={loginGoogle} icon={googleIcon} className="bg-gray-300"/>

                    <Button icon={airplaneIcon} className="bg-azul-escuro text-azul-clarinho hover:bg-blue-950"/>
                </div>


                <div className="flex mt-5 gap-2">
                <p>{props.AuthMode === 'login' ? 'Do not have an account?' : 'Do you have an account?'}</p>

                <p onClick={props.changeMode} className="text-azul-medio font-bold cursor-pointer">{props.AuthMode === 'login' ? 'Register' : 'Login'}</p>
               </div>
                
            </div>
        </div>
    )
        
    
}