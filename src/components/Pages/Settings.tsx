import { useContext, useState } from "react";
import { Hero } from "../Hero";
import { Title } from "../Title";
import { moonIcon, sunIcon } from "../icons";
import Button from "../Button";
import { Credit } from "../Credit";
import { LanguageContext } from "@/context/LanguageContext";
import { Portugues } from "../../../public/data/strings";


export default function Settings() {

    const{currentLanguage, changeLanguage, currentTheme: theme, changeTheme} = useContext(LanguageContext)



    const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        if (changeLanguage) {
            e.target.checked ? changeLanguage('English') : changeLanguage('Portuguese');
        }
        
    }

    const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if(changeTheme){
            changeTheme(e.target.checked ? 'light' : 'dark')
        }
        

    }


    const handleClearAll = () => {
        localStorage.clear()

        window.location.reload()
    }


    return (
        <div className="flex flex-col mt-5 p-5">
            <Title className="dark:text-azul-clarinho" title={currentLanguage?.settings.title} />

                <Hero title={currentLanguage?.settings.Language.title} description={currentLanguage?.settings.Language.text}>
                    
                        <label className="flex items-center gap-2 label cursor-pointer">
                            <span className="label-text font-semibold text-black ">PT-BR</span>
                            <input defaultChecked={currentLanguage == Portugues ? false : true} onChange={(e) => handleLanguageChange(e)} type="checkbox" className="toggle theme-controller bg-azul-clarinho hover:bg-azul-clarinho" />
                            <span className="label-text font-semibold text-black ">ENG</span>
                        </label>
                    
                </Hero>

                <Hero title={currentLanguage?.settings.Theme.title} description={currentLanguage?.settings.Theme.text}>
                        <label className="flex items-center gap-2 label cursor-pointer">
                            <span className="text-black label-text font-semibold">{moonIcon}</span>
                            <input defaultChecked={theme == 'light' ? true : false} onChange={(e) => handleThemeChange(e)} type="checkbox" className="toggle theme-controller bg-azul-clarinho hover:bg-azul-clarinho"/>
                            <span className="text-black label-text font-semibold">{sunIcon}</span>
                        </label>
                </Hero>

                <Hero title={currentLanguage?.settings.Clear.title} description={currentLanguage?.settings.Clear.text}>
                    <Button submit={handleClearAll} text={currentLanguage?.settings.Clear.btn} className="mt-0 bg-red-600 text-white font-semibold hover:bg-red-800"/>
                </Hero>

                <div className="mt-6">
                    <Credit />
                </div>
        </div>
    )
}