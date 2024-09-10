'use client'

import { Modal } from "../Modal"
import { FormTask } from "../FormTask"
import { useState } from "react"

interface MenuTask{
    showMenuTask: boolean
    hiddenMenuTask: ()=>void
    taskToEdit: any
    clearForm?: ()=>void
}

export function MenuTask(props: MenuTask){

    const[clearForm, setClearForm] = useState<''|'clear'>('')

    function clearFormAndHidden(){
      props.hiddenMenuTask()

      setClearForm('clear')
    }
 

    return (
      <Modal position="rodape" modalActive={props.showMenuTask} hiddenMenu={clearFormAndHidden} className="rounded-t-[43px]">
           <FormTask title="Add a new task" clearForm={clearForm} taskToEdit={props.taskToEdit}/>
           
      </Modal>
    )
}
