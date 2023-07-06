import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  Login,
  Register,
  Splash,
  CrudScreen,
  DashboardUser,
  Chat,
  ProfileScreen,
  SearchUser,
} from '../screens';
import {COLORS} from '../themes';

const Stack = createNativeStackNavigator();

function Router() {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal-inverted',
      }}>
      <Stack.Screen
        name="SplashScreen"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginScreen"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CrudScreen"
        component={CrudScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DashboardUserScreen"
        component={DashboardUser}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChatScreen"
        component={Chat}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SearchUser"
        component={SearchUser}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: COLORS.white,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default Router;
