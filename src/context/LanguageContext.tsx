import { createContext, useState, useEffect } from "react";

import {English, Portugues} from '../../public/data/strings' 

interface LanguageContextProps {
    currentLanguage?: typeof English | typeof Portugues
    changeLanguage?: (language: Language) => void
    currentTheme?: Theme 
    changeTheme?: (theme: Theme) => void
}

export const LanguageContext = createContext<LanguageContextProps>({
    
})

export function LanguageProvider(props: any){
    
    const [currentLanguage, setCurrentLanguage] = useState<typeof English | typeof Portugues>();

    useEffect(()=>{
        const language = localStorage.getItem('language');
        setCurrentLanguage(language == 'Portuguese' ? Portugues : English)

    },[])


    function changeLanguage(language: Language){

        if(language == 'English'){
            setCurrentLanguage(English)
            localStorage.setItem('language', 'English')
        }
        if(language == 'Portuguese'){
            setCurrentLanguage(Portugues)
            localStorage.setItem('language', 'Portuguese')
        }
    }






    const [currentTheme, setCurrentTheme] = useState<Theme>();

    useEffect(()=>{
        const theme = localStorage.getItem('theme');
        setCurrentTheme(theme == 'dark' ? 'dark' : 'light')

    },[])


    function changeTheme(Theme: Theme){

        if(Theme == 'light'){
            setCurrentTheme('light')
            localStorage.setItem('theme', 'light')
        }
        if(Theme == 'dark'){
            setCurrentTheme('dark')
            localStorage.setItem('theme', 'dark')
        }
    }

    return (
        <LanguageContext.Provider value={{ 
            currentLanguage, 
            changeLanguage,
            
            currentTheme,
            changeTheme

        }}>
            {props.children}
        </LanguageContext.Provider>
    )
}