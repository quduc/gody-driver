import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react';
import React from 'react';
import { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { CustomBackground } from '../../components/CustomBackground';
import { CustomButton } from '../../components/CustomButton';
import { CustomText } from '../../components/CustomText';
import { colors } from '../../contants/colors';
import constants from '../../contants/contants';
import { useStore } from '../../store/useStore';

export const Settings: FC = observer(() => {
    const navigation = useNavigation<any>();
    const { user } = useStore()
    return (
        <CustomBackground>
            <TouchableOpacity style={styles.user_info} onPress={() => navigation.navigate("EditAccount")}>
                <View style={{ flexDirection: 'row' }}>
                    <FastImage
                        style={{ width: 56, height: 56, borderRadius: 56 }}
                        source={user?.profileImage ? { uri: user.profileImage } : require('../../resources/images/Avatar.png')}
                        resizeMode="cover"
                    />
                    <View style={{ marginLeft: 10 }}>
                        <CustomText t2 text={user?.name} style={{ color: colors.neutral1 }} />
                        <CustomText s text={user?.phone} style={{ color: colors.neutral2, marginVertical: 5 }} />
                        <CustomText t2 text={user?.email} style={{ color: colors.neutral2, fontSize: 14 }} />
                    </View>
                </View>
                <FastImage
                    style={{ width: 20, height: 20 }}
                    source={require('../../resources/images/forward.png')}
                    tintColor={colors.neutral2}
                />
            </TouchableOpacity>
            <CustomText text="For added security, please verity your email." p2 style={{ color: colors.neutral2 }} />
            <CustomText text="Favourites" t2 style={{ color: colors.neutral2, marginVertical: 10 }} />

            <CustomButton
                leftIcon={require('../../resources/images/home.png')}
                rightIcon={require('../../resources/images/forward.png')}
                type="light"
                title="Add home"
            />
            <CustomButton
                leftIcon={require('../../resources/images/work.png')}
                rightIcon={require('../../resources/images/forward.png')}
                type="light"
                title="Add work"
            />
            <CustomText text="Other" t2 style={{ color: colors.neutral2, marginVertical: 10 }} />

            <CustomButton
                onPress={() => navigation.navigate("PrivacySettings")}
                leftIcon={require('../../resources/images/settings.png')}
                rightIcon={require('../../resources/images/forward.png')}
                type="light"
                title="Privacy settings"
            />
            <CustomButton
                leftIcon={require('../../resources/images/secure.png')}
                rightIcon={require('../../resources/images/forward.png')}
                type="light"
                title="Security"
            />
            <CustomButton
                leftIcon={require('../../resources/images/insurance.png')}
                rightIcon={require('../../resources/images/forward.png')}
                type="light"
                title="Privacy & Policy"
            />

        </CustomBackground>
    )
});

const styles = StyleSheet.create({
    user_info: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginVertical: 15,
        borderRadius: 8,
        width: constants.widthDevice - 40,
        height: 88,
        backgroundColor: colors.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    }
})