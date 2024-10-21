'use client'

interface ModalProps{
    modalActive: boolean 
    hiddenMenu?: ()=>void
    children?: any
    position?: 'rodape' | 'fixed top-0'
    className?: string
}

export function Modal(props: ModalProps){



    return (
        <div className={`${props.modalActive ? '' : 'hidden'}`}>
            
            <div onClick={props.hiddenMenu}

            className={`
            ${props.modalActive ? '' : 'hidden'} z-20 fixed h-screen w-full  bg-over-claro
                     
            `}>
            </div>

                
                 
                        <div className="absolute w-full h-screen flex justify-center lg:items-center">
                            <div className={`anime z-50 left-0 absolute h-[390px] w-full bg-branco-claro ${props. className} shadow-lg p-5 ${props.position}
                            
                            lg:sticky lg:w-1/3 lg:rounded-2xl lg:z-50
                            `}>
                               {props.children}
                            
                            </div>
                        </div>
                    
                
            
            
        </div>
    )
}