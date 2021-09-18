import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FC } from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { CustomBackground } from '../../components/CustomBackground';
import { CustomButton } from '../../components/CustomButton';

export const Top: FC = () => {
    const navigation = useNavigation<any>();
    return (
        <CustomBackground>
            <View style={{ alignItems: 'center' }}>
                <FastImage
                    source={require('../../resources/images/logo_text.png')}
                    style={{ width: 200, height: 200 }}
                    resizeMode="contain"
                />
            </View>

            <FastImage
                source={require('../../resources/images/signin.png')}
                style={{ width: 350, height: 350 }}
                resizeMode="contain"
            />
            <View style={{ marginVertical: 80 }}>
                <CustomButton
                    onPress={()=>navigation.navigate("SignIn")}
                    type="primary"
                    title="Sign In"
                />
                <CustomButton
                    onPress={()=>navigation.navigate("SignUp")}
                    type="light"
                    title="New to GODY? Sign Up"
                />
            </View>
        </CustomBackground>
    )
}