import { RouteProp } from '@react-navigation/native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { FC } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import FastImage from 'react-native-fast-image';
import { verifyOTP } from '../../API';
import { CustomBackground } from '../../components/CustomBackground';
import { CustomButton } from '../../components/CustomButton';
import { CustomText } from '../../components/CustomText';
import { LoadingOverlay } from '../../components/LoadingOverlay';
import { colors } from '../../contants/colors';

interface IVeriyCode {
    route: RouteProp<{ params: { phoneNumber: string } }, 'params'>
}
export const VerifyCode: FC<IVeriyCode> = ({ route: { params: { phoneNumber } } }) => {
    const navigation = useNavigation<any>();

    const [verifyCode, setVerifyCode] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const [seconds, setSeconds] = useState<any>(60);
    const [done, setDone] = useState<boolean>(false);
    const foo = useRef<any>();

    useFocusEffect(
        React.useCallback(() => {
            navigation.setOptions({
                headerTransparent: false,
                headerLeft: () => (
                    <TouchableOpacity activeOpacity={0.8} style={{ width: 24, height: 24 }} onPress={() => navigation.navigate("SignUp")}>
                        <FastImage
                            source={require('../../resources/images/back.png')}
                            style={{ width: 24, height: 24 }}
                        />
                    </TouchableOpacity>
                )
            });

            setSeconds(60);
            setDone(false);

            foo.current = setInterval(() => {
                setSeconds((prevSeconds: any) => parseInt(prevSeconds) - 1)
            }, 1000);

            return () => {
                clearInterval(foo.current);
                setVerifyCode('');
                setDone(false);
            }

        }, [])
    );

    useEffect(() => {
        if (seconds <= 0) {
            clearInterval(foo.current);
            setDone(true);
            setTimeout(() => {
                Alert.alert(
                    "",
                    "Your OTP code is expired!",
                    [{ text: "OK", onPress: () => navigation.navigate("SignUp") }]
                );
            }, 1500);
        }
    }, [seconds])

    const onVerifyCode = async () => {
        setLoading(true);
        if (verifyCode.length < 4) {
            setLoading(false);
            Alert.alert(
                "",
                "Verified code must not be empty or less than 4 characters!",
                [{ text: "OK", onPress: () => { setVerifyCode('') } }]
            );
        } else {
            const response = await verifyOTP(phoneNumber, verifyCode);
            if (response.__typename !== 'ErrorResponse') {
                setTimeout(() => {
                    setLoading(false);
                    navigation.navigate("Register", {
                        phoneNumber: phoneNumber
                    });
                }, 1500);
            }
            setLoading(false);
        }
    }

    return (
        <CustomBackground>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <CustomText
                    text="Please enter the code has been sent to you at " p1
                />
                <CustomText
                    text={phoneNumber} t2 style={{ color: colors.primary1 }}
                />
            </View>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <TextInput
                    placeholder="x x x x"
                    value={verifyCode}
                    onChangeText={(text) => setVerifyCode(text)}
                    style={styles.input}
                    maxLength={4}
                />
                <TouchableOpacity>
                    <FastImage
                        source={require('../../resources/images/delete.png')}
                        style={{ width: 20, height: 20, marginBottom: -26 }}
                        tintColor={colors.neutral2}
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ marginTop: 100 }}>
                <CustomText text="Didn't recieve it?" style={{ color: colors.neutral1 }} t2 />
                <CustomText text={`Request new code in ${seconds}s`} style={{ color: colors.neutral1, fontSize: 18 }} t2 />

                {done && <CustomText text={`Your code is expired.`} t1 style={{ color: 'red', marginVertical: 10 }} />}

            </TouchableOpacity>
            <CustomButton
                type="primary"
                title="Submit"
                onPress={onVerifyCode}
            />

            <LoadingOverlay loading={loading} />
        </CustomBackground>
    )
}

const styles = StyleSheet.create({
    input: {
        marginTop: 30,
        fontSize: 24,
        fontWeight: 'bold',
        width: '80%',
    }
})