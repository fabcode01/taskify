import { useContext, useEffect } from 'react'
import {userIcon, logoTaskify} from '../icons/index'
import AuthContext from '@/context/AuthContext'

interface TopProps{
    showMenuAuth?: () => void
}

export default function Top(props: TopProps){

    const{usuario} = useContext(AuthContext)

    return (
        <div className='flex justify-between items-center p-5'>

            <div className='flex items-center gap-1'>

                <span>{logoTaskify(55)}</span>

                <h1 className='font-sans font-bold text-3xl text-[#E6C97D]'>Taskify</h1>
            </div>

       
                <div className='flex items-center gap-6'>

                    {usuario?.admin && (
                        <span className='bg-azul-escuro text-white p-1 rounded-md text-sm'>admin</span>
                    )}


                    <div className="avatar placeholder">
                    
                        <div onClick={props.showMenuAuth} className="cursor-pointer bg-neutral text-neutral-content w-12 rounded-full active:scale-105 border border-slate-300">
                    
                            {usuario ? (
                                <img src={usuario?.image} alt="user-photo" />
                            ):(
                                
                                <span>{userIcon}</span>
                            )}
                    
                        </div>
                    </div>
                </div>
            </div>
        
    )
}