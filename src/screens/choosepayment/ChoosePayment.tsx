import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { View } from 'react-native';
import { AddPaymentMethod } from '../../components/AddPaymentMethod';
import { CustomBackground } from '../../components/CustomBackground';
import { CustomButton } from '../../components/CustomButton';
import { CustomCardPayment } from '../../components/CustomCardPayment';
import { CustomHeaderLeft } from '../../components/CustomHeaderLeft';
import { CustomText } from '../../components/CustomText';
import { colors } from '../../contants/colors';
import constants from '../../contants/contants';
import { useStore } from '../../store/useStore';
import { PaymentOption } from '../../types';


const paymentMethods: PaymentOption[] = [
    {
        paymentType: "cash",
        cardInfo: "GODY Cash",
        cardId: "8888"
    },
    {
        paymentType: "card",
        cardInfo: "**** 9999",
        cardId: "9999"
    }
]
interface Props { }
export const ChoosePayment: FC<Props> = observer((props) => {


    const navigation = useNavigation<any>();
    const store = useStore();
    const { booking } = store;
    const [refresh, setRefresh] = useState<boolean>(false);
    useEffect(() => {
        navigation.setOptions({
            headerTransparent: false,
            headerLeft: () => <CustomHeaderLeft type="goback" onPress={() => navigation.replace("ConfirmBooking")} />
        })
    }, [refresh])
    return (
        <CustomBackground>
            <CustomText text="Payment methods" t2 style={{ color: colors.neutral2, marginTop: 20 }} />

            {paymentMethods.map(method => (
                <CustomCardPayment
                    key={method.cardId}
                    cardInfo={method.cardInfo}
                    iconLeft={method.paymentType === "cash" ? require('../../resources/images/logo.png') : require('../../resources/images/visa.png')}
                    onPress={() => {
                        store.saveBooking({
                            ...booking!,
                            paymentOption: method
                        });
                        setRefresh(!refresh);
                    }}
                    iconRight={booking?.paymentOption?.cardId == method.cardId && require('../../resources/images/checked.png')}
                />
            ))}

            <AddPaymentMethod
                title="Add Payment methods"
                onPress={() => navigation.navigate("AddCar")}
            />

            <CustomText
                style={{ marginTop: 20 }}
                text="Save more using GODY promotion code!"
                t2
            />
            {booking?.promotionCode && (
                <CustomCardPayment
                    cardInfo={booking.promotionCode.promoteCode}
                    iconLeft={require('../../resources/images/free.png')}
                    iconRight={require('../../resources/images/checked.png')}
                // onPress={() => navigation.navigate("ChoosePayment")}
                />
            )}
            <AddPaymentMethod
                onPress={() => navigation.navigate("AddPromotionCode", { screen: "ChoosePayment" })}
                title="Add promotion codes" />

            <View style={{ width: constants.widthDevice - 40, height: 48, marginTop: 10, marginBottom: 20 }}>
                <CustomButton
                    type="primary"
                    title="Sumit"
                    onPress={() => navigation.replace("ConfirmBooking")}
                />
            </View>
        </CustomBackground>
    )
});