
import{setDoc, getFirestore, addDoc, collection} from 'firebase/firestore'
import AuthContext from './AuthContext'
import { useContext, useState } from 'react'



export default function useCloudTask(){

    const[carregando, setCarregando] = useState(false)
    
    const{usuario} = useContext(AuthContext)

    const db = getFirestore()

    async function addCloudTask(task: any){
        console.log(task);
        
        try {

            setCarregando(true)

            const docRef = await addDoc(collection(db, `${usuario?.uid}-Tasks`),{
                type: task.type,
                description: task.description,
                date: task.date,
                completed: task.completed
            })
    
            
            await setDoc(docRef, {id: docRef.id}, {merge: true})
        }finally {
            setCarregando(false)
        }
        
        
    }

    return {
        addCloudTask,
        carregando
    }
}


