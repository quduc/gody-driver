import React from 'react';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TextInput } from 'react-native-gesture-handler';
import { colors } from '../contants/colors';

interface Props {
    onTouchStart?: () => void;
    onChangeText?: (text: string) => void;
    placeholder?: string;
    iconRight?: any
    value?: string;
}
export const CustomInput: FC<Props> = (props) => {
    return (
        <View style={styles.container}>
            <TextInput
                {...props}
                onTouchStart={props.onTouchStart}
                placeholder={props.placeholder}
                style={{
                    width: '80%'
                }}
                onChangeText={props.onChangeText}
            />
            {props.iconRight && (
                <FastImage
                    source={props.iconRight}
                    style={{ width: 20, height: 20 }}
                    tintColor={colors.primary1}
                />
            )}
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
        borderRadius: 12,
        marginVertical: 15
    }
})
