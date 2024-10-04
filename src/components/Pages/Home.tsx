import { arrowDown } from "../icons";

import { useEffect, useState } from "react";
import { Title } from "@/components/Title";
import useCloudTask from "@/hooks/useCloudTask";
import Task from "@/core/Task";
import { Tasks } from "../template/Tasks";




interface HomeProps{
    taskToEdit: (task:Task)=>void
}
  

export default function Home(props: HomeProps){

    const{carregando} = useCloudTask('tasks')

    const[localSort, setLocalSort] = useState<string | null>('asc')

    // elevar dado para o Layout
    function taskToEdit(task: Task){
        console.log('Home');
        
        props.taskToEdit(task)
    }

    useEffect(()=>{
      const item = localStorage.getItem('sort')
       setLocalSort(item)
        
    },[])


    function sortBy(tipo: any){
        console.log('');
        
    }


    return (
        <main className="flex flex-col items-center mt-14 p-5">

            

            <div className="flex w-full items-center justify-between">
                <Title title="Tasks"/>
                <div className="dropdown ">
                        <div tabIndex={0} role="button" className="btn flex items-center bg-azul-escuro text-azul-clarinho hover:bg-azul-medio">sort by {arrowDown}</div>

                        <ul tabIndex={0} className="bg-branco-claro w-44 relative right-0 dropdown-content menu rounded-box z-[1] p-2 shadow ">
                            <li onClick={() => sortBy("asc")} className={`${localSort == 'asc' ? 'bg-azul-escuro rounded-lg text-white' : ''}`}><a>Oldest</a></li>

                            <li onClick={() => sortBy("dec")} className={`${localSort == 'dec' ? 'bg-azul-escuro rounded-lg text-white' : ''}`}><a>Nearest</a></li>
                        
                        </ul>

                </div>
            </div>

            
                    <div className="mt-10 w-full">
                        {carregando ? (
                            <div>aguarde...</div>
                        ):(

                        <Tasks filter="all" taskToEdit={taskToEdit}/>
                        )}
                    </div>
               
            </main>

    )
}