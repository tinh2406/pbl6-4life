import { createContext, useContext, useEffect, useState } from "react";
import { instance, useAuth } from "./AuthContext";
const UserContext = createContext()

export const useUser = () => {
    return useContext(UserContext)
}

export const UserProvider = ({ children }) => {
    const { authState, onLogout } = useAuth()
    console.log(authState);
    const [user, setUser] = useState()

    const refreshUser = async () => {
        if (authState.authenticated) {

            try {
                instance.defaults.headers['Authorization'] = `Bearer ${authState.token}`
                const res = await instance.get('/api/users/profile')
                setUser(res.data)
            } catch (error) {
                console.log(JSON.stringify(error));
            }
        }
    }
    const logout = async () => {
        setUser()
        await onLogout()
    }
    const update = async (field, value) => {
        try {
            const res = await instance.put('/api/users/update-profile', {
                [field]: value,
            })
            setUser(res.data)
        } catch (error) {
            console.log(JSON.stringify(error));
        }
    }
    const updatePassword = async (currentPassword, newPassword, confirmNewPassword) => {
        try {
            const res = await instance.post("/api/users/change-password", {
                currentPassword, newPassword, confirmNewPassword
            })
            return { success: true, data: res.data }
        } catch (error) {
            console.log(JSON.stringify(error));
            return { success: false, message: "Change password error" }

        }
    }
    useEffect(() => {
        if (authState.authenticated)
            refreshUser()
    }, [instance, authState.authenticated])

    const value = {
        user,
        onLogout: logout,
        onRefresh: refreshUser,
        onUpdateProfile: update,
        onUpdatePW: updatePassword
    }
    return <UserContext.Provider
        value={value}
    >{children}</UserContext.Provider>
}