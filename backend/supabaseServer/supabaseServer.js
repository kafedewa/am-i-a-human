import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const sendToSupabase = async (senderId, receiverId, messageContent, callback) => {
    try {
        let participants = [senderId, receiverId];
        let s_conversation = await supabase.from('conversations').select().contains('participants', participants);

        if(s_conversation.data.length === 0){
            s_conversation = await supabase.from('conversations').insert({
                participants: participants
            }).select();
        }

        const { data, error } = await supabase.from('messages').insert({
            receiverId,
            senderId,
            message : messageContent
        }).select();

        if(s_conversation.data[0].messages){
            s_conversation.data[0].messages.push(data[0].id);
        } else s_conversation.data[0].messages = [data[0].id];


        s_conversation = await supabase.from('conversations').update({
            messages: s_conversation.data[0].messages
        }).contains('participants', participants).select();

        if(error){
            throw new Error(error.message)
        }
        if(callback){
            callback(data[0]);
        }

        return data[0];
    } catch (error) {
        console.log("error in sent to suberbase")
        console.log(error.message)
    }
}

export const getMessages = async (message) => {

    try {
        const {data,error} = await supabase.from('conversations').select('messages').contains('participants', [message.receiverId, message.senderId]);
        if(error) throw new Error(error.message);

        if(data.length > 0){
          const result = await supabase.from('messages').select().in('id', data[0].messages);
          if(result.error) throw new Error(result.error.message);
          return result.data;
        }else{
          return [];
        }
    } catch (error) {
        console.log(error.message);
    }

}