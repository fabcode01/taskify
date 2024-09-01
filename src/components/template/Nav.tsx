'use client'

import { useState } from "react";
import { addIcon, bellIcon, clockIcon, homeIcon, settingsIcon } from "../icons";

export type Pages = 'home' | 'pending' | 'updates' | 'settings'

interface NavProps{
    iconSize: number
    currentPage: Pages
    changePage: (page: Pages) => void
    triggerNewTask?: ()=>void
}



export default function Nav(props: NavProps){
    const[iconSize, setIconSize] = useState(props.iconSize)

    const items = 'flex flex-col items-center text-xs'
    

    return (
        <nav className="flex fixed w-full h-24  bottom-0 bg-azul-medio">

            <ul className="flex w-full justify-evenly items-center gap-1">
                
                <div onClick={() => props.changePage('home')} className={`${items} text-azul-clarinho ${props.currentPage === 'home' ? 'text-azul-claro' : ''}`}>
                    <li>{homeIcon(iconSize)}</li>
                    <p>Home</p>
                </div>

                <div onClick={() => props.changePage('pending')}  className={`${items} text-azul-clarinho ${props.currentPage === 'pending' ? 'text-azul-claro' : ''}`}>
                    <li>{clockIcon(iconSize)}</li>
                    <p>Pending</p>
                </div>

                <div onClick={props.triggerNewTask} className={`
                flex justify-center items-center w-[5rem] h-[5rem] cursor-pointer relative bottom-6 bg-azul-escuro rounded-[20px] shadow-2xl p-4 text-azul-clarinho active:bottom-7 transition-all `
                }>

                    <li>{addIcon(iconSize)}</li>

                </div>

                <div onClick={() => props.changePage('updates')} className={`${items} text-azul-clarinho ${props.currentPage === 'updates' ? 'text-azul-claro' : ''}`}>
                    <li>{bellIcon(iconSize)}</li>
                    <p>Updates</p>
                </div>

                <div onClick={() => props.changePage('settings')} className={`${items} text-azul-clarinho ${props.currentPage === 'settings' ? 'text-azul-claro' : ''}`}>
                    <li>{settingsIcon(iconSize)}</li>
                    <p>Settings</p>
                </div>
            </ul>
        </nav>
    )
}
