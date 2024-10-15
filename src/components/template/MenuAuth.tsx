'use client'

import { useContext, useState } from "react"
import  {Form}  from "../FormAuth"
import { Modal } from "../Modal"
import AuthContext from "@/context/AuthContext"
import Button from "../Button"
import { logoTaskify, logoutIcon } from "../icons"
import { LanguageContext } from "@/context/LanguageContext"
import Image from "next/image"

interface MenuLoginProps{
    showMenuAuth: boolean
    hiddenMenuAuth: ()=>void
}

export function MenuAuth(props: MenuLoginProps){

    const{currentLanguage} = useContext(LanguageContext)
    const{usuario, logout, carregando} = useContext(AuthContext)

    const[AuthMode, setAuthMode] = useState<'login' | 'register'>('login')

    const userImg = usuario?.image ? usuario?.image : ''

    function switchAuthMode(){
        if(AuthMode === 'login'){
            setAuthMode('register')
        }else{
            setAuthMode('login')
        }
    }

    function renderProfile(){
        return (
            <div className="flex flex-col items-center mt-5">
            <Image width={80} height={80} src={userImg} alt='user' className='rounded-full'/>
            <h2 className="mt-3 text-lg font-semibold">Olá, {usuario?.nome}</h2>

                <Button onClick={logout} icon={logoutIcon} text="logout" className="bg-red-700 text-white hover:bg-red-950"/>
            
        </div>
        )
    }

    return (
      <Modal modalActive={props.showMenuAuth} hiddenMenu={props.hiddenMenuAuth} className="rounded-b-[43px]">

           
                
            {carregando ? (
                <div className="h-full flex justify-center items-center animate-pulse rounded-full">
                    {logoTaskify(88)}
                </div>
            ) : (
                usuario ? (
                    renderProfile()
                ) : (
                    <Form title={AuthMode === 'login' ? currentLanguage?.AuthModal.titleLogin : currentLanguage?.AuthModal.titleRegister} AuthMode={AuthMode} changeMode={switchAuthMode}/>
                )
            )}


            
           
      </Modal>
    )
}