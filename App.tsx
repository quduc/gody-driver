/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import AsyncStorage from '@react-native-async-storage/async-storage';
 import React, { useEffect, useState } from 'react';
 import { ActivityIndicator, StatusBar, View } from 'react-native';
 import { getMe } from './src/API';
 import { RootStack } from './src/routes/RootStack';
 import { AuthStore } from './src/store/authStore';
 import { StoreProvider } from './src/store/storeContext';
 
 const authStore = new AuthStore();
 const App = () => {
   const [loading, setLoading] = useState<boolean>(true);
 
   useEffect(() => {
     if (loading) {
       loadStore();
     }
   }, [])
   const loadStore = async () => {
     const token = await AsyncStorage.getItem('token');
     if (token) {
       const response = await getMe();
       if (response.__typename !== 'ErrorResponse') {
         authStore.saveUser(response.result);
         authStore.saveAuth({
           token,
           __typename: 'Auth',
           expires_in: 360000,
         });
       }
     }
     setLoading(false);
   }
 
   if (loading) return <ActivityIndicator size="large" animating />;
   return (
     <StoreProvider store={authStore}>
       <View style={{ flex: 1 }}>
         <RootStack />
         <StatusBar barStyle={'light-content'} />
       </View>
     </StoreProvider>
   )
 };
 
 
 
 export default App;
 
 
 