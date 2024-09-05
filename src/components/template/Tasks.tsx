import useTasks from "@/hooks/useTask"
import { checkIcon, educationIcon, elipsisVerticalIcon, financeIcon, healthIcon, personalIcon } from "../icons"
import { useEffect, useState } from "react"

interface TasksProps{
    
}

export function Tasks(props: TasksProps){
   

    const{tasks} = useTasks()

    function typeSelect(type: string){
        switch (type){
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

    function renderTasks(){
        return tasks.map((task: any, index: number) => (
            <div key={index} className="flex justify-between">
                <span>{typeSelect(task.type)}</span>
                <span>{task.description}</span>
                <div className="flex">
                    <span>{checkIcon}</span>
                    <span>{elipsisVerticalIcon}</span>
                </div>
            </div>
        ));
    }

    return (
        <div className="flex flex-col gap-5 overflow-auto">
            {renderTasks()}
        </div>
    );
}
