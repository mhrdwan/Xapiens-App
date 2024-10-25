import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import Drawer from 'expo-router/drawer';
import { Feather } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import RootLayoutScreen from '../_layout';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../../../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <Drawer initialRouteName="home"
    screenOptions={{
      headerStyle: {
        backgroundColor: '#fff',
        
      },
      drawerStyle: {
        backgroundColor: '#fff', 
      },
      drawerLabelStyle : {
        color: '#2563eb'
      }
    }}
    
    >
    <Drawer.Screen 
        name="home"  
        options={{ 
          headerTitle: '',
          drawerIcon: ({ color, size }) => (
            <Feather name="home" color={"#2563eb"} size={size} /> 
          ),
        }} 
      />
      <Drawer.Screen 
        name="list user"  
        options={{ 
          headerTitle: '',
          drawerIcon: ({ color, size }) => (
            <Feather name="user" color={"#2563eb"} size={size} /> 
          ),
        }} 
      />
    </Drawer>
  );
};