"use client";

import { useContext, useEffect, useState } from "react";
import Nav, { Pages } from "./Nav";
import Top from "./Top";
import Home from "./Pages/Home";
import Updates from "./Pages/Updates";
import Completed from "./Pages/Completed";
import Settings from "./Pages/Settings";
import { MenuAuth } from "./MenuAuth";
import { MenuTask } from "./MenuTask";
import { TaskContext } from "@/context/TaskContext";
import Task from "@/core/Task";
import AuthContext from "@/context/AuthContext";
import { logoTaskify } from "../icons";

interface LayoutProps {
  children?: any;
}

export default function Layout(props: LayoutProps) {

  const{carregando:loadingAuth} = useContext(AuthContext)


  const [currentPage, setCurrentPage] = useState<Pages | string>("");

  function changePage(page: Pages) {
    setCurrentPage(page);
    localStorage.setItem('page', page)
  }

  useEffect(() => {

    const lastPage = localStorage.getItem("page") ? localStorage.getItem("page") : 'home'
    
    if(lastPage){
        setCurrentPage(lastPage)
    }else {
        setCurrentPage('home')
        localStorage.setItem('page', currentPage)
      
    }



  }, []);


  function renderizarPage() {
    if (currentPage == "home") {
      
      return <Home taskToEdit={taskEdit}/>;
    } else if (currentPage == "updates") {
      
      return <Updates />;
    } else if (currentPage == "completed") {
    
      return <Completed />;
    } else if (currentPage == 'settings'){

      return <Settings />;
    }
  }

  // controle modal auth
  const [showMenuAuth, setShowMenuAuth] = useState<boolean>(false);

  function MenuAuthShow() {
    setShowMenuAuth(showMenuAuth ? false : true);
  }

  //controle modal nova task
  const [showMenuTask, setShowMenuTask] = useState<true | false>(false);

  function MenuTaskHidden() {
    setShowMenuTask(showMenuTask === false ? true : false);
  }



  const[editData, setEditData] = useState<Task>()
  function taskEdit(task: Task){
      setShowMenuTask(true)

      setEditData(task)
      
  }


  
  return !loadingAuth ? (
    <div className="layout text-black">
    <MenuTask
      showMenuTask={showMenuTask}
      hiddenMenuTask={MenuTaskHidden}
      taskToEdit={editData}
    />

    <MenuAuth
      showMenuAuth={showMenuAuth}
      hiddenMenuAuth={MenuAuthShow}
    />

    <Top showMenuAuth={MenuAuthShow} />
    {renderizarPage()}

    <Nav
      iconSize={8}
      currentPage={currentPage}
      changePage={changePage}
      MenuTaskShow={MenuTaskHidden}
    />
  </div>
         
      
  ) : (
    <div className="h-screen flex justify-center items-center animate-pulse rounded-full">
      {logoTaskify(88)}
    </div>
  );
}


