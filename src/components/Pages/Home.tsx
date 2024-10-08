import { arrowDown } from "../icons";

import { useContext, useEffect, useState } from "react";
import { Title } from "@/components/Title";
import useCloudTask from "@/hooks/useCloudTask";
import Task from "@/core/Task";
import { Tasks } from "../template/Tasks";
import { LanguageContext } from "@/context/LanguageContext";





interface HomeProps{
    taskToEdit: (task:Task)=>void
}
  

export default function Home(props: HomeProps){
    
    const{currentLanguage} = useContext(LanguageContext)

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

                <Title title={currentLanguage?.home.title}/>

                <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn flex items-center bg-azul-escuro text-azul-clarinho hover:bg-azul-medio">{currentLanguage?.home.sortby} {arrowDown}</div>

                        <ul tabIndex={0} className="bg-branco-claro w-44 relative right-0 dropdown-content menu rounded-box z-[1] p-2 shadow ">
                            <li onClick={() => sortBy("asc")} className={`${localSort == 'asc' ? 'bg-azul-escuro rounded-lg text-white' : ''}`}><a>{currentLanguage?.home.sortbyOpts.oldest}</a></li>

                            <li onClick={() => sortBy("dec")} className={`${localSort == 'dec' ? 'bg-azul-escuro rounded-lg text-white' : ''}`}><a>{currentLanguage?.home.sortbyOpts.nearest}</a></li>
                        
                        </ul>

                </div>
            </div>

            
                    <div className="mt-10 w-full">
                        {carregando ? (
                            <div>{currentLanguage?.loading}</div>
                        ):(

                        <Tasks imgTaskEmpy="empty_data.png" emptyText={currentLanguage?.home.emptyText} filter="all" taskToEdit={taskToEdit}/>
                        )}
                    </div>
               
            </main>

    )
}