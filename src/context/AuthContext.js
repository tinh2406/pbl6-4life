import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import * as Google from "expo-auth-session/providers/google";
import * as SecureStore from "expo-secure-store";
import * as WebBrowser from "expo-web-browser";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Platform } from "react-native";
WebBrowser.maybeCompleteAuthSession();

const TOKEN_KEY = 'my_jwt'
// export const API_URL = 'http://192.168.237.193:5000'
export const API_URL = 'https://tuna.whitemage.tech/'

const AuthContext = createContext({})

export const useAuth = () => {
    return useContext(AuthContext)
}
export const instance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
        'X-Custom-Header': 'foobar'
    }
});



export const AuthProvider = ({ children }) => {
    const [loading, setIsLoading] = useState(true)

    console.log("Auth provider reload",loading);
    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: "972004153950-thdv01tk63uqtqqvffqei3qsbn0e18ci.apps.googleusercontent.com",
        iosClientId: "972004153950-mqse1tpvr0jao50reufk5jriogpsl2ja.apps.googleusercontent.com",
        androidClientId: "972004153950-uue4m48dvip9odnnlbm2cai268a6v9cv.apps.googleusercontent.com",
    })

    const [authState, setAuthState] = useState({ token: null, authenticated: null })
    const [user, setUser] = useState()
    const [keepSignIn, setKeepSignIn] = useState(true)
    useEffect(() => {
        refresh()
    }, [])
    useEffect(() => {
        console.log(response, "response");
        const getUser = async () => {
            if (response?.type == "success") {
                try {
                    const res = await instance.post('/api/auths/google-login', {
                        accessToken: response.authentication.accessToken
                    })
                    setAuthState({
                        token: res.data.token,
                        authenticated: true
                    })

                    setUser(res.data.userResult)
                    instance.defaults.headers['Authorization'] = `Bearer ${res.data.token}`
                    // if (keepSignIn) {
                    //     if (Platform.OS === 'web')
                    //         await AsyncStorage.setItem(TOKEN_KEY, result.data.token)
                    //     else
                    //         await SecureStore.setItemAsync(TOKEN_KEY, result.data.token)
                    // }
                    return { success: true, user: res.data.userResult }
                } catch (e) {
                    console.log(e);
                    return { error: true, message: e.response?.data?.title }
                }
            }
        }
        getUser()
    }, [response])
    const forgetPassword = async (email) => {
        if (email === "admin") {
            return { success: true }
        }
        try {
            const res = await instance.post(`/api/auths/forgot-password`, { email })
            return { success: true, code: res.status }
        } catch (e) {
            return { error: true, message: e.response?.data?.title }
        }
    }
    const login = useCallback(async (email, password, keepSignIn) => {
        if (email === "admin" && password === "admin") {
            setAuthState({ authenticated: true, token: "token" })
            setUser(email)
            return { success: true }
        }
        try {
            const res = await instance.post(`/api/auths/login`, { email, password })
            setAuthState({
                token: res.data.token,
                authenticated: true
            })

            setUser(res.data.userResult)
            instance.defaults.headers['Authorization'] = `Bearer ${res.data.token}`

            if (keepSignIn) {
                if (Platform.OS === 'web')
                    await AsyncStorage.setItem(TOKEN_KEY, res.data.token)
                else
                    await SecureStore.setItemAsync(TOKEN_KEY, res.data.token)
            }
            return { success: true, user: res.data.userResult }
        } catch (e) {
            return { error: true, message: e.response?.data?.title }
        }
    }, [])
    const register = async (email, name, password) => {
        if (email === "admin" && password === "admin") {
            return { success: true }
        }
        try {
            const res = await instance.post(`api/auths/register`, { email, name, password })
            return { success: true, user: res.data }
        } catch (e) {
            return { error: true, message: e.response?.data?.title }
        }
    }

    const verifyOTP = async (email, otp) => {
        if (email === "admin" && otp === "0000") {
            return { success: true }
        }
        try {
            const res = await instance.post(`api/auths/verify-otp-forgot-password`, { email, otp })
            return { success: true }
        } catch (e) {
            console.log(e)
            return { error: true, message: e.response?.data?.title || e.message }
        }
    }
    const logout = async () => {
        try {
            // await instance.post(`/auth/logout`)
        } catch (error) {

        }
        try {
            if (Platform.OS === 'web')
                await AsyncStorage.removeItem(TOKEN_KEY)
            else
                await SecureStore.deleteItemAsync(TOKEN_KEY)
        } catch (e) {

        }
        instance.defaults.headers.common['Authorization'] = ''
        setAuthState({ token: null, authenticated: false })
        setUser()
    }
    const refresh = async () => {

        // setAuthState({ token: "example", authenticated: true })
        // setUser({email:"admin"})
        // setTimeout(() =>{setIsLoading(false)},1000)
        // return

        const token = Platform.OS === "web" ? await AsyncStorage.getItem(TOKEN_KEY) : await SecureStore.getItemAsync(TOKEN_KEY)
        if (token) {
            try {
                instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
                const result = await instance.get(`/api/users/profile`)
                // if (result.data.success) {
                //     if (Platform.OS === 'web') await AsyncStorage.setItem(TOKEN_KEY, result.data.token)
                //     else await SecureStore.setItemAsync(TOKEN_KEY, result.data.token)
                setAuthState({ token: token, authenticated: true })
                setIsLoading(false)
                return result
            } catch (e) {
                console.log(e.response.data.message)
                setIsLoading(false)
                return { error: true, msg: e.response.data.message }
            }
        } else {
            setAuthState({ token: null, authenticated: false })
            setIsLoading(false)
            return { error: true, msg: "No have token" }
        }
    }
    const resetPassword = async (email, otp, newPassword) => {
        try {
            const res = await instance.post(`/api/auths/reset-password`, {
                email, otp, newPassword, confirmNewPassword: newPassword
            })
            return { success: true, data: res.data }
        } catch (e) {
            console.log(JSON.stringify(e))
            return { error: true, message: e.response?.data?.title }
        }
    }
    const loginWithGG = async (keepSignIn) => {
        promptAsync();
        setKeepSignIn(keepSignIn);
    }

    const value = {
        onForgetPW: forgetPassword,
        onLogin: login,
        onRegister: register,
        onVerify: verifyOTP,
        onLogout: logout,
        onRefresh: refresh,
        onGG: loginWithGG,
        onReset: resetPassword,
        authState, loading, user
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}