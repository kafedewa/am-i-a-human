import { createContext, useContext, useEffect, useState } from "react";

export const ConversationContext = createContext();

export const useConversationContext = () => {
    return useContext(ConversationContext);
}

export const ConversationContextProvider = ({children}) => {
    const [conversation, setConversation] = useState(null);
    const [loading, setLoading] = useState(false);

    return <ConversationContext.Provider value={{ conversation, setConversation, loading }}>
        
        {children}
        
        </ConversationContext.Provider>
}