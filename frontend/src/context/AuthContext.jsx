import { createContext, useContext, useEffect, useState } from "react";
import {supabase} from '../supabaseClient'

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
}

export const AuthContextProvider = ({children}) => {
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        const getContext = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase.auth.getSession();
                if(error){
                    setLoading(false);
                    throw new Error(error.message);
                }
                if(data.session){
                    const {data:id} = await supabase.from('users').select('id').eq('auth_id', data.session.user.id);

                    let newAuthUser = data.session.user.user_metadata;
                    newAuthUser.id = id[0].id;
                    setAuthUser(newAuthUser);
                    setLoading(false);
                }   
                else{ 
                    setAuthUser(null);
                    setLoading(false);
                    return null;}
            } catch (error) {
                setLoading(false);
                throw new Error(error.message);
            }
        }
        
        getContext();
    }, [])


    return <AuthContext.Provider value={{ authUser, loading, setAuthUser }}>
        
        {children}
        
        </AuthContext.Provider>
}