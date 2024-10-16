import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import {supabase} from '../supabaseClient'

const useSignup = () => {
  
    const[loading, setLoading] = useState(false);
    const {authUser, setAuthUser} = useAuthContext();

    const signup = async({fullName, email, username, password, confirmPassword}) => {
        const success = handleInputErrors({fullName, email, username, password, confirmPassword});
        if(!success) return false;

        setLoading(true);
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                  emailRedirectTo: 'http://localhost:3000',
                  data: {
                    fullName,
                    username,
                  }
                },
              })

            if(error){
                throw new Error(error.message);
            }

            //context
            if(data){
                const {data:id} = await supabase.from('users').select('id').eq('auth_id', data.session.user.id);

                let newAuthUser = data.session.user.user_metadata;
                newAuthUser.id = id[0].id;
                setAuthUser(newAuthUser);
                setAuthUser(data.user.user_metadata);
            }

        } catch (error) {
            toast.error(error.message);
        }finally{
        setLoading(false);
        }
    }

    return {loading, signup};

}

export default useSignup

function handleInputErrors({fullName, username, email, password, confirmPassword}){
    if(!fullName || !username || !password || !confirmPassword || !email){
        toast.error("Please fill all of the fields.");
        return false;
    }

    if(password !== confirmPassword){
        toast.error("Passwords do not match");
        return false;
    }

    if(password.length < 6){
        toast.error("Password must be at least 6 characters");
        return false;
    }

    return true;
}