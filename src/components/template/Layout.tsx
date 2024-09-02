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
            return <Home/>
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
    const[showMenuTask, setShowMenuTask] = useState<boolean>(false)

 

    function MenuTaskHidden(){
        setShowMenuTask(showMenuTask === false ? true : false)
    }


    return (
        <div className="bg-branco-claro h-screen text-black">

            <MenuTask
             showMenuTask={showMenuTask} 
             hiddenMenuTask={MenuTaskHidden}/>

            <MenuAuth showMenuAuth={showMenuAuth} hiddenMenuAuth={MenuAuthShow}/>
            
            <Top showMenuAuth={MenuAuthShow}/>
            {renderizarPage()}

            <Nav iconSize={8} currentPage={currentPage} changePage={changePage} MenuTaskShow={MenuTaskHidden}/>

            
        </div>
    )
}