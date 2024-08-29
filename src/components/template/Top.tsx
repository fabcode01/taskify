import {userIcon, logoTaskify} from '../icons/index'


export default function Top(){
    return (
        <div className='flex justify-between items-center p-5'>

            <div className='flex items-center gap-1 cursor-pointer'>

                <span>{logoTaskify(55)}</span>

                <h1 className='font-sans font-bold text-3xl text-[#E6C97D]'>Taskify</h1>
            </div>

       

                <div className="avatar placeholder">

                    <div className="bg-neutral text-neutral-content w-12 rounded-full">

                        <span className="text-xl">F</span>
                        
                    </div>
                </div>
            </div>
        
    )
}