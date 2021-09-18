import BottomSheet, { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { CustomBackground } from '../../components/CustomBackground';
import { CustomButton } from '../../components/CustomButton';
import { CustomCardPayment } from '../../components/CustomCardPayment';
import { CustomText } from '../../components/CustomText';
import { colors } from '../../contants/colors';
import constants from '../../contants/contants';

interface Props { }
export const GodyPass: FC<Props> = (props) => {

    const navigation = useNavigation<any>();
    useEffect(() => {
        navigation.setOptions({
            headerTransparent: false,
        })
    }, []);

    const bottomSheetModalRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['0%', '100%'], []);
    const onConfirmGodyPass = useCallback(() => {
        bottomSheetModalRef.current?.snapTo(1);
    }, []);
    return (
        <CustomBackground>
            <View style={{ overflow: 'hidden' }}>
                <TouchableOpacity
                    style={styles.serviceContainer}>
                    <FastImage
                        style={{ width: 98, height: 80, marginRight: 5 }}
                        source={require('../../resources/images/godypass_1.png')}
                        resizeMode="cover"
                    />
                    <View style={{ width: constants.widthDevice - 40 - 120 }}>
                        <CustomText
                            text="Price protect on every trip"
                            t2 style={{ color: colors.neutral1 }}
                        />
                        <CustomText
                            text="Save up to 15% on all routes 
                        when you ride with Gody and Pool in the San Francisco metropolitan  area."
                            p2 style={{ color: colors.neutral1, fontSize: 12 }}
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.serviceContainer}>
                    <FastImage
                        style={{ width: 98, height: 80, marginRight: 5 }}
                        source={require('../../resources/images/godypass_2.png')}
                        resizeMode="cover"
                    />
                    <View style={{ width: constants.widthDevice - 40 - 120 }}>
                        <CustomText
                            text="Free delivery on Gody Eats"
                            t2 style={{ color: colors.neutral1 }}
                        />
                        <CustomText
                            text="Save up to 15% on all routes 
                        when you ride with Gody and Pool in the San Francisco metropolitan  area."
                            p2 style={{ color: colors.neutral1, fontSize: 12 }}
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.serviceContainer}>
                    <FastImage
                        style={{ width: 98, height: 80, marginRight: 5 }}
                        source={require('../../resources/images/godypass_3.png')}
                        resizeMode="cover"
                    />
                    <View style={{ width: constants.widthDevice - 40 - 120 }}>
                        <CustomText
                            text="Free JUMP rides"
                            t2 style={{ color: colors.neutral1 }}
                        />
                        <CustomText
                            text="Save up to 15% on all routes 
                        when you ride with Gody and Pool in the San Francisco metropolitan  area."
                            p2 style={{ color: colors.neutral1, fontSize: 12 }}
                        />
                    </View>
                </TouchableOpacity>

                <CustomText
                    text="Trip benefits coverage"
                    t2 style={{ color: colors.neutral1, marginVertical: 10 }}
                />
                <CustomText
                    text="Save up to 15% on all routes when you ride with Gody and Pool in the San Francisco metropolitan  area. Discounts may vary by trip."
                    p2 style={{ color: colors.neutral1 }}
                />
                <View style={{ width: constants.widthDevice - 40, height: 48, marginTop: 20 }}>
                    <CustomButton
                        title="Get a pass"
                        type="primary"
                        onPress={onConfirmGodyPass}
                    />
                </View>
                <View style={{ width: constants.widthDevice - 40, height: 48 }} />
            </View>
            <BottomSheet
                ref={bottomSheetModalRef}
                index={0}
                snapPoints={snapPoints}>
                <BottomSheetScrollView
                    style={{ backgroundColor: colors.white }}
                    contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 80 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <CustomText
                            text="GODY Pass"
                            t1 style={{ color: colors.neutral1 }}
                        />
                        <CustomText
                            text="$24.00/mo"
                            t1 style={{ color: colors.primary1 }}
                        />
                    </View>
                    <CustomText
                        text="Save up to 15% on all routes when you ride with Gody and Pool in the San Francisco metropolitan  area. Discounts may vary by trip."
                        p2 style={{ color: colors.neutral1, marginVertical: 10 }}
                    />

                    <CustomCardPayment
                        iconLeft={require('../../resources/images/visa.png')}
                        cardInfo="*** 9999"
                    />

                    <CustomText
                        text="Save up to 15% on all routes when you ride with Gody and Pool in the San Francisco metropolitan  area. Discounts may vary by trip. Save up to 15% on all routes when you ride with Gody and Pool in the San Francisco metropolitan  area. Discounts may vary by trip. Save up to 15% on all routes when you ride with Gody and Pool in the San Francisco metropolitan  area."
                        p2 style={{ color: colors.neutral1, marginVertical: 10 }}
                    />
                    <View style={{ width: constants.widthDevice - 40, height: 48, marginTop: 10 }}>
                        <CustomButton
                            type="primary"
                            title="Buy"
                        />
                    </View>

                </BottomSheetScrollView>
            </BottomSheet>
        </CustomBackground>
    )
}

const styles = StyleSheet.create({
    serviceContainer: {
        marginBottom: 10,
        alignItems: 'center',
        marginHorizontal: 2,
        marginTop: 2,
        backgroundColor: colors.white,
        borderRadius: 8,
        width: constants.widthDevice - 44,
        height: 150,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
        flexDirection: 'row'
    }
})