import { useContext, useEffect } from 'react'
import {userIcon, logoTaskify} from '../icons/index'
import AuthContext from '@/context/AuthContext'
import Image from 'next/image'

interface TopProps{
    showMenuAuth?: () => void
}

export default function Top(props: TopProps){

    const{usuario} = useContext(AuthContext)

    return (
        <div className='flex justify-between items-center p-5 '>

            <div className='flex items-center gap-1 dark:bg-black p-2 rounded-lg'>

                <span>{logoTaskify(55)}</span>


                <h1 className='font-sans font-bold text-3xl text-[#E6C97D]'>Taskify</h1>

            </div>

            
        
                {usuario?.admin && (
                        <span className='ml-3 bg-azul-escuro text-white p-1 rounded-md text-sm dark:bg-black'>admin</span>
                    )}
       
                <div className='flex items-center gap-6'>
            

                    <span className='hidden font-semibold lg:flex dark:text-white'>
                        {usuario?.nome}
                    </span>


                    <div className="avatar placeholder">
                    
                        <div id='login' onClick={props.showMenuAuth} className="flex items-center justify-center cursor-pointer bg-neutral text-neutral-content w-12 rounded-full active:scale-105 border border-slate-300 hover:bg-gray-700">
                        
                            {usuario ? (
                                !usuario?.image && usuario?.email ? (
                                    <span className='font-semibold uppercase'>{usuario.email[0]}</span>
                                ) : (
                                    <Image fill src={usuario?.image} alt='user' className='rounded-full'/>
                                )
                               
                              
                            ):(
                                
                                <span>{userIcon}</span>
                            )}

                    
                        </div>
                    </div>
                </div>
            </div>
        
    )
}