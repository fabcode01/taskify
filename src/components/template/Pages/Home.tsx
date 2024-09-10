
import { arrowDown } from "../../icons";
import { Tasks } from "../Tasks";
import { useState } from "react";


interface HomeProps{
    editarTask: (id: any)=>void
}

export default function Home(props: HomeProps){

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
                        <ul tabIndex={0} className="bg-branco-claro relative right-0 dropdown-content menu rounded-box z-[1] p-2 shadow">
                            <li><a>Date </a></li>
                            <li><a>Completed</a></li>
                        </ul>
                </div>
            </div>

            
                    <div className="mt-10 w-full">
                        <Tasks editarTasks={editarTasks}/>
                    </div>
               
            </main>

    )
}