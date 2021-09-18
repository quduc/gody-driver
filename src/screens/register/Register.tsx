// register
import { RouteProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { StyleSheet, View, TextInput, ScrollView, Alert } from 'react-native';
import FastImage from 'react-native-fast-image';
import { register } from '../../API';
import { CustomBackground } from '../../components/CustomBackground';
import { CustomButton } from '../../components/CustomButton';
import { CustomHeaderLeft } from '../../components/CustomHeaderLeft';
import { CustomText } from '../../components/CustomText';
import { LoadingOverlay } from '../../components/LoadingOverlay';
import { colors } from '../../contants/colors';
import constants from '../../contants/contants';


interface IRegister {
   route: RouteProp<{ params: { phoneNumber: string } }, 'params'>;
}

export const Register: FC<IRegister> = ({ route: { params: { phoneNumber } } }) => {
   const navigation = useNavigation<any>();
   const [firstName, setFirstName] = useState<string>('');
   const [lastName, setLastName] = useState<string>('');
   const [password, setPassword] = useState<string>('');

   const [error, setError] = useState<string>('');
   const [loading, setLoading] = useState<boolean>(false);


   useEffect(() => {
      navigation.setOptions({
         headerTransparent: false,
         headerLeft: () => <CustomHeaderLeft type="goback" onPress={() => navigation.navigate("SignUp")} />
      })

      return () => {
         setFirstName('');
         setLastName('');
         setPassword('');
         setError('');
         setLoading(false);
      }
   }, [])

   const onRegister = async () => {
      let name = `${firstName} ${lastName}`;
      setLoading(true);
      if (firstName.length == 0 || lastName.length == 0) {
         setError('You need to fill in all the field above.')
         setLoading(false);
      } else if (password.length == 0) {
         setError('You need to fill in all the field above.')
         setLoading(false);
      } else {
         const response = await register(phoneNumber, password, name);
         if (response.__typename !== 'ErrorResponse') {
            setTimeout(() => {
               setLoading(false);
               Alert.alert(
                  "",
                  "Register successfully. Go to sign in now!",
                  [{ text: "OK", onPress: () => navigation.navigate("SignIn") }]
               );
            }, 1500);
         }
         setLoading(false);
      }
   }


   return (
      <CustomBackground>
         {/* phone number */}
         <View style={{ height: 80, marginTop: 20, }}>
            <CustomText text={"Phone number"} t2 style={styles.inputLabel} />
            <View style={styles.phoneContainer}>
               <TextInput
                  value={phoneNumber}
                  editable={false}
                  style={{
                     flex: 2,
                     color: colors.neutral1,
                     fontSize: 18,
                     paddingHorizontal: 10
                  }}
               />
               <CustomText text={"Verified"} t2 style={{ color: colors.primary1, marginRight: 10 }} />
            </View>
         </View>

         {/* first name */}
         <View style={{ height: 80, marginTop: 20, }}>
            <CustomText text={"First name"} t2 style={styles.inputLabel} />
            <TextInput
               value={firstName}
               onChangeText={(text) => {
                  setFirstName(text);
                  if (firstName.length != 0 && lastName.length != 0 && password.length != 0) {
                     setError('');
                  }
               }}
               placeholder={'Enter your first name'}
               style={styles.inputBox}
            />
         </View>

         {/* last name */}
         <View style={{ height: 80, marginTop: 20, }}>
            <CustomText text={"Last name"} t2 style={styles.inputLabel} />
            <TextInput
               value={lastName}
               onChangeText={(text) => {
                  setLastName(text);
                  if (firstName.length != 0 && lastName.length != 0 && password.length != 0) {
                     setError('');
                  }
               }}
               placeholder={'Enter your last name'}
               style={styles.inputBox}
            />
         </View>

         {/* password */}
         <View style={{ height: 80, marginTop: 20, }}>
            <CustomText text={"Password"} t2 style={styles.inputLabel} />
            <TextInput
               value={password}
               onChangeText={(text) => {
                  setPassword(text);
                  if (firstName.length != 0 && lastName.length != 0 && password.length != 0) {
                     setError('');
                  }
               }}
               placeholder={'password'}
               maxLength={18}
               secureTextEntry={true}
               style={styles.inputBox}
            />
         </View>

         <CustomText text={error.toString()} t2
            style={{
               color: 'red',
               marginVertical: 40,
               fontSize: 18
            }} />

         <View style={styles.btnContainer}>
            <CustomButton
               title="Submit"
               type="primary"
               onPress={onRegister}
            />
         </View>

         <LoadingOverlay loading={loading} />
      </CustomBackground>
   )
}
const styles = StyleSheet.create({
   inputLabel: {
      color: colors.neutral2,
      marginVertical: 10,
      marginLeft: 10
   },
   btnContainer: {
      width: constants.widthDevice - 40,
      height: 45,
      flex: 1,
      justifyContent: 'flex-end',
      marginVertical: 20,
   },
   inputBox: {
      color: colors.neutral1,
      backgroundColor: colors.neutral4,
      borderRadius: 12,
      fontSize: 18,
      width: '100%',
      paddingHorizontal: 20,
   },
   phoneContainer: {
      flexDirection: 'row',
      backgroundColor: colors.neutral4,
      borderRadius: 12,
      width: '100%',
      paddingHorizontal: 10,
      alignItems: 'center',
   }

})