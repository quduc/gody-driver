import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import {
   StyleSheet,
   View,
   TextInput,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import { CustomBackground } from '../../components/CustomBackground';
import { CustomButton } from '../../components/CustomButton';
import { CustomText } from '../../components/CustomText';
import { colors } from '../../contants/colors';
import constants from '../../contants/contants';

import CountryPicker from 'react-native-country-picker-modal';
import { CountryCode, Country } from './sourceData'

import { rewriteVisa, rewriteDate } from '../../utils/CalculateFare';
import { CustomHeaderLeft } from '../../components/CustomHeaderLeft';

interface IAddCardProps { }

export const AddCard: FC<IAddCardProps> = () => {

   const [visaNumber, setVisaNumber] = useState<string>('');
   const [expiredDate, setExpiredDate] = useState<string>('');
   const [cvv, setCvv] = useState<string>('');

   const [countryCode, setCountryCode] = useState<CountryCode>('VN')
   const [country, setCountry] = useState<Country>(null!)

   const [visible, setVisible] = useState<boolean>(false)
   const onSelect = (country: Country) => {
      setCountryCode(country.cca2)
      setCountry(country)
      // {"callingCode": ["51"], "cca2": "PE", "currency": ["PEN"], "flag": "flag-pe", "name": "Peru", "region": "Americas", "subregion": "South America"}
   }
   const switchVisible = () => setVisible(!visible);

   const navigation = useNavigation<any>();
   useEffect(() => {
      navigation.setOptions({
         headerLeft: () => <CustomHeaderLeft type='goback' onPress={() => navigation.navigate("Payment")} />
      })
   }, [])
   return (
      <CustomBackground>

         {/* card number */}
         <View style={{ borderRadius: 12, marginTop: 10 }}>
            <CustomText text="Card number:" t2 style={{ color: colors.neutral2 }} />
            <View style={styles.cardInfo1}>
               <View style={styles.iconContainer}>
                  <FastImage
                     style={{ width: 25, height: 25 }}
                     source={require('../../resources/images/credit_card.png')}
                  />
               </View>
               <TextInput
                  value={visaNumber}
                  onChangeText={(text: string) => {
                     const input: any = rewriteVisa(text);
                     setVisaNumber(input)
                  }}
                  placeholder="xxxx xxxx xxxx xxxx"
                  keyboardType="decimal-pad"
                  style={{
                     flex: 1,
                     color: colors.neutral1,
                     fontSize: 18,
                     paddingHorizontal: 15,
                  }}
                  maxLength={19}
               />
            </View>
         </View>

         <View style={styles.rowInfo2}>
            {/* Exp, date */}
            <View style={{ flex: 1 }}>
               <CustomText text="Exp, date:" t2 style={{ color: colors.neutral2 }} />
               <TextInput
                  onChangeText={(text: string) => {
                     const input: any = rewriteDate(text);
                     setExpiredDate(input)
                  }}
                  value={expiredDate}
                  placeholder="MM/YY"
                  keyboardType="decimal-pad"
                  style={styles.cardInfo2}
                  maxLength={5}
               />
            </View>

            {/* cvv */}
            <View style={{ flex: 1 }}>
               <CustomText text="CVV:" t2 style={{
                  color: colors.neutral2,
               }} />
               <TextInput
                  onChangeText={(text: string) => setCvv(text)}
                  value={cvv}
                  placeholder="123"
                  keyboardType="decimal-pad"
                  style={styles.cardInfo2}
                  maxLength={3}
               />
            </View>
         </View>

         {/* country */}
         <View style={{ borderRadius: 12 }}>
            <CustomText text="Country:" t2 style={{ color: colors.neutral2 }} />
            <View style={styles.cardInfo1}>
               <CountryPicker
                  {...{
                     countryCode,
                     onSelect,
                     allowFontScaling: true,
                     excludeCountries: ['VN'],
                     withFlag: true,               //
                     withCurrencyButton: false,    //
                     withCountryNameButton: true,  //
                     withCallingCodeButton: false, //
                     withFlagButton: true,         //
                     withAlphaFilter: true,         //
                     withEmoji: true,              //
                     withFilter: true,             //
                     withModal: true,              //                    
                     withCallingCode: true,        //
                     disableNativeModal: false,
                     preferredCountries: ['US', 'GB'],
                     modalProps: {
                        visible,
                     },
                     onClose: () => setVisible(false),
                     onOpen: () => setVisible(true),
                  }}
                  visible
               />
            </View>
         </View>

         <View style={styles.btnContainer}>
            <CustomButton
               title="Save"
               type="primary"
            />
         </View>

      </CustomBackground >
   )
}

const styles = StyleSheet.create({
   cardInfo1: {
      backgroundColor: colors.neutral4,
      flexDirection: 'row',
      paddingHorizontal: 5,
      marginVertical: 15,
      height: 45,
      borderRadius: 12,
      alignItems: 'center'
   },
   cardInfo2: {
      backgroundColor: colors.neutral4,
      color: colors.neutral1,
      fontSize: 18,
      marginVertical: 15,
      paddingHorizontal: 15,
      width: 165,
      height: 45,
      borderRadius: 12,
   },
   iconContainer: {
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 10,
   },

   btnContainer: {
      height: 45,
      flex: 1,
      marginTop: 20,
   },
   rowInfo2: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 15,
   }

});