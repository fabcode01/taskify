import Task from "@/core/Task";
import { useEffect, useState } from "react";

export default function useTasks(){
    const[tasks, setTasks] = useState<Task[]>([])

    useEffect(()=>{
        const StoredTasks = localStorage.getItem('tasks')
        if(StoredTasks){
            setTasks(JSON.parse(StoredTasks))
        }

    },[])


    function setLocalTask(task: any){
        const taskObj = task.toObject()

        const updateTasks = [...tasks, taskObj]
        
        localStorage.setItem('tasks', JSON.stringify(updateTasks))

        setTasks(updateTasks)

      
    }


    return {
        tasks,
        setLocalTask
    }
}