import { memo, useState } from "react"
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native"
import { useUser } from "../context/UserContext"
import { DatePickerModal } from "react-native-paper-dates"
import { format } from "date-fns"

const Name = ({ name }) => {
    const [isEdit, setIsEdit] = useState(false)
    const [typeName, setTypeName] = useState(name || "")
    const [loading, setLoading] = useState(false)
    const { onUpdateProfile } = useUser()
    const handleUpdate = async () => {
        setLoading(true)
        await onUpdateProfile("name", typeName)
        setLoading(false)
    }
    return (
        <View style={{
            borderBottomWidth: 1,
            paddingVertical: 16,
            borderColor: "#d4d4d4"
        }}>
            <Pressable style={{
                flexDirection: "row",
            }}
                onPress={() => setIsEdit(!isEdit)}
            >
                <View style={{
                    flex: 1,
                }}>
                    <Text style={{

                    }}>
                        Legal name
                    </Text>
                    <Text
                        style={{ color: "#9c9c9c", fontSize: 12, marginTop: 2 }}
                    >{name}</Text>
                </View>
                <Text
                    style={{ fontWeight: "500", fontSize: 14 }}
                >
                    {isEdit ? "Cancel" : "Edit"}
                </Text>
            </Pressable>
            {isEdit &&
                <>
                    <View style={{
                        marginTop: 10
                    }}>
                        <Text style={{
                            position: "absolute",
                            left: 6,
                            top: 2,
                            fontSize: 12,
                            color: "#444444"
                        }}>Name</Text>
                        <TextInput
                            style={{
                                padding: 6,
                                paddingTop: 20,
                                borderWidth: 1,
                                borderColor: "#d4d4d4",
                                borderRadius: 10,
                            }}
                            onChangeText={setTypeName}
                            value={typeName}
                        />
                    </View>
                    <Pressable
                        style={{
                            marginVertical: 12,
                            width: 80,
                            backgroundColor: typeName === name || typeName === '' || loading ? "#c1c1c1" : "#ff385c",
                            borderRadius: 10,
                            height: 36,
                            justifyContent: 'center',
                            alignItems: 'center',

                        }}
                        disabled={typeName === name || typeName === '' || loading}
                        onPress={handleUpdate}
                    >
                        {loading ?
                            <ActivityIndicator size={"small"} color="gray" /> :
                            <Text style={{
                                color: "white",
                                padding: 10,
                                paddingHorizontal: 20,
                                width: "auto",
                                textAlign: "center",
                                fontWeight: "600"
                            }}>Save</Text>
                        }
                    </Pressable>
                </>}
        </View>
    )
}
const Phone = ({ phone }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [typePhone, setTypePhone] = useState(phone || "")
    const [loading, setLoading] = useState(false)
    const { onUpdateProfile } = useUser()
    const handleUpdate = async () => {
        setLoading(true)
        await onUpdateProfile("phoneNumber", typePhone)
        setLoading(false)
    }
    return (
        <View style={{
            borderBottomWidth: 1,
            paddingVertical: 16,
            borderColor: "#d4d4d4"
        }}>
            <Pressable
                style={{
                    flexDirection: "row",
                }}
                onPress={() => setIsEdit(!isEdit)}
            >

                <View style={{
                    flex: 1,

                }}>
                    <Text style={{

                    }}>
                        Phone number
                    </Text>
                    <Text
                        style={{ color: "#9c9c9c", fontSize: 12, marginTop: 2 }}
                    >{phone || "Provide phone number"}</Text>
                </View>
                <Text
                    style={{ fontWeight: "500", fontSize: 14 }}
                >
                    {isEdit ? "Cancel" : phone ? "Edit" : "Add"}
                </Text>
            </Pressable>
            {isEdit &&
                <>
                    <View style={{
                        marginTop: 10
                    }}>
                        <Text style={{
                            position: "absolute",
                            left: 6,
                            top: 2,
                            fontSize: 12,
                            color: "#444444"
                        }}>Phone</Text>
                        <TextInput
                            style={{
                                padding: 6,
                                paddingTop: 20,
                                borderWidth: 1,
                                borderColor: "#d4d4d4",
                                borderRadius: 10,
                            }}
                            onChangeText={setTypePhone}
                            value={typePhone}
                        />
                    </View>
                    <Pressable
                        style={{
                            marginVertical: 12,
                            width: 80,
                            backgroundColor: typePhone === phone || typePhone === '' || loading ? "#c1c1c1" : "#ff385c",
                            borderRadius: 10,
                            height: 36,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        disabled={typePhone === phone || typePhone === '' || loading}
                        onPress={handleUpdate}
                    >
                        {loading ?
                            <ActivityIndicator size={"small"} color="gray" /> :
                            <Text style={{
                                color: "white",
                                padding: 10,
                                paddingHorizontal: 20,
                                width: "auto",
                                textAlign: "center",
                                fontWeight: "600"
                            }}>Save</Text>
                        }
                    </Pressable>
                </>}
        </View >)
}
const Address = ({ address }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [typeAddress, setTypeAddress] = useState(address || "")
    const [loading, setLoading] = useState(false)
    const { onUpdateProfile } = useUser()
    const handleUpdate = async () => {
        setLoading(true)
        await onUpdateProfile("address", typeAddress)
        setLoading(false)
    }
    return (
        <View style={{
            borderBottomWidth: 1,
            paddingVertical: 16,
            borderColor: "#d4d4d4"
        }}>
            <Pressable
                style={{
                    flexDirection: "row",
                }}
                onPress={() => setIsEdit(!isEdit)}
            >

                <View style={{
                    flex: 1,

                }}>
                    <Text style={{

                    }}>
                        Address
                    </Text>
                    <Text
                        style={{ color: "#9c9c9c", fontSize: 12, marginTop: 2 }}
                    >{address || "Provide address"}</Text>
                </View>
                <Text
                    style={{ fontWeight: "500", fontSize: 14 }}
                >
                    {isEdit ? "Cancel" : address ? "Edit" : "Add"}
                </Text>
            </Pressable>
            {isEdit &&
                <>
                    <View style={{
                        marginTop: 10
                    }}>
                        <Text style={{
                            position: "absolute",
                            left: 6,
                            top: 2,
                            fontSize: 12,
                            color: "#444444"
                        }}>Address</Text>
                        <TextInput
                            style={{
                                padding: 6,
                                paddingTop: 20,
                                borderWidth: 1,
                                borderColor: "#d4d4d4",
                                borderRadius: 10,
                            }}
                            onChangeText={setTypeAddress}
                            value={typeAddress}
                        />
                    </View>
                    <Pressable
                        style={{
                            marginVertical: 12,
                            width: 80,
                            backgroundColor: typeAddress === address || typeAddress === '' || loading ? "#c1c1c1" : "#ff385c",
                            borderRadius: 10,
                            height: 36,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        disabled={typeAddress === address || typeAddress === '' || loading}
                        onPress={handleUpdate}
                    >
                        {loading ?
                            <ActivityIndicator size={"small"} color="gray" /> :
                            <Text style={{
                                color: "white",
                                padding: 10,
                                paddingHorizontal: 20,
                                width: "auto",
                                textAlign: "center",
                                fontWeight: "600"
                            }}>Save</Text>
                        }
                    </Pressable>
                </>}
        </View>
    )
}
const DateOfBirth = ({ dateOfBirth }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [typeDoB, setTypeDoB] = useState(dateOfBirth)
    const [loading, setLoading] = useState(false)
    const [pickShow,setPickShow] = useState(false)
    const { onUpdateProfile } = useUser()
    const handleUpdate = async () => {
        setLoading(true)
        await onUpdateProfile("dateOfBirth", format(typeDoB,"yyyy-MM-dd"))
        setLoading(false)
    }
    return (
        <View style={{
            borderBottomWidth: 1,
            paddingVertical: 16,
            borderColor: "#d4d4d4"
        }}>
            <Pressable
                style={{
                    flexDirection: "row",
                }}
                onPress={() => setIsEdit(!isEdit)}
            >

                <View style={{
                    flex: 1,

                }}>
                    <Text style={{

                    }}>
                        Date of Birth
                    </Text>
                    <Text
                        style={{ color: "#9c9c9c", fontSize: 12, marginTop: 2 }}
                    >{dateOfBirth ? format(dateOfBirth, 'dd/MM/yyyy') : "Provide birthday"}</Text>
                </View>
                <Text
                    style={{ fontWeight: "500", fontSize: 14 }}
                >
                    {isEdit ? "Cancel" : dateOfBirth ? "Edit" : "Add"}
                </Text>
            </Pressable>
            {isEdit &&
                <>
                    <Pressable style={{
                        marginTop: 10
                    }}
                        onPress={()=>setPickShow(true)}
                    >
                        <Text style={{
                            position: "absolute",
                            left: 6,
                            top: 2,
                            fontSize: 12,
                            color: "#444444"
                        }}>Date of birth</Text>
                        <Text
                            style={{
                                padding: 6,
                                paddingTop: 20,
                                borderWidth: 1,
                                borderColor: "#d4d4d4",
                                borderRadius: 10,
                                height: 44,
                            }}
                        >
                            {typeDoB ? format(typeDoB, 'dd/MM/yyyy') : ""}
                        </Text>
                        <DatePickerModal
                            locale="en"
                            mode="single"
                            visible={pickShow}
                            onDismiss={() => { setPickShow(false) }}
                            date={typeDoB}
                            onConfirm={({date})=>{
                                setTypeDoB(date);
                                setPickShow(false);
                            }}
                        />
                    </Pressable>
                    <Pressable
                        style={{
                            marginVertical: 12,
                            width: 80,
                            backgroundColor: typeDoB === dateOfBirth || typeDoB === '' || loading ? "#c1c1c1" : "#ff385c",
                            borderRadius: 10,
                            height: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        disabled={typeDoB === dateOfBirth || typeDoB === '' || loading}
                        onPress={handleUpdate}
                    >
                        {loading ?
                            <ActivityIndicator size={"small"} color="gray" /> :
                            <Text style={{
                                color: "white",
                                padding: 10,
                                paddingHorizontal: 20,
                                width: "auto",
                                textAlign: "center",
                                fontWeight: "600"
                            }}>Save</Text>
                        }
                    </Pressable>
                </>}
        </View>
    )
}
module.exports = {
    Name: memo(Name),
    Phone: memo(Phone),
    Address: memo(Address),
    DateOfBirth: memo(DateOfBirth)
}