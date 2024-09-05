'use client'

import { useState } from "react"
import  {Form}  from "../FormAuth"
import { Modal } from "../Modal"

interface MenuLoginProps{
    showMenuAuth: boolean
    hiddenMenuAuth: ()=>void
}

export function MenuAuth(props: MenuLoginProps){
    const[AuthMode, setAuthMode] = useState<'login' | 'register'>('login')

    function switchAuthMode(){
        if(AuthMode === 'login'){
            setAuthMode('register')
        }else{
            setAuthMode('login')
        }
    }

    return (
      <Modal modalActive={props.showMenuAuth} hiddenMenu={props.hiddenMenuAuth} className="rounded-b-[43px]">
            <Form title={AuthMode === 'login' ? 'Login' : 'Register'} AuthMode={AuthMode} changeMode={switchAuthMode}/>
      </Modal>
    )
}