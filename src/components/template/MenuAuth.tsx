'use client'

import { useContext, useState } from "react"
import  {Form}  from "../FormAuth"
import { Modal } from "../Modal"
import AuthContext from "@/context/AuthContext"
import Button from "../Button"
import { editIcon, logoTaskify, logoutIcon } from "../icons"
import { LanguageContext } from "@/context/LanguageContext"

interface MenuLoginProps{
    showMenuAuth: boolean
    hiddenMenuAuth: ()=>void
}

export function MenuAuth(props: MenuLoginProps){

    const{currentLanguage} = useContext(LanguageContext)
    const{usuario, logout, carregando} = useContext(AuthContext)

    const[AuthMode, setAuthMode] = useState<'login' | 'register'>('login')

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
            <img src={usuario?.image} alt="usuario" className="w-20 h-20 rounded-full border"/>
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