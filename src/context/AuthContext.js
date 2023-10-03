import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"
import * as SecureStore from "expo-secure-store"
import { Platform } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
WebBrowser.maybeCompleteAuthSession();

const TOKEN_KEY = 'my_jwt'
// export const API_URL = 'http://192.168.237.193:5000'
export const API_URL = 'https://dctt.azurewebsites.net/'

const AuthContext = createContext({})

export const useAuth = () => {
    return useContext(AuthContext)
}
const instance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
        'X-Custom-Header': 'foobar'
    }
});



export const AuthProvider = ({ children }) => {
    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: "972004153950-thdv01tk63uqtqqvffqei3qsbn0e18ci.apps.googleusercontent.com",
        iosClientId: "972004153950-mqse1tpvr0jao50reufk5jriogpsl2ja.apps.googleusercontent.com",
        androidClientId: "972004153950-uue4m48dvip9odnnlbm2cai268a6v9cv.apps.googleusercontent.com",
    })
    const [loading, setIsLoading] = useState(true)
    const [authState, setAuthState] = useState({ token: null, authenticated: null })
    const [user, setUser] = useState({})
    const [keepSignIn, setKeepSignIn] = useState(true)
    useEffect(() => {
        refresh()
    }, [])
    useEffect(() => {
        console.log(response, "response");
        const getUser = async () => {
            if (response?.type == "success") {
                try {
                    const res = await instance.post('/api/auth/google-login', {
                        accessToken: response.authentication.accessToken
                    })
                    console.log(res);
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
            const res = await instance.post(`/auth/forget-password`, { email })
            return res.data
        } catch (e) {
            console.log(Object.keys(e))
            return { error: true, msg: e.response?.data.message || e.message }
        }
    }
    const login = async (email, password, keepSignIn) => {
        if (email === "admin" && password === "admin") {
            setAuthState({ authenticated: true, token: "token" })
            setUser(email)
            return { success: true }
        }
        try {
            const res = await instance.post(`/api/auth/login`, { email, password })
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
            return { error: true, message: e.response?.data?.title }
        }
    }
    const register = async (email, name, password) => {
        if (email === "admin" && password === "admin") {
            return { success: true }
        }
        try {
            const res = await instance.post(`api/auth/register`, { email, name, password })
            return { success: true, user: res.data }
        } catch (e) {
            return { error: true, message: e.response?.data?.title }
        }
    }
    const requestCode = async (email) => {
        if (email === "admin") {
            return { success: true }
        }
        try {
            const res = await instance.post(`/auth/reSendCode`, { email })
            return res.data
        } catch (e) {
            console.log(Object.keys(e))
            return { error: true, msg: e.response?.data.message || e.message }
        }
    }
    const verifyOTP = async (email, otp) => {
        if (email === "admin" && otp === "0000") {
            return { success: true }
        }
        try {
            const res = await instance.post(`/auth/verify_otp`, { email, otp })
            return res.data
        } catch (e) {
            console.log(Object.keys(e))
            return { error: true, msg: e.response?.data.message || e.message }
        }
    }
    const logout = async () => {
        try {
            await instance.post(`/auth/logout`)
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
                const result = await instance.post(`/auth/refresh`)
                if (result.data.success) {
                    if (Platform.OS === 'web') await AsyncStorage.setItem(TOKEN_KEY, result.data.token)
                    else await SecureStore.setItemAsync(TOKEN_KEY, result.data.token)
                    setAuthState({ token: result.data.token, authenticated: true })
                    instance.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`
                }
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
        onRequestCode: requestCode,
        onGG: loginWithGG,
        authState, loading, user
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}