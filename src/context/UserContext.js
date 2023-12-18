import { createContext, useContext, useEffect, useState } from "react";
import { instance, useAuth } from "./AuthContext";
import uploadImg from "../utils/uploadImg";
import { useToast } from "react-native-toast-notifications";
const UserContext = createContext()

export const useUser = () => {
    return useContext(UserContext)
}

export const UserProvider = ({ children }) => {
    const toast = useToast()
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
                ...user,
                [field]: value,
            })
            setUser({...user, [field]: value})
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
    const updateAvt = async (file) => {
        try {
            const res = await uploadImg(file)
            await update("avatar", res.data.url)
        } catch (error) {
            console.log(JSON.stringify(error));
        }
    }
    const request_mod = async (front, back) => {
        try {
            const res = await Promise.all([uploadImg(front), uploadImg(back)])
            const result = await instance.put('/api/users/register-mod', {
                frontIdentityCard: res[0].data.url,
                backIdentityCard: res[1].data.url
            })
            setUser({...user, statusModRole:"Waiting"} )
            toast.show("Request success", {
                type: "success",
                placement: "top",
            })
            return { success: true, }
        } catch (error) {
            toast.show("Request error", {
                type: "danger",
                placement: "top",
            })
            console.log(JSON.stringify(error));
        }
    }
    const verify_email = async () => {
        try {
            const res = await instance.post('/api/users/verify-email')
            toast.show("Code sent", {
                type: "success",
                placement: "top",
            })
            return { success: true, }
        } catch (error) {
            toast.show("Request error", {
                type: "danger",
                placement: "top",
            })
            console.log(JSON.stringify(error));
        }
    }
    const confirm_email = async (otp) => {
        try {
            const res = await instance.post('/api/users/verify-otp-confirm-email',{
                otp
            })
            setUser({...user,emailConfirmed: true})
            toast.show("Successfully", {
                type: "success",
                placement: "top",
            })
            return { success: true, }
        } catch (error) {
            toast.show("Request error", {
                type: "danger",
                placement: "top",
            })
            console.log(JSON.stringify(error));
        }
    }
    useEffect(() => {
        if (authState.authenticated)
            refreshUser()
    }, [instance, authState.authenticated])

    const value = {
        user,
        onUpdateAVT: updateAvt,
        onLogout: logout,
        onRefresh: refreshUser,
        onUpdateProfile: update,
        onUpdatePW: updatePassword,
        onRequestMod: request_mod,
        onVerifyEmail: verify_email,
        onConfirmEmail: confirm_email
    }
    return <UserContext.Provider
        value={value}
    >{children}</UserContext.Provider>
}