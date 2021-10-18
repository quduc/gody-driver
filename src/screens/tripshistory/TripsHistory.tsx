import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import {
   StyleSheet,
   View,
   TouchableOpacity,
   FlatList,
   ActivityIndicator,
} from 'react-native';

import { CustomText } from '../../components/CustomText';
import FastImage from 'react-native-fast-image';
import { colors } from '../../contants/colors';
import constants from '../../contants/contants';
import { getManyTrips } from '../../API';
import { ITripHistory } from '../../types';
import moment from 'moment';


export const TripsHistory: FC = () => {
   const navigation = useNavigation<any>();
   const [tripHistory, setTripHistory] = useState<ITripHistory[]>([]);
   const [loading, setLoading] = useState<boolean>(true);


   const fetchManyTrips = async () => {
      setLoading(true);
      const finishedTrips = await getManyTrips("finished");
      if (finishedTrips.__typename !== 'ErrorResponse') {

         const canceledTrips = await getManyTrips("canceled");
         if (canceledTrips.__typename !== 'ErrorResponse') {

            const tripArr = finishedTrips.result.concat(canceledTrips.result);

            const resultListTrips = tripArr.slice().sort((a: any, b: any) => {
               return +new Date(b.createdAt) - +new Date(a.createdAt);
            });

            setTripHistory(resultListTrips);
         }
      }
      setLoading(false);
   };

   useEffect(() => {
      fetchManyTrips();
   }, []);



   const TripInforItem = (item: ITripHistory) => {
      const { _id, createdAt, payment, driver, status, startLocation, endLocation } = item;

      let time = moment(createdAt).format("h:mma dddd, Do YYYY");
      return (
         <TouchableOpacity style={styles.tripInforContainer}
            onPress={() => {
               navigation.navigate("TripDetails", {
                  item
               });
            }}
         >
            {/* time + car info */}
            < View style={{ flex: 3, }}>
               <CustomText text={time} p1 style={{ fontWeight: 'bold' }} />

               <CustomText text={driver?.name} p2 style={{ color: colors.neutral1, fontWeight: 'normal', fontSize: 18 }} />
               <CustomText text={driver?.phone} p2 style={{ color: colors.primary2, fontWeight: 'normal' }} />

               {driver?.transport?.brand && (<CustomText text={`${driver?.transport?.brand}-${driver?.transport?.registrationPlate}`} p2 style={{ color: colors.neutral2, fontWeight: 'normal' }} />)}
               {driver?.transport?.type && (<CustomText text={`${driver?.transport?.type} trip`} s style={{ color: colors.primary1, fontWeight: 'normal' }} />)}

            </View >

            {/* price + status */}
            <View style={styles.priceInfor} >
               <CustomText text={payment ? `$ ${payment?.amount}` : `$ 0.0`} p1 style={{
                  fontWeight: 'bold',
                  fontSize: 18,
               }} />
               <CustomText text={status == 'finished' ? 'completed' : 'canceled'} p2 style={{ color: status == 'finished' ? colors.primary1 : colors.neutral2 }} />
            </View >
         </TouchableOpacity >
      );
   }
   if (loading) {
      return (
         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator animating size="large" color={colors.primary1} />
         </View>
      )
   }
   return (
      <View style={styles.container}>

         <FlatList<ITripHistory>
            data={tripHistory}
            keyExtractor={item => item._id}
            contentContainerStyle={{
               paddingVertical: 20
            }}
            renderItem={({ item }) => (
               <TripInforItem
                  _id={item._id}
                  createdAt={item.createdAt}
                  payment={item.payment}
                  driver={item.driver}
                  status={item.status}
                  startLocation={item.startLocation}
                  endLocation={item.endLocation}
                  key={item._id}
               />
            )}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListEmptyComponent={() => (
               <View style={{ flex: 1 }}>
                  <FastImage
                     source={require('../../resources/images/noTrips.png')}
                     style={{ width: 350, height: 350 }}
                     resizeMode='contain'
                  />
                  <CustomText text={'You have not catch any trip.'} t2 style={{ flex: 1, alignSelf: 'center', marginTop: 20 }} />
               </View>
            )}
         />

      </View>
   )
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 20,
   },
   tripInforContainer: {
      flexDirection: 'row',
      width: constants.widthDevice - 40,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderWidth: 1,
      borderColor: colors.primary1,
      borderRadius: 12,
   },
   priceInfor: {
      flex: 1,
      alignItems: 'flex-end',
      justifyContent: 'center'
   },
   separator: {
      backgroundColor: colors.neutral4,
      height: 1,
      marginVertical: 10,
   }
});