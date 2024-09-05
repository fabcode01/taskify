import { airplaneIcon } from "./icons"


type BtnEscuro = "bg-azul-escuro text-azul-clarinho hover:bg-blue-950"

interface ButtonProps{
    type?: BtnEscuro
    icon?: any
    text?: string
    width?: string
    className?: string
    submit: ()=> void
    
}

export default function Button(props: ButtonProps){
    return (
        <div className="flex mt-5 gap-2">
            <button onClick={props.submit} className={`btn ${props.width ? props.width : 'w-32'} ${props.className} ${props.type}`} >{props.icon} {props.text}</button>
        </div>
    )
}