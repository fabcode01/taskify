import { useContext } from "react";
import { githubIcon } from "./icons";
import { LanguageContext } from "@/context/LanguageContext";

export function Credit() {
    const{currentLanguage} = useContext(LanguageContext)

    return (
        <div className="flex flex-col items-center gap-2">
            <h1 className="text-2xl font-bold text-azul-escuro dark:text-azul-clarinho">Taskify</h1>
            <div className="flex items-center gap-2 dark:text-azul-clarinho">
                <p>{currentLanguage?.credits} <a href="https://github.com/fabcode01" target="_blank" className="text-blue-500 hover:text-blue-700">Fabricio Silva</a></p>
                <span className="text-xl">{githubIcon}</span>
            </div>
        </div>
    )
}