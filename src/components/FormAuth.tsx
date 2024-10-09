'use client'

import { airplaneIcon, googleIcon } from "./icons"
import Input from "./Input"
import Button from "./Button"
import { useContext, useEffect, useState } from "react"
import AuthContext from "@/context/AuthContext"
import { LanguageContext } from "@/context/LanguageContext"



interface FormProps{
    title: string | undefined
    AuthMode: string
    changeMode: () => void
}

export function Form(props: FormProps){

    const{currentLanguage} = useContext(LanguageContext)

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
                <Input inputType="password" placeholder={currentLanguage?.AuthModal.passwordPlaceholder} onChange={setPassword}/>

                <div className="flex gap-2">
                    
                    <Button onClick={loginGoogle} icon={googleIcon} className="bg-gray-300"/>

                    <Button icon={airplaneIcon} className="bg-azul-escuro text-azul-clarinho hover:bg-blue-950"/>
                </div>


                <div className="flex mt-5 gap-2">
                <p>{props.AuthMode === 'login' ? currentLanguage?.AuthModal.dontHaveAccount : currentLanguage?.AuthModal.haveAccount}</p>

                <p onClick={props.changeMode} className="text-azul-medio font-bold cursor-pointer">{props.AuthMode === 'login' ? currentLanguage?.AuthModal.titleRegister : currentLanguage?.AuthModal.titleLogin}</p>
               </div>
                
            </div>
        </div>
    )
        
    
}