import useTasks from "@/hooks/useTask"
import { Tasks } from "../Tasks"
import { Title } from "@/components/Title"

export default function Pending(){
    const{tasks} = useTasks()

    return (
            <main className="flex flex-col items-center mt-14 p-5">
                <Title title="Pending Tasks" className="mb-8"/>

                <div className="w-full">
                    <Tasks filter="pending"/>
                </div>

   
            </main>
       
    )
}