'use client'

import { useState } from "react";
import Nav, { Pages } from "./Nav";
import Top from "./Top";
import Home from "./Pages/Home";
import Updates from "./Pages/Updates";
import Pending from "./Pages/Pending";
import Settings from "./Pages/Settings";

export default function Layout(){
    const[currentPage, setCurrentPage] = useState<'home' | 'pending' | 'updates' | 'settings'>('home')

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

    return (
        <div className="bg-[#F8F8F8] h-screen">

            <Top/>
            {renderizarPage()}

            <Nav iconSize={9} currentPage={currentPage} changePage={changePage}/>
        </div>
    )
}