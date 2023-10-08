import { AntDesign, Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router"
import { useCallback, useState } from "react";
import { Image, Pressable, Text, View, useWindowDimensions } from "react-native"
import { ScrollView, Swipeable } from "react-native-gesture-handler";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import ModalReserve from "../../../src/components/ModalReserve";


const config = {
    duration: 200,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
};


export default () => {
    const width = useWindowDimensions().width;
    const { postId } = useLocalSearchParams();
    console.log(postId);
    const isLiked = false;
    const imgs = [
        "https://firebasestorage.googleapis.com/v0/b/pbl6-a0e23.appspot.com/o/2c8f59fc-ec00-4eae-ab5f-684fd1168b4e.png?alt=media&token=5fccaf62-d0a8-44b7-9bdb-13363d5f3333&_gl=1*idzhgn*_ga*MTY4NTY3OTM1LjE2OTYxNDU5MDA.*_ga_CW55HF8NVT*MTY5NjIyNTM0My4yLjEuMTY5NjIyNTg4Ny42MC4wLjA.",
        "https://firebasestorage.googleapis.com/v0/b/pbl6-a0e23.appspot.com/o/2ddd49a1-7f8d-4d1e-8fa3-5eb649a9c4ae.png?alt=media&token=88ea50a4-23e7-4f6a-9921-9f5001d474ab&_gl=1*16vwjtw*_ga*MTY4NTY3OTM1LjE2OTYxNDU5MDA.*_ga_CW55HF8NVT*MTY5NjIzMTY0MC4zLjAuMTY5NjIzMTY0MC42MC4wLjA.",
        "https://firebasestorage.googleapis.com/v0/b/pbl6-a0e23.appspot.com/o/e7e7925f-e9fd-4538-bf7f-ac5ca9d101c7.png?alt=media&token=efeb2f29-1289-469d-8f11-65d0c4fd5b37&_gl=1*1q81hp6*_ga*MTY4NTY3OTM1LjE2OTYxNDU5MDA.*_ga_CW55HF8NVT*MTY5NjIzMTY0MC4zLjEuMTY5NjIzMTY3Ny4yMy4wLjA.",
    ]
    const [modalBookShow,setModalBookShow] = useState(false)
    const [imgWidth, setImgWidth] = useState(0)
    const [currentImg, setCurrentImg] = useState(0)
    const left = useSharedValue(0)
    const style = useAnimatedStyle(() => (
        { left: withTiming(left.value, config) }
    ))
    const handleLikePost = useCallback(() => {
        console.log("like post")
    }, [])
    const handleShare = useCallback(() => {
        console.log("share")
    }, [])
    console.log(left.value);
    return (
        <View
            style={{ height: '100%', backgroundColor: "white" }}
        >
            <ScrollView
                style={{
                    flex: 1,
                }}
                contentContainerStyle={{
                    paddingHorizontal: width >= 768 ? "10%" : 0,
                    paddingBottom: width >= 1000 ? 10 : 60,
                }}
            >
                <View
                    onLayout={(event) => {
                        setImgWidth(event.nativeEvent.layout.width);
                    }}
                    style={{
                        width: "100%",
                        borderRadius: 20,
                        position: "relative",
                        marginTop: width >= 768 ? 40 : 0
                    }}
                >
                    <Ionicons
                        name="arrow-back"
                        size={20}
                        color={"white"}
                        style={{
                            position: "absolute",
                            top: 10,
                            left: 10,
                            zIndex: 11,
                        }}
                        onPress={() => {
                            router.back();
                        }}
                    />
                    <AntDesign
                        name={isLiked ? "heart" : "hearto"}
                        size={24}
                        color={isLiked ? "#FF385C" : "white"}
                        style={{
                            position: "absolute",
                            bottom: 16,
                            left: 16,
                            zIndex: 11,
                        }}
                        onPress={handleLikePost}
                    />
                    <MaterialIcons
                        name="share"
                        size={20}
                        color={"white"}
                        style={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                            zIndex: 11,
                        }}
                        onPress={handleShare}
                    />
                    {width >= 768 ||
                        <View style={{
                            position: "absolute",
                            zIndex: 10,
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%",
                            height: "100%",
                            flexDirection: "row",
                        }}>
                            <Ionicons name="chevron-back" size={24} style={{ padding: 5, backgroundColor: "rgba(0, 0, 0, 0.1)" }}
                                color={currentImg === 0 ? "rgba(0, 0, 0, 0.1)" : "white"}
                                onPress={() => {
                                    if (currentImg === 0) return
                                    setCurrentImg(i => i - 1)
                                    left.value = - (currentImg - 1) * imgWidth
                                }}
                                disabled={currentImg === 0}
                            />
                            <Ionicons name="chevron-forward" size={24} style={{ padding: 5, backgroundColor: "rgba(0, 0, 0, 0.1)" }}
                                color={currentImg === imgs.length - 1 ? "rgba(0, 0, 0, 0.1)" : "white"}
                                onPress={() => {
                                    if (currentImg === imgs.length - 1) return
                                    setCurrentImg(i => i + 1)
                                    left.value = - (currentImg + 1) * imgWidth
                                }}
                                disabled={currentImg === imgs.length - 1}
                            />
                        </View>
                    }
                    {width >= 768 ?
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            borderRadius: 20,
                            overflow: "hidden",
                        }}>
                            {imgs[0] && <Image
                                source={{ uri: imgs[0], cache: 'force-cache' }}
                                style={{
                                    width: "49.5%", aspectRatio: 1.618,
                                }}
                            />}
                            <View
                                style={{
                                    width: "49.5%",
                                    flexDirection: "row"
                                }}
                            >
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: "space-between"
                                    }}
                                >
                                    {imgs[1] && <Image
                                        source={{ uri: imgs[1], cache: 'force-cache' }}
                                        style={{
                                            width: "96%", aspectRatio: 1.618,
                                        }}
                                    />}
                                    {imgs[2] && <Image
                                        source={{ uri: imgs[2], cache: 'force-cache' }}
                                        style={{
                                            width: "96%", aspectRatio: 1.618,
                                        }}
                                    />}
                                </View>
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: "space-between"

                                    }}
                                >
                                    {imgs[1] && <Image
                                        source={{ uri: imgs[1], cache: 'force-cache' }}
                                        style={{
                                            width: "96%", aspectRatio: 1.618,
                                        }}
                                    />}
                                    {imgs[2] && <Image
                                        source={{ uri: imgs[2], cache: 'force-cache' }}
                                        style={{
                                            width: "96%", aspectRatio: 1.618,
                                        }}
                                    />}
                                </View>
                            </View>
                        </View>
                        :
                        <Swipeable
                            onSwipeableWillClose={(e) => {
                                if (e === "right") {
                                    if (currentImg === imgs.length - 1) return
                                    left.value = - (currentImg + 1) * imgWidth
                                    setCurrentImg(currentImg + 1)
                                }
                                else {
                                    if (left.value === 0) return
                                    left.value = - (currentImg - 1) * imgWidth
                                    setCurrentImg(currentImg - 1)
                                }
                            }}
                        >
                            <Animated.View
                                style={[{
                                    flexDirection: "row",
                                }, style]}
                            >
                                {imgs.map((img, i) =>
                                    <Image
                                        key={i}
                                        source={{ uri: img, cache: 'force-cache' }}
                                        style={{
                                            width: "100%", aspectRatio: 1.314,
                                        }}
                                    />)}
                            </Animated.View>
                        </Swipeable>
                    }
                </View>
                <ScrollView
                    contentContainerStyle={{
                    }}
                >

                    <View
                        style={{
                            width: width >= 1000 ? "60%" : "100%",
                        }}
                    >
                        <View style={{
                            margin: 20,
                        }}>
                            <Text style={{
                                fontSize: 22,
                                fontWeight: "500"
                            }}>
                                Bungalow with beautiful valley view 4 at HappyHill
                            </Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginTop: 5
                                }}
                            >
                                <Ionicons
                                    name="star"
                                    size={18}
                                    style={{
                                        marginRight: 10
                                    }}
                                />
                                <Text
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: 14,
                                        marginRight: 10
                                    }}
                                >4.3</Text>
                                <Text
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: 14
                                    }}
                                >1 review</Text>
                            </View>
                            <Text style={{
                                fontSize: 14,
                                marginTop: 10,
                            }}>
                                Private room in farm stay in Nậm Cang, Viet Nam
                            </Text>
                            <Text style={{
                                fontSize: 14,
                                marginTop: 10,
                            }}>
                                39km from Sapa, the bungalow are nestled inm the middle of green terraced rice fields. You will be fully immersed in nature with a view overlooking the  mountain and valley.
                            </Text>
                        </View>
                        <View style={{
                            marginHorizontal: 20,
                            borderTopWidth: 1,
                            borderColor: "#d5d5d5"
                        }}>
                            <Text style={{
                                marginTop: 10,
                                fontSize: 18,
                                fontWeight: "500"
                            }}>What this place offers</Text>
                            <Text style={{}}>Need!!!!!!!!!</Text>
                        </View>
                        <View style={{
                            marginHorizontal: 20,
                            borderTopWidth: 1,
                            borderColor: "#d5d5d5"
                        }}>
                            <Text style={{
                                marginTop: 10,
                                fontSize: 18,
                                fontWeight: "500"
                            }}>Where you'll be</Text>
                            <Text>Need map for it!!!!!!!!!!!!</Text>
                        </View>
                        <View style={{
                            marginHorizontal: 20,
                            borderTopWidth: 1,
                            borderColor: "#d5d5d5",
                        }}>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginTop: 10
                            }}>
                                <View style={{}}>
                                    <Text
                                        style={{
                                            fontWeight: "500",
                                            fontSize: 16
                                        }}
                                    >Hosted by Happy Farms</Text>
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            color: "#787878"
                                        }}
                                    >Joined in December 2022</Text>
                                </View>
                                <Image
                                    source={{
                                        uri: "https://firebasestorage.googleapis.com/v0/b/pbl6-a0e23.appspot.com/o/tinh.jpg?alt=media&token=36e93d04-5110-493d-9940-bda39bbe8b8b&_gl=1*1itx2gz*_ga*MTY4NTY3OTM1LjE2OTYxNDU5MDA.*_ga_CW55HF8NVT*MTY5NjUyMzQ2Ny43LjEuMTY5NjUyMzQ3My41NC4wLjA.",
                                        cache: "force-cache"
                                    }}
                                    style={{ width: 40, height: 40, borderRadius: 40 }}
                                />
                            </View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: 10
                            }}>
                                <Ionicons
                                    name="star"
                                    size={16}
                                    style={{
                                        marginRight: 5
                                    }}
                                />
                                <Text>1 Review</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: 2
                            }}>
                                <Ionicons
                                    name="shield-checkmark"
                                    size={16}
                                    style={{
                                        marginRight: 5
                                    }}
                                />
                                <Text
                                >Identity verified</Text>
                            </View>
                            <Pressable style={{
                                marginVertical: 10,
                                borderRadius: 10,
                                padding: 10,
                                borderWidth: 1,
                                // borderColor:"#ff385c"
                            }}>
                                <Text
                                    style={{
                                        fontWeight: "500",
                                        textAlign: "center",
                                        // color:"#ff385c"
                                    }}
                                >Contact host</Text>
                            </Pressable>
                        </View>
                        <View style={{
                            marginHorizontal: 20,
                            marginTop: 10,
                            borderTopWidth: 1,
                            borderColor: "#d5d5d5"

                        }}>
                            <View style={{
                                flexDirection: width >= 768 ? "row" : "column",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginTop: 10
                            }}>
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginTop: 5,
                                    width: width >= 768 ? "46%" : "100%",
                                }}>
                                    <Text style={{
                                        width: 80
                                    }}>Cleanliness</Text>
                                    <View
                                        style={{
                                            flex: 1,
                                            backgroundColor: "#C4C9D4",
                                            height: 6,
                                            borderRadius: 10,
                                            overflow: "hidden"
                                        }}
                                    >
                                        <View style={{
                                            width: "90%",
                                            backgroundColor: "#FF385C",
                                            height: "100%"
                                        }} />
                                    </View>
                                    <Text
                                        style={{
                                            width: 40,
                                            marginLeft: 10
                                        }}
                                    >5/5</Text>
                                </View>
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginTop: 5,
                                    width: width >= 768 ? "46%" : "100%",

                                }}>
                                    <Text style={{
                                        width: 80
                                    }}>Amenities</Text>
                                    <View
                                        style={{
                                            flex: 1,
                                            backgroundColor: "#C4C9D4",
                                            height: 6,
                                            borderRadius: 10,
                                            overflow: "hidden"
                                        }}
                                    >
                                        <View style={{
                                            width: "90%",
                                            backgroundColor: "#FF385C",
                                            height: "100%"
                                        }} />
                                    </View>
                                    <Text
                                        style={{
                                            width: 40,
                                            marginLeft: 10
                                        }}
                                    >4.8/5</Text>
                                </View>
                            </View>
                            <View style={{
                                flexDirection: width >= 768 ? "row" : "column",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}>
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginTop: 5,
                                    width: width >= 768 ? "46%" : "100%",
                                }}>
                                    <Text style={{
                                        width: 80
                                    }}>Location</Text>
                                    <View
                                        style={{
                                            flex: 1,
                                            backgroundColor: "#C4C9D4",
                                            height: 6,
                                            borderRadius: 10,
                                            overflow: "hidden"
                                        }}
                                    >
                                        <View style={{
                                            width: "90%",
                                            backgroundColor: "#FF385C",
                                            height: "100%"
                                        }} />
                                    </View>
                                    <Text
                                        style={{
                                            width: 40,
                                            marginLeft: 10
                                        }}
                                    >4.5/5</Text>
                                </View>
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    width: width >= 768 ? "46%" : "100%",
                                    marginTop: 5
                                }}>
                                    <Text style={{
                                        width: 80
                                    }}>Comfort</Text>
                                    <View
                                        style={{
                                            flex: 1,
                                            backgroundColor: "#C4C9D4",
                                            height: 6,
                                            borderRadius: 10,
                                            overflow: "hidden"
                                        }}
                                    >
                                        <View style={{
                                            width: "90%",
                                            backgroundColor: "#FF385C",
                                            height: "100%"
                                        }} />
                                    </View>
                                    <Text
                                        style={{
                                            width: 40,
                                            marginLeft: 10
                                        }}
                                    >4.8/5</Text>
                                </View>
                            </View>
                            <View style={{
                                alignItems: 'center'
                            }}>
                                <View
                                    style={{
                                        marginTop: 20,
                                        flexDirection: "row",
                                        paddingBottom: 10,
                                        borderBottomWidth: 1,
                                        borderColor: "#dbdbdb"
                                    }}
                                >
                                    <Image
                                        source={{
                                            uri: "https://firebasestorage.googleapis.com/v0/b/pbl6-a0e23.appspot.com/o/tinh.jpg?alt=media&token=36e93d04-5110-493d-9940-bda39bbe8b8b&_gl=1*1itx2gz*_ga*MTY4NTY3OTM1LjE2OTYxNDU5MDA.*_ga_CW55HF8NVT*MTY5NjUyMzQ2Ny43LjEuMTY5NjUyMzQ3My41NC4wLjA.",
                                            cache: "force-cache"
                                        }}
                                        style={{ width: 40, height: 40, borderRadius: 40, marginRight: 20 }}
                                    />
                                    <View
                                        style={{ flex: 1 }}
                                    >
                                        <Text style={{
                                            fontWeight: "500"
                                        }}>
                                            Jony
                                        </Text>
                                        <Text style={{}}
                                            numberOfLines={3}
                                        >
                                            HappyFarm seemed promising from its marketing efforts. However i found that the person managing the responses was not forthcoming
                                        </Text>
                                    </View>

                                </View>
                                <View
                                    style={{
                                        marginTop: 20,
                                        flexDirection: "row",
                                        paddingBottom: 10,
                                        borderBottomWidth: 1,
                                        borderColor: "#dbdbdb"
                                    }}
                                >
                                    <Image
                                        source={{
                                            uri: "https://firebasestorage.googleapis.com/v0/b/pbl6-a0e23.appspot.com/o/tinh.jpg?alt=media&token=36e93d04-5110-493d-9940-bda39bbe8b8b&_gl=1*1itx2gz*_ga*MTY4NTY3OTM1LjE2OTYxNDU5MDA.*_ga_CW55HF8NVT*MTY5NjUyMzQ2Ny43LjEuMTY5NjUyMzQ3My41NC4wLjA.",
                                            cache: "force-cache"
                                        }}
                                        style={{ width: 40, height: 40, borderRadius: 40, marginRight: 20 }}
                                    />
                                    <View
                                        style={{
                                            flex: 1
                                        }}
                                    >
                                        <Text style={{
                                            fontWeight: "500"
                                        }}>
                                            Jony
                                        </Text>
                                        <Text style={{
                                        }}
                                            numberOfLines={3}
                                        >
                                            HappyFarm seemed promising from its marketing efforts. However i found that the person managing the responses was not forthcoming
                                        </Text>
                                    </View>

                                </View>
                                <Pressable
                                    style={{
                                        width: "60%",
                                        borderWidth: 1,
                                        // borderColor:"#ff385c",
                                        borderRadius: 10,
                                        padding: 10,
                                        marginTop: 10,
                                        marginBottom: 20
                                    }}
                                >
                                    <Text style={{
                                        fontWeight: "500",
                                        // color:"#ff385c",
                                        textAlign: "center"
                                    }}>
                                        Show more reviews
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </ScrollView>
            <ModalReserve
                visible={modalBookShow}
                hidden={()=>{setModalBookShow(false);}}
                onConfirm={()=>{}}
            />
            {width >= 1000
                ?
                <View
                    style={{
                        bottom: 20,
                        right: width >= 1100 ? "15%" : "12%",
                        position: "absolute",
                        backgroundColor: "white",
                        borderWidth: 1,
                        borderColor: "#c3c3c3",
                        borderRadius: 16,
                        zIndex: 10
                    }}
                >
                    <View style={{
                        padding: 20
                    }}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: "500"
                        }}>
                            $41/night
                        </Text>
                        <View style={{
                            marginTop: 10,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: "#c6c6c6"
                        }}>
                            <View style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}>
                                <Pressable style={{
                                    borderRightWidth: 1,
                                    borderBottomWidth: 1,
                                    borderColor: "#c6c6c6",
                                    width: 140,
                                    padding: 6
                                }}>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontWeight: "500"
                                        }}
                                    >Check in</Text>
                                    <Text>20/10/2023</Text>
                                </Pressable>
                                <Pressable style={{
                                    width: 140,
                                    padding: 6,
                                    borderBottomWidth: 1,
                                    borderColor: "#c6c6c6",
                                }}>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontWeight: "500"
                                        }}>Check out</Text>
                                    <Text>20/10/2023</Text>
                                </Pressable>
                            </View>
                            <Pressable style={{
                                padding: 6

                            }}>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontWeight: "500"
                                    }}
                                >Guests</Text>
                                <Text>1</Text>
                            </Pressable>
                        </View>
                        <Pressable style={{
                            marginTop: 10,
                            backgroundColor: "#ff385c",
                            borderRadius: 10,
                            padding: 8
                        }}>
                            <Text
                                style={{
                                    color: "white",
                                    textAlign: "center",
                                    fontWeight: "500"
                                }}
                            >Booking</Text>
                        </Pressable>
                        <View style={{
                            marginTop: 20,
                            flexDirection: "row",
                            justifyContent: "space-between",

                        }}>
                            <Text style={{}}>
                                $43x5
                            </Text>
                            <Text style={{}}>215</Text>
                        </View>
                        <View style={{
                            marginTop: 6,
                            flexDirection: "row",
                            justifyContent: "space-between",

                        }}>
                            <Text style={{}}>
                                Fee
                            </Text>
                            <Text style={{}}>15</Text>
                        </View>
                        <View style={{
                            marginTop: 10,
                            paddingTop: 10,
                            borderTopWidth: 1,
                            borderColor: "#c6c6c6",
                            justifyContent: "space-between",
                            flexDirection: "row",

                        }}>
                            <Text style={{
                                fontWeight: "500"
                            }}>
                                Total
                            </Text>
                            <Text style={{}}>230</Text>
                        </View>
                    </View>
                </View>
                :
                <View style={{
                    left: 0,
                    bottom: 0,
                    position: "absolute",
                    backgroundColor: "white",
                    borderWidth: 1,
                    borderColor: "#c3c3c3",
                    zIndex: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: 10,
                    paddingHorizontal: 20
                }}>
                    <Text style={{}}>
                        $41 / night
                    </Text>
                    <Pressable
                        style={{
                            padding: 5,
                            paddingHorizontal: 10,
                            borderRadius: 5,
                            backgroundColor: "#FF385C"
                        }}
                        onPress={()=>{setModalBookShow(true)}}
                    >
                        <Text
                            style={{ color: "white", fontWeight: "600" }}
                        >Reserve</Text>
                    </Pressable>
                </View>
            }
        </View>
    )
}