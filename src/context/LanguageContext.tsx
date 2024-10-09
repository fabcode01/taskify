import { createContext, useState, useEffect } from "react";

import {English, Portugues} from '../data/strings' 



interface LanguageContextProps {
    currentLanguage?: typeof English | typeof Portugues
    changeLanguage?: (language: Language) => void 
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

    return (
        <LanguageContext.Provider value={{ 
            currentLanguage, 
            changeLanguage 
        }}>
            {props.children}
        </LanguageContext.Provider>
    )
}