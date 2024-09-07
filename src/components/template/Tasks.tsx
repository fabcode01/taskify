import useTasks from "@/hooks/useTask"
import { checkIcon, educationIcon, elipsisVerticalIcon, financeIcon, healthIcon, personalIcon, xIcon } from "../icons"


interface TasksProps{
    
}

export function Tasks(props: TasksProps){
    

   

    const{tasks, CheckOrUncheck} = useTasks()

 
    

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
               
                
                <div key={task.id} className={
                    `anime flex items-center justify-between ${task.completed === false ? 'bg-branco-cinzinha' : 'bg-green-200'} p-6 rounded-md`
                    
                    }>
                    <span className="text-azul-clarinho">{typeSelect(task.type)}</span>
                    <span>{task.description}</span>
                    <div className="flex items-center">
                        {task.completed === true ? (

                            <span onClick={()=>CheckOrUncheck(task.id)} className="text-red-600 cursor-pointer active:scale-110">{xIcon}</span>
                        ): (
                            <span onClick={()=>CheckOrUncheck(task.id)}  className="text-green-600 cursor-pointer active:scale-110">{checkIcon}</span>
                        )}

                        <div className=" dropdown cursor-pointer">
                            <div tabIndex={0} role="button" className="m-1 bg-transparent border-none text-black active:scale-110">
                                {elipsisVerticalIcon}
                            </div>
                            <ul className="relative right-5 menu dropdown-content bg-branco-claro rounded-box z-[1] p-2">
                                <li><a>Edit</a></li>
                                <li><a>Delete</a></li>
                            </ul>
                        
                            
                        </div>
                    </div>
                </div>
            ));
        }
    
        
    }

    return (
        <div className={`taskContainer flex flex-col gap-5`}>
            {renderTasks()}
        </div>
    );
}
