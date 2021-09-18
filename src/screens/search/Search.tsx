import { RouteProp, useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react';
import React, { FC, useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { getDistanceAndTime } from '../../API';
import { CustomButton } from '../../components/CustomButton';
import { CustomHeaderLeft } from '../../components/CustomHeaderLeft';
import { CustomTextFieldWithIcon } from '../../components/CustomTextFiledWithIcon';
import { GooglePlacesInput } from '../../components/GooglePlacesInput';
import { LoadingOverlay } from '../../components/LoadingOverlay';
import { colors } from '../../contants/colors';
import constants from '../../contants/contants';
import { socket } from '../../socketIO';
import { useStore } from '../../store/useStore';
import { DriverLocation, Location } from '../../types';
import { calculateFare } from '../../utils/CalculateFare';
import { destination as mockDestination } from '../../mockData';
interface Props {
    // route: RouteProp<{ params: { origin: Location } }, 'params'>
}
const destinationDummy = {
    "location": {
        "lat": 16.6328871,
        "lng": 106.7383723
    },
    "description": "Green Hotel"
}
export const Search: FC<Props> = observer((props) => {
    const navigation = useNavigation<any>();
    const store = useStore();
    const [destination, setDestination] = useState<Location>(mockDestination);
    const [loading, setLoading] = useState<boolean>(false);
    const [nearByDrivers, setNearByDrivers] = useState<DriverLocation[]>();

    store.saveBooking({
        ...store.booking!, destination : mockDestination
    })
    useEffect(() => {
        navigation.setOptions({
            headerTransparent: false,
            headerLeft: () => <CustomHeaderLeft type='goback' onPress={() => navigation.goBack()} />
        })
    }, []);


    const onGoToChooseCar = async () => {
        setLoading(true);
        // const response = await getDistanceAndTime(store.booking?.origin, store.booking?.destination);
        // if (response.status === 'OK') {
        //     const totalFare = calculateFare(response.rows[0].elements[0].distance, response.rows[0].elements[0].duration);
        //     store.saveBooking({
        //         ...store.booking!,
        //         distance: response.rows[0].elements[0].distance,
        //         duration: response.rows[0].elements[0].duration,
        //         fare: totalFare
        //     })
        //     navigation.navigate("ChooseCar");
        // } else {
        //     Alert.alert(
        //         "",
        //         `${response.error_message}`,
        //         [
        //             { text: "OK", onPress: () => console.log("OK Pressed") }
        //         ]
        //     )
        // }


        //gửi yêu cầu lấy địa điểm của các tài xế gần nhất
        socket.emit("getMap", {
            "longitude": 105.7940398,
            "latitude": 20.9808164
        });

        //lắng nghe 
        socket.on("getMapResponse", (response: DriverLocation[]) => {
            setNearByDrivers(response);
            console.log({response});
            
        });

        //dummy 
        store.saveBooking({
            ...store.booking!,
            distance: {
                value: 17.800,
                text: '17kms'
            },
            duration: {
                value: 12000,
                text: '12m',
            },
            fare: 25,
            nearByDrivers,
            defaultFare:25,

        })
        navigation.navigate("ChooseCar", {
            defaultFare: store.booking?.fare
        });
        setLoading(false);
    }
    return (
        <View style={styles.container} >
            <View style={styles.row}>
                <View style={styles.dot} />
                <View style={{ width: 10 }} />
                <View style={{ width: constants.widthDevice - 60 }}>
                    <GooglePlacesInput
                        defaultValue={store.booking?.origin.description}
                        placeholder={store.booking?.origin.description}
                    />
                </View>

            </View>
            <View style={styles.row}>
                <View style={styles.dot} />
                <View style={{ width: 10 }} />
                <View style={{ width: constants.widthDevice - 60 }}>
                    <GooglePlacesInput
                        defaultValue={mockDestination.description}
                    />
                </View>
            </View>
            <CustomTextFieldWithIcon
                text="Add home"
                icon={require('../../resources/images/star.png')}
            />
            <CustomTextFieldWithIcon
                text="Set location on map"
                icon={require('../../resources/images/home.png')}
            />

            <View style={{ width: constants.widthDevice - 40, height: 48, marginTop: 100 }}>
                <CustomButton
                    onPress={onGoToChooseCar}
                    title="Next"
                    type="primary"
                />
            </View>
            <LoadingOverlay loading={loading} />
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flex: 1,
        backgroundColor: colors.background,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    dot: {
        position: 'absolute',
        top: 25,
        left: -5,
        width: 16,
        height: 16,
        borderRadius: 16,
        backgroundColor: colors.primary1,

    }
})

