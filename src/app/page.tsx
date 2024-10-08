'use client'


import Layout from "@/components/template/Layout";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { TaskProvider } from "@/context/TaskContext";
import useDriver from '@/hooks/useDriver'
import { useEffect } from "react";


export default function Home() {
  
  const {initDriver} = useDriver()

  useEffect(()=>{
    const tutorial = localStorage.getItem('tutorial')
    
    if(!tutorial){
      initDriver()
      localStorage.setItem('tutorial', 'true')
    } 

  },[initDriver])

  return (
  <LanguageProvider>
    <TaskProvider>
      <AuthProvider>
                <Layout>
    
                </Layout>
      </AuthProvider>
    </TaskProvider>
  </LanguageProvider>
    
  

  );
}
