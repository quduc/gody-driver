import React, { FC } from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';
interface Props {
    t1?: boolean;
    t2?: boolean;
    t3?: boolean;
    p1?: boolean;
    p2?: boolean;
    s?: boolean;
    style?: TextStyle;
    text: any;
    onPress?: () => void;
    numberOfLines?: number;
}
export const CustomText: FC<Props> = (props) => {
    let style = {};
    if (props.t1) style = styles.t1;
    if (props.t2) style = styles.t2;
    if (props.t3) style = styles.t3;
    if (props.p1) style = styles.p1;
    if (props.p2) style = styles.p2;
    if (props.s) style = styles.s;
    return (
        <Text
            {...props}
            numberOfLines={props.numberOfLines ? props.numberOfLines : undefined}
            style={[style, {
                ...props.style
            }]}>{props.text}
        </Text>
    )
}
const styles = StyleSheet.create({
    t1: {
        fontSize: 24,
        fontWeight: 'bold',
        lineHeight: 24,
    },
    t2: {
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 20,
    },
    t3: {
        fontSize: 14,
        fontWeight:'normal',
        lineHeight: 20,
    },
    p1: {
        fontSize: 17,
        fontWeight: 'normal',
        lineHeight: 27,
    },
    p2: {
        fontSize: 15,
        fontWeight: 'normal',
        lineHeight: 25
    },
    s: {
        fontSize: 12,
        fontWeight: 'bold',
        lineHeight: 15
    }
})

