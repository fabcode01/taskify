import { githubIcon } from "./icons";

export function Credit() {
    return (
        <div className="flex flex-col items-center gap-2">
            <h1 className="text-2xl font-bold text-azul-escuro">Taskify</h1>
            <div className="flex items-center gap-2">
                <p>Developed by <a href="https://github.com/fabcode01" target="_blank" className="text-blue-500 hover:text-blue-700">Fabricio Silva</a></p>
                <span className="text-xl">{githubIcon}</span>
            </div>
        </div>
    )
}