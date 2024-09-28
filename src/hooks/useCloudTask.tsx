
import{setDoc, getFirestore, addDoc, collection, query, getDocs, deleteDoc, doc} from 'firebase/firestore'

import { useState } from 'react'



export default function useCloud(docColletion: string){

    const[carregando, setCarregando] = useState(false)

    const db = getFirestore()

    async function addCloud(data: any){
        
        
        try {

            setCarregando(true)

            const docRef = await addDoc(collection(db, docColletion),{
               data
               
            })
    
            await setDoc(docRef, {
                id: docRef.id,
                data
            })
        }finally {
            setCarregando(false)
        }
        
        
    }


    async function getCloud(docColletion: string){

        try {
            setCarregando(true)

            const q = query(collection(db, docColletion))

            const querySnapshot = await getDocs(q)

            const newTasks = querySnapshot.docs.map(doc => doc.data())

            return newTasks
            
            

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


