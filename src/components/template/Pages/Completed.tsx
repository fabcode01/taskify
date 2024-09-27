
import { useContext } from "react"
import { Tasks } from "../Tasks"
import { Title } from "@/components/Title"
import { TaskContext } from "@/context/TaskContext"

export default function Completed(){

    return (
            <main className="flex flex-col items-center mt-14 p-5">
                <Title title="Completed Tasks" className="mb-8"/>

                <div className="w-full">
                    <Tasks filter="completed"/>
                </div>

   
            </main>
       
    )
}