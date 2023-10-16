import { memo, useState } from "react"
import { View, Text, Pressable, TextInput, KeyboardAvoidingView, ActivityIndicator } from "react-native"
import { useUser } from "../context/UserContext"
import { Ionicons } from "@expo/vector-icons"
import { useToast } from "react-native-toast-notifications"
import { useAuth } from "../context/AuthContext"

const Email = ({ email }) => {
    const [otp, setOtp] = useState('')
    const [typeEmail, setTypeEmail] = useState(email || "")
    const [stateEdit, setStateEdit] = useState('none')
    const handleEditEmail = async () => {
        if (stateEdit === "none") {
            setStateEdit('verify')

        }
        else
            setStateEdit('none')
    }
    const handleVerify = async () => {
        if (otp.length !== 6) return

        setStateEdit('email')
    }
    const handleSetEmail = async () => {
        if (typeEmail === email || email === '') return
        setStateEdit('none')
    }
    return (
        <View style={{
            borderBottomWidth: 1,
            paddingVertical: 16,
            borderColor: "#d4d4d4"
        }}>
            <View style={{
                flexDirection: "row"
            }}>
                <View style={{
                    flex: 1,

                }}>
                    <Text style={{

                    }}>
                        Email
                    </Text>
                    <Text
                        style={{ color: "#9c9c9c", fontSize: 12, marginTop: 2 }}
                    >{email}</Text>
                </View>
                <Pressable
                    onPress={handleEditEmail}
                >
                    <Text
                        style={{ fontWeight: "500", fontSize: 14 }}
                    >
                        {stateEdit === "none" ? "Edit" : "Cancel"}
                    </Text>
                </Pressable>
            </View>
            {stateEdit === "verify" &&
                <View>
                    <Text
                        style={{
                            marginTop: 10
                        }}
                    >
                        Type otp we sent you
                    </Text>
                    <View style={{
                        marginTop: 6
                    }}>

                        <Text style={{
                            position: "absolute",
                            left: 6,
                            top: 2,
                            fontSize: 12,
                            color: "#444444"
                        }}>OTP</Text>
                        <TextInput
                            style={{
                                padding: 6,
                                paddingTop: 20,
                                borderWidth: 1,
                                borderColor: "#d4d4d4",
                                borderRadius: 10,
                            }}
                            onChangeText={setOtp}
                            value={otp}
                        />
                    </View>
                    <Pressable>
                        <Text style={{
                            fontWeight: "500"
                        }}>
                            Need a new otp
                        </Text>
                    </Pressable>
                    <Pressable
                        style={{
                            marginVertical: 12,
                            width: 80
                        }}
                        disabled={otp.length !== 6}
                        onPress={handleVerify}
                    >
                        <Text style={{
                            color: "white",
                            padding: 10,
                            paddingHorizontal: 20,
                            borderRadius: 10,
                            width: "auto",
                            textAlign: "center",
                            backgroundColor: otp.length !== 6 ? "#c1c1c1" : "#ff385c",
                            fontWeight: "600"
                        }}>Verify</Text>
                    </Pressable>
                </View>
            }
            {
                stateEdit === "email" &&
                <View>
                    <View style={{
                        marginTop: 6
                    }}>

                        <Text style={{
                            position: "absolute",
                            left: 6,
                            top: 2,
                            fontSize: 12,
                            color: "#444444"
                        }}>Email</Text>
                        <TextInput
                            style={{
                                padding: 6,
                                paddingTop: 20,
                                borderWidth: 1,
                                borderColor: "#d4d4d4",
                                borderRadius: 10,
                            }}
                            onChangeText={setTypeEmail}
                            value={typeEmail}
                        />
                    </View>
                    <Pressable
                        style={{
                            marginVertical: 12,
                            width: 80
                        }}
                        disabled={typeEmail === '' || typeEmail === email}
                        onPress={handleSetEmail}
                    >
                        <Text style={{
                            color: "white",
                            padding: 10,
                            paddingHorizontal: 20,
                            borderRadius: 10,
                            width: "auto",
                            textAlign: "center",
                            backgroundColor: typeEmail === '' || typeEmail === email ? "#c1c1c1" : "#ff385c",
                            fontWeight: "600"
                        }}>Save</Text>
                    </Pressable>
                </View>
            }
        </View>
    )
}

const Password = ({ scroll }) => {
    const { onUpdatePW, user } = useUser()
    const { onForgetPW, onReset } = useAuth()
    const [isEdit, setIsEdit] = useState(false);
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [newPasswordErr, setNewPasswordErr] = useState()
    const [cfPasswordErr, setCfPasswordErr] = useState()
    const [pwShow, setPWShow] = useState(false)
    const [newPWShow, setNewPWShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isOtp, setIsOtp] = useState(false)
    const [OTP, setOTP] = useState('')
    const toast = useToast()
    const [sendLoading, setSendLoading] = useState(false)
    const handleUpdatePassword = async () => {
        if (newPassword === "" | confirmPassword !== newPassword) return
        setLoading(true)
        let res
        if(isOtp){
            res = await onReset(user.email,OTP,newPassword)
        }
        else{
            res = await onUpdatePW(password, newPassword, confirmPassword)
        }
        
        if (res.success) {
            toast.show("Change password successfully", {
                type: "success",
                placement: "top",
            })
            setIsEdit(!isEdit)
        }
        else {
            toast.show("Change password error", {
                type: "danger",
                placement: "top",
            })
        }
        setLoading(false)
    }
    return (
        <View style={{
            borderBottomWidth: 1,
            paddingVertical: 16,
            borderColor: "#d4d4d4"
        }}
        >
            <View style={{
                flexDirection: "row"
            }}
            >
                <View style={{
                    flex: 1,

                }}>
                    <Text style={{

                    }}>
                        Password
                    </Text>
                </View>
                <Pressable
                    onPress={() => setIsEdit(!isEdit)}
                >
                    <Text
                        style={{ fontWeight: "500", fontSize: 14 }}
                    >
                        {isEdit ? "Cancel" : "Edit"}
                    </Text>
                </Pressable>
                <View />
            </View>
            {isEdit &&
                <View>
                    {
                        isOtp ?
                            <View style={{
                                marginTop: 6
                            }}>

                                <Text style={{
                                    position: "absolute",
                                    left: 6,
                                    top: 2,
                                    fontSize: 12,
                                    color: "#444444"
                                }}>OTP</Text>
                                <TextInput
                                    style={{
                                        padding: 6,
                                        paddingTop: 20,
                                        borderWidth: 1,
                                        borderColor: "#d4d4d4",
                                        borderRadius: 10,
                                    }}
                                    onChangeText={setOTP}
                                    value={OTP}
                                    onFocus={()=>{
                                        scroll()
                                    }}
                                />
                            </View>
                            :
                            <View style={{
                                marginTop: 6
                            }}>

                                <Text style={{
                                    position: "absolute",
                                    left: 6,
                                    top: 2,
                                    fontSize: 12,
                                    color: "#444444"
                                }}>Current password</Text>
                                <TextInput
                                    style={{
                                        padding: 6,
                                        paddingTop: 20,
                                        borderWidth: 1,
                                        borderColor: "#d4d4d4",
                                        borderRadius: 10,
                                    }}
                                    onChangeText={setPassword}
                                    value={password}
                                    onFocus={() => scroll()}
                                    secureTextEntry={!pwShow}
                                />
                                <Ionicons name={pwShow ? "eye-off" : "eye"}
                                    style={{
                                        position: "absolute",
                                        right: 10,
                                        top: 20
                                    }}
                                    size={20}
                                    onPress={() => setPWShow(!pwShow)}
                                />
                            </View>
                    }
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Pressable
                            onPress={async () => {
                                setIsOtp(true)
                                setSendLoading(true)
                                await onForgetPW(user.email)
                                setSendLoading(false)
                            }}
                            disabled={sendLoading}
                        >
                            {sendLoading ?
                                <ActivityIndicator size={"small"} color="gray" /> :
                                <Text
                                    style={{
                                        fontWeight: "500"
                                    }}
                                >
                                    {isOtp ? "Resend?" : "Need a new password?"}
                                </Text>
                            }
                        </Pressable>
                        {isOtp &&
                            <Pressable
                                onPress={() => {
                                    setIsOtp(false)
                                }}
                            >
                                <Text
                                    style={{
                                        fontWeight: "500"
                                    }}
                                >Use old password?</Text>
                            </Pressable>
                        }
                    </View>
                    <View style={{
                        marginTop: 6
                    }}>

                        <View style={{
                            position: "absolute",
                            left: 6,
                            top: 2,
                            flexDirection: "row"
                        }}>
                            <Text
                                style={{
                                    fontSize: 12,
                                    color: "#444444"
                                }}
                            >New password</Text>
                            {newPasswordErr &&
                                <Text
                                    style={{
                                        marginLeft: 10,
                                        fontSize: 12,
                                        color: "#ec2d0f"
                                    }}
                                >{newPasswordErr}</Text>
                            }
                        </View>
                        <TextInput
                            style={{
                                padding: 6,
                                paddingTop: 20,
                                borderWidth: 1,
                                borderColor: "#d4d4d4",
                                borderRadius: 10,
                            }}
                            secureTextEntry={!newPWShow}
                            onChangeText={setNewPassword}
                            value={newPassword}
                            onFocus={(e) => {
                                setNewPasswordErr()
                                scroll()
                            }}
                            onBlur={(e) => {
                                if (newPassword === "") setNewPasswordErr("Required")
                            }}
                        />
                        <Ionicons name={newPWShow ? "eye-off" : "eye"}
                            style={{
                                position: "absolute",
                                right: 10,
                                top: 20
                            }}
                            size={20}
                            onPress={() => setNewPWShow(!newPWShow)}
                        />
                    </View>
                    <View style={{
                        marginTop: 6
                    }}>
                        <View style={{
                            position: "absolute",
                            left: 6,
                            top: 2,
                            flexDirection: "row"
                        }}>
                            <Text
                                style={{
                                    fontSize: 12,
                                    color: "#444444"
                                }}
                            >Confirm password</Text>
                            {cfPasswordErr &&
                                <Text
                                    style={{
                                        marginLeft: 10,
                                        fontSize: 12,
                                        color: "#ec2d0f"
                                    }}
                                >{cfPasswordErr}</Text>
                            }
                        </View>
                        <TextInput
                            style={{
                                padding: 6,
                                paddingTop: 20,
                                borderWidth: 1,
                                borderColor: "#d4d4d4",
                                borderRadius: 10,
                            }}
                            secureTextEntry={!newPWShow}
                            onChangeText={setConfirmPassword}
                            value={confirmPassword}
                            onFocus={(e) => {
                                setCfPasswordErr()
                                scroll()
                            }}
                            onBlur={(e) => {
                                if (confirmPassword === "") setCfPasswordErr("Required")
                                else if (confirmPassword !== newPassword) setCfPasswordErr("Password not match")
                            }}
                        />
                    </View>
                    <Pressable
                        style={{
                            marginVertical: 12,
                            width: 100
                        }}
                        onPress={handleUpdatePassword}
                        disabled={newPassword === "" || newPassword !== confirmPassword}
                    >
                        {loading ?
                            <ActivityIndicator size={"small"} color="gray" /> :

                            <Text style={{
                                color: "white",
                                padding: 10,
                                paddingHorizontal: 20,
                                borderRadius: 10,
                                width: "auto",
                                textAlign: "center",
                                backgroundColor: newPassword === "" || newPassword !== confirmPassword ? "#c1c1c1" : "#ff385c",
                                fontWeight: "600"
                            }}>Update</Text>
                        }

                    </Pressable>
                </View>
            }
        </View>
    )
}


module.exports = {
    Email: memo(Email),
    Password: memo(Password)
}