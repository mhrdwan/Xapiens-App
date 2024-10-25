// app/(drawer)/home.tsx
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";

export default function Home() {
  const screenHeight = Dimensions.get("window").height;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", margin: 0 }}>
      <ScrollView style={{ marginTop: -screenHeight * 0.05 }}>
        <View
          style={{
            padding: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontSize: 16, color: "#666" }}>Selamat Datang,</Text>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", color: "#1a1a1a" }}
            >
              Mohamad Hasyim Ridwan
            </Text>
          </View>
          <Pressable
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "#f5f5f5",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Feather name="bell" size={20} color="#1a1a1a" />
          </Pressable>
        </View>

        <View
          style={{
            margin: 20,
            padding: 20,
            backgroundColor: "#2563eb",
            borderRadius: 16,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <Text style={{ color: "#fff", opacity: 0.8 }}>Total Uang</Text>
          <Text
            style={{
              color: "#fff",
              fontSize: 32,
              fontWeight: "bold",
              marginVertical: 8,
            }}
          >
            Rp.12.234.567
          </Text>
          <View style={{ flexDirection: "row", marginTop: 16 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 24,
              }}
            >
              <Feather name="arrow-up" size={20} color="#4ade80" />
              <Text style={{ color: "#fff", marginLeft: 3 }}>Rp.200.000</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Feather name="arrow-down" size={20} color="#f87171" />
              <Text style={{ color: "#fff", marginLeft: 3 }}>Rp.100.000</Text>
            </View>
          </View>
        </View>

        <View style={{ padding: 20 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 16,
              color: "#1a1a1a",
            }}
          >
            Action
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {[
              { icon: "send", label: "Transfer" },
              { icon: "credit-card", label: "Kartu" },
              { icon: "pie-chart", label: "Analytics" },
              { icon: "settings", label: "Setting" },
            ].map((item, index) => (
              <Pressable
                key={index}
                onPress={()=>router.push('listUserModal' as any)}
                style={{
                  alignItems: "center",
                  width: "22%",
                }}
              >
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      backgroundColor: "#f5f5f5",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 8,
                    }}
                  >
                    <Feather
                      name={item.icon as any}
                      size={24}
                      color="#2563eb"
                    />
                  </View>
                <Text style={{ color: "#666" }}>{item.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={{ padding: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Text
              style={{ fontSize: 18, fontWeight: "bold", color: "#1a1a1a" }}
            >
              Histori Transaksi
            </Text>
            <Pressable>
              <Text style={{ color: "#2563eb" }}>Liat Semua</Text>
            </Pressable>
          </View>

          {[
            {
              icon: "shopping-bag",
              title: "Belanja",
              amount: -85000,
              time: "2h ago",
            },
            { icon: "coffee", title: "Kafe", amount: -12000, time: "5h ago" },
            {
              icon: "dollar-sign",
              title: "Gaji",
              amount: 8000000,
              time: "1d ago",
            },
          ].map((item, index) => (
            <Pressable
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 12,
                backgroundColor: "#f8fafc",
                borderRadius: 12,
                marginBottom: 8,
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#e2e8f0",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 12,
                }}
              >
                <Feather name={item.icon as any} size={20} color="#2563eb" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "500", color: "#1a1a1a" }}>
                  {item.title}
                </Text>
                <Text style={{ color: "#666", fontSize: 12 }}>{item.time}</Text>
              </View>
              <Text
                style={{
                  fontWeight: "600",
                  color: item.amount > 0 ? "#4ade80" : "#f87171",
                }}
              >
                {item.amount > 0 ? "+" : ""}
                {item.amount.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={{ padding: 20 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 16,
              color: "#1a1a1a",
            }}
          >
            Tagihan
          </Text>
          <View
            style={{
              padding: 16,
              backgroundColor: "#f8fafc",
              borderRadius: 12,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "#fee2e2",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 12,
              }}
            >
              <Feather name="alert-circle" size={20} color="#ef4444" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "500", color: "#1a1a1a" }}>
                Listrik
              </Text>
              <Text style={{ color: "#666", fontSize: 12 }}>3 Hari Lagi</Text>
            </View>
            <Text style={{ fontWeight: "600", color: "#ef4444" }}>
              Rp.125.000
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
