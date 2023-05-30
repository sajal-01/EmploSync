import React, { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Home';
import Settings from './Settings';
import Auth from './Auth';
// import Leave from './Leave';
// import Work from './Work';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Drawer = createDrawerNavigator();

export default function App() {
  const getIsSignedIn = () => {
    const isSignedIn = AsyncStorage.getItem('isSignedIn');
    if (isSignedIn === null) {
      return false;
    } else {
      return true;
    }
  };

  const [isSignedIn, setIsSignedIn] = React.useState(getIsSignedIn());

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <NavigationContainer>
      {!isSignedIn ? (
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
              drawerIcon: ({ focused, size }) => (
                <AntDesign
                  name="home"
                  size={size}
                  color={focused ? '#7cc' : '#ccc'}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Profile"
            component={Settings}
            options={{
              headerShown: false,
              drawerIcon: ({ focused, size }) => (
                <AntDesign
                  name="idcard"
                  size={size}
                  color={focused ? '#7cc' : '#ccc'}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Work Done"
            component={Settings}
            options={{
              headerShown: false,
              drawerIcon: ({ focused, size }) => (
                <AntDesign
                  name="linechart"
                  size={size}
                  color={focused ? '#7cc' : '#ccc'}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Leave Application"
            component={Settings}
            options={{
              headerShown: false,
              drawerIcon: ({ focused, size }) => (
                <AntDesign
                  name="deleteuser"
                  size={size}
                  color={focused ? '#7cc' : '#ccc'}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Onboarding"
            component={Settings}
            options={{
              headerShown: false,
              drawerIcon: ({ focused, size }) => (
                <AntDesign
                  name="rocket1"
                  size={size}
                  color={focused ? '#7cc' : '#ccc'}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Settings"
            component={Settings}
            options={{
              headerShown: false,
              drawerIcon: ({ focused, size }) => (
                <AntDesign
                  name="setting"
                  size={size}
                  color={focused ? '#7cc' : '#ccc'}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Logout"
            component={Auth}
            options={{
              headerShown: false,
              drawerIcon: ({ focused, size }) => (
                <AntDesign
                  name="logout"
                  size={size}
                  color={focused ? '#7cc' : '#ccc'}
                />
              ),
            }}
          />
        </Drawer.Navigator>
      ) : (
        <Auth />
      )}
    </NavigationContainer>
  );
}
