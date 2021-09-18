import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useRef, useState } from 'react';
import { FC } from 'react';
import { ActivityIndicator, StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import { CustomHeaderLeft } from '../../components/CustomHeaderLeft';
import { colors } from '../../contants/colors';
import constants from '../../contants/contants';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { MapContainer } from '../mapcontainer/MapContainer';
import { CustomText } from '../../components/CustomText';
import FastImage from 'react-native-fast-image';

import { HistoryTripItem } from '../yourtrip/YourTrips';

// interface IProps {
//    id: string;
//    datetime: string;
//    price: number;
//    vehicle?: string;
//    status?: string;

//    locationFrom: string;
//    locationTo: string;
// }
export const TripDetails: FC<HistoryTripItem> = (props) => {

   // const navigation = useNavigation<any>();
   const bottomSheetModalRef = useRef<BottomSheet>(null);
   const snapPoints = ['35%', '100%'];
   const snapPointsFinding = ['35%', '100%'];
   const [finding, setFinding] = useState<boolean>(true);
   const [isOpenFullModal, setIsOpenFullModal] = useState<boolean>(false);

   // useEffect(() => {
   //    navigation.setOptions({
   //       headerLeft: () => <CustomHeaderLeft type='goback' onPress={() => navigation.goBack()} />
   //    })
   // }, [])


   const {
      id,
      datetime = 'Today, 3:45pm',
      price = '17000',
      vehicle = 'Toyota Camry - 9HTR789',
      status = 'Completed',
      locationFrom = 'Apple Union Square',
      locationTo = 'San Fancisco International Airport' } = props;

   return (
      <View style={styles.container}>
         <View style={styles.map}>
            <MapContainer />
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
                     <CustomText text={datetime} p1 style={{ fontWeight: 'bold' }} />
                     {vehicle && (
                        <CustomText text={vehicle} p2 style={{ color: colors.neutral2, fontWeight: 'normal' }} />
                     )}
                  </View>

                  {/* price + status */}
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                     <CustomText text={price + ' đ'} p1 style={{ fontWeight: 'bold' }} />
                     <CustomText text={status} p2 style={{
                        color: status == 'Completed' ? colors.primary1 : 'red',

                     }} />
                  </View>
               </View>

               {/* location info */}
               <View style={{
                  height: 130,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5
               }}>
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
                        value={locationFrom}
                        editable={false}
                        style={styles.displayLocation}
                     />

                     <TextInput
                        value={locationTo}
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
                  <TouchableOpacity style={{
                     padding: 10,
                     borderWidth: 1,
                     borderColor: colors.neutral3,
                     borderRadius: 12,
                     marginVertical: 5,
                  }}>
                     <CustomText text={'Switch paymend method'} t2 style={{}} />
                     <CustomText text={'I want to switch my payment method for this trip.'} t3 style={{ color: colors.neutral2, marginVertical: 5 }} />
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
   }
});