
import useTasks from "@/hooks/useTask";
import { arrowDown } from "../../icons";
import { Tasks } from "../Tasks";
import { useEffect, useState } from "react";



interface HomeProps{
    editarTask: (id: any)=>void
}
  

export default function Home(props: HomeProps){

    const{ tasks, sortBy, sortbyActive } = useTasks()

    const[localSort, setLocalSort] = useState<string | null>('asc')

    useEffect(()=>{
      const item = localStorage.getItem('sort')
       setLocalSort(item)
        
    })

    function editarTasks(id: any){
        props.editarTask(id)
        
    }
    



    return (
        <main className="flex flex-col items-center mt-14 p-5">

            <div className="flex w-full items-center justify-between">
                <div>
                    <h2 className="font-semibold text-azul-medio text-xl">Tasks</h2>
                </div>
                <div className="dropdown ">
                        <div tabIndex={0} role="button" className="btn flex items-center bg-azul-escuro text-azul-clarinho hover:bg-azul-medio">sort by {arrowDown}</div>

                        <ul tabIndex={0} className="bg-branco-claro w-44 relative right-0 dropdown-content menu rounded-box z-[1] p-2 shadow ">
                            <li onClick={() => sortBy("asc")} className={`${localSort == 'asc' ? 'bg-azul-escuro rounded-lg text-white' : ''}`}><a>Oldest</a></li>

                            <li onClick={() => sortBy("dec")} className={`${localSort == 'dec' ? 'bg-azul-escuro rounded-lg text-white' : ''}`}><a>Nearest</a></li>
                        
                        </ul>

                </div>
            </div>

            
                    <div className="mt-10 w-full">
                        <Tasks editarTasks={editarTasks}/>
                    </div>
               
            </main>

    )
}