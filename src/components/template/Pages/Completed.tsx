
import { Tasks } from "../Tasks"
import { Title } from "@/components/Title"


export default function Completed(){

    return (
            <main className="flex flex-col items-center mt-14 p-5">
                
                <Title title="Completed Tasks"/>

                <div className="w-full">
                    <Tasks  filter="completed"/>
                </div>

   
            </main>
       
    )
}