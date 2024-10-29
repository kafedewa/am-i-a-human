import { useEffect } from 'react'
import useMessages from '../zustand/useMessages'
import { useConversationContext } from '../context/ConversationContext';
import { supabase } from '../supabaseClient';
import { useAuthContext } from '../context/AuthContext';
import {useSocketContext} from '../context/SocketContext'

const useEndConversation = () => {
    const {isComplete} = useMessages();
    const {conversation} = useConversationContext();
    const {authUser} = useAuthContext();
    const {socket} = useSocketContext();

    useEffect(() => {
        const endConversation = async () => {
            if(isComplete){
                try{
                    const { error } = await supabase
                        .from('conversations')
                        .update({ completed: 'TRUE',
                            isActive: 'FALSE'
                        })
                        .contains('participants', [conversation.id, authUser.id])
                        .eq('isActive', 'TRUE');

                    socket.emit('endConversation', authUser.id);

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