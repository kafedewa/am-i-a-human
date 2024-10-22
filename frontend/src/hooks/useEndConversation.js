import React, { useEffect } from 'react'
import useMessages from '../zustand/useMessages'
import { useConversationContext } from '../context/ConversationContext';
import { supabase } from '../supabaseClient';
import { useAuthContext } from '../context/AuthContext';

const useEndConversation = () => {
    const {setConvId, isComplete} = useMessages();
    const {conversation} = useConversationContext();
    const {authUser} = useAuthContext();

    useEffect(() => {
        const endConversation = async () => {
            if(isComplete){
                try{
                    const { data, error } = await supabase
                        .from('conversations')
                        .update({ completed: 'TRUE',
                            isActive: 'FALSE'
                        })
                        .contains('participants', [conversation.id, authUser.id])
                        .eq('isActive', 'TRUE')
                        .select();

                    setConvId(data[0].id);

                    if(error){
                        throw new Error(error);
                    }
                }catch(error){
                    console.log(error.message)
                }
            }
        }

        endConversation();

    }, [isComplete])
}

export default useEndConversation