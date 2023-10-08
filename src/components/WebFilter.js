import { EvilIcons } from "@expo/vector-icons";
import { format } from "date-fns";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { DatePickerModal } from 'react-native-paper-dates';
import WebLocationSelect from "./WebLocationSelect";
import WebNumGuestSelect from "./WebNumGuestSelect";
import WebTypeSelect from "./WebTypeSelect";
export default () => {
    const [type, setType] = useState()
    const [timeCheckIn, setTimeCheckIn] = useState()
    const [timeCheckOut, setTimeCheckOut] = useState()
    const [number, setNumber] = useState()
    const [location, setLocation] = useState()



    const [checkInOpen, setCheckInOpen] = React.useState(false);
    const onDismissCheckIn = React.useCallback(() => {
        setCheckInOpen(false);
    }, [setCheckInOpen]);
    const onConfirmCheckIn = React.useCallback(
        (params) => {
            setCheckInOpen(false);
            setTimeCheckIn(params.date);
        },
        [setCheckInOpen, setTimeCheckIn]
    );
    const [checkOutOpen, setCheckOutOpen] = React.useState(false);
    const onDismissCheckOut = React.useCallback(() => {
        setCheckOutOpen(false);
    }, [setCheckOutOpen]);
    const onConfirmCheckOut = React.useCallback(
        (params) => {
            setCheckOutOpen(false);
            setTimeCheckOut(params.date);
        },
        [setCheckOutOpen, setTimeCheckOut])


    console.log("Filter", location,type,timeCheckIn,timeCheckOut,number);


    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                padding: 10,
                backgroundColor: "#FFFCFC",
            }}
        >
            <WebLocationSelect
                value={location}
                setValue={setLocation}
            />
            <WebTypeSelect
                value={type}
                setValue={setType}
            />
            <View style={{
                fontWeight: "bold",
                color: "#ff385c"
            }}>
                <Text style={{
                    fontWeight: "bold",
                    color: "#ff385c"
                }}>
                    Check-in
                </Text>
                <DatePickerModal

                    locale="en"
                    mode="single"
                    visible={checkInOpen}
                    onDismiss={onDismissCheckIn}
                    date={timeCheckIn || new Date()}
                    onConfirm={onConfirmCheckIn}
                />
                <Pressable
                    style={{
                        backgroundColor: "#ff8787",
                        padding: 8,
                        paddingHorizontal: 12,
                        borderRadius: 40,
                        minWidth: 140,
                        marginTop: 5,
                        flexDirection: "row",
                        alignItems: "center"
                    }}
                    onPress={() => setCheckInOpen(true)}
                >
                    <EvilIcons name="location" size={20} color="white" />
                    <Text style={{
                        color: "white",
                        fontWeight: "bold",
                        marginLeft: 1
                    }}>{timeCheckIn ? format(timeCheckIn, 'dd/MM/yyyy') : "Any"}</Text>
                    {timeCheckIn &&
                        <EvilIcons
                            onPress={() => setTimeCheckIn()}
                            style={{ position: "absolute", right: 10 }}
                            name="close" size={20} color="white" />}
                </Pressable>
            </View>
            <View style={{
                fontWeight: "bold",
                color: "#ff385c"
            }}>
                <Text style={{
                    fontWeight: "bold",
                    color: "#ff385c"
                }}>
                    Check-out
                </Text>

                <DatePickerModal
                    locale="en"
                    mode="single"
                    visible={checkOutOpen}
                    onDismiss={onDismissCheckOut}
                    date={timeCheckOut || new Date()}
                    onConfirm={onConfirmCheckOut}
                />
                <Pressable
                    style={{
                        backgroundColor: "#ff8787",
                        padding: 8,
                        paddingHorizontal: 12,
                        borderRadius: 40,
                        minWidth: 140,
                        marginTop: 5,
                        flexDirection: "row",
                        alignItems: "center"
                    }}
                    onPress={() => setCheckOutOpen(true)}
                >
                    <EvilIcons name="location" size={20} color="white" />
                    <Text style={{
                        color: "white",
                        fontWeight: "bold",
                        marginLeft: 1
                    }}>{timeCheckOut ? format(timeCheckOut, 'dd/MM/yyyy') : "Any"}</Text>
                    {timeCheckOut &&
                        <EvilIcons
                            onPress={() => setTimeCheckOut()}
                            style={{ position: "absolute", right: 10 }}
                            name="close" size={20} color="white" />}
                </Pressable>
            </View>
            <WebNumGuestSelect
                value={number}
                setValue={setNumber}
            />
        </View>
    )
}