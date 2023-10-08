import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, useWindowDimensions } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import RoomCard from "./RoomCard";


export default ({ paramsLoad }) => {
    const width = useWindowDimensions().width

    const [posts, setPosts] = useState([1, 2, 3, 4]);
    const [page, setPage] = useState(1); // Số trang hiện tại
    const [isFetching, setIsFetching] = useState(false);
    const fetchData = async () => {
        setIsFetching(true);
        setTimeout(() => {
            const newPost = [...posts, posts.slice(-1)[0] + 1]
            setPosts(newPost);
            setIsFetching(false);
        }, 100)
    };
    const handleTopReached = () => {
        console.log("reached top");
    }
    const handleEndReached = () => {
        if (!isFetching) {
            setPage(page + 1); // Tăng số trang
            fetchData(); // Tải dữ liệu mới
        }
    };
    
    console.log(paramsLoad,posts);


    return (
        <FlatList
            showsHorizontalScrollIndicator={false}
            bounces={false}
            alwaysBounceHorizontal={false}
            alwaysBounceVertical={false}
            showsVerticalScrollIndicator={false}
            style={{
                width: "100%",
                paddingHorizontal: width>=600?20:0
            }}
            data={posts}
            renderItem={({ item }) => (
                <RoomCard/>
            )}
            //Setting the number of column
            numColumns={width >= 1200 ? 5 : width >= 892 ? 4 : width > 640 ? 3 : 1}
            key={width >= 1200 ? "5" : width >= 892 ? "4" : width > 640 ? "3" : "1"}
            keyextractor={(item, i) => "_" + i}

            onStartReached={handleTopReached}
            onStartReachedThreshold={0.7}

            onEndReached={handleEndReached} // Xử lý khi cuộn đến cuối danh sách
            onEndReachedThreshold={0.7} // Tùy chỉnh ngưỡng để xác định khi nào cuộn đến cuối danh sách
            ListFooterComponent={isFetching ? <ActivityIndicator size="large" color="#0000ff" /> : null}
        />
    )
}