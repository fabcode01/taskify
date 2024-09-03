import { useState } from "react"
import { disableEyeIcon, eyeIcon } from "./icons"


interface InputProps{
    inputType?: 'text' | 'password' | 'date'
    placeholder?: string
    className?: string
    changeType?: () => void
    onChange: (newValue: any) => void
    value?: string
    required?: boolean
    
   
}

export default function Input(props: InputProps){
    const[showEye, setShowEye] = useState(false)
    const[inputType, setInputType] = useState(props.inputType)

    function changeType(){
        if(!showEye){
            setShowEye(true)
            setInputType('text')
            

        }else{
            setShowEye(false)
            setInputType('password')
        }
    }

    return (
        <label className={`flex justify-between items-center border-2 w-2/3 border-black mt-5 bg-white rounded-lg p-3 ${props.className}`}>

                    <input required={props.required} value={props.value} type={inputType} placeholder={props.placeholder} className={`focus:outline-none focus:border-none w-full bg-transparent
                    `} onChange={e => props.onChange?.(e.target.value)}/>

                    {props.inputType === 'password' ? <span onClick={changeType} className="cursor-pointer">{showEye ?  disableEyeIcon : eyeIcon}</span> : ''}
                        

                   
        </label>
    )
}