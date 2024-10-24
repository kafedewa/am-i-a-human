import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { supabase } from '../supabaseClient';
import { useAuthContext } from '../context/AuthContext';

const useGetConversations = () => {
  const [loading,setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const {authUser} = useAuthContext();

  useEffect( () => {
    const getConversations = async () => {
        setLoading(true);
        try {
            const {data,error} = await supabase.from('conversations').select().contains('participants', [authUser.id]).eq('isActive', 'FALSE').order('created_at');

            if(error){
                throw new Error(error.message);
            }
            setConversations(data);
        } catch (error) {
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }
    getConversations();
  },[]);
  return {loading, conversations};
}

export default useGetConversations