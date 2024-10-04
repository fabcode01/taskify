import { useState } from "react";
import { Hero } from "../Hero";
import { Title } from "../Title";
import { moonIcon, sunIcon } from "../icons";
import Button from "../Button";
import { Credit } from "../Credit";

type Language = "English" | "Portuguese"
type Theme = "Light" | "Dark"


export default function Settings() {

    const [language, setLanguage] = useState<Language>("English")

    const [theme, setTheme] = useState<Theme>("Light")

    const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLanguage(e.target.checked ? 'Portuguese' : 'English')
        console.log(language);
    }

    const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTheme(e.target.checked ? 'Dark' : 'Light')
        console.log(theme);
    }


    return (
        <div className="flex flex-col mt-8 p-5">
            <Title title="Settings" />

                <Hero title="Language" description="App language">
                    
                        <label className="flex items-center gap-2 label cursor-pointer">
                            <span className="label-text font-semibold">PT-BR</span>
                            <input defaultChecked={false} onChange={(e) => handleLanguageChange(e)} type="checkbox" className="toggle theme-controller bg-black hover:bg-azul-escuro" />
                            <span className="label-text font-semibold">ENG</span>
                        </label>
                    
                </Hero>

                <Hero title="Theme" description="Change app theme">
                        <label className="flex items-center gap-2 label cursor-pointer">
                            <span className="label-text font-semibold">{moonIcon}</span>
                            <input defaultChecked={false} onChange={(e) => handleThemeChange(e)} type="checkbox" className="toggle theme-controller bg-black hover:bg-azul-escuro" />
                            <span className="label-text font-semibold">{sunIcon}</span>
                        </label>
                </Hero>

                <Hero title="Clear" description="Clear all data">
                    <Button text="Clear" className="mt-0 bg-red-600 text-white font-semibold hover:bg-red-800"/>
                </Hero>

                <div className="mt-6">
                    <Credit />
                </div>
        </div>
    )
}