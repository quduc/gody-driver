import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { AddPromotionCode } from '../screens/addpromotioncode/AddPromotionCode';
import { ConfirmBooking } from '../screens/confirmbooking/ConfirmBooking';
import { UpComingTrip } from '../screens/upcomingtrip/UpComingTrip';

const Stack = createStackNavigator();

export const BookingStack = () => (
    <Stack.Navigator
        initialRouteName="ConfirmBooking"
        screenOptions={() => ({
            headerLeftContainerStyle: { paddingLeft: 20 },
            headerStyle: { shadowColor: 'transparent' },
            headerTransparent: true,
        })}
    >
        <Stack.Screen
            name="ConfirmBooking"
            component={ConfirmBooking}
            options={{
                headerTitle: "",
            }} />
        <Stack.Screen
            name="UpComingTrip"
            component={UpComingTrip}
            options={{
                headerTitle: "",
            }} />
         <Stack.Screen
            name="AddPromotionCode"
            component={AddPromotionCode}
            options={{
                headerTitle: "",
            }} />
        {/* <Stack.Screen
            name="AddPayment"
            component={AddP}
            options={{
                headerTitle: "",
            }} /> */}
    </Stack.Navigator>
)