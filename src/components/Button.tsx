import { airplaneIcon } from "./icons"


type BtnEscuro = "bg-azul-escuro text-azul-clarinho hover:bg-blue-950"

interface ButtonProps{
    type?: BtnEscuro
    icon?: any
    text?: string
    width?: string
    className?: string
    submit?: ()=> void
    onClick?: ()=> void
    
}

export default function Button(props: ButtonProps){
    return (
        <div className="flex gap-2">
            <button onClick={props.submit || props.onClick} className={`btn mt-5 ${props.width ? props.width : 'w-32'} ${props.className} ${props.type}`} >{props.icon} {props.text}</button>
        </div>
    )
}