import { observer } from 'mobx-react';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CustomBackground } from '../../components/CustomBackground';
import { CustomButton } from '../../components/CustomButton';
import { CustomText } from '../../components/CustomText';
import { CustomTextFieldWithIcon } from '../../components/CustomTextFiledWithIcon';
import { colors } from '../../contants/colors';
import { Location } from '../../types';

interface Props {
    isOpenFullModal?: boolean;
    origin?: Location;
    destination?: Location;
    fare?: number;
    onPress?: () => void;
}
export const BookingDetail: FC<Props> = (props) => {
    const { isOpenFullModal, origin, destination, fare } = props;
    
   
    return (
        <CustomBackground>
            {isOpenFullModal && <View style={{ height: 50 }} />}
            <CustomText
                t2
                style={{ color: colors.neutral2 }}
                text="Driver is comming ..."
            />
            <View style={styles.driverInfo}>
                <View style={styles.row}>
                    <FastImage
                        style={{ width: 80, height: 80, borderRadius: 80 }}
                        source={require('../../resources/images/Avatar.png')}
                    />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity style={styles.btnCall}>
                            <FastImage
                                style={{ width: 25, height: 25 }}
                                resizeMode={FastImage.resizeMode.contain}
                                tintColor={colors.primary1}
                                source={require('../../resources/images/message.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnCall}>
                            <FastImage
                                style={{ width: 25, height: 25 }}
                                resizeMode={FastImage.resizeMode.contain}
                                tintColor={colors.primary1}
                                source={require('../../resources/images/call.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <CustomText
                    t2
                    text={`Nguyen Quang Duc - 5.0/5.0 Stars`}
                    style={{ marginTop: 10 }}
                />
                <CustomText
                    p1
                    text={`Joined Nov 2020`}
                    style={{ color: colors.neutral2 }}
                />
                <CustomText
                    t2
                    text={`Toyota 74A: 20739`}
                    style={{ color: colors.neutral1 }}
                />
            </View>
            <View style={styles.devider} />
            <View style={styles.fare}>
                <CustomText
                    t2
                    style={{ color: colors.neutral1 }}
                    text="Trip detail"
                />
                <CustomTextFieldWithIcon
                    icon={require('../../resources/images/home.png')}
                    text={origin?.description}
                />
                <CustomTextFieldWithIcon
                    icon={require('../../resources/images/marker.png')}
                    text={destination?.description}
                />
                <CustomTextFieldWithIcon
                    icon={require('../../resources/images/payment.png')}
                    text={`${fare}$`}
                    textBold
                />
                <CustomTextFieldWithIcon
                    icon={require('../../resources/images/godypass.png')}
                    text={`GODY15`}
                    textBold
                />
            </View>
            <CustomButton
                type="primary"
                title="Finish"
                onPress={props.onPress}
            />
        </CustomBackground>
    )
};

const styles = StyleSheet.create({
    driverInfo: {
        paddingVertical: 20
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btnCall: {
        width: 40,
        height: 40,
        borderColor: colors.neutral3,
        borderRadius: 8,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20
    },
    devider: {
        height: 2,
        backgroundColor: colors.neutral3
    },
    fare: {
        paddingVertical: 20
    }
})