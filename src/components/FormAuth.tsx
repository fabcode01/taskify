'use client'

import { airplaneIcon, googleIcon } from "./icons"
import Input from "./Input"
import Button from "./Button"
import { useContext, useEffect, useState } from "react"
import AuthContext from "@/context/AuthContext"
import { LanguageContext } from "@/context/LanguageContext"



interface FormProps{
    title: string | undefined
    AuthMode: (mode: AuthMode) => void
}

export function Form(props: FormProps){

    const{currentLanguage} = useContext(LanguageContext)

    const{error, changeError, loginGoogle, loginEmail, cadastrar} = useContext(AuthContext)
    

    const[AuthMode, setAuthMode] = useState<AuthMode>('login')

    function switchAuthMode(){
        setAuthMode(AuthMode == 'login' ? 'register' : 'login')

        props.AuthMode(AuthMode)
    }

    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')

    function loginWithEmail(e: any){

            if(AuthMode === 'login'){
                loginEmail && loginEmail(email, password)
            }else{
                cadastrar && cadastrar(email, password)
            }
        


        setEmail('')
        setPassword('')
        
    }

   


    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="font-bold text-2xl">{props.title}</h1>
                <h2 className="text-red-400 font-bold">{error}</h2>
            </div>
            

            <div className="flex flex-col items-center">

                <form className="w-full flex flex-col items-center" onSubmit={loginWithEmail}>

                <Input value={email} required inputType="email" placeholder="yourEmail@exemple.com" onChange={setEmail}/>

                <Input min={6} value={password} required inputType="password" placeholder={currentLanguage?.AuthModal.passwordPlaceholder} onChange={setPassword}/>



                <div className="flex flex-row-reverse gap-2">
                    
                    <Button icon={airplaneIcon} className="bg-azul-escuro text-azul-clarinho hover:bg-blue-950"/>
                    <Button onClick={loginGoogle} icon={googleIcon} className="bg-gray-300"/>

                </div>

                </form>

                <div className="flex mt-5 gap-2">
                <p>{AuthMode === 'login' ? currentLanguage?.AuthModal.dontHaveAccount : currentLanguage?.AuthModal.haveAccount}</p>

                <p onClick={() => switchAuthMode()} className="text-azul-medio font-bold cursor-pointer">{AuthMode === 'login' ? currentLanguage?.AuthModal.titleRegister : currentLanguage?.AuthModal.titleLogin}</p>
               </div>
                
            </div>
        </div>
    )
        
    
}