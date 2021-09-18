import { useNavigation } from '@react-navigation/core';
import React, { FC, useEffect } from 'react';
import { CustomBackground } from '../../components/CustomBackground';
import { CustomButton } from '../../components/CustomButton';
import { CustomHeaderLeft } from '../../components/CustomHeaderLeft';


interface Props { }
const PrivacySettings: FC<Props> = () => {
   const navigation = useNavigation<any>();
   useEffect(() => {
      navigation.setOptions({
         headerLeft: () => <CustomHeaderLeft type='goback' onPress={() => navigation.navigate("Settings")} />
      })
   }, [])
   return (
      <CustomBackground>
         <CustomButton
            rightIcon={require('../../resources/images/forward.png')}
            type="light"
            title="Location Preferences"
         />

         <CustomButton
            rightIcon={require('../../resources/images/forward.png')}
            type="light"
            title="Notifications"
         />

         <CustomButton
            rightIcon={require('../../resources/images/forward.png')}
            type="light"
            title="911-data sharing"
         />

         <CustomButton
            rightIcon={require('../../resources/images/forward.png')}
            type="primary"
            title="Delete your account"
         />
      </CustomBackground>
   )
}

export default PrivacySettings
