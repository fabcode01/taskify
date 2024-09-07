'use client'

import { useEffect, useState } from "react"
import Button from "./Button"
import { airplaneIcon, arrowDown } from "./icons"
import Input from "./Input"
import Error from "./Error"
import useTasks from "@/hooks/useTask"
import Task from "@/core/Task"




interface FormTask{
    title?: string
}

export function FormTask(props: FormTask){
    const[description, setDescription] = useState('')
    const[id, setId] = useState(Math.random())
    const[date, setDate] = useState('')
    const[type, setType] = useState('')
    const[error, setError] = useState('')

    const { setLocalTask } = useTasks()

    function newTask(){

        if(!type || !date ||  !description){
            setError('Some fields are missing.')
            setTimeout(()=>{
                setError('')
            },4000)
        }else{
            
            const task = new Task(id, type, description, date, false)

            setLocalTask(task)
            window.location.reload()
           

        }
    }

    useEffect(()=>{
        setError('')
    },[description, date, type])

    return (
        <div>
             <h1 className="font-bold text-2xl">{props.title}</h1>
            <div className="flex flex-col items-center">
               
            <select required onChange={e => setType(e.target.value)} className="select w-2/3 border-2 border-black mt-5 bg-white rounded-lg focus:outline-none focus:border-black  bg-transparent">
                    <option disabled selected>Task Types</option>
                    <option>Finance</option>
                    <option>Personal</option>
                    <option>Education</option>
                    <option>Health</option>
            </select>
                <Input required inputType="text" placeholder="Description" onChange={setDescription}/>

                <Input inputType="date" onChange={setDate}/>

                <div className="flex">
                    
                    <Button submit={newTask} width="w-40" icon={airplaneIcon} type="bg-azul-escuro text-azul-clarinho hover:bg-blue-950"/>
                </div>

                <Error message={error}/>
                
                
              
                
            </div>
        </div>
    )
        
    
}