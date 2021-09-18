import React from 'react';
import { FC } from 'react';
import { Image, TouchableOpacity } from 'react-native';

interface Props {
    type?: string; //goback or openDrawer
    onPress?: () => void;
}

export const CustomHeaderLeft: FC<Props> = ({ type, onPress }) => {
    return (
        <TouchableOpacity activeOpacity={0.8} style={{ width: 24, height: 24 }} onPress={onPress}>
            <Image
                source={type === 'goback' ? require('../resources/images/back.png') : require('../resources/images/list.png')}
                style={{ width: 24, height: 24 }}
            />
        </TouchableOpacity>
    )
}

