import { Title } from "@/components/Title"
import { Tasks } from "../template/Tasks"

export default function Completed(){
    return (
            <main className="flex flex-col items-center mt-14 p-5">
                
                <Title title="Completed Tasks"/>

                <div className="w-full mt-10">
                    <Tasks imgTaskEmpy="completed_empy.png" emptyText="Your completed tasks will appear here" filter="completed" />
                    
                </div>

            </main>
    )
}