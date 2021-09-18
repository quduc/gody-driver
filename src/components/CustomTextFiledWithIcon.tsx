import React from 'react';
import { FC } from 'react';
import { StyleProp, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { colors } from '../contants/colors';
import { CustomText } from './CustomText';

interface Props {
    icon: any;
    text?: string | number;
    textBold?: boolean;
}

export const CustomTextFieldWithIcon: FC<Props> = (props) => {
    return (
        <View style={styles.container}>
            <FastImage
                source={props.icon}
                style={{ width: 20, height: 20 }}
                tintColor={colors.primary1}
            />
            {props.textBold ? (
                <CustomText t2 text={props.text} style={{ marginLeft: 10, color: colors.neutral1 }} />
            ) : (
                <CustomText p2 text={props.text} style={{ marginLeft: 10, color: colors.neutral1 }} />
            )}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: colors.neutral4,
        borderBottomWidth: 1,
        marginVertical: 5,
        height: 60,
        alignItems: 'center'
    }
})