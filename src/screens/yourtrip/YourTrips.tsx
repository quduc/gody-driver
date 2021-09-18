// import { useNavigation } from '@react-navigation/core';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { FC } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';

import { CustomHeaderLeft } from '../../components/CustomHeaderLeft';
import { CustomText } from '../../components/CustomText';
import FastImage from 'react-native-fast-image';

import { colors } from '../../contants/colors';
import constants from '../../contants/contants';


// click to each trip and navigate to trip details

interface Props { }
// history trip item
export interface HistoryTripItem {
   id: string;
   datetime: string;
   price: number;
   vehicle?: string;
   status?: string;

   locationFrom?: string;
   locationTo?: string;
}

const tripData = [
   { id: 'a1', datetime: 'Today, 3:45 pm', price: 17000, vehicle: 'Toyota Camry - 9HTR789', status: 'Completed' },
   { id: 'a2', datetime: 'Today, 12:45 pm', price: 0, vehicle: 'Toyota Camry - 9HTR789', status: 'Canceled' },
   { id: 'a3', datetime: 'Today, 6:45 pm', price: 25000, vehicle: 'Toyota Camry - 9HTR789', status: 'Completed' },
   { id: 'a4', datetime: 'Thu, 11:45 am', price: 30000, vehicle: 'Toyota Camry - 9HTR789', status: 'Completed' },
   { id: 'a5', datetime: 'Wed, 7:45 am', price: 0, vehicle: 'Toyota Camry - 9HTR789', status: 'Canceled' },
]
export const YourTrips: FC<Props> = () => {

   // const navigation = useNavigation<any>();
   const [tripHistory, setTripHistory] = useState<HistoryTripItem[]>([]);

   // useEffect(() => {
   //    navigation.setOptions({
   //       headerLeft: () => <CustomHeaderLeft type='goback' onPress={() => navigation.goBack()} />
   //    })
   // }, [])

   // get the history information
   useEffect(() => {
      setTripHistory(tripData);

      return () => { setTripHistory([]); }
   }, [])


   return (
      <ScrollView style={styles.container}>
         {tripHistory ? tripHistory.map(({ id, datetime, price, vehicle, status }) => (
            <TripInforItem id={id} datetime={datetime} price={price} vehicle={vehicle} status={status} key={id.toString()} />
         )) : (
            <View>
               <FastImage
                  source={require('../../resources/images/noTrips.png')}
                  style={{ width: constants.widthDevice - 40 }}
                  resizeMode='cover'
               />
               <CustomText text={'You have not catch any trip.'} t2 style={{ flex: 1, alignSelf: 'center', marginTop: 20 }} />
            </View>
         )}
      </ScrollView >
   )
};

const TripInforItem = ({ id, datetime, price = 0, vehicle, status }: HistoryTripItem) => {

   return (
      <TouchableOpacity style={styles.tripInforContainer}>
         {/* time + car info */}
         <View style={{ flex: 2, }}>
            <CustomText text={datetime} p1 style={{ fontWeight: 'bold' }} />
            {vehicle && (
               <CustomText text={vehicle} p2 style={{
                  color: colors.neutral2,
                  fontWeight: 'normal'
               }} />
            )}
         </View>

         {/* price + status */}
         <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
            <CustomText text={price + ' đ'} p1 style={{
               fontWeight: 'bold',
               fontSize: 18,
            }} />
            <CustomText text={status} p2 style={{
               color: status == 'Completed' ? colors.primary1 : colors.neutral2,
            }} />
         </View>
      </TouchableOpacity>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 20,
   },

   tripInforContainer: {
      flexDirection: 'row',
      height: 70,
      width: constants.widthDevice - 40,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      marginTop: 20,
      borderWidth: 1,
      borderColor: colors.primary1,
      borderRadius: 12,
   },


});