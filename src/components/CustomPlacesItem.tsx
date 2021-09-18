import React from 'react';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { colors } from '../contants/colors';
import { CustomText } from './CustomText';

interface Props {
    text: string;
}

export const CustomPlacesItem: FC<Props> = (props) => {
    return (
        <View style={styles.container}>
            <FastImage
                source={require('../resources/images/marker.png')}
                style={{ width: 20, height: 20 }}
                tintColor={colors.neutral3}
            />
            <CustomText p1 text={props.text} style={{ marginLeft: 10, color: colors.neutral1 }} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 48,
        alignItems: 'center',
    }
})