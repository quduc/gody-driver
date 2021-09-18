import { CommonActions, NavigationContainer } from '@react-navigation/native';
import React, { FC } from 'react';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { CustomText as Text } from '../components/CustomText';
import { colors } from '../contants/colors';
import FastImage from 'react-native-fast-image';
import constants from '../contants/contants';
import { DrawerItemProps } from '../types';
import { GodyPass } from '../screens/godypass/GodyPass';
import { Settings } from '../screens/settings/Settings';
import { FreeTrips } from '../screens/freetrips/FreeTrips';
import { EditAccount } from '../screens/editaccount/EditAccount';
import { UpdateUserInfo } from '../screens/updateuserinfo/UpdateUserInfo';
import { SignIn } from '../screens/signin/SignIn';
import { Top } from '../screens/top/Top';
import { SignUp } from '../screens/signup/SignUp';
import { VerifyCode } from '../screens/verifycode/VerifyCode';
import { BookingStack } from './BookingStack';
import { observer } from 'mobx-react';
import { useStore } from '../store/useStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PrivacySettings from '../screens/privacy-settings/PrivacySettings';
import { Register } from '../screens/register/Register';
import Payment from '../screens/payment/Payment';
import { AddFund } from '../screens/addfund/AddFund';
import { AddCard } from '../screens/addcard/AddCard';
import { AddPromotionCode } from '../screens/addpromotioncode/AddPromotionCode';

const Drawer = createDrawerNavigator();
interface Props { };

const drawerItems: DrawerItemProps[] = [
    {
        "id": 0,
        "name": "Your trip",
        "screen": "BookingStack",
        "icon": require('../resources/images/yourtrip.png')
    },
    {
        "id": 1,
        "name": "Payment",
        "screen": "Payment",
        "icon": require('../resources/images/payment.png')
    },
    {
        "id": 2,
        "name": "Help",
        "screen": "Help",
        "icon": require('../resources/images/help.png')
    },
    {
        "id": 3,
        "name": "GODY Pass",
        "screen": "GodyPass",
        "icon": require('../resources/images/godypass.png')
    },
    {
        "id": 4,
        "name": "Send a gift",
        "screen": "SendAGift",
        "icon": require('../resources/images/gift.png')
    },
    {
        "id": 5,
        "name": "Free trips",
        "screen": "FreeTrips",
        "icon": require('../resources/images/free.png')
    },
    {
        "id": 6,
        "name": "Settings",
        "screen": "Settings",
        "icon": require('../resources/images/settings.png')
    },
    {
        "id": 7,
        "name": "Sign Out",
        "screen": "SignOut",
        "icon": require('../resources/images/sign-out.png')
    },

]
export const RootStack: FC<Props> = observer(() => {
    const store = useStore();
    const { user } = store;
    const CustomDrawerContent = (props: any) => {
        const onLogout = async () => {
            await AsyncStorage.removeItem('token');
            props.navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Top' }],
                }),
            );
        }
        const DrawerItem = ({ item }: DrawerItemProps | any) => {
            return (
                <TouchableOpacity
                    style={styles.drawerItem}
                    onPress={item.screen !== 'SignOut' ? () => props.navigation.navigate(item.screen) : onLogout}
                >
                    <FastImage
                        style={styles.icon}
                        source={item.icon}
                        tintColor={colors.primary1}
                    />
                    <Text text={item.name} t2 style={{ marginLeft: 20 }} />
                </TouchableOpacity>
            )
        }
        return (
            <DrawerContentScrollView {...props} style={{ backgroundColor: colors.neutral4, flex: 1 }}>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate("Settings")}
                    style={styles.userInfo}>
                    <View style={styles.row}>
                        <View>
                            <Text text={user?.name} t2 style={{ marginVertical: 5 }} />
                            <Text text={user?.phone} s style={{ color: colors.neutral2 }} />
                        </View>
                        <FastImage
                            style={styles.avatar}
                            source={user?.profileImage ? { uri: user.profileImage } : require('../resources/images/Avatar.png')}
                        />
                    </View>
                </TouchableOpacity>
                <View style={{ height: constants.heightDevice - 220, paddingHorizontal: 20 }}>
                    {drawerItems.map((item: DrawerItemProps) => <DrawerItem key={item.id} item={item} />)}
                </View>
            </DrawerContentScrollView>
        )
    }
    return (
        <NavigationContainer>
            <Drawer.Navigator
                drawerContent={props => <CustomDrawerContent {...props} />}
                initialRouteName={store.auth?.token ? 'BookingStack' : 'Top'}
                screenOptions={({ navigation }) => ({
                    headerLeftContainerStyle: { paddingLeft: 20 },
                    headerStyle: { shadowColor: 'transparent' },
                    headerTransparent: false,
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => navigation.openDrawer()}>
                            <Image
                                source={require('../resources/images/list.png')}
                                style={[styles.icon]}
                            />
                        </TouchableOpacity>
                    )
                })}
            >
                <Drawer.Screen
                    name="Top"
                    component={Top}
                    options={{
                        headerShown: false,
                        headerTitle: "",
                    }} />
                <Drawer.Screen
                    name="SignIn"
                    component={SignIn}
                    options={{
                        headerTitle: "Sign In",
                    }} />
                <Drawer.Screen
                    name="SignUp"
                    component={SignUp}
                    options={{
                        headerTitle: "Sign Up",
                    }} />
                <Drawer.Screen
                    name="VerifyCode"
                    component={VerifyCode}
                    options={{
                        headerTitle: "Verify Code",
                    }} />
                <Drawer.Screen
                    name="Register"
                    component={Register}
                    options={{
                        headerTitle: "Register",
                    }} />

                <Drawer.Screen
                    name="BookingStack"
                    component={BookingStack}
                    options={{
                        headerShown: false
                    }} />
                <Drawer.Screen
                    name="GodyPass"
                    component={GodyPass}
                    options={{
                        headerTitle: "GODY Pass",
                    }} />
                <Drawer.Screen
                    name="FreeTrips"
                    component={FreeTrips}
                    options={{
                        headerTitle: "Free Trips",
                    }} />
                <Drawer.Screen
                    name="Settings"
                    component={Settings}
                    options={{
                        headerTitle: "Settings",
                    }} />
                <Drawer.Screen
                    name="EditAccount"
                    component={EditAccount}
                    options={{
                        headerTitle: "Edit account",
                    }} />
                <Drawer.Screen
                    name="UpdateUserInfo"
                    component={UpdateUserInfo}
                    options={{
                        headerTitle: "Edit account",
                    }} />
                <Drawer.Screen
                    name="PrivacySettings"
                    component={PrivacySettings}
                    options={{
                        headerTitle: "Privacy Settings",
                    }} />
                <Drawer.Screen
                    name="Payment"
                    component={Payment}
                    options={{
                        headerTitle: "Payment",
                    }} />
                <Drawer.Screen
                    name="AddFund"
                    component={AddFund}
                    options={{
                        headerTitle: "Add Fund",
                    }} />
                <Drawer.Screen
                    name="AddCard"
                    component={AddCard}
                    options={{
                        headerTitle: "Add Card",
                    }} />
                <Drawer.Screen
                    name="AddPromotionCode"
                    component={AddPromotionCode}
                    options={{
                        headerTitle: "Add Promotion code",
                    }} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
});
const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 60
    },
    userInfo: {
        height: 100,
        paddingVertical: 20,
        paddingHorizontal: 20
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    drawerItem: {
        flexDirection: 'row',
        borderRadius: 4,
        paddingHorizontal: 20,
        backgroundColor: colors.white,
        height: 60,
        marginVertical: 5,
        alignItems: 'center'
    },
    signOut: {
        height: 60,
        paddingTop: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderTopColor: colors.neutral3,
        borderTopWidth: 1
    }
});
