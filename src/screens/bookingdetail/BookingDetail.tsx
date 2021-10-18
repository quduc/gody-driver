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
    onCancel?: () => void;
}
export const BookingDetail: FC<Props> = (props) => {
    const { isOpenFullModal, origin, destination, fare, onCancel, onPress } = props;


    return (
        <CustomBackground>
            {/* {isOpenFullModal && <View style={{ height: 50 }} />} */}

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
                    t2
                    text={`Phone: 0916495188`}
                    style={{ marginTop: 10 }}
                />
                <CustomText
                    p1
                    text={`Joined Step 2020`}
                    style={{ color: colors.neutral2 }}
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
                    text="Trường THPT Thị xã Quảng Trị"
                />
                <CustomTextFieldWithIcon
                    icon={require('../../resources/images/marker.png')}
                    text={"Khách sạn Mường Thanh Đông Hà"}
                />
                <CustomTextFieldWithIcon
                    icon={require('../../resources/images/payment.png')}
                    text={`33.5$`}
                    textBold
                />
                <CustomTextFieldWithIcon
                    icon={require('../../resources/images/godypass.png')}
                    text={`KMA25`}
                    textBold
                />
            </View>
            <CustomButton
                type="primary"
                title="Confirm booking"
                onPress={onPress}
            />
            <CustomButton
                type="light"
                title="Cancel booking"
                onPress={onCancel}
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