import useTasks from "@/hooks/useTask"
import { checkIcon, educationIcon, elipsisVerticalIcon, financeIcon, healthIcon, personalIcon, xIcon } from "../icons"
import { useState } from "react";


interface TasksProps{}

export function Tasks(props: TasksProps){

    const { update, tasks, checkOrUncheck, deleteTask } = useTasks();

    const [translateTaskId, setTranslateTaskId] = useState<string | null>(null);

    function taskDelete(taskId: any) {
        
        // setTranslateTaskId(taskId);

        deleteTask(taskId);
    
       
    }

    function typeSelect(type: string) {
        switch (type) {
            case 'Finance':
                return financeIcon;
            case 'Personal':
                return personalIcon;
            case 'Education':
                return educationIcon;
            case 'Health':
                return healthIcon;
            default:
                return null;
        }
    }

    function renderTasks() {

        if (tasks.length === 0) {
            return (
                <div></div>
                // <div className="flex flex-col items-center">
                //     <h1>Adicione uma nova tarefa!</h1>
                //     <div className="flex items-center gap-2">
                //         <p>Clique no</p>
                //         <p className="flex justify-center items-center bg-azul-escuro w-5 h-5 text-white rounded-md">+</p>
                //         <p>abaixo.</p>
                //     </div>
                // </div>
            );
        } else {
            return tasks.map((task: any, index: any) => (
                <div key={task.id} className={
                    `relative duration-150 flex items-center justify-between ${
                        translateTaskId === task.id ? 'opacity-0' : ''
                    } ${task.completed === false ? 'bg-branco-cinzinha' : 'bg-green-200'} p-6 rounded-md`
                }>
                    <span className="text-azul-clarinho">{typeSelect(task.type)}</span>
                    <span>{task.description}</span>
                    <div className="flex items-center">
                        {task.completed === true ? (
                            <span onClick={() => checkOrUncheck(task.id)} className="text-red-600 cursor-pointer active:scale-110">
                                {xIcon}
                            </span>
                        ) : (
                            <span onClick={() => checkOrUncheck(task.id)} className="text-green-600 cursor-pointer active:scale-110">
                                {checkIcon}
                            </span>
                        )}

                        <div className="dropdown cursor-pointer">
                            <div tabIndex={0} role="button" className="m-1 bg-transparent border-none text-black active:scale-110">
                                {elipsisVerticalIcon}
                            </div>
                            <ul className="flex flex-col items-center gap-2 relative right-5 menu dropdown-content bg-branco-claro rounded-box z-[1] p-4 w-40">
                                <button className="bg-branco-cinzinha text-base hover:bg-azul-escuro w-full hover:text-white rounded-md p-2">
                                    <a><span>Edit</span></a>
                                </button>
                                <button className="bg-branco-cinzinha text-base hover:bg-red-700 w-full hover:text-white rounded-md p-2" onClick={() => taskDelete(task.id)}>
                                    <a><span>Delete</span></a>
                                </button>
                            </ul>
                        </div>
                    </div>
                </div>
            ));
        }
    }

    return (
        <div className="taskContainer flex flex-col gap-5">
            
            {renderTasks()}
        </div>
    );
}
