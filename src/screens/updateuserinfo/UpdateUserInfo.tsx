import { RouteProp } from '@react-navigation/core';
import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { updateProfile } from '../../API';
import { CustomBackground } from '../../components/CustomBackground';
import { CustomButton } from '../../components/CustomButton';
import { CustomHeaderLeft } from '../../components/CustomHeaderLeft';
import { CustomInput } from '../../components/CustomInput';
import { CustomText } from '../../components/CustomText';
import { LoadingOverlay } from '../../components/LoadingOverlay';
import { colors } from '../../contants/colors';

interface Props {
    route: RouteProp<{
        params: {
            infoField: string;
            fieldValue: string;
            labelField: string;
            _id: string;
        }
    }, 'params'>
}
export const UpdateUserInfo: FC<Props> = ({ route: { params: { infoField, fieldValue, labelField, _id } } }) => {
    const navigation = useNavigation<any>();
    const [valueUpdate, setValueUpdate] = useState<string>(fieldValue);
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        navigation.setOptions({
            headerTransparent: false,
            headerLeft: () => <CustomHeaderLeft type="goback" onPress={() => navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        { name: 'EditAccount' }
                    ]
                })
            )} />
        })
    }, []);
    const onUpdateProfile = async () => {
        if (valueUpdate) {
            setLoading(true);
            const response = await updateProfile(infoField, valueUpdate, _id);
            if (response.__typename !== 'ErrorResponse') {
                navigation.navigate("EditAccount");
            }
        }
        setLoading(false);

    }
    return (
        <CustomBackground>
            <View style={{ marginTop: 10 }}>
                <CustomText text={labelField} t2 style={{ color: colors.neutral2 }} />
                <CustomInput
                    value={valueUpdate}
                    onChangeText={(text) => setValueUpdate(text)}
                />
            </View>
            <CustomButton
                type="primary"
                title={`Update ${labelField}`}
                onPress={onUpdateProfile}
            />
            <LoadingOverlay loading={loading} />
        </CustomBackground>
    )
}