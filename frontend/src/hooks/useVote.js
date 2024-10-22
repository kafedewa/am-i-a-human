import React from 'react'
import { useAuthContext } from '../context/AuthContext'
import { supabase } from '../supabaseClient';
import { useConversationContext } from '../context/ConversationContext';
import useMessages from '../zustand/useMessages';

const useVote = () => {
    const {authUser} = useAuthContext();
    const {convId} = useMessages();

    const submitVote = async (vote) => {
        try {
            console.log("convid", convId)

            const {data, error} = await supabase.from('conversations').select('votes').eq('id', convId);
            
            console.log(data);

            if(error){
                throw new Error(error);
            }

            let newVotes = {};
            if(data.length > 0 && data[0].votes){
                newVotes = data[0].votes;
            }
            newVotes[authUser.id] = vote;

            console.log(newVotes);

            const {error2} = await supabase.from('conversations').update({votes: newVotes}).eq('id', convId);

            if(error2){
                throw new Error(error2);
            }

        } catch (error) {
            console.log(error.message);
        }
    }

  return {submitVote}
}

export default useVote