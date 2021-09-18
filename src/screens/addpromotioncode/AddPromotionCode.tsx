import { RouteProp, useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { StyleSheet, TouchableOpacity, View, TextInput } from 'react-native';
import FastImage from 'react-native-fast-image';

import { CustomBackground } from '../../components/CustomBackground';
import { CustomButton } from '../../components/CustomButton';
import { CustomHeaderLeft } from '../../components/CustomHeaderLeft';
import { CustomText } from '../../components/CustomText';
import { colors } from '../../contants/colors';
import constants from '../../contants/contants';
import { useStore } from '../../store/useStore';
import { IPromotionCodeItem } from '../../types';

const promotionCode: IPromotionCodeItem[] = [
   { "id": 1, "promoteCode": 'KMA15', fee: 1.5 },
   { "id": 2, "promoteCode": 'KMA25', fee: 2.5 },
   { "id": 3, "promoteCode": 'KMA50', fee: 5 },
   { "id": 4, "promoteCode": 'KMA10', fee: 1 },
];

interface Props {
   route: RouteProp<{ params: { screen?: string } }, 'params'>
}
export const AddPromotionCode: FC<Props> = observer(({ route: { params: { screen } } }) => {
   const [code, setCode] = useState<IPromotionCodeItem>();
   const store = useStore();
   const { booking } = store;
   const navigation = useNavigation<any>();
   useEffect(() => {
      navigation.setOptions({
         headerTransparent: false,
         headerLeft: () => <CustomHeaderLeft
            type='goback'
            onPress={() => navigation.navigate(screen)} />
      })
   }, []);

   const onSubmit = () => {
      if (booking?.destination) {
         store.saveBooking({
            ...booking!,
            promotionCode: code
         });
         navigation.replace(screen);
      } else {
         navigation.navigate(screen);

      }
   }

   return (
      <CustomBackground>
         <CustomText text="Enter your promotion code:" p2 style={{ color: colors.neutral2, fontWeight: 'bold' }} />
         <View style={
            [styles.promoteCode, {
               borderColor: colors.neutral2,
               marginBottom: 10
            }]}>
            <FastImage
               style={{ width: 22, height: 22, marginRight: 20 }}
               source={require('../../resources/images/gift.png')}
               tintColor="red"
            />
            <TextInput
               placeholder="PROMOTION CODE"
               value={code?.promoteCode}
               style={styles.inputCode}
            />
         </View>

         <View style={styles.listCodes}>
            {
               promotionCode.map(code => {
                  return (
                     <TouchableOpacity key={code.id} style={styles.promoteCode}
                        onPress={() => setCode(code)}
                     >
                        <View style={styles.iconContainer}>
                           <FastImage
                              style={{ width: 26, height: 26, marginRight: 20 }}
                              source={require('../../resources/images/free.png')}
                              resizeMode={FastImage.resizeMode.contain}
                              tintColor={colors.primary1}
                           />
                        </View>
                        <View style={styles.feeContainer}>
                           {/* config and display the fee number */}
                           <CustomText text={code.promoteCode} t2 style={{ color: colors.neutral2 }} />
                           <CustomText text={`- ${code.fee}$`} t2 style={styles.feeText} />
                        </View>
                     </TouchableOpacity>
                  )
               })
            }
         </View>

         <View style={styles.btnContainer}>
            <CustomButton
               onPress={onSubmit}
               title="Submit"
               type="primary"
            />
         </View>

      </CustomBackground>

   )
});

const styles = StyleSheet.create({
   iconContainer: {
      flex: 1,
      paddingTop: 5,
      transform: [
         { rotateZ: "14deg" },
         // { scale: 1 }
      ]
   },
   promoteCode: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      marginVertical: 8,
      borderWidth: 1,
      borderColor: colors.neutral3,
      height: 45,
      borderRadius: 12,
      alignItems: 'center'
   },
   feeContainer: {
      flex: 6,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
   },
   listCodes: {
      height: constants.heightDevice * 0.65,
      borderColor: colors.neutral3,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      paddingVertical: 5
   },
   inputCode: {
      color: colors.neutral1,
      fontSize: 18,
      fontWeight: 'bold',
      borderLeftWidth: 1,
      borderColor: colors.neutral2,
      paddingHorizontal: 10,
      paddingLeft: 20,
   },
   btnContainer: {
      marginTop: 20,
   },
   feeText: {
      color: colors.neutral1,
      paddingRight: 30,
      fontSize: 19,
      fontWeight: 'bold',
      lineHeight: 20,
   }

});