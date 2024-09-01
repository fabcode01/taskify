import { airplaneIcon } from "./icons"

interface ButtonProps{
    icon?: any
    text?: string
    width?: string
    className?: string
}

export default function Button(props: ButtonProps){
    return (
        <div className="flex mt-5 gap-2">
            <button className={`btn ${props.width ? props.width : 'w-32'} ${props.className}`}>{props.icon} {props.text}</button>
        </div>
    )
}