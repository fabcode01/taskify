'use client'

import { useContext, useEffect, useState } from "react";
import { addIcon, bellIcon, clockIcon, completedIcon, homeIcon, settingsIcon } from "../icons";
import { LanguageContext } from "@/context/LanguageContext";

export type Pages = 'home' | 'completed' | 'updates' | 'settings'

interface NavProps{
    iconSize: number
    currentPage: Pages | string
    changePage: (page: Pages) => void
    MenuTaskShow?: () => void
}



export default function Nav(props: NavProps){

    const{currentLanguage} = useContext(LanguageContext)

    const[iconSize] = useState(props.iconSize)

    const[showNav, setShowNav] = useState('bottom-0')

    const items = 'cursor-pointer text-azul-clarinho '

    
    useEffect(()=>{
            let lastScrollY = window.scrollY

            const handleScroll = ()=>{
                const currentScrollY = window.scrollY

                if(currentScrollY > lastScrollY){
                    setShowNav('translate-y-80');
                } else{
                    setShowNav('translate-y-0');
                }

                lastScrollY = currentScrollY

            }

            window.addEventListener('scroll', handleScroll)
            
         
            return ()=>{
                window.removeEventListener('scroll', handleScroll)
            }
    
    },[])
    

    return (
        <nav className={`anime flex fixed w-full h-24 bottom-0 ${showNav} bg-azul-medio`}>

            <ul className="flex w-full justify-evenly items-center gap-3 p-2">
                
                <div onClick={() => props.changePage('home')} className={`${items} ${props.currentPage === 'home' ? 'text-azul-claro' : ''}`}>
                    <li>{homeIcon(iconSize)}</li>
                </div>

                <div onClick={() => props.changePage('completed')}  className={`${items}  ${props.currentPage === 'completed' ? 'text-azul-claro' : ''}`}>
                    <li>{completedIcon(iconSize)}</li>
                   
                </div>

                <div  onClick={props.MenuTaskShow} className={`
                flex justify-center items-center w-[5rem] h-[5rem] cursor-pointer relative bottom-6 bg-azul-escuro dark:bg-azul-clarinho rounded-[20px] shadow-2xl p-4 text-azul-clarinho dark:text-azul-escuro active:bottom-7 transition-all `
                }>

                    <li  id='addTask'>{addIcon(iconSize)}</li>

                </div>

                <div onClick={() => props.changePage('updates')} className={`${items} ${props.currentPage === 'updates' ? 'text-azul-claro' : ''}`}>
                    <li>{bellIcon(iconSize)}</li>
                   
                </div>

                <div onClick={() => props.changePage('settings')} className={`${items} ${props.currentPage === 'settings' ? 'text-azul-claro' : ''}`}>
                    <li>{settingsIcon(iconSize)}</li>
                </div>
            </ul>
        </nav>
    )
}
