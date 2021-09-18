import React from 'react';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { CustomBackground } from '../../components/CustomBackground';
import { CustomButton } from '../../components/CustomButton';
import { CustomText } from '../../components/CustomText';
import { colors } from '../../contants/colors';
import constants from '../../contants/contants';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import BottomSheet, { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';


export const Help: FC = () => {
   return (
      <View style={styles.container}>
         <View style={styles.config_general}>
            <CustomText text="Your last trip:" t3 style={{ color: colors.neutral2, marginVertical: 20 }} />

            <View style={styles.trip_infor}>
               {/* time infor */}
               <CustomText text="Today.3:45 PM" t2 style={{ color: colors.neutral2, marginVertical: 20 }} />

               {/* fee infor */}
               <CustomText text="$14.00" t2 style={{ color: colors.neutral2, marginVertical: 20 }} />
            </View>
            {/* place infor */}
            <CustomText text="Toyota Camry" s style={{ color: colors.neutral2, marginVertical: 20 }} />
         </View>

         {/* map display */}


      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   map: {
      height: constants.heightDevice * 0.5,
      width: constants.widthDevice,
   },
   config_general: {
      paddingHorizontal: 20,
      backgroundColor: colors.background
   },


   trip_infor: {
      flexDirection: 'row',
      justifyContent: 'space-between'
   }
});