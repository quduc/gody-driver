import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import {
   StyleSheet,
   TouchableOpacity,
   View,
   ScrollView,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import { CustomBackground } from '../../components/CustomBackground';
import { CustomHeaderLeft } from '../../components/CustomHeaderLeft';
import { CustomText } from '../../components/CustomText';
import { colors } from '../../contants/colors';

interface IAddFundProps {
   currentBalance: number;

   tripCost1?: number;     // normal cost

   tripCost2?: number;     // with no promotion
   tripCost2_promote: number; // with promotion

   tripCost3?: number;
   tripCost3_promote: number;
}

export const AddFund: FC<IAddFundProps> = (props) => {
   const navigation = useNavigation<any>();
   useEffect(() => {
      navigation.setOptions({
         headerLeft: () => <CustomHeaderLeft type='goback' onPress={() => navigation.navigate("Payment")} />
      })
   }, [])
   return (
      <CustomBackground>
         <View style={styles.title2}>
            <CustomText text="Current balance:" t2 style={{ color: colors.neutral2 }} />

            <CustomText text={0 + ' đ'} t1 style={{ color: colors.neutral1 }} />
         </View>

         <ScrollView style={{ flex: 1, marginTop: 10 }}>
            <PriceListItem tripCost={10000} carImage={require('../../resources/images/car1.png')} />

            <PriceListItem tripCost={15000} tripCost_promotion={13000} carImage={require('../../resources/images/car2.png')} />

            <PriceListItem tripCost={25000} tripCost_promotion={18000} carImage={require('../../resources/images/car3.png')} />
         </ScrollView>
      </CustomBackground >
   )
}

interface IPriceListItemProps {
   tripCost: number;
   tripCost_promotion?: number;
   carImage: any;
}
const PriceListItem: FC<IPriceListItemProps> = ({ tripCost, tripCost_promotion, carImage }) => {

   return (
      <TouchableOpacity style={styles.priceListItemContainer}>

         {/* icon */}
         <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
               <FastImage
                  style={{ width: 24, height: 18 }}
                  source={require('../../resources/images/godypass2.png')}
                  tintColor={colors.primary1}
               />
            </View>
         </View>

         <View style={styles.divider} />

         <View style={styles.tripInfoContainer}>
            {/* trip cost */}
            <View style={[styles.tripInfo]}>
               <CustomText text="You'll pay:" p2 style={{ color: colors.black }} />
               {tripCost_promotion ? (
                  <>
                     <CustomText text={tripCost + " đ"} t2 style={styles.promotionCost} />
                     <CustomText text={tripCost_promotion + " đ"} t2 style={{ color: colors.primary1 }} />
                  </>
               ) : (
                  <CustomText text={tripCost + " đ"} t2 style={{ color: colors.black, marginTop: 10 }} />
               )}

            </View>

            {/* car image */}
            <View style={{
               flex: 2,
               justifyContent: 'center',
               alignItems: 'center'
            }}>
               <FastImage
                  style={styles.carImgStyle}
                  source={carImage}
                  resizeMode="cover"
               />
            </View>
         </View>


      </TouchableOpacity>
   )
}

const styles = StyleSheet.create({
   title2: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
   },

   priceListItemContainer: {
      flexDirection: 'row',
      marginVertical: 10,
      height: 106,
      borderWidth: 1,
      borderColor: colors.neutral3,
      borderRadius: 12,
   },
   iconContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   iconCircle: {
      width: 50,
      height: 50,
      backgroundColor: colors.neutral4,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center'
   },

   tripInfoContainer: {
      flex: 3,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
   },
   tripInfo: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   },

   divider: {
      borderLeftWidth: 1,
      borderStyle: 'dashed',
      borderColor: colors.neutral3,
      height: '90%',
      marginVertical: 5
   },

   carImgStyle: {
      width: 120,
      height: 60,
      transform: [{ scale: 1.2 }]
   },
   promotionCost: {
      color: colors.neutral2,
      textDecorationLine: "line-through",
      textDecorationColor: colors.neutral2,
      marginVertical: 3
   },
});