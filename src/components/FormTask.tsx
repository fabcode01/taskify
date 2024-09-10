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
    value?: any
    taskToEdit?: any
    clearForm: string 

}

export function FormTask(props: FormTask){

    const[description, setDescription] = useState('')
    const[id, setId] = useState(Math.random())
    const[date, setDate] = useState('')
    const[type, setType] = useState('Finance')
    const[error, setError] = useState('')


    useEffect(()=>{
      editTask(props.taskToEdit)
    },[props.taskToEdit])

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

    function editTask(task: any){

        const taskedit = task
        if(taskedit){
            
            taskedit.map((task: any)=> {
                setId(task.id)
                setDescription(task.description)
                setDate(task.date)
                setType(task.type)
        })

        }
    }

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
                    
                    <Button submit={newTask } width="w-40" icon={airplaneIcon} type="bg-azul-escuro text-azul-clarinho hover:bg-blue-950"/>
                </div>

                <Error message={error}/>
                
                
              
                
            </div>
        </div>
    )
        
    
}