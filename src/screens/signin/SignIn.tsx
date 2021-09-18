import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import FastImage from 'react-native-fast-image';
import { getMe, loginApp } from '../../API';
import { CustomBackground } from '../../components/CustomBackground';
import { CustomButton } from '../../components/CustomButton';
import { CustomHeaderLeft } from '../../components/CustomHeaderLeft';
import { CustomText } from '../../components/CustomText';
import { LoadingOverlay } from '../../components/LoadingOverlay';
import { colors } from '../../contants/colors';
import { useStore } from '../../store/useStore';

export const SignIn: FC = () => {
    const navigation = useNavigation<any>();
    const [phone, setPhone] = useState<string>('0964232825');
    const [password, setPassword] = useState<string>('Toanh123!@#');
    const [loading, setLoading] = useState<boolean>(false);
    const store = useStore();
    useEffect(() => {
        navigation.setOptions({
            headerTransparent: false,
            headerLeft: () => <CustomHeaderLeft type="goback" onPress={() => navigation.navigate("Top")} />
        })
    }, [])

    const onLogin = async () => {
        setLoading(true);
        const response = await loginApp(phone, password);
        if (response.__typename !== 'ErrorResponse') {
            const userResponseAPI = await getMe();
            if (userResponseAPI.__typename !== 'ErrorResponse') {
                store.saveUser(userResponseAPI.result);
                store.saveAuth(response.result);
                navigation.navigate("BookingStack");
            }

        }
        setLoading(false);
    }
    return (
        <CustomBackground>
            <CustomText text="Enter your phone number:" t2 style={{ color: colors.neutral2, marginVertical: 20 }} />
            <View style={styles.phone}>
                <FastImage
                    style={{ width: 30, height: 24 }}
                    source={require('../../resources/images/vietnam_flag.png')}
                />
                <TextInput
                    value={phone}
                    onChangeText={(text) => setPhone(text)}
                    style={{
                        color: colors.neutral1,
                        fontSize: 18,
                        borderLeftWidth: 1,
                        borderLeftColor: colors.neutral1,
                        paddingHorizontal: 10,
                        marginLeft: 15
                    }}
                />
            </View>
            <CustomText text="Enter your password:" t2 style={{ color: colors.neutral2, marginVertical: 20 }} />
            <View style={styles.phone}>
                <TextInput
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry
                    placeholder="Enter your password"
                    style={{
                        color: colors.neutral1,
                        fontSize: 18,
                        paddingHorizontal: 10,
                        width: '100%'
                    }}
                />
            </View>

            <CustomButton
                title="Submit"
                type="primary"
                onPress={onLogin}
            />
            <LoadingOverlay loading={loading} />
        </CustomBackground>
    )
}
const styles = StyleSheet.create({
    phone: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: colors.neutral2,
        height: 48,
        borderRadius: 12,
        alignItems: 'center'
    }
})