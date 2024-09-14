import {userIcon, logoTaskify} from '../icons/index'

interface TopProps{
    showMenuAuth?: () => void
}

export default function Top(props: TopProps){
    return (
        <div className='flex justify-between items-center p-5'>

            <div className='flex items-center gap-1'>

                <span>{logoTaskify(55)}</span>

                <h1 className='font-sans font-bold text-3xl text-[#E6C97D]'>Taskify</h1>
            </div>

       

                <div className="avatar placeholder">

                    <div onClick={props.showMenuAuth} className="cursor-pointer bg-neutral text-neutral-content w-12 rounded-full active:scale-105">

                       <span id='login'>{userIcon}</span>
                        
                    </div>
                </div>
            </div>
        
    )
}