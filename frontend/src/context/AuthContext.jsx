import { createContext, useContext, useEffect, useState } from "react";
import {supabase} from '../supabaseClient'

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
}

export const AuthContextProvider = ({children}) => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(()=>{
        const getContext = async () => {
            try {
                const { data, error } = await supabase.auth.getSession();
                if(error){
                    throw new Error(error.message);
                }
                if(data.session){
                    setAuthUser(data.session.user.user_metadata);
                }   
                else{ 
                    setAuthUser(null);
                    return null;}
            } catch (error) {
                throw new Error(error.message);
            }
        }
        
        getContext();
    }, [])


    return <AuthContext.Provider value={{ authUser, setAuthUser }}>
        
        {children}
        
        </AuthContext.Provider>
}