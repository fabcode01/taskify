

import Task from "@/core/Task";
import { useEffect, useState } from "react";

export default function useTasks(){
    const[tasks, setTasks] = useState<any>([])

    useEffect(()=>{
        
        const StoredTasks = localStorage.getItem('tasks')
        if(StoredTasks){
            setTasks(JSON.parse(StoredTasks))
        }

    },[])


    function setLocalTask(task: Task) {
        const taskObj = task.toObject();
    
        // Obter as tasks do localStorage, ou iniciar como um array vazio se for nulo
        const localS = localStorage.getItem('tasks');
        
        const tasks = localS ? JSON.parse(localS) : [];
    
        // Verifica se já existe uma task com o mesmo id
        const taskIndex = tasks.findIndex((t: any) => t.id === taskObj.id);
    
        if (taskIndex !== -1) {
            // Se já existir, atualiza a task com os novos valores
            tasks[taskIndex] = {
                ...tasks[taskIndex],
                description: taskObj.description,
                date: taskObj.date,
                type: taskObj.type
            };
        } else {
            // Se não existir, adiciona uma nova task
            tasks.push(taskObj);
        }
    
        // Atualiza o localStorage com o novo array de tasks
        localStorage.setItem('tasks', JSON.stringify(tasks));
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


    const[sortbyActive, setSortByActive] = useState<any>()

    function sortBy(mode: string){

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

            window.location.reload()

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

            window.location.reload()

                    
        }

    }


    return {
        tasks,
        setLocalTask,
        checkOrUncheck,
        deleteTask,
        sortBy,
        sortbyActive
        
       
    }
}