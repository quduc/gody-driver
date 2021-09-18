import { useNavigation } from '@react-navigation/core';
import React, { FC, useEffect } from 'react';
import {
   StyleSheet,
   View,
   TouchableOpacity
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { AddPaymentMethod } from '../../components/AddPaymentMethod';
import { CustomBackground } from '../../components/CustomBackground';
import { CustomHeaderLeft } from '../../components/CustomHeaderLeft';
import { CustomText } from '../../components/CustomText';
import { colors } from '../../contants/colors';

interface IPayment { }
const Payment: FC<IPayment> = () => {
   const navigation = useNavigation<any>();
   useEffect(() => {
      navigation.setOptions({
          headerTransparent: false,
          headerLeft: () => <CustomHeaderLeft type="openDrawer" onPress={() => navigation.openDrawer()} />
      })
  }, [])
   return (
      <CustomBackground>
         {/* add fund */}
         <TouchableOpacity style={styles.shadowConfig}>
            <View style={styles.boxContainer}>
               <View style={{ flexDirection: 'row' }}>
                  <FastImage
                     style={{ width: 36, height: 24, marginRight: 10 }}
                     source={require('../../resources/images/credit_card.png')}
                     resizeMode={'contain'}
                  />
                  <CustomText text={".... .... .... 6789"} p2 style={{ color: colors.black }} />
               </View>

               <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                  <CustomText text={"0 đ"} t1 style={{ color: colors.black }} />
                  <View style={{ flexDirection: 'row' }}>
                     <CustomText text={"Plan ahead."} s style={{ color: colors.neutral1 }} />
                     <CustomText text={"Get up to 5% off"} s style={{ color: colors.primary1 }} />
                  </View>
                  <AddPaymentMethod title="Add funds" onPress={() => navigation.navigate("AddFund")} />
               </View>
            </View>
         </TouchableOpacity>

         {/* add payment method */}
         <CustomText text={"Payment methods"} s style={{ color: colors.neutral2 }} />
         <TouchableOpacity style={styles.shadowConfig}>
            <View style={styles.boxContainer}>
               <View style={styles.paymentMethodRow}>
                  <FastImage
                     style={{ width: 36, height: 24, marginRight: 10 }}
                     source={require('../../resources/images/visa.png')}
                     resizeMode={'contain'}
                  />
                  <CustomText text={".... .... .... 6789"} p2 />
               </View>

               <View style={[styles.paymentMethodRow, { marginTop: 10 }]}>
                  <FastImage
                     style={{ width: 36, height: 24, marginRight: 10 }}
                     source={require('../../resources/images/payment.png')}
                     tintColor={colors.primary1}
                     resizeMode={'contain'}
                  />
                  <CustomText text={"Cash"} p2 />
               </View>
               <AddPaymentMethod title="Add payment methods" onPress={() => navigation.navigate("AddCard")} />
            </View>

         </TouchableOpacity>

         {/* add credit card */}
         <TouchableOpacity style={styles.shadowConfig}>
            <View style={[styles.boxContainer, { justifyContent: 'center', alignItems: 'center' }]}>
               <FastImage
                  style={{ width: 40, height: 28 }}
                  source={require('../../resources/images/gift.png')}
                  resizeMode={'contain'}
                  tintColor={colors.primary2}
               />
               <CustomText text={"PIN/gift code"} s style={{ color: colors.neutral1, marginTop: 10 }} />

               <AddPaymentMethod title="Add promotion code" onPress={() => navigation.navigate("AddPromotionCode", { screen: "Payment" })} />
            </View>
         </TouchableOpacity>
      </CustomBackground >
   )
}
const styles = StyleSheet.create({
   shadowConfig: {
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,

      marginBottom: 20,
      marginVertical: 10,
      borderRadius: 12,
   },
   boxContainer: {
      borderRadius: 12,
      backgroundColor: colors.background,
      paddingVertical: 20,
      paddingHorizontal: 20,
   },
   bottomBox: {
      width: '100%',
      height: 45,
      borderRadius: 12,
      borderWidth: 1,
      borderStyle: 'dashed',
      borderColor: colors.neutral3,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10
   },
   paymentMethodRow: {
      height: 36,
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: colors.neutral4,
   },

})
export default Payment
