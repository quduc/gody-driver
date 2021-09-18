import React, { useEffect, useState } from 'react';
import { Image, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { FC } from 'react';
import { colors } from '../contants/colors';
interface Props {
    style?: StyleProp<ViewStyle>;
    rate: number;
    onRating?: boolean;
    onFinishRating?: (rating: number) => void | undefined;
}
export const CustomRatingBar: FC<Props> = (props) => {
    const { style, rate, onRating } = props;
    const [defaultRating, setDefaultRating] = useState(rate);

    const onPressRating = (item: number) => {
        props.onFinishRating && props.onFinishRating(item);
        setDefaultRating(item);
    }

    useEffect(() => {
        setDefaultRating(rate)
    }, [rate])

    return (
        <View style={[styles.container, style]}>
            {
                [1, 2, 3, 4, 5].map((item, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => onPressRating(item)}
                        >
                            <Image
                                style={item > defaultRating ? styles.star_on_rating : styles.star_normal}
                                source={
                                    item <= defaultRating
                                        ? require('../resources/images/icon_stars.png')
                                        : require('../resources/images/icon_stars.png')
                                }
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 20
    },
    star_normal: {
        width: 33,
        height: 33,
        marginRight: 8,
        tintColor: colors.primary1
    },
    star_on_rating: {
        width: 33,
        height: 33,
        marginRight: 8,
        alignItems: 'center'
    }
})