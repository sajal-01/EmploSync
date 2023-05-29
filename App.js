import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Home';
import Settings from './Settings';
import Login from './Login';
import Leave from './Leave';
import Work from './Work';
import { AntDesign } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
          component={Work}
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
          component={Leave}
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
          component={Login}
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
    </NavigationContainer>
  );
}
