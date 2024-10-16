import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import {supabase} from '../supabaseClient'

const useLogin = () => {
    const[loading, setLoading] = useState(false);
    const {authUser, setAuthUser} = useAuthContext();

    const login = async (email, password) => {
        const success = handleInputErrors(email, password);
		if (!success) return;

        setLoading(true);
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
              });

            if(error){
                throw new Error(error.message);
            }

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

  return {loading,login}
}

export default useLogin

function handleInputErrors(email, password) {
	if (!email || !password) {
		toast.error("Please fill in all fields");
		return false;
	}

	return true;
}