import { supabase } from "../../frontend/src/supabaseClient.js";

export const getUsersforSidebar = async(req,res) => {

    try {
        const loggedInUserId = req.user._id;
        const { data, error } = await supabase.from('users').select();


        return res.status(200).json({});

    } catch (error) {
        console.log("error in getUsersforSidebar: ", error.message);
        res.status(500).json({error: "internal server error"});
    }
}