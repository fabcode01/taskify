'use client'

import Layout from "@/components/template/Layout";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { TaskProvider } from "@/context/TaskContext";


export default function Home() {

  return (
  <LanguageProvider>
    <TaskProvider>
      <AuthProvider>
          
           <Layout/>

         
      </AuthProvider>
    </TaskProvider>
  </LanguageProvider>
    
  

  );
}
