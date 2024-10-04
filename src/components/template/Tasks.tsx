'use client'

import { checkIcon, educationIcon, elipsisVerticalIcon, financeIcon, healthIcon, personalIcon, xIcon } from "../icons"
import { useContext } from "react";
import { TaskContext } from "@/context/TaskContext";
import Task from "@/core/Task";
import Image from "next/image";


interface TasksProps{

    filter?: 'all' | 'completed'

    taskToEdit?: (task: Task) => void

    emptyText: string

    imgTaskEmpy: string

    className?:string
   
}

export function Tasks(props: TasksProps){

    const { allTask, deleteTask, checkOrUncheck } = useContext(TaskContext)


    function typeSelect(type: string) {
        switch (type) {
            case 'Finance':
                return financeIcon;
            case 'Personal':
                return personalIcon;
            case 'Education':
                return educationIcon;
            case 'Health':
                return healthIcon;
            default:
                return null;
        }
    }

    function editTask(task: Task){
        
        props.taskToEdit && props.taskToEdit(task)
        
    }


    function renderEmptyTasks(){
        return (
            <div className="opacity-25 flex flex-col justify-center items-center gap-2 h-[200px] mt-10">
              <Image className="opacity-40" width={250} height={0} src={`/images/${props.imgTaskEmpy}`} alt="empty"/>
              <p>{props.emptyText}</p>
            </div>
        )
    }


    function renderTasks() {
        
            const mode = props.filter == 'all' ?  false : true 

            
            
                return allTask && allTask
                    .filter((item:any) => item.completed == mode)
                    .map((task:any) => (
                        <div key={task.id}>

                        <div className="relative -bottom-3 flex">
                            <span className={`bg-azul-escuro p-3 rounded-lg text-white ${task.completed === false ? 'bg-azul-escuro' : 'bg-green-400'}`}>  {task.date}
                            </span>
                        </div>

                        <div key={task.id} className={
                            `relative duration-150 flex items-center justify-between
                            ${task.completed === false ? 'bg-branco-cinzinha' : 'bg-green-200'} p-6 rounded-md`
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
                                       
                                        <button className="bg-branco-cinzinha text-base hover:bg-red-700 w-full hover:text-white rounded-md p-2" onClick={() => deleteTask?.(task.id)}>
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
        <div className="taskContainer flex flex-col gap-5">
                {props.filter == 'all' && allTask?.length === 0 ? renderEmptyTasks() : renderTasks()}
                {props.filter == 'completed' && allTask?.filter(item => item.completed == true).length == 0 ? renderEmptyTasks() : ''}
        </div>
    );
}
