
import Task from "@/core/Task";
import { useEffect, useState } from "react";

export default function useTasks(){
    const[tasks, setTasks] = useState<any>([])
    const[update, setUpdate] = useState(0)

    

    useEffect(()=>{
        
        const StoredTasks = localStorage.getItem('tasks')
        if(StoredTasks){
            setTasks(JSON.parse(StoredTasks))
        }

    },[])


     function setLocalTask(task: Task){
        setUpdate(prev => prev + 1)

        const taskObj = task.toObject()

        let updateTasks = [...tasks, taskObj]
        
        localStorage.setItem('tasks', JSON.stringify(updateTasks))

      
    }


    function deleteTask(id: number){
                

                const tasksLocal = localStorage.getItem('tasks')

                if(tasksLocal){

                    const tasksObj = JSON.parse(tasksLocal)
            
                    const newTask = tasksObj.filter((task: any) => task.id !== id)
                    
            
                    localStorage.setItem('tasks', JSON.stringify(newTask))
                    
             
                    window.location.reload()
                }

        
            

       


    }


    function checkOrUncheck(id: number) {
        const updatedTasks = tasks.map((task:any) => 
            task.id === id 
                ? { ...task, completed: !task.completed } 
                : task
        );

        setTasks(updatedTasks);

        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    


    return {
        update,
        tasks,
        setLocalTask,
        checkOrUncheck,
        deleteTask,
    }
}