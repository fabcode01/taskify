'use client'

import { useState } from "react"
import Button from "./Button"
import { airplaneIcon, arrowDown } from "./icons"
import Input from "./Input"


interface FormTask{
    title?: string
}

export function FormTask(props: FormTask){
    const[description, setDescription] = useState('')
    const[date, setDate] = useState('')
    const[type, setType] = useState('')

    function newTask(){
        console.log(`${type} / ${date} / ${description}`);
        
    }

    return (
        <div>
             <h1 className="font-bold text-2xl">{props.title}</h1>
            <div className="flex flex-col items-center">
               
            <select required onChange={e => setType(e.target.value)} className="select w-2/3 border-2 border-black mt-5 bg-white rounded-lg focus:outline-none focus:border-black  bg-transparent">
                    <option disabled selected>Task Types</option>
                    <option>Finance</option>
                    <option>Personal</option>
                    <option>Hobbies</option>
                    <option>Health</option>
            </select>
                <Input inputType="text" placeholder="Description" onChange={setDescription}/>
                <Input inputType="date" onChange={setDate}/>

                <div className="flex">
                    
                    <Button submit={newTask} width="w-40" icon={airplaneIcon} type="bg-azul-escuro text-azul-clarinho hover:bg-blue-950"/>
                </div>
                

              
                
            </div>
        </div>
    )
        
    
}