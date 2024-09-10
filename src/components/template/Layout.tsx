'use client'

import { useState } from "react";
import Nav, { Pages } from "./Nav";
import Top from "./Top";
import Home from "./Pages/Home";
import Updates from "./Pages/Updates";
import Pending from "./Pages/Pending";
import Settings from "./Pages/Settings";
import  {MenuAuth}  from "./MenuAuth";
import  {MenuTask}  from "./MenuTask";
import useTasks from "@/hooks/useTask";





interface LayoutProps{
    children?: any
}

export default function Layout(props: LayoutProps){

    const[currentPage, setCurrentPage] = useState<Pages>('home')
    
  
    function changePage(page: Pages){
        setCurrentPage(page)
    }

   

    function renderizarPage(){
       
        if(currentPage === 'home'){
            return <Home editarTask={editarTask}/>
            
        }else if(currentPage === 'updates'){
            return <Updates/>
        }else if(currentPage === 'pending'){
            return <Pending/>
        }else{
            return <Settings/>
        }
        
    }

    // controle modal auth
    const[showMenuAuth, setShowMenuAuth] = useState<boolean>(false)

    function MenuAuthShow(){
        setShowMenuAuth(showMenuAuth ? false : true)
    }

    

    //controle modal nova task
    const[showMenuTask, setShowMenuTask] = useState<true | false>(false)

 

    function MenuTaskHidden(){
        setShowMenuTask(showMenuTask === false ? true : false)
    }




    const[taskToEdit, setTaskToEdit] = useState('')

    function editarTask(id:number){
        setShowMenuTask(true)

        const taskEdit = localStorage.getItem('tasks')
            if(taskEdit){
                const tasks = JSON.parse(taskEdit)
                const filtredTask = tasks.filter((task: any) => task.id == id)
                setTaskToEdit(filtredTask)
                

            }



    }


    return (
       
        <div className="layout text-black">
                <MenuTask
                 showMenuTask={showMenuTask}
                 hiddenMenuTask={MenuTaskHidden}
                 taskToEdit={taskToEdit}
                 />


                <MenuAuth showMenuAuth={showMenuAuth} hiddenMenuAuth={MenuAuthShow}/>
            
                <Top showMenuAuth={MenuAuthShow}/>
                    {renderizarPage()}
            
                <Nav  iconSize={8} currentPage={currentPage} changePage={changePage} MenuTaskShow={MenuTaskHidden}/>
            
        </div>
      
    )
}