'use client'

import { airplaneIcon, googleIcon } from "./icons"
import Input from "./Input"
import Button from "./Button"

interface FormProps{
    title: string
    AuthMode: string
    changeMode: () => void
}

export function Form(props: FormProps){

    return (
        <div>
            <h1 className="font-bold text-2xl">{props.title}</h1>

            <div className="flex flex-col items-center">

                <Input inputType="text" placeholder="yourEmail@exemple.com"/>
                <Input inputType="password" placeholder="Password"/>

                <div className="flex gap-2">
                    <Button icon={googleIcon} className="bg-gray-300"/>
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