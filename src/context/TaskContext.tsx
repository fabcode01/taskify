import Task from "@/core/Task";
import useCloud from "@/hooks/useCloudTask";
import { createContext, useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";

interface TaskContextProps {
    allTask?: Task[];
    taskEdit?:Task
    addTask?: (task: Task) => void;
    setTask?: (cloudTask: Task) => void; 
    editTask?: (task: Task) => void;
    deleteTask?: (id: number) => void;
    checkOrUncheck?: (id: number) => void
    orderBy?: (tipo: string) => void
}

export const TaskContext = createContext<TaskContextProps>({})


export function TaskProvider(props: any){
    const{usuario} = useContext(AuthContext)

    const[allTask, setAllTask] = useState<any>([])

    const{addCloud} = useCloud()
    

    useEffect(()=>{
        const StoredTasks = localStorage.getItem('tasks')

    
            if(StoredTasks){
                setAllTask(JSON.parse(StoredTasks))
            }
    
      
    },[])


    function setTask(cloudTask: any){

        setAllTask(cloudTask)
        
        
    }


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
         
            if(usuario?.email){
                addCloud(usuario.uid, `${taskObj.id}`, 'tasks', taskObj)

            }
            
        }

        
        
    }

    async function deleteTask(id: number){


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


  // Função para ordenar
    function orderBy(tipo: string) {
        
    const update = [...allTask]

    update.sort((a: any, b: any) => {
        const dataA = new Date(a.date); 
        const dataB = new Date(b.date); 

        if (tipo === 'asc') {
            return dataA.getTime() - dataB.getTime(); 
        } else if (tipo === 'dec') {
            return dataB.getTime() - dataA.getTime();  
        }
        
        return 0
    });

    setAllTask(update)
    
}
    


    function salvarLocalmente(updateTask:any[]){

        localStorage.setItem('tasks', JSON.stringify(updateTask))
    }




    return (
        <TaskContext.Provider value={{
            allTask,
            addTask,
            setTask,
            deleteTask,
            checkOrUncheck,
            orderBy
          
        }}>
            {props.children}
        </TaskContext.Provider>
    )
}