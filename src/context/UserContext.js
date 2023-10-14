import { createContext, useContext, useEffect, useState } from "react";
import {instance, useAuth} from "./AuthContext";
const UserContext = createContext()

export const useUser = () => {
    return useContext(UserContext)
}

export const UserProvider = ({children})=>{
    const {authState,onLogout} = useAuth()
    console.log(authState);
    const [user,setUser] = useState()

    const refreshUser = async ()=>{
        try {
            const res = await instance.get('/api/users/profile')
            setUser(res.data)
        } catch (error) {
            console.log(JSON.stringify(error));
        }
    }
    const logout = async ()=>{
        setUser()
        await onLogout()
    }
    const update = async (field,value)=>{
        try {
            const res = await instance.put('/api/users/update-profile',{
                [field]: value,
            })
            setUser(res.data)
        } catch (error) {   
            console.log(error);
        }
    }

    useEffect(()=>{
        if(authState.authenticated)
        refreshUser()
    },[instance,authState.authenticated])

    const value = {
        user,
        onLogout:logout,
        onRefresh:refreshUser,
        onUpdateProfile:update
    }
    return <UserContext.Provider
        value={value}
    >{children}</UserContext.Provider>
}