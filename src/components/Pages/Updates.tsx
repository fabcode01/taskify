import Button from "@/components/Button"
import Input from "@/components/Input"
import { Title } from "@/components/Title"
import AuthContext from "@/context/AuthContext"
import { LanguageContext } from "@/context/LanguageContext"
import UpdatesProps from "@/core/Updates"
import useCloud from "@/hooks/useCloudTask"
import { Update } from "next/dist/build/swc"
import { useContext, useEffect, useState } from "react"

export default function Updates(){

    // Contexts
    const{currentLanguage} = useContext(LanguageContext)
    const{usuario} = useContext(AuthContext)

    // Fim Contexts

    const[updateTitle, setUpdateTitle] = useState('')

    const[updateText, setUpdateText] = useState('')

    const[cloudUpdates, setCloudUpdates] = useState<UpdatesProps[] | any>()

    const{addUpdate,getUpdate,deleteUpdate: deleteCloudUpdate, carregando:loadingUpdate, deleteCloud} = useCloud()

    async function submit(){
        const update = {
            title: updateTitle,
            text: updateText
        }

        setUpdateText('')
        setUpdateTitle('')

        await addUpdate(update)



        get()
        
    }

    async function get(){
        const newUpdates = await getUpdate()
        
        const data = newUpdates.map(item => {
          
            
            const obj = {
                id: item.id,
                title: item.data.title,
                description: item.data.text
            }
            return obj
            
        })


        setCloudUpdates(data)

        
    }

    async function deleteUpdate(id: string | number) {

        await deleteCloudUpdate(id)

        get()
    }


    const inputUpdate = ()=>{
        return (
            <div className="flex flex-col justify-center items-center w-1/2">
                    <Input value={updateTitle} inputType="text" className="w-full" onChange={setUpdateTitle} placeholder="Title"/>

                    <textarea value={updateText} onChange={e=> setUpdateText(e.target.value)} placeholder="Description" className="w-full p-2 mt-2 border-2 border-black rounded-md" />


                    {loadingUpdate ? (
                        <div className="h-5 w-5 mt-5 animate-spin rounded-full border-b-azul-escuro border-2">

                        </div>
                    ):(
                        <Button text='send' submit={submit} type="bg-azul-escuro text-azul-clarinho hover:bg-blue-950"/>

                    )}     
                
                    
            </div>
        )
    }



    const updates = ()=>{
        return (
        <div className="pb-2 mt-10">

            {cloudUpdates?.map((data: UpdatesProps)=>(

                <div key={data.id} className="mt-7 border-b-2 pb-4">
                     <h1 className="font-bold text-xl dark:text-gray-400">{data.title}</h1>

                     <p className="dark:text-gray-500">{data.description}</p>

                     <div className="flex justify-end">{usuario?.admin && <Button submit={() => deleteUpdate(data.id)} text="Delete" className="bg-red-600 text-white "/>}</div>
                </div>
                
            ))}
            
           
           
        </div>
        )
    }



    useEffect(()=>{
        get()
    },[])

    return (
            <div className="flex flex-col items-center mt-8 p-5">

                    {usuario?.admin && (

                        inputUpdate()

                    )}


                    <div className="w-full">
                        <Title className="dark:text-azul-clarinho" title={currentLanguage?.updates.title}/>
                        {updates()}
                    </div>
            </div>
        
    )
}