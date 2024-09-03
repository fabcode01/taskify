interface ErrorProps{
    message: string
}

export default function Error(props: ErrorProps){
    return (
        <div className="mt-3">
            <p className="text-red-500 font-semibold">{props.message}</p>
        </div>
    )
}