import Task from "@/core/Task";
import { createContext, useEffect, useState } from "react";

interface TaskContextProps {
    allTask?: Task[];
    taskEdit?:Task
    addTask?: (task: Task) => void;
    editTask?: (task: Task) => void;
    deleteTask?: (id: number) => void;
    checkOrUncheck?: (id: number) => void
}

export const TaskContext = createContext<TaskContextProps>({})


export function TaskProvider(props: any){

    const[allTask, setAllTask] = useState<any>([])

    useEffect(()=>{
        const StoredTasks = localStorage.getItem('tasks')

        if(StoredTasks){
            setAllTask(JSON.parse(StoredTasks))
        }
    },[])


   

    function addTask(task: Task){
        const taskObj = task.toObject()
       
        const existingTaskIndex = allTask.findIndex((t: any) => t.id == taskObj.id);
        
        if (existingTaskIndex !== -1) {
            // Atualizar Task
            const updatedTasks = [...allTask];
            updatedTasks[existingTaskIndex] = taskObj;
            setAllTask(updatedTasks);
            salvarLocalmente(updatedTasks);
            return;
        } else{
            // Adicionar nova task
            taskObj.id = Math.random()
            
            const updateTask = [...allTask, taskObj]

            setAllTask(updateTask)
    
            salvarLocalmente(updateTask)
        }
        
    }

    function deleteTask(id: number){

        const updateTask = allTask.filter((task:any) => task.id != id)

        setAllTask(updateTask)
        
        salvarLocalmente(updateTask)
       
    }


    function checkOrUncheck(id: number) {

        const updatedTasks = allTask.map((task: any) => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });

        setAllTask(updatedTasks);

        salvarLocalmente(updatedTasks);
    }




    function salvarLocalmente(updateTask:any[]){

        localStorage.setItem('tasks', JSON.stringify(updateTask))
    }


    return (
        <TaskContext.Provider value={{
            allTask,
            addTask,
            deleteTask,
            checkOrUncheck,
          
        }}>
            {props.children}
        </TaskContext.Provider>
    )
}