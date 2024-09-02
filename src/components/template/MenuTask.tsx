'use client'

import { useState } from "react"
import  {Form}  from "../../components/FormAuth"
import { Modal } from "../Modal"
import { FormTask } from "../FormTask"

interface MenuTask{
    showMenuTask: boolean
    hiddenMenuTask: ()=>void
}

export function MenuTask(props: MenuTask){
 
 

    return (
      <Modal position="fixed bottom-0" modalActive={props.showMenuTask} hiddenMenu={props.hiddenMenuTask} className="rounded-t-[43px]">
           <FormTask title="Add a new task" />
      </Modal>
    )
}