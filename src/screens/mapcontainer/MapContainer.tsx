import React, { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { colors } from '../../contants/colors';
import constants from '../../contants/contants';
import { destination, nearByDrivers, origin } from '../../mockData';
import { DriverLocation, Location } from '../../types';
interface Props {
    origin?: Location;
    destination?: Location;
    nearByDrivers?: DriverLocation[];

}

export const MapContainer: FC<Props> = (props) => {
    // const { origin, nearByDrivers, destination } = props;
    var INITIAL_REGION = {
        latitude: origin?.location.lat,
        longitude: origin?.location.lng,
        latitudeDelta: 0.008922,
        longitudeDelta: 0.008421,
    };

    // map will be zoomed base on location
    if (origin && !destination) {
        INITIAL_REGION = {
            latitude: origin.location.lat,
            longitude: origin.location.lng,
            latitudeDelta: 0.008922,
            longitudeDelta: 0.008421,
        }
    }

    if (origin && destination) {
        INITIAL_REGION = {
            latitude: origin.location.lat,
            longitude: origin.location.lng,
            latitudeDelta: 0.15,
            longitudeDelta: 0.15,
        }
    }

    return (
        <MapView
            maxZoomLevel={20}
            // zoomEnabled={false}
            // scrollEnabled={false}
            provider={PROVIDER_GOOGLE}
            style={StyleSheet.absoluteFillObject}
            initialRegion={INITIAL_REGION}
        >
            {origin &&
                <Marker
                    key='origin'
                    coordinate={{ latitude: origin.location.lat, longitude: origin.location.lng }}
                />
            }
            {destination &&
                <Marker
                    key='distination'
                    coordinate={{ latitude: destination.location.lat, longitude: destination.location.lng }}
                >
                    <Image
                        source={require('../../resources/images/marker.png')}
                        style={{
                            width: 40,
                            height: 40,
                            tintColor: colors.primary1
                        }}
                    />
                </Marker>
            }
            {nearByDrivers && nearByDrivers.map(driver => (
                <Marker
                    key={driver._id}
                    coordinate={{ latitude: driver.location.coordinates[1], longitude: driver.location.coordinates[0] }}
                >
                    <Image
                        source={require('../../resources/images/car_map.png')}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30,
                        }}
                    />
                </Marker>
            ))
            }
            {/* {origin && destination && (
                <MapViewDirections
                    origin={{
                        latitude:origin.location.lat,
                        longitude:origin.location.lng
                    }}
                    destination={{
                        latitude:destination.location.lat,
                        longitude:destination.location.lng
                    }}
                    apikey={constants.distanceMatrixKeyAPI}
                />
            )} */}
        </MapView>
    )
}

const styles = StyleSheet.create({
    dot: {
        width: 26,
        height: 26,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.white,
        backgroundColor: colors.primary1,

    }
})

