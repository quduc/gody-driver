import { CommonActions, useNavigation } from '@react-navigation/core';
import { observer } from 'mobx-react';
import React, { useEffect, useRef, useState } from 'react';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { CustomHeaderLeft } from '../../components/CustomHeaderLeft';
import { colors } from '../../contants/colors';
import constants from '../../contants/contants';
import { useStore } from '../../store/useStore';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { MapContainer } from '../mapcontainer/MapContainer';
import { CustomText } from '../../components/CustomText';
import { BookingDetail } from '../bookingdetail/BookingDetail';
import { CustomButton } from '../../components/CustomButton';
import FastImage from 'react-native-fast-image';
import { CustomRatingBar } from '../../components/CustomRatingBar';


interface Props { }
export const UpComingTrip: FC<Props> = observer(() => {

    const store = useStore();
    const { booking } = store;
    const navigation = useNavigation<any>();
    const bottomSheetModalRef = useRef<BottomSheet>(null);
    const snapPoints = ['35%', '100%'];
    const [isOpenFullModal, setIsOpenFullModal] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <CustomHeaderLeft type='goback' onPress={() => navigation.goBack()} />
        })
    }, [])

    const onRatingDriver = () => {
        setShowModal(true);
        bottomSheetModalRef.current?.close();
    }

    const renderWatingModal = () => {
        return (
            <View style={styles.modal}>
                <FastImage
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: 100
                    }}
                    source={require('../../resources/images/Avatar.png')}
                />
                <CustomText t2 text="Glad you enjoy the ride" style={{ textAlign: 'center' }} />
                <CustomRatingBar
                    onRating={true}
                    rate={5}
                    onFinishRating={(rate: number) => console.log({ rate })}
                />
                <CustomButton type="primary" title="Submit" onPress={() => {
                    store.resetBooking();
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: 'Home' }],
                        }),
                    );
                }} />

            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={showModal ? styles.mapFull : styles.map}>
                <MapContainer />
            </View>
            {showModal && renderWatingModal()}
            <BottomSheet
                ref={bottomSheetModalRef}
                index={0}
                onChange={() => setIsOpenFullModal(!isOpenFullModal)}
                snapPoints={snapPoints}>
                <BottomSheetScrollView contentContainerStyle={{
                    paddingVertical: 20,
                }}>
                    <BookingDetail
                        isOpenFullModal={isOpenFullModal}
                        origin={booking?.origin}
                        destination={booking?.destination}
                        fare={booking?.fare}
                        onPress={onRatingDriver}
                    />
                </BottomSheetScrollView>
            </BottomSheet >
        </View >
    )
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        height: constants.heightDevice * 0.65,
        width: constants.widthDevice,
    },
    mapFull: {
        height: constants.heightDevice,
        width: constants.widthDevice,
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