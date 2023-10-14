import { memo, useState } from "react"
import { View, Text, Pressable, TextInput } from "react-native"

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

const Password = () => {
    const [isEdit, setIsEdit] = useState(false);
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const handleUpdatePassword = async () => {

    }
    return (
        <View style={{
            borderBottomWidth: 1,
            paddingVertical: 16,
            borderColor: "#d4d4d4"
        }}>
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
                    <Text
                        style={{ color: "#9c9c9c", fontSize: 12, marginTop: 2 }}
                    >Last updated</Text>
                </View>
                <Pressable
                    onPress={()=>setIsEdit(!isEdit)}
                >
                    <Text
                        style={{ fontWeight: "500", fontSize: 14 }}
                    >
                        {isEdit?"Cancel":"Edit"}
                    </Text>
                </Pressable>
                <View />
            </View>
            {isEdit &&
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
                        />
                    </View>
                    <Pressable>
                        <Text
                            style={{
                                fontWeight: "500"
                            }}
                        >Need a new password</Text>
                    </Pressable>
                    <View style={{
                        marginTop: 6
                    }}>

                        <Text style={{
                            position: "absolute",
                            left: 6,
                            top: 2,
                            fontSize: 12,
                            color: "#444444"
                        }}>New password</Text>
                        <TextInput
                            style={{
                                padding: 6,
                                paddingTop: 20,
                                borderWidth: 1,
                                borderColor: "#d4d4d4",
                                borderRadius: 10,
                            }}
                            onChangeText={setNewPassword}
                            value={newPassword}
                        />
                    </View>
                    <View style={{
                        marginTop: 6
                    }}>

                        <Text style={{
                            position: "absolute",
                            left: 6,
                            top: 2,
                            fontSize: 12,
                            color: "#444444"
                        }}>Confirm password</Text>
                        <TextInput
                            style={{
                                padding: 6,
                                paddingTop: 20,
                                borderWidth: 1,
                                borderColor: "#d4d4d4",
                                borderRadius: 10,
                            }}
                            onChangeText={setConfirmPassword}
                            value={confirmPassword}
                        />
                    </View>
                    <Pressable
                        style={{
                            marginVertical: 12,
                            width: 100
                        }}
                        onPress={handleUpdatePassword}
                    >
                        <Text style={{
                            color: "white",
                            padding: 10,
                            paddingHorizontal: 20,
                            borderRadius: 10,
                            width: "auto",
                            textAlign: "center",
                            backgroundColor: password === '' || password === newPassword || newPassword === "" || newPassword !== confirmPassword ? "#c1c1c1" : "#ff385c",
                            fontWeight: "600"
                        }}>Update</Text>
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