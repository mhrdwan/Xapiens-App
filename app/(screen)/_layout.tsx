import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
  useNavigation,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { TouchableOpacity, Text } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function RootLayoutScreen() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const [loaded] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
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
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{
            headerShown: true,
            headerTitle: "",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: colorScheme === "dark"? "#f7f7fb" : "#212121" },
            headerTintColor: colorScheme === "dark"? "#ffffff" : "#212121",
            headerTitleStyle: { fontWeight: "bold", fontFamily: "SpaceMono" },
            title:'',
            presentation: "modal",
            headerLeft: () => (
              <TouchableOpacity 
                onPress={() => navigation.goBack()}
                style={{ marginLeft: 10}}
              >
                <Text style={{fontSize : 15}}>Tutup</Text>
              </TouchableOpacity>
            ),
          }}
        />
      <Stack.Screen
          name="listUserModal"  
          options={{
            presentation: 'modal',  
            headerShown: true,
            headerStyle: { backgroundColor: colorScheme === "dark"? "#f7f7fb" : "#212121" },
            headerTitle: "",
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ fontSize: 15 }}>Close</Text>
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}