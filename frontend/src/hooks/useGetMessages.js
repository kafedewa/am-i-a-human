import React, { useEffect, useState } from 'react'
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';
import { supabase } from '../supabaseClient';
import { useAuthContext } from '../context/AuthContext';

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const {messages, setMessages, selectedConversation} = useConversation();
  const {authUser} = useAuthContext();

  useEffect(() => {
    const getMessages = async () => {
        setLoading(true)

        let participants = [selectedConversation.id, authUser.sub].sort();

        try {
            const {data,error} = await supabase.from('conversations').select('messages').contains('participants', participants);
            if(error) throw new Error(error.message);

            if(data.length > 0){
              const result = await supabase.from('messages').select().in('id', data[0].messages);
              if(result.error) throw new Error(result.error.message);
              setMessages(result.data);
            }else{
              setMessages([]);
            }
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

    if(selectedConversation?.id) getMessages()
  },[selectedConversation?.id,setMessages])
  return {messages, loading}
}

export default useGetMessages