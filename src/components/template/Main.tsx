import { arrowDown } from "../icons";

export default function Main(){
    return (
        <main className="flex items-center justify-between mt-14 p-5">
            <div>
                <h2 className="font-semibold text-azul-medio text-xl">Tasks</h2>
            </div>

            <div className="dropdown ">
                    <div tabIndex={0} role="button" className="btn flex items-center bg-azul-escuro text-azul-clarinho hover:bg-azul-medio">sort by {arrowDown}</div>

                    <ul tabIndex={0} className="relative right-0 dropdown-content menu rounded-box z-[1] p-2 shadow">
                        <li><a>Date </a></li>
                        <li><a>Completed</a></li>
                    </ul>
            </div>
            </main>

    )
}