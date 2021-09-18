import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { AddPromotionCode } from '../screens/addpromotioncode/AddPromotionCode';
import { ChooseCar } from '../screens/choosecar/ChooseCar';
import { ChoosePayment } from '../screens/choosepayment/ChoosePayment';
import { ConfirmBooking } from '../screens/confirmbooking/ConfirmBooking';
import { Home } from '../screens/home/Home';
import Payment from '../screens/payment/Payment';
import { Search } from '../screens/search/Search';
import { UpComingTrip } from '../screens/upcomingtrip/UpComingTrip';

const Stack = createStackNavigator();

export const BookingStack = () => (
    <Stack.Navigator
        screenOptions={() => ({
            headerLeftContainerStyle: { paddingLeft: 20 },
            headerStyle: { shadowColor: 'transparent' },
            headerTransparent: true,
        })}
    >
        <Stack.Screen
            name="Home"
            component={Home}
            options={{
                headerTitle: "",
            }} />
        <Stack.Screen
            name="Search"
            component={Search}
            options={{
                headerTitle: "Search",
            }} />
        <Stack.Screen
            name="ChooseCar"
            component={ChooseCar}
            options={{
                headerTitle: "",
            }} />
        <Stack.Screen
            name="ChoosePayment"
            component={ChoosePayment}
            options={{
                headerTitle: "Select payment",
            }} />
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