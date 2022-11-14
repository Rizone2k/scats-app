import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import SlideItem from './SlideItem';

const { width, heigth } = Dimensions.get('window');

const Slide = ({ data }) => {
    return (
        <View style={styles.container}>
            <ScrollView
                onScroll={(e) => { }}
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
        </View>
    )
}

export default Slide;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    dotView: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
})