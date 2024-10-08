

interface HeroProps {
    title: string | undefined
    description: string | undefined
    children: any
    className?: string
}

export function Hero(props: HeroProps){

    return (
        
            <div className={`flex items-center justify-between p-5 bg-white rounded-lg border-black border ${props.className} mt-5`}>
                <div>
                    <h1 className="font-bold text-2xl">{props.title}</h1>
                    <p>{props.description}</p>
                </div>

                {props.children}
            </div>
        
    )
}