import 'react-native-gesture-handler';

// Import React
import React, { useEffect } from 'react';
import { BackHandler, Alert, Button, TouchableOpacity } from 'react-native';
// Import Navigators from React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import Screens
import SplashScreen from './src/Screen/DrawerScreens/Auth/SplashScreen';
import RegisterScreen from './src/Screen/DrawerScreens/Auth/RegisterScreen';
import LoginScreen from './src/Screen/DrawerScreens/Auth/LoginScreen';
import DashboardScreen from './src/Screen/DrawerScreens/DashboardScreen';
import DrawerNavigationRoutes from './src/Screen/DrawerNavigationRoutes';
import MaintenanceNotification from './src/Screen/DrawerScreens/Maintenance/MaintenanceNotification';
import PreviewComponent from './src/Screen/Components/PreviewComponent';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import MaintenanceDashboard from './src/Screen/DrawerScreens/Maintenance/MaintenanceDashboard';
import MaintenanceTicket from './src/Screen/DrawerScreens/Maintenance/MaintenanceTicket';

const Stack = createStackNavigator();

const Auth = () => {
    return (
        <Stack.Navigator initialRouteName="RegisterScreen">
            <Stack.Screen
                name="RegisterScreen"
                component={RegisterScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PreviewComponent"
                component={PreviewComponent}
                options={{
                    headerShown: true,
                    // headerLeft: (
                    //     <TouchableWithoutFeedback
                    //         onPress={() => navigation.goBack()} >
                    //         <Icon name="md-arrow-round-back" size={16} color="#000" />
                    //     </TouchableWithoutFeedback>
                    // )
                }}

            />
            <Stack.Screen
                name="DashboardScreen"
                component={DashboardScreen}
                options={{
                    headerShow: false,
                    title: 'Dashboard', //Set Header Title
                    headerStyle: {
                        backgroundColor: '#307ecc', //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style
                    },
                    headerRight: () => (
                        <Button
                            onPress={() => alert('This is a button!')}
                            title="Info"
                            color="#fff"
                        />
                    )
                }}
            />
        </Stack.Navigator>
    );
};
const App = (Props) => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen">
                <Stack.Screen
                    name="SplashScreen"
                    component={SplashScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Auth"
                    component={Auth}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="DrawerNavigationRoutes"
                    component={DrawerNavigationRoutes}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                 <Stack.Screen
                    name="MaintenanceNotification"
                    component={MaintenanceNotification}
                    options={{
                        headerShown: true,title: 'Maintenance Notification', headerStyle: {
                            backgroundColor: '#040485',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />
                <Stack.Screen
                    name="MaintenanceDashboard"
                    component={MaintenanceDashboard}
                    options={{
                        headerShown: true,title: 'Maintenance', headerStyle: {
                            backgroundColor: '#040485',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />
                <Stack.Screen
                    name="MaintenanceTicket"
                    component={MaintenanceTicket}
                    options={{
                        headerShown: true,title: 'Ticket', headerStyle: {
                            backgroundColor: '#040485',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />


            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
console.disableYellowBox = true;
