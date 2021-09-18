import React from 'react';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TextInput } from 'react-native-gesture-handler';
import { colors } from '../contants/colors';

interface Props { 
    onTouchStart?: () => void;
    onChangeText?: (text:string) => void;
}
export const CustomSearch: FC<Props> = (props) => {
    return (
        <View style={styles.container}>
            <TextInput
                {...props}
                onTouchStart={props.onTouchStart}
                placeholder="Search your location"
                style={{
                    width: '80%'
                }}
                onChangeText={props.onChangeText}
            />
            <FastImage
                source={require('../resources/images/search.png')}
                style={{ width: 20, height: 20 }}
                tintColor={colors.primary1}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        height: 48,
        backgroundColor: colors.neutral4,
        alignItems: 'center',
        borderRadius: 12
    }
})
