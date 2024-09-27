'use client'

import { useContext, useEffect, useState } from "react"
import Button from "./Button"
import { airplaneIcon } from "./icons"
import Input from "./Input"
import Error from "./Error"
import Task from "@/core/Task"
import { TaskContext } from "@/context/TaskContext"




interface FormTask{
    title?: string
    value?: any
    taskToEdit?: any
    clearForm: string
    closeModal?:  ()=>void

}

export function FormTask(props: FormTask){


    const[description, setDescription] = useState('')
    const[id, setId] = useState<string | number> (0)
    const[date, setDate] = useState<string | number>('')
    const[type, setType] = useState('Finance')
    const[error, setError] = useState('')

    const{addTask} = useContext(TaskContext)

    function newTask(){

        if(!type || !date ||  !description){
            setError('Some fields are missing.')
            setTimeout(()=>{
                setError('')
            },4000)
        }else{
            
            const task = new Task(id, type, description, date, false)
            
            addTask && addTask(task)

            props.closeModal && props.closeModal()

        }

    }


    useEffect(()=>{
        const task:Task = props.taskToEdit
        
        setId(task?.id)
        setDate(task?.date)
        setDescription(task?.description)
        setType(task?.type)

       
        
    },[props.taskToEdit])



    useEffect(()=>{
        setError('')
    },[description, date, type])


    useEffect(()=>{
        setId(Math.random())
        setDate('')
        setDescription('')
    },[props.clearForm])



    return (
        <div>
             <h1 className="font-bold text-2xl">{props.title}</h1>
            <div className="flex flex-col items-center">
               
            <select value={type} required onChange={e => setType(e.target.value)} className="select w-2/3 border-2 border-black mt-5 bg-white rounded-lg focus:outline-none focus:border-black  bg-transparent">
                    <option disabled selected>Choose type</option>
                    <option>Finance</option>
                    <option>Personal</option>
                    <option>Education</option>
                    <option>Health</option>
            </select>
                <Input value={description} required inputType="text" placeholder="Description" onChange={setDescription}/>

                <Input value={date} inputType="date" onChange={setDate}/>

                <div className="flex">
                    
                    <Button submit={newTask} width="w-40" icon={airplaneIcon} type="bg-azul-escuro text-azul-clarinho hover:bg-blue-950"/>
                </div>

                <Error message={error}/>
                
                
              
                
            </div>
        </div>
    )
        
    
}