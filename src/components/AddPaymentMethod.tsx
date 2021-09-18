import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../contants/colors';
import { CustomText } from './CustomText';

interface Props {
    onPress?: () => void;
    title?: string;
}
export const AddPaymentMethod: FC<Props> = ({ onPress, title }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <CustomText text={title} s />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderWidth: 1,
        borderColor: colors.neutral3,
        borderStyle: 'dashed',
        borderRadius: 6,
        height: 44,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
})