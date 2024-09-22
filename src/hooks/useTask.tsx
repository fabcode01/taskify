import AuthContext from "@/context/AuthContext";
import useCloudTask from "@/context/useCloudTask";
import Task from "@/core/Task";
import { useContext, useEffect, useState } from "react";

export default function useTasks(){
    
    const[carregando, setCarregando] = useState(false)
    const{usuario} = useContext(AuthContext)
    const{addCloudTask} = useCloudTask()

    const[tasks, setTasks] = useState<any>([])

    const[allTasks, SetAllTaks] = useState()

    useEffect(()=>{
        
        const StoredTasks = localStorage.getItem('tasks')
        if(StoredTasks){
            setTasks(JSON.parse(StoredTasks))
        }

    },[])


   
    function addTask(task: Task) { 

        setCarregando(true)

        const taskObj = task.toObject()
        
        if(usuario){
            addCloudTask(taskObj)
        } 


        const updatedTasks = [...tasks, taskObj]
        setTasks(updatedTasks)

        localStorage.setItem('tasks', JSON.stringify(updatedTasks))

        setCarregando(false)
    }

    function deleteTask(id: number){
        setCarregando(true)

                const tasksLocal = localStorage.getItem('tasks')

                if(tasksLocal){

                    const tasksObj = JSON.parse(tasksLocal)
            
                    const newTask = tasksObj.filter((task: any) => task.id !== id)
                    
            
                    localStorage.setItem('tasks', JSON.stringify(newTask))
                    setTasks(newTask)
                }

        
        setCarregando(false)
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


    const[sortbyActive, setSortByActive] = useState<any>()

    function sortBy(mode: string){

        setCarregando(true)

        if(mode == 'asc'){
            localStorage.setItem('sort', 'asc')

            setSortByActive(localStorage.getItem('sort'))

            const sorted = [...tasks].sort((a: any, b: any) => {
                const dateA = new Date(a.date).getTime()
                const dateB = new Date(b.date).getTime()
    
                
                return dateB - dateA

            }
        )

            localStorage.setItem('tasks', JSON.stringify(sorted));

            

        } else{
            localStorage.setItem('sort', 'dec')

            setSortByActive(localStorage.getItem('sort'))

            const sorted = [...tasks].sort((a: any, b: any) => {
                const dateA = new Date(a.date).getTime()
                const dateB = new Date(b.date).getTime()
    
                
                return dateA - dateB  

            }
        )

            localStorage.setItem('tasks', JSON.stringify(sorted));

            

                    
        }

        setCarregando(false)

    }


    return {
        tasks,
        allTasks,
        sortbyActive,
        carregando,

        addTask,
        checkOrUncheck,
        deleteTask,
        sortBy,
        
       
    }
}