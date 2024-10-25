import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import api from "@/api/api";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { router, useNavigation } from "expo-router";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const loginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const animation = useRef<LottieView>(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginGagal, setLoginGagal] = useState(false);
  const translateY = useSharedValue(-100);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });
  useEffect(() => {
    if (loginSuccess) {
      setTimeout(() => {
        translateY.value = withTiming(-100, { duration: 1500 });
        setLoginSuccess(false);
        router.replace("(drawer)/home" as any)
      }, 2000);
    }
    setTimeout(() => {
      translateY.value = withTiming(-100, { duration: 1500 });
      setLoginGagal(false);
    }, 2000);
  }, [loginSuccess, loginGagal]);

  const handleLogin = async () => {
    try {
      const Login = await api.post("/login", {
        email: email,
        password: password,
      });

      if (Login.status === 200) {
        setLoginSuccess(true);
        translateY.value = withTiming(0, { duration: 500 });
        console.log(Login.data)
        await AsyncStorage.setItem('token', Login?.data?.token);
      } else {
        console.error("Login gagal");
        setLoginGagal(true);
        translateY.value = withTiming(0, { duration: 500 });
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginGagal(true);
      translateY.value = withTiming(0, { duration: 500 });
    }
  };

  return (
    <LinearGradient
      colors={["#4c669f", "#3b5998", "#192f6a"]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
              <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Selamat Datang</Text>
                <Text style={styles.subHeaderText}>
                  Login untuk melanjutkan
                </Text>
              </View>
              {loginSuccess && (
                <Animated.View style={[styles.notification, animatedStyle]}>
                  <Text style={styles.notificationText}>Login Berhasil!</Text>
                </Animated.View>
              )}

              {loginGagal && (
                <Animated.View style={[styles.notificationGgl, animatedStyle]}>
                  <Text style={styles.notificationText}>Email atau Password salah!</Text>
                </Animated.View>
              )}
              <View style={{ display: "flex", alignItems: "center" }}>
                <LottieView
                  autoPlay
                  ref={animation}
                  style={{
                    width: 230,
                    height: 230,
                  }}
                  source={require("../../app/animation/loginAnimate.json")}
                />
              </View>
              <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                  <Ionicons
                    name="mail-outline"
                    size={24}
                    color="#666"
                    style={styles.icon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#666"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Ionicons
                    name="lock-closed-outline"
                    size={24}
                    color="#666"
                    style={styles.icon}
                  />
                  <TextInput
                    style={[styles.input, { flex: 1 }]}
                    placeholder="Password"
                    placeholderTextColor="#666"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeIcon}
                  >
                    <Ionicons
                      name={showPassword ? "eye-outline" : "eye-off-outline"}
                      size={24}
                      color="#666"
                    />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={handleLogin}
                >
                  <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        <Text style={{display:'flex' ,  textAlign:'center'}}>Powered By Ridwan</Text>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  inner: {
    // flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  headerContainer: {
    marginBottom: 10,
    marginTop: 30,
    alignItems: "center",
  },
  notification: {
    display: "flex",
    top: -110,
    backgroundColor: "#18bc9c",
    padding: 10,
    borderRadius: 8,
  },
  notificationGgl: {
    display: "flex",
    top: -110,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 8,
  },
  notificationText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  subHeaderText: {
    fontSize: 16,
    color: "#fff",
    opacity: 0.8,
  },
  formContainer: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    marginBottom: 16,
    paddingHorizontal: 12,
    height: 50,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: "#333",
    fontSize: 16,
  },
  eyeIcon: {
    padding: 4,
  },
  forgotPassword: {
    alignItems: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: "#4c669f",
    fontSize: 14,
    fontWeight: "600",
  },
  loginButton: {
    backgroundColor: "#4c669f",
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signUpContainer: {},
  signUpText: {},
  signUpLink: {},
});

export default loginPage;
