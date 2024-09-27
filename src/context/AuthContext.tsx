import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, onIdTokenChanged, signInWithPopup, User } from "firebase/auth";
import {auth} from '@/firebase/config'
import Usuario from "@/model/Usuario";
import Cookies from 'js-cookie';



interface AuthContextProps {
    usuario?: Usuario | null;
    carregando?: boolean;
    loginGoogle?: () => Promise<void>;
    loginEmail?: (email: string, password: string) => Promise<void>;
    cadastrar?: (email: string, password: string) => Promise<void>;
    logout?: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({})


async function userNormalizado (usuarioFirebase: User): Promise<Usuario>{

    const keyAdmins = {
        admin: 'fabricio.gamer45@gmail.com'
    }

    const token = await usuarioFirebase.getIdToken();

    return {
      uid: usuarioFirebase.uid,
      nome: usuarioFirebase.displayName ?? '',
      email: usuarioFirebase.email ?? '',
      token,
      provider: usuarioFirebase.providerData[0].providerId,
      image: usuarioFirebase.photoURL ?? '',
      admin: usuarioFirebase.email == keyAdmins.admin ? true : false
    }
}

export function AuthProvider(props: any) {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [carregando, setCarregando] = useState(true);

    
    

    async function configurarSessao(usuarioFirebase: User | null) {
        if (usuarioFirebase?.email) {
            const usuario = await userNormalizado(usuarioFirebase);
            gerenciarCookie(true);
            setUsuario(usuario);
            setCarregando(false);
            return usuario.email;
        } else {
            setUsuario(null);
            gerenciarCookie(false);
            setCarregando(false);
            return false;
        }
    }

    async function loginGoogle() {
        
        try {
            setCarregando(true);

            
            const provider = new GoogleAuthProvider();

            const resp = await signInWithPopup(auth, provider);

            await configurarSessao(resp.user)

            
        } catch (error) {
            console.error("Erro no login com Google:", error);
        } finally {
            setCarregando(false);
        }
    }

    async function logout(){
        try {
            setCarregando(true)
            await auth.signOut()
            await configurarSessao(null)

        }finally{
            setCarregando(false)
        }
    }

 useEffect(()=>{
    if(Cookies.get('admin-template-auth')){
        
        const cancelar = onIdTokenChanged(auth, configurarSessao)

        return ()=> cancelar()
    }else{
        setCarregando(false)
    }
 },[])

    function gerenciarCookie(logado: boolean){
        if(logado){
            Cookies.set('admin-template-auth', `${logado}`, {
                expires: 7
            })
        }else{
           Cookies.remove('admin-template-auth')
        }
    }   


    return (
        <AuthContext.Provider value={{
            usuario,
            carregando,
            loginGoogle,
            logout
           
        }}>
            {props.children}
        </AuthContext.Provider>
    )
    
    

  
}

export default AuthContext





