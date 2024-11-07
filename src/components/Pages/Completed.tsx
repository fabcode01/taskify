import { Title } from "@/components/Title"
import { Tasks } from "../template/Tasks"
import { useContext } from "react"
import { LanguageContext } from "@/context/LanguageContext"

export default function Completed(){
    
    const{currentLanguage} = useContext(LanguageContext)

    return (
            <main className="flex flex-col items-center mt-14 p-5">
                
                <Title title={currentLanguage?.completed.title}/>

                <div className="w-full mt-10">
                    <Tasks imgTaskEmpy="completed_empy.png" emptyText={currentLanguage?.completed.emptyText} filter="completed" />
                    
                </div>

            </main>
    )
}