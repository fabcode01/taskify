import { createContext, useState, useEffect } from "react";

import {English, Portugues} from '../data/Strings' 



interface LanguageContextProps {
    currentLanguage?: typeof English | typeof Portugues
    changeLanguage?: (language: Language) => void 
}

export const LanguageContext = createContext<LanguageContextProps>({

})

export function LanguageProvider(props: any){
    
    const [currentLanguage, setCurrentLanguage] = useState<typeof English | typeof Portugues>(() => {
        const language = localStorage.getItem('language');
        return language === 'Portuguese' ? Portugues : English;
    });

    useEffect(() => {
        localStorage.setItem('language', currentLanguage === Portugues ? 'Portuguese' : 'English');
    }, [currentLanguage]);

    function changeLanguage(language: Language){
        console.log(language);
        if(language == 'English'){
            setCurrentLanguage(English)
        }
        if(language == 'Portuguese'){
            setCurrentLanguage(Portugues)
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