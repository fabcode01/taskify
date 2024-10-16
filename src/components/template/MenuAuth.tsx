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

    const userImg = usuario?.image ? usuario?.image : ''

    const[AuthMode, setAuthMode] = useState<AuthMode>('register')

    function changeMode(mode: AuthMode){
        setAuthMode(mode)

        console.log(mode);
        
    }

    function renderProfile(){
        return (
            <div className="flex flex-col items-center mt-5">
                {usuario?.image ? (
                    <Image width={112} height={112} src={userImg} alt='user' className='rounded-full'/>
                ):(
                    <div className="flex justify-center items-center bg-gray-800 w-28 h-28 rounded-full">
                        <span className='text-white font-semibold uppercase text-2xl'>{usuario?.email[0]}</span>
                    </div>
                )}
            
            <h2 className="mt-3 text-lg font-semibold">Olá, {usuario?.nome ? usuario.nome : usuario?.email}</h2>

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
                    <Form title={AuthMode === 'register' ? currentLanguage?.AuthModal.titleLogin : currentLanguage?.AuthModal.titleRegister} AuthMode={changeMode}/>
                )
            )}


            
           
      </Modal>
    )
}