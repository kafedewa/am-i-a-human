import React from 'react'
import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import {supabase} from '../supabaseClient'
import useConversation from '../zustand/useConversation';



const useLogout = () => {
    const [loading, setLoading] = useState(false);

    const {setAuthUser} = useAuthContext();
    const {setMessages, setSelectedConversation} = useConversation();


    const logout = async () => {
        setLoading(true);
        try {
            const { error } = await supabase.auth.signOut()

            if(error){
                throw new Error(error.message);
            }

            setAuthUser(null);
            setMessages([]);
            setSelectedConversation(null);
        } catch (error) {
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }
    return {loading,logout}
}

export default useLogout