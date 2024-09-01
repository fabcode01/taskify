'use client'

import { useState } from "react"



interface ModalProps{
    modalActive: boolean 
    hiddenMenu?: ()=>void
    children?: any
    position?: 'fixed bottom-0' | 'fixed top-0'
    rounded?: string
}

export function Modal(props: ModalProps){

    const[error, setError] = useState('')


    return (
        <div className={`${props.modalActive ? '' : 'hidden'}`}>
            
            <div onClick={props.hiddenMenu} className={`${props.modalActive ? '' : 'hidden'} z-20 fixed  h-screen w-full bg-over-claro`}>
            </div>

                <div className={`z-30 absolute h-[390px] w-full bg-branco-claro ${props.rounded}[43px] shadow-lg p-5 ${props.position}`}>

                    {props.children}
                   
                </div>
            
            
        </div>
    )
}