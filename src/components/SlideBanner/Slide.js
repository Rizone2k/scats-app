import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import SlideItem from './SlideItem';
import getBanner from '../../api/getBanner';

const { width, heigth } = Dimensions.get('window');

const Slide = () => {
    const [imgActive, setimgActive] = useState(0);
    const [banner, setBanner] = useState([]);
    const scrollView = useRef();

    const loop = (data) => {
        const numData = data.length;
        let scrolled = 1;
        setInterval(() => {
            if (scrolled < numData) {
                scrollView.current.scrollTo({ x: width * scrolled, y: 0, animated: true });
                scrolled++;
            } else {
                scrolled = 0;
                scrollView.current.scrollTo({ x: 0, y: 0, animated: true });
            }
        }, 3000);
    }

    useEffect(() => {
        async function callApi() {
            try {
                const rs = await getBanner();
                if (rs.status == "success") {
                    if (rs.data != null) {
                        setBanner(rs.data);
                        loop(rs.data);
                    }
                } else {
                    alert(rs.message);
                }
            } catch (error) {
                alert("Error !!!");
            }
        }
        callApi();

    }, []);

    const onSlideChange = (nativeEvent) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if (slide != imgActive) setimgActive(slide);
    }

    return (
        <View style={styles.container}>
            <ScrollView
                ref={scrollView}
                onScroll={({ nativeEvent }) => { onSlideChange(nativeEvent) }}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                horizontal
            >
                {
                    banner.map((e, index) =>
                        <SlideItem item={e} key={e.id} />
                    )
                }
            </ScrollView>
            <View style={styles.wrapDot}>
                {
                    banner.map((e, index) =>
                        <Text style={[styles.dot, imgActive == index ? styles.dotActive : ""]} key={e.id}>&#8226;</Text>
                    )
                }
            </View>
        </View>
    )
}

export default Slide;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    wrapDot: {
        position: "absolute",
        top: 0,
        flexDirection: "row",
        alignContent: "center",
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    dot: {
        fontSize: 40,
        color: "rgba(255, 255, 255, 0.7)",
        marginHorizontal: 2
    },
    dotActive: {
        color: "rgba(245, 80, 39, 0.7)",
    }
})