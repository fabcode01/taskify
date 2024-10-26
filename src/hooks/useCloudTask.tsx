
import{setDoc, getFirestore, addDoc, collection, query, getDocs, deleteDoc, doc} from 'firebase/firestore'

import { useState } from 'react'



export default function useCloud(){

    const[carregando, setCarregando] = useState(false)

    const db = getFirestore()

    async function addCloud(userId: string, idTask: string, docColletion: string, data: any){


        try {
            setCarregando(true)

            const userDoc = doc(db, 'users', userId)
            
            const userTask = collection(userDoc, 'tasks')


            await setDoc(doc(userTask, idTask), {data})
            


        } finally {
            setCarregando(false);
        }
        
    }


    async function getCloud(userId: string, docColletion: string){

        const userDoc = doc(db, 'users', userId)

        const tasksColletion = collection(userDoc, 'tasks')

        try {
            setCarregando(true)

            const taskSnapshot = await getDocs(tasksColletion)

            const tasks = taskSnapshot.docs.map(doc => ({...doc.data().data}))

            return tasks

        }   finally {

            setCarregando(false)

        }

        
        
    }


    async function deleteCloud(docColletion: string, update: string | number){
        console.log(update);

        const docRef = doc(db, docColletion, `${update}`)
        
        try{
            setCarregando(true)
            await deleteDoc(docRef)      

        }finally{
            setCarregando(false)
        }
    }




    

    return {
        addCloud,
        getCloud,
        deleteCloud,
        carregando,
    }
}



