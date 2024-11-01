
import{setDoc, getFirestore, collection, getDocs, deleteDoc, doc, addDoc, query} from 'firebase/firestore'

import { useState } from 'react'



export default function useCloud(){

    const[carregando, setCarregando] = useState(false)

    const db = getFirestore()

    async function addUpdate(data: any){
            try {

                setCarregando(true)
    
                const docRef = await addDoc(collection(db, 'updates'),{
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



    async function getUpdate(){

        try {

            setCarregando(true)

            const q = query(collection(db, 'updates'))

            const querySnapshot = await getDocs(q)

            const newTasks = querySnapshot.docs.map(doc => doc.data())
            console.log(newTasks);
            

            return newTasks



        }   finally {

            setCarregando(false)

        }



    }


    async function deleteUpdate(id: any){
      
            const docRef = doc(db, 'updates', id)
            
            try{
                setCarregando(true)
                await deleteDoc(docRef)      
            }finally{
                setCarregando(false)
            }
        }
    


    async function addCloud(userId: string, id: string, docColletion: string, data: any){


        try {
            setCarregando(true)

            const userDoc = doc(db, 'users', userId)
            
            const userTask = collection(userDoc, 'tasks')


            await setDoc(doc(userTask, id), {data})
            


        } finally {
            setCarregando(false);
        }
        
    }


    async function getCloud(userId: string, docColletion: string){

        const userDoc = doc(db, 'users', userId)

        const tasksColletion = collection(userDoc, docColletion)

        try {
            setCarregando(true)

            const taskSnapshot = await getDocs(tasksColletion)

            if(docColletion === 'tasks'){
                const tasks = taskSnapshot.docs.map(doc => ({...doc.data().data}))
    
                return tasks

            }else{
                return taskSnapshot.docs.map(doc => ({...doc.data()}))
            }


        }   finally {

            setCarregando(false)

        }

        
        
    }


    async function deleteCloud(userId: any, taskId: any){
        try{
            setCarregando(true)
            const userDocRef = doc(db, 'users', userId, 'tasks', `${taskId}`) 

            await deleteDoc(userDocRef)
        }finally{
            setCarregando(false)
        }
    }


    async function deleteAllTasks(userId: any){
        try{
            setCarregando(true)
            const tasksRef = collection(db, 'users', userId, 'tasks')

            const querySnapshot = await getDocs(tasksRef)

            const deletePromises = querySnapshot.docs.map(async (docSnapshot) => {

                const taskDocRef = doc(tasksRef, docSnapshot.id);
                await deleteDoc(taskDocRef);
            });

            await Promise.all(deletePromises)

        }finally{
            setCarregando(false)
        }
    }



    

    return {
        addUpdate,
        getUpdate,
        deleteUpdate,

        addCloud,
        getCloud,
        deleteCloud,

        deleteAllTasks,

        carregando,
    }
}



