
import{setDoc, getFirestore, addDoc, collection, query, where, getDocs, DocumentData} from 'firebase/firestore'

import { useState } from 'react'



export default function useCloudTask(){

    const[carregando, setCarregando] = useState(false)

    const db = getFirestore()

    async function addCloudTask(task: any){
        console.log(task);
        
        try {

            setCarregando(true)

            const docRef = await addDoc(collection(db, 'tasks'),{
               task
               
            })
    
            
            await setDoc(docRef, {id: docRef.id}, {merge: true})
        }finally {
            setCarregando(false)
        }
        
        
    }


    async function getCloudTasks(){

        try {
            setCarregando(true)
            const q = query(collection(db, 'tasks'))

            const querySnapshot = await getDocs(q)

            const newTasks = querySnapshot.docs.map(doc => doc.data())

            return newTasks
            
            

        }   finally {

            setCarregando(false)

        }

        
        
    }




    

    return {
        addCloudTask,
        carregando,
        getCloudTasks
    }
}


