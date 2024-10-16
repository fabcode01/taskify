import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onIdTokenChanged, signInWithEmailAndPassword, signInWithPopup, User } from "firebase/auth";
import {auth} from '@/firebase/config'
import Usuario from "@/model/Usuario";
import Cookies from 'js-cookie';
import { LanguageContext } from "./LanguageContext";



interface AuthContextProps {
    usuario?: Usuario | null;
    carregando?: boolean;
    error?: string
    changeError?: (error: any) => void 
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

    const{currentLanguage: language} = useContext(LanguageContext)

    

    


    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [carregando, setCarregando] = useState(true);


    const[error, setError] = useState('')

    function changeError(error: string | any){
        setError(error)
    }

    useEffect(()=>{
        const timeOut = setTimeout(()=>{
            setError('')
        },3000)


        return () => clearTimeout(timeOut)
    },[error])
    
    

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
            Error(`Erro no login com Google`)
            
        } finally {
            setCarregando(false);
        }
    }


    async function loginEmail(email: string, senha: string){
        try {

            setCarregando(true);
            const resp = await signInWithEmailAndPassword(auth, email, senha)
            await configurarSessao(resp.user)
            

        }
        catch (error) {
            if(String(error).includes('auth/invalid-credential')){
                changeError(language?.invalidCreditials)
            }
            
            
        } finally {
            setCarregando(false)
        }
    }

    async function cadastrar(email: string, senha: string){
        try {

            setCarregando(true);
            const resp = await createUserWithEmailAndPassword(auth, email, senha)
            await configurarSessao(resp.user)
            

        }
        catch (error) {
            if(error){
                changeError(String(error))
            }
            
            
        } finally {
            setCarregando(false)
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
            error,
            changeError,
            loginGoogle,
            loginEmail,
            cadastrar,
            logout
           
        }}>
            {props.children}
        </AuthContext.Provider>
    )
    
    

  
}

export default AuthContext





