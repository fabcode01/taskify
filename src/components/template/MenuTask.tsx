'use client'

import { Modal } from "../Modal"
import { FormTask } from "../FormTask"
import { useEffect, useState } from "react"

interface MenuTask{
    showMenuTask: boolean 
    hiddenMenuTask?: ()=>void
    taskToEdit?: any
    clearForm?: ()=>void
}

export function MenuTask(props: MenuTask){

    const[clearForm, setClearForm] = useState<boolean>(false)

    function clearFormAndHidden(){

      props.hiddenMenuTask && props.hiddenMenuTask()

      setClearForm(clearForm == true ? false : true)
    }

    function hiddenAndClear(){
      props.hiddenMenuTask && props.hiddenMenuTask() 
      setClearForm(clearForm == true ? false : true)
    }


    return (
      <Modal position="rodape" modalActive={props.showMenuTask} hiddenMenu={clearFormAndHidden} className="rounded-t-[43px]">
           <FormTask closeModal={hiddenAndClear} title="Add a new task" clearForm={clearForm} taskToEdit={props.taskToEdit}/>
           
      </Modal>
    )
}
