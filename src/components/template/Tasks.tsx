import useTasks from "@/hooks/useTask"
import { checkIcon, educationIcon, elipsisVerticalIcon, financeIcon, healthIcon, personalIcon, xIcon } from "../icons"

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

        if(tasks.length == 0){
            return <div className="flex justify-center items-center">
                <div className="flex items-center gap-2">Clique no 
                    <div className="flex items-center justify-center h-10 w-10 bg-azul-escuro text-white p-2 rounded-md">+</div> 
                para adicionar uma nova tarefa!</div>
            </div>
        }else{
            return tasks.map((task: any, index: number) => (
                <div key={index} className={
                    "flex justify-between bg-branco-cinzinha p-6 rounded-md"
                    
                    }>
                    <span className="text-azul-clarinho">{typeSelect(task.type)}</span>
                    <span>{task.description}</span>
                    <div className="flex">
                        {task.completed ? (

                            <span className="text-red-600 cursor-pointer">{xIcon}</span>
                        ): (
                            <span className="text-green-600 cursor-pointer">{checkIcon}</span>
                        )}
                        <span className="cursor-pointer">{elipsisVerticalIcon}</span>
                    </div>
                </div>
            ));
        }
    
        
    }

    return (
        <div className={`taskContainer flex flex-col gap-5 overflow-auto pb-16`}>
            {renderTasks()}
        </div>
    );
}
