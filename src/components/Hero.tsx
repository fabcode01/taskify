import { useState } from "react"

type Language = "English" | "Portuguese"

interface HeroProps {
    title: string
    description: string
    children: any
    className?: string
}

export function Hero(props: HeroProps){

    return (
        
            <div className={`flex items-center justify-between mt-5 p-5 bg-white rounded-lg border-black border ${props.className} `}>
                <div>
                    <h1 className="font-bold text-2xl">{props.title}</h1>
                    <p>{props.description}</p>
                </div>

                {props.children}
            </div>
        
    )
}