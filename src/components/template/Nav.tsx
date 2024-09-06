'use client'

import { useEffect, useState } from "react";
import { addIcon, bellIcon, clockIcon, homeIcon, settingsIcon } from "../icons";

export type Pages = 'home' | 'pending' | 'updates' | 'settings'

interface NavProps{
    iconSize: number
    currentPage: Pages
    changePage: (page: Pages) => void
    MenuTaskShow?: () => void
}



export default function Nav(props: NavProps){
    const[iconSize, setIconSize] = useState(props.iconSize)

    const[showNav, setShowNav] = useState('bottom-0')

    const items = 'flex flex-col items-center text-xs'

    
    useEffect(()=>{
        window.addEventListener('scroll',function() {
            console.log(window.scrollY);
    
            let value = 0
    
            if(window.scrollY >= value){
                console.log('cheg');
                value = 48
                setShowNav('translate-y-80')
            }
    
            if(window.scrollY < value){
                
                setShowNav('translate-y-0')
            }
            
        });

    
    },[])
    

    return (
        <nav className={`anime flex fixed w-full h-24 bottom-0 ${showNav} bg-azul-medio`}>

            <ul className="flex w-full justify-evenly items-center gap-1">
                
                <div onClick={() => props.changePage('home')} className={`${items} text-azul-clarinho ${props.currentPage === 'home' ? 'text-azul-claro' : ''}`}>
                    <li>{homeIcon(iconSize)}</li>
                    <p>Home</p>
                </div>

                <div onClick={() => props.changePage('pending')}  className={`${items} text-azul-clarinho ${props.currentPage === 'pending' ? 'text-azul-claro' : ''}`}>
                    <li>{clockIcon(iconSize)}</li>
                    <p>Pending</p>
                </div>

                <div onClick={props.MenuTaskShow} className={`
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
