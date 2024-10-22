import {create} from 'zustand'

const useMessages = create((set) => ({
    messages: [],
    setMessages: (messages) => set({messages}),
    isComplete: false,
    setIsComplete: (isComplete) => set({isComplete}),
    convId: "",
    setConvId: (convId) => set({convId})
}));

export default useMessages;