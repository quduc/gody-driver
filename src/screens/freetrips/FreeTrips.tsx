import React from 'react';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { CustomBackground } from '../../components/CustomBackground';
import { CustomButton } from '../../components/CustomButton';
import { CustomInput } from '../../components/CustomInput';
import { CustomText } from '../../components/CustomText';
import { colors } from '../../contants/colors';
import constants from '../../contants/contants';

export const FreeTrips: FC = () => {
    return (
        <CustomBackground>
            <View style={styles.image}>
                <FastImage
                    source={require('../../resources/images/freetrips.png')}
                    style={{ width: 260, height: 260, marginTop: 20 }}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.description}>
                <CustomText text="Sends your friends free trips" t1 style={{ color: colors.neutral1 }} />
                <CustomText text="Save up to 15% on all routes when you ride with Gody and Pool in the San Francisco metropolitan  area."
                    p1 style={{ textAlign: 'center', marginVertical: 10 }}
                />
            </View>
            <View style={styles.code_invite}>
                <CustomText t2 text="Share your invite code" style={{ color: colors.neutral2 }} />
                <CustomInput
                    iconRight={require('../../resources/images/copy.png')}
                    value="fkbf78jhf9"
                />
                {/* TODO: Share on facebook */}
                <CustomButton type="primary" title="Invite friends" />
            </View>

        </CustomBackground>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 360,
        width: constants.widthDevice,
        alignItems: 'center'
    },
    description: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    code_invite: {
        marginTop: 20
    }

})