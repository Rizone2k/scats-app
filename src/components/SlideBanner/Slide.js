import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import SlideItem from './SlideItem';

const { width, heigth } = Dimensions.get('window');

const Slide = ({ data }) => {
    const [imgActive, setimgActive] = useState(0);
    const scrollView = useRef();

    useEffect(() => {
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
                    data.map((e, index) =>
                        <SlideItem item={e} key={e.id} />
                    )
                }
            </ScrollView>
            <View style={styles.wrapDot}>
                {
                    data.map((e, index) =>
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