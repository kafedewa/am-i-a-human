import React, { useEffect, useState } from 'react'
import { useConversationContext } from '../context/ConversationContext';
import toast from 'react-hot-toast';
import { supabase } from '../supabaseClient';
import { useAuthContext } from '../context/AuthContext';
import useMessages from '../zustand/useMessages'

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const {messages, setMessages, setConvId} = useMessages();
  const {conversation} = useConversationContext();
  const {authUser} = useAuthContext();

  useEffect(() => {
    const getMessages = async () => {
        setLoading(true)

        let participants = [conversation.id, authUser.id].sort();

        try {
            const {data,error} = await supabase.from('conversations').select().contains('participants', participants).eq('isActive', 'TRUE');
            if(error) throw new Error(error.message);

            if(data.length > 0){
              const result = await supabase.from('messages').select().in('id', data[0].messages);
              if(result.error) throw new Error(result.error.message);
              setMessages(result.data);
              setConvId(data[0].id)
            }else{
              setMessages([]);
            }
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

    if(conversation?.id) getMessages()
  },[conversation?.id,setMessages])
  return {messages, loading}
}

export default useGetMessages