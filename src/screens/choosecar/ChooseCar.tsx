import { useNavigation } from '@react-navigation/core';
import { RouteProp } from '@react-navigation/native';
import { observer } from 'mobx-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FC } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { getDistanceAndTime } from '../../API';
import { CustomButton } from '../../components/CustomButton';
import { CustomCardPayment } from '../../components/CustomCardPayment';
import { CustomHeaderLeft } from '../../components/CustomHeaderLeft';
import { CustomText } from '../../components/CustomText';
import { colors } from '../../contants/colors';
import constants, { carServices } from '../../contants/contants';
import { useStore } from '../../store/useStore';
import { CarService, Location } from '../../types';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { MapContainer } from '../mapcontainer/MapContainer';
import { AddPaymentMethod } from '../../components/AddPaymentMethod';

interface Props { }

export const ChooseCar: FC<Props> = observer((props) => {

    const store = useStore();
    const { booking } = store;

    const [service, setService] = useState<number>(booking?.car_service.id ?? 1);
    const navigation = useNavigation<any>();
    const bottomSheetModalRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['50%', '100%'], []);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <CustomHeaderLeft type='goback' onPress={() => navigation.navigate("Search")} />
        })
    }, [])

    const onChooseCarService = (carServiceID: number) => {
        store.saveBooking({
            ...booking!,
            car_service: carServices[carServiceID - 1],
        })
        setService(carServiceID);
    }
    const confirmPickup = () => {
        store.saveBooking({
            ...booking!,
            fare: booking?.car_service.id === 1 ? booking.defaultFare : booking?.car_service.id === 2 ? booking.defaultFare * 1.5 : booking?.defaultFare! * 2
        })
        navigation.navigate("ConfirmBooking");
    }
    const CarServiceItem = ({ carService }: any) => {
        return (
            <TouchableOpacity
                onPress={() => onChooseCarService(carService.id)}
                style={service === carService.id ? styles.carServiceItemActive : styles.carServiceItem}
            >
                <FastImage
                    style={{ width: 120, height: 59, marginBottom: 10 }}
                    source={carService.image}
                    resizeMode="cover"
                />
                <CustomText text={carService.name} t2 style={{ textAlign: 'center', fontSize: 14 }} />
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: 'center' }}>
                    <FastImage
                        style={{ width: 12, height: 12, marginRight: 5 }}
                        source={require('../../resources/images/user.png')}
                        tintColor={colors.neutral2}
                    />
                    <CustomText text={carService.seats} s style={{ color: colors.neutral1 }} />
                    <FastImage
                        style={{ width: 12, height: 12, marginLeft: 10, marginRight: 5 }}
                        source={require('../../resources/images/clock.png')}
                        tintColor={colors.neutral2}
                    />
                    <CustomText text={booking?.duration.text} s style={{ color: colors.neutral1 }} />
                </View>
                <CustomText text={carService.description} s style={{ marginTop: 10, color: colors.neutral2, textAlign: 'center' }} />
                <CustomText
                    text={`${carService.type === 1 ? booking?.defaultFare
                        : carService.type === 2 ? booking?.defaultFare! * 1.5
                            : booking?.defaultFare! * 2
                        }$`}
                    t1
                    style={{ marginTop: 15, color: colors.primary1, textAlign: 'center' }} />
            </TouchableOpacity>
        )
    }
    const ChooseCarService = () => {
        return (
            <View>
                <CustomText text="Chooose a trip or swipe up for more" t2 />
                <View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {carServices.map((car: CarService) => {
                            return (
                                <CarServiceItem key={car.id} carService={car} />
                            )
                        })}
                    </ScrollView>
                    {/* {booking?.paymentOption ? (
                        <CustomCardPayment
                            cardInfo={booking.paymentOption.cardInfo}
                            iconRight={require('../../resources/images/forward.png')}
                            iconLeft={booking.paymentOption.paymentType === "cash" ? require('../../resources/images/logo.png') : require('../../resources/images/visa.png')}
                            onPress={() => navigation.navigate("ChoosePayment", {
                                screen: "ChooseCar"
                            })}
                        />
                    ) : (
                        <AddPaymentMethod
                            title="Choose payment method"
                            onPress={() => navigation.navigate("ChoosePayment", {
                                screen: "ChooseCar"
                            })}
                        />
                    )} */}

                    <View style={{ width: constants.widthDevice - 40, height: 48, marginTop: 10 }}>
                        <CustomButton type="primary" title="Next" onPress={confirmPickup} />
                    </View>

                </View>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.map}>
                <MapContainer
                    origin={booking?.origin!}
                    destination={booking?.destination}
                    nearByDrivers={booking?.nearByDrivers}
                />
            </View>
            <BottomSheet
                ref={bottomSheetModalRef}
                index={0}
                // onChange={() => setIsOpenFullModal(!isOpenFullModal)}
                snapPoints={snapPoints}>
                <BottomSheetScrollView contentContainerStyle={{
                    paddingHorizontal: 20,
                    paddingBottom: 20,
                }}>
                    <ChooseCarService />

                </BottomSheetScrollView>
            </BottomSheet>
        </View>
    )
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        height: constants.heightDevice * 0.55,
        width: constants.widthDevice,
    },
    search: {
        marginTop: -15,
        height: constants.heightDevice * 0.55 + 15,
        width: constants.widthDevice,
        padding: 20,
        paddingTop: 20,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        backgroundColor: '#fafafa',
        paddingBottom: 80
    },
    btn: {
        flexDirection: 'row',
        width: 117,
        height: 44,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary1,
        marginRight: 20
    },
    carServiceItem: {
        width: 148,
        height: 230,
        borderRadius: 12,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        backgroundColor: colors.background,
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        marginLeft: 10,
        marginTop: 15,
        marginBottom: 2
    },
    carServiceItemActive: {
        width: 148,
        height: 230,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.primary1,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        backgroundColor: colors.background,
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        marginLeft: 10,
        marginTop: 15
    }
});