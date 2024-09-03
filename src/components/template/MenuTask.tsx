'use client'

import { Modal } from "../Modal"
import { FormTask } from "../FormTask"
import Error from "../Error"

interface MenuTask{
    showMenuTask: boolean
    hiddenMenuTask: ()=>void
}

export function MenuTask(props: MenuTask){
 

    return (
      <Modal position="rodape" modalActive={props.showMenuTask} hiddenMenu={props.hiddenMenuTask} className="rounded-t-[43px]">
           <FormTask title="Add a new task" />
           
      </Modal>
    )
}
