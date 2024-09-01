'use client'

import { useState } from "react"
import  {Form}  from "../../components/FormAuth"

interface MenuLoginProps{
    showMenuAuth: boolean
    hiddenMenuAuth: ()=>void
}

export function MenuAuth(props: MenuLoginProps){
    const[AuthMode, setAuthMode] = useState<'login' | 'register'>('login')
    const[error, setError] = useState('')

    function switchAuthMode(){
        if(AuthMode === 'login'){
            setAuthMode('register')
        }else{
            setAuthMode('login')
        }
    }

    return (
        <div className={`${props.showMenuAuth ? '' : 'hidden'}`}>
            <div onClick={props.hiddenMenuAuth} className={`${props.showMenuAuth ? '' : 'hidden'} z-20 fixed h-screen w-full bg-over-claro`}>
            </div>

                <div className="z-30 fixed h-[390px] w-full bg-branco-claro rounded-b-[43px] shadow-lg p-5">
            
                    <Form changeMode={switchAuthMode} title={AuthMode === 'login' ? 'Login to your account' : 'Register to sync data'} AuthMode={AuthMode}/>

                        <p className="text-center mt-5 text-red-500">{error}</p>
                </div>
            
            
        </div>
    )
}