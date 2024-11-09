'use client'

import { checkIcon, educationIcon, elipsisVerticalIcon, financeIcon, healthIcon, personalIcon, xIcon } from "../icons"
import { useContext, useEffect, useState } from "react";
import { TaskContext } from "@/context/TaskContext";
import Task from "@/core/Task";
import Image from "next/image";
import useCloud from "@/hooks/useCloudTask";
import AuthContext from "@/context/AuthContext";



interface TasksProps{

    filter?: 'all' | 'completed'

    taskToEdit?: (task: Task) => void

    emptyText: string | undefined

    imgTaskEmpy: string

    className?:string
   
}

export function Tasks(props: TasksProps){

    const{usuario} = useContext(AuthContext)
    
    const { allTask, deleteTask: deleteLocal, checkOrUncheck, setTask } = useContext(TaskContext)
    
    const{addCloud, getCloud, deleteCloud} = useCloud()

    // ================================



    // =================================

    function deleteTask(id: number){
        if(usuario){
            deleteCloud(usuario.uid, id)
        }

        deleteLocal && deleteLocal(id)
    }

    function typeSelect(type: string) {
        switch (type) {
            case 'Finance' || 'Finança':
                return financeIcon;
            case 'Personal' || 'Pessoal':
                return personalIcon;
            case 'Education' || 'Educação':
                return educationIcon;
            case 'Health' || 'Saúde':
                return healthIcon;
            default:
                return null;
        }
    }

    function editTask(task: Task){
        
        props.taskToEdit && props.taskToEdit(task)
        
    }


   useEffect(()=>{

    if(usuario){

        const userId = usuario.uid
        allTask && allTask.forEach((data: any) => addCloud(userId, `${data.id}`, 'tasks', data))
    }
        
    },[usuario])

    

    useEffect(() => {
        if (usuario) {
            const userId = usuario.uid;
            getCloud(userId, 'tasks').then((data: any) => {
                setTask && setTask(data);
            });
        }
    }, [usuario]);

    function renderEmptyTasks(){
        return (
            <div className="opacity-25 flex flex-col justify-center items-center gap-2 h-[200px] mt-10">
              <Image width={250} height={0} src={`/images/${props.imgTaskEmpy}`} alt="empty"/>
              <p className="dark:text-azul-clarinho">{props.emptyText}</p>
            </div>
        )
    }



    function renderTasks() {
        
        
            const mode = props.filter == 'all' ?  false : true 

            if (mode === false && allTask?.every((item: any) => item.completed === true)) {
                return renderEmptyTasks();
            }

            

            return allTask && allTask
                .filter((item:any) => item.completed == mode)
                .map((task:any) => (
                    <div key={task.id} className="w-full max-w-[850px] mx-auto">

                        <div className="relative -bottom-3 flex">
                            <span className={`bg-azul-escuro p-3 rounded-lg text-white ${task.completed === false ? 'bg-azul-escuro' : 'bg-green-400'}`}>  {task.date}
                            </span>
                        </div>

                        <div key={task.id} className={
                            `relative flex items-center h-22 justify-between lg:h-32
                            ${task.completed === false ? 'bg-branco-cinzinha' : 'bg-green-200'} p-6 rounded-md anime`
                        }>
                        
                            <span className="text-azul-clarinho">{typeSelect(task.type)}</span>
                          
                            <span>{task.description}</span>
                            
                            <div className="flex items-center">
    
                                {task.completed === true ? (
                                    <span onClick={() => checkOrUncheck?.(task.id)} className="text-red-600 cursor-pointer active:scale-110">
                                        {xIcon}
                                    </span>
                                ) : (
                                    <span onClick={() => checkOrUncheck?.(task.id)} className="text-green-600 cursor-pointer active:scale-110">
                                        {checkIcon}
                                    </span>
                                )}
    
                                <div className="dropdown cursor-pointer">
                                    <div tabIndex={0} role="button" className="m-1 bg-transparent border-none text-black active:scale-110">
                                        {elipsisVerticalIcon}
                                    </div>
    
                                    <ul className="flex flex-col items-center gap-2 relative right-5 menu dropdown-content bg-branco-claro rounded-box z-[1] p-4 w-40">
    
                                        {mode === false ? (
                                            <button className="bg-branco-cinzinha text-base hover:bg-azul-escuro w-full hover:text-white rounded-md p-2"
                                            onClick={() => editTask(task)}>
                                                <a><span>Edit</span></a>
                                            </button>
                                        ):''}
                                       
                                        <button className="bg-branco-cinzinha text-base hover:bg-red-700 w-full hover:text-white rounded-md p-2" onClick={() => deleteTask(task.id)}>
                                            <a><span>Delete</span></a>
                                        </button>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))  
                
        
            
        }


    return (
        <div className="taskContainer flex flex-col gap-5  ">
                {props.filter == 'all' && allTask?.length === 0 ? renderEmptyTasks() : renderTasks()}

                {props.filter == 'completed' && allTask?.filter((item:any) => item.completed == true).length == 0 ? renderEmptyTasks() : ''}
        </div>
    );
}
