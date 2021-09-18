import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { getMe } from '../../API';
import { CustomBackground } from '../../components/CustomBackground';
import { CustomHeaderLeft } from '../../components/CustomHeaderLeft';
import { CustomText } from '../../components/CustomText';
import { LoadingOverlay } from '../../components/LoadingOverlay';
import { colors } from '../../contants/colors';
import { User } from '../../types';

export const EditAccount: FC = () => {
    const navigation = useNavigation<any>();
    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState(true);
    const fetchMe = async () => {
        const response = await getMe();
        if (response.__typename !== 'ErrorResponse') {
            setUser(response.result);
        }
        setLoading(false);
    }
    useEffect(() => {
        navigation.setOptions({
            headerTransparent: false,
            headerLeft: () => <CustomHeaderLeft type="goback" onPress={() => navigation.navigate("Settings")} />
        });
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            fetchMe();
        }, []),
    );

    const renderVerticalField = (label: string, field?: string, value?: string) => {
        return (
            <View>
                <CustomText text={label} t2 style={{ color: colors.neutral2, marginVertical: 10 }} />
                <TouchableOpacity
                    onPress={() => navigation.navigate("UpdateUserInfo", {
                        labelField: label,
                        infoField: field,
                        fieldValue: value,
                        _id: user?._id //user id
                    })}
                    style={styles.info_field}>
                    <CustomText text={value} p1 style={{ color: colors.neutral1 }} />
                    <FastImage
                        style={{ width: 15, height: 15 }}
                        source={require('../../resources/images/forward.png')}
                        resizeMode="contain"
                        tintColor={colors.primary1}
                    />
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <CustomBackground>
            <View style={styles.user_image}>
                <FastImage
                    style={{ width: 100, height: 100, borderRadius: 100 }}
                    source={require('../../resources/images/Avatar.png')}
                    resizeMode="contain"
                />
            </View>
            {renderVerticalField('Full name', 'name', user?.name)}
            {renderVerticalField('Phone number', 'phone', user?.phone)}
            {renderVerticalField('Email', 'email', user?.email)}
            {renderVerticalField('Password', 'password', '*******')}
            <LoadingOverlay loading={loading} />
        </CustomBackground>
    )
};
const styles = StyleSheet.create({
    user_image: {
        marginVertical: 20,
        alignItems: 'center'
    },
    info_field: {
        height: 48,
        backgroundColor: colors.neutral4,
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 12
    }
})

function fetchProfile() {
    throw new Error('Function not implemented.');
}
