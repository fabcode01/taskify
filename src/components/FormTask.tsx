'use client'

import { useContext, useEffect, useState } from "react"
import Button from "./Button"
import { airplaneIcon } from "./icons"
import Input from "./Input"
import Error from "./Error"
import Task from "@/core/Task"
import { TaskContext } from "@/context/TaskContext"
import { LanguageContext } from "@/context/LanguageContext"




interface FormTask{
    title?: string
    value?: any
    taskToEdit?: any
    clearForm: boolean
    closeModal?:  ()=>void

}

export function FormTask(props: FormTask){

    const{currentLanguage} = useContext(LanguageContext)
    const{addTask} = useContext(TaskContext)


    const[description, setDescription] = useState('')
    const[id, setId] = useState<string | number> (0)
    const[date, setDate] = useState<string | number>('')
    const[type, setType] = useState('')
    const[error, setError] = useState<string | undefined>('')

    

    function newTask(){

        

        if(!type || !date ||  !description){
            setError(currentLanguage?.errorTask)
            setTimeout(()=>{
                setError('')
            },4000)
        }else{
            
            const task = new Task(id, type, description, date, false)
            
            addTask && addTask(task)

            props.closeModal && props.closeModal()

        }

    }


    // Setar valores para serem editados
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

// Limpar Inputs FormTask ao fechar modal MenuTask 
    useEffect(()=>{
        setId('')
        setDate('')
        setDescription('')
    },[props.clearForm])



    return (
        <div>
             <h1 className="font-bold text-2xl">{props.title}</h1>
            <div className="flex flex-col items-center">
               
            <select value={type} required onChange={e => setType(e.target.value)} className="select w-2/3 border-2 border-black mt-5 bg-white rounded-lg focus:outline-none focus:border-black  bg-transparent">

                    <option selected disabled>
                        {currentLanguage?.TaskModal.Categorys.default}
                    </option>

                    <option>
                        {currentLanguage?.TaskModal.Categorys.finance}
                    </option>

                    <option>
                        {currentLanguage?.TaskModal.Categorys.personal}
                    </option>

                    <option>
                        {currentLanguage?.TaskModal.Categorys.education}
                    </option>
                    
                    <option>
                        {currentLanguage?.TaskModal.Categorys.health}
                    </option>

            </select>
                <Input value={description} required inputType="text" 
                placeholder={currentLanguage?.TaskModal.descriptionPlaceholder} onChange={setDescription}/>

                <Input  value={date} inputType="date" onChange={setDate}/>

                <div className="flex">
                    
                    <Button submit={newTask} width="w-40" icon={airplaneIcon} type="bg-azul-escuro text-azul-clarinho hover:bg-blue-950"/>
                </div>

                <Error message={error}/>
                
            </div>
        </div>
    )
        
    
}