
import { useEffect, useState } from "react";

export default function useTasks(){
    const[tasks, setTasks] = useState<any>([])

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

    function CheckOrUncheck(id: number){
        
       const updateTasks = [...tasks]

       const taskIndex = updateTasks.findIndex((task)=> task.id === id)


       if(taskIndex !== -1){
        updateTasks[taskIndex].completed = !updateTasks[taskIndex].completed

        setTasks(updateTasks)
        localStorage.setItem('tasks', JSON.stringify(updateTasks))


       }
    }

    function deleteTask(id: number){
        
        
        const updateTasks = [...tasks]

       const newTaks = updateTasks.filter((task) => task.id !== id)
        
    
        
        setTasks(newTaks)

        localStorage.setItem('tasks', JSON.stringify(newTaks))

    }

    


    


    return {
        tasks,
        setLocalTask,
        CheckOrUncheck,
        deleteTask
    }
}