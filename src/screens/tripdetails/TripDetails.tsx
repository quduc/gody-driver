import { RouteProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useRef, useState } from 'react';
import { FC } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import { CustomHeaderLeft } from '../../components/CustomHeaderLeft';
import { colors } from '../../contants/colors';
import constants from '../../contants/contants';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { MapContainer } from '../mapcontainer/MapContainer';
import { CustomText } from '../../components/CustomText';
import FastImage from 'react-native-fast-image';
import { ITripHistory } from '../../types';
import moment from 'moment';
import { destination, origin } from '../../mockData';
interface ITripDetails {
   route: RouteProp<{ params: { item: ITripHistory } }, 'params'>
}
export const TripDetails: FC<ITripDetails> = ({ route: { params: { item } } }) => {

   const navigation = useNavigation<any>();
   const bottomSheetModalRef = useRef<BottomSheet>(null);
   const snapPoints = ['35%', '100%'];
   const [isOpenFullModal, setIsOpenFullModal] = useState<boolean>(false);

   useEffect(() => {
      navigation.setOptions({
         headerTransparent: false,
         headerLeft: () => (
            <TouchableOpacity activeOpacity={0.8} style={{ width: 24, height: 24 }} onPress={() => navigation.navigate("TripsHistory")}>
               <FastImage
                  source={require('../../resources/images/back.png')}
                  style={{ width: 24, height: 24 }}
               />
            </TouchableOpacity>
         )
      });
   }, []);

   const { _id, price, status, payment, createdAt, driver, startLocation, endLocation } = item;
   let time = moment(createdAt).format("dddd, Do YYYY");

   return (
      <View style={styles.container}>
         <View style={styles.map}>
            <MapContainer 
               origin={origin}
               destination={destination}
            />
         </View>
         <BottomSheet
            ref={bottomSheetModalRef}
            index={0}
            onChange={() => setIsOpenFullModal(!isOpenFullModal)}
            snapPoints={snapPoints}>
            <BottomSheetScrollView contentContainerStyle={{
               padding: 20,
            }}>

               {/* trip infor */}
               <View style={styles.tripInfoContainer}>
                  {/* time + car info */}
                  <View style={{ flex: 2, }}>
                     < View style={{ flex: 3, }}>
                        <CustomText text={time} p1 style={{ fontWeight: 'bold' }} />

                        <CustomText text={driver?.name} p2 style={{ color: colors.neutral1, fontWeight: 'normal', fontSize: 18 }} />
                        <CustomText text={driver?.phone} p2 style={{ color: colors.primary2, fontWeight: 'normal' }} />

                        {driver?.transport?.brand && (<CustomText text={`${driver?.transport?.brand}-${driver?.transport?.registrationPlate}`} p2 style={{ color: colors.neutral2, fontWeight: 'normal' }} />)}
                        {driver?.transport?.type && (<CustomText text={`${driver?.transport?.type} trip`} s style={{ color: colors.primary1, fontWeight: 'normal' }} />)}

                     </View >
                  </View>

                  {/* price + status */}
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                     <CustomText text={payment ? `$ ${payment?.amount}` : `$ 0.0`} p1 style={{
                        fontWeight: 'bold',
                        fontSize: 18,
                     }} />
                     <CustomText text={status == 'finished' ? 'completed' : 'canceled'} p2 style={{ color: status == 'finished' ? colors.primary1 : colors.neutral2 }} />
                  </View>
               </View>

               {/* location info */}
               <View style={styles.locationInfor}>
                  {/* location icon */}
                  <View style={{
                     justifyContent: 'center',
                     alignItems: 'center',
                  }}>
                     <FastImage
                        source={require('../../resources/images/Location.png')}
                        style={{ width: 30, height: 80 }}
                        resizeMode='contain'
                        tintColor={colors.primary1}
                     />
                  </View>

                  {/* location place */}
                  <View>
                     <TextInput
                        value={startLocation.name}
                        editable={false}
                        style={styles.displayLocation}
                     />

                     <TextInput
                        value={endLocation.name}
                        editable={false}
                        style={styles.displayLocation}
                     />
                  </View>
               </View>

               {/* other provider infor */}
               <View style={{}}>
                  <CustomText text={'Need help with this trip?'} p2
                     style={{
                        textDecorationLine: 'underline',
                        color: colors.neutral2,
                        fontWeight: 'bold'
                     }} />

                  {/* switch payment method */}
                  <TouchableOpacity style={styles.switchPayment}>
                     <CustomText text={'Switch paymend method'} t2 style={{}} />
                     <CustomText text={'I want to switch my payment method for this trip.'} t3 style={{ color: colors.neutral2, marginVertical: 10 }} />
                     <CustomText text={'Edit payment'} t2 style={{
                        color: colors.primary1,
                        textDecorationLine: 'underline'
                     }} />
                  </TouchableOpacity>

                  {/* other help */}
                  <TouchableOpacity style={styles.helpRow}>
                     <CustomText text={'I was involved in accident'} t3 style={{ color: colors.black }} />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.helpRow}>
                     <CustomText text={'Review my fare or fees'} t3 style={{ color: colors.black }} />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.helpRow}>
                     <CustomText text={'I lost an item'} t3 style={{ color: colors.black }} />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.helpRow}>
                     <CustomText text={'My driver was unprofessional'} t3 style={{ color: colors.black }} />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.helpRow}>
                     <CustomText text={'My vehicle wasn’t what I expected'} t3 style={{ color: colors.black }} />
                  </TouchableOpacity>
               </View>


            </BottomSheetScrollView>
         </BottomSheet >
      </View >
   )
};


const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   map: {
      height: constants.heightDevice * 0.65,
      width: constants.widthDevice,
   },
   tripInfoContainer: {
      flexDirection: 'row',
      width: constants.widthDevice - 40,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderWidth: 1,
      borderColor: colors.neutral3,
      borderRadius: 12,
   },
   helpRow: {
      height: 45,
      padding: 10,
      width: constants.widthDevice - 40,
      borderRadius: 12,
      backgroundColor: '#FFFFFF',
      borderWidth: 1,
      borderColor: colors.neutral3,
      marginVertical: 7,
   },

   displayLocation: {
      backgroundColor: colors.neutral4,
      color: colors.neutral1,
      fontSize: 15,
      marginVertical: 5,
      paddingHorizontal: 15,
      width: constants.widthDevice - 80,
      height: 45,
      borderRadius: 12,
   },
   locationInfor: {
      height: 130,
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5
   },
   switchPayment: {
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderWidth: 1,
      borderColor: colors.neutral3,
      borderRadius: 12,
      marginVertical: 5,
   }
});