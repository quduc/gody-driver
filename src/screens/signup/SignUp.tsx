import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { StyleSheet, TouchableOpacity, View, TextInput } from 'react-native';
import FastImage from 'react-native-fast-image';
import { sendOTP } from '../../API';
import { CustomBackground } from '../../components/CustomBackground';
import { CustomButton } from '../../components/CustomButton';
import { CustomText } from '../../components/CustomText';
import { LoadingOverlay } from '../../components/LoadingOverlay';
import { colors } from '../../contants/colors';

export const SignUp: FC = () => {
    const navigation = useNavigation<any>();
    const [phone, setPhoneNumber] = useState<string>('');
    const [error, setError] = useState<string>('');

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        navigation.setOptions({
            headerTransparent: false,
            headerLeft: () => (
                <TouchableOpacity activeOpacity={0.8} style={{ width: 24, height: 24 }} onPress={() => navigation.goBack()}>
                    <FastImage source={require('../../resources/images/back.png')}
                        style={{ width: 24, height: 24 }}
                    />
                </TouchableOpacity>
            )
        })
    }, []);

    const onSignUp = async () => {
        setLoading(true);
        if (phone.length != 10) {
            setError('Input phone number is not precise.');
            setPhoneNumber('');
            setLoading(false);
        } else {
            const response = await sendOTP(phone);
            if (response.__typename !== 'ErrorResponse') {
                setTimeout(() => {
                    setLoading(false);
                    navigation.navigate("VerifyCode", {
                        phoneNumber: phone
                    });
                }, 1500);
            }
            setLoading(false);
        }
    }

    return (
        <CustomBackground>
            <CustomText text="Enter your mobile number:" t2
                style={{
                    color: colors.neutral2,
                    marginTop: 20
                }} />
            <View style={styles.phone}>
                <FastImage
                    style={{ width: 30, height: 24, marginRight: 10 }}
                    source={require('../../resources/images/vietnam_flag.png')}
                />
                <TextInput
                    value={phone}   //"935 007 581"
                    placeholder={'xxxxxxxxxx'}
                    onChangeText={(text) => {
                        setPhoneNumber(text);
                        if (text.length == 10) {
                            setError('');
                        }
                    }}
                    keyboardType={'number-pad'}
                    style={{
                        color: colors.neutral1,
                        fontSize: 20,
                        borderLeftWidth: 1,
                        borderLeftColor: colors.neutral1,
                        paddingHorizontal: 10,
                        width: '78%',
                    }}
                    maxLength={10}
                />
            </View>

            <CustomText text={error.toString()} t2 style={{ color: 'red' }} />

            <CustomButton
                title="Send"
                type="primary"
                onPress={onSignUp}
            />
            <CustomText text="Buy cotinuing you may receive an SMS for verification. Message and data rates may apply."
                s style={{ color: colors.neutral2 }} />

            <LoadingOverlay loading={loading} />
        </CustomBackground>
    )
}
const styles = StyleSheet.create({
    phone: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginVertical: 20,
        borderWidth: 1,
        borderColor: colors.neutral2,
        height: 48,
        borderRadius: 12,
        alignItems: 'center',
        backgroundColor: colors.neutral4,
    }
})