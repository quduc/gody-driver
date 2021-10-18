import { useNavigation } from '@react-navigation/core';
import { observer } from 'mobx-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { CustomButton } from '../../components/CustomButton';
import { CustomHeaderLeft } from '../../components/CustomHeaderLeft';
import { CustomText } from '../../components/CustomText';
import { colors } from '../../contants/colors';
import constants from '../../contants/contants';
import { useStore } from '../../store/useStore';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { MapContainer } from '../mapcontainer/MapContainer';
import { socket } from '../../socketIO';

import LottieView from 'lottie-react-native';
import { origin } from '../../mockData';



interface Props { }
export const ConfirmBooking: FC<Props> = observer((props) => {
    const store = useStore();
    const { booking } = store;
    const navigation = useNavigation<any>();
    const bottomSheetModalRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['55%', '100%'], []);
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <CustomHeaderLeft type='openDrawer' onPress={() => navigation.openDrawer()} />
        })
    }, [])

    const onRequestBooking = () => {

        socket.emit('updateLocation', {
            "longitude": 105.795949,
            "latitude": 20.980691
        })

        setShowModal(true);
        bottomSheetModalRef.current?.close();
        setTimeout(() => {
            navigation.navigate("UpComingTrip", {
                "tripId": "6145afba644f2909c8fcfa8c"
            });
        }, 4000);

        // socket.on('customerBooking', (res) => {
        //     if (res) {
        //         navigation.navigate("UpComingTrip", {
        //             "tripId": "6145afba644f2909c8fcfa8c"
        //         });
        //     }
        // });
    }

    const renderWatingModal = () => {
        return (
            <View style={styles.modal}>
                <CustomText t2 text="Looking for a customer ..." style={{ textAlign: 'center' }} />
                <LottieView style={{
                    width: constants.widthDevice - 200,
                    height: constants.widthDevice - 200,
                }} source={require('../../resources/images/findCustomer.json')} autoPlay loop />
                <CustomButton type="primary" title="Cancel Booking" onPress={() => {
                    setShowModal(false);
                    bottomSheetModalRef.current?.snapTo(0);
                }} />

            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={showModal ? styles.mapFull : styles.map}>
                <MapContainer
                    origin={origin}
                />
            </View>
            {
                showModal && renderWatingModal()
            }
            <BottomSheet
                ref={bottomSheetModalRef}
                index={0}
                snapPoints={snapPoints}>
                <BottomSheetScrollView contentContainerStyle={{
                    paddingHorizontal: 20,
                    paddingBottom: 20,
                }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <FastImage
                            style={{ width: 250, height: 127, marginBottom: 10 }}
                            source={require('../../resources/images/godyPremium.png')}
                            resizeMode="cover"
                        />
                    </View>
                    <View>
                        <View style={styles.bookingInfo}>
                            <View>
                                <CustomText t2 text="GODY Premium" style={{ color: colors.neutral1 }} />
                                <CustomText p2 text="Seats:4" style={{ color: colors.neutral2 }} />
                                <CustomText p2 text="Premium car" style={{ color: colors.neutral2 }} />
                                <CustomText p2 text="Biển số: 74A: 20739" style={{ color: colors.neutral2 }} />
                                <CustomText p2 text="Loại xe: Toyota " style={{ color: colors.neutral2 }} />
                            </View>

                        </View>
                        <View style={{ width: constants.widthDevice - 40, height: 48, marginTop: 10 }}>
                            <CustomButton type="primary" title={`Can booking`} onPress={onRequestBooking} />
                        </View>

                    </View>
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
        height: constants.heightDevice * 0.45,
        width: constants.widthDevice,
    },
    mapFull: {
        height: constants.heightDevice,
        width: constants.widthDevice,
    },
    bookingInfo: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: 150,
        backgroundColor: colors.white,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        marginVertical: 10
    },
    modal: {
        position: 'absolute',
        width: constants.widthDevice - 80,
        height: constants.widthDevice - 80,
        top: (constants.heightDevice - (constants.widthDevice - 80)) / 2,
        left: 40,
        backgroundColor: colors.white,
        borderRadius: 5,
        padding: 20,
        alignItems: 'center'
    }
});