import { useLocalSearchParams } from "expo-router";
import { Dimensions, StyleSheet, Text, View, Image } from "react-native";

export default function Modal() {
  const { height, width } = Dimensions.get("window");
  const params = useLocalSearchParams();
  console.log(params);
  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: height * 0.21,
        }}
      >
        <View style={styles.foto}>
          <Image
            source={{ uri: params?.avatar as string }}
            style={styles.image}
            resizeMode="contain"
            onError={(error) => console.log("Error loading image:", error)}
          />
        </View>
        <Text style={{ marginTop: 10, fontWeight: "bold", fontSize: 20 }}>
          {params?.first_name} {params?.last_name}
        </Text>
        <Text style={{ marginTop: 10, fontWeight: "medium", fontSize: 15 }}>
          {params?.email}
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: height * 0.1,
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            height: height * 0.16,
            backgroundColor: "#baa2e1",
            width: width * 0.28,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 26 }}>{params?.id}</Text>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>Aktif</Text>
        </View>
        <View
          style={{
            height: height * 0.16,
            backgroundColor: "#B1A9CC",
            width: width * 0.28,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 26 }}>
            {parseInt(params?.id as string) + 9}
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>Pending</Text>
        </View>
        <View
          style={{
            height: height * 0.16,
            backgroundColor: "#CCA9C4",
            width: width * 0.28,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 26 }}>
            {parseInt(params?.id as string) + 7}
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>Selesai</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f7f7fb",
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
  },
  foto: {
    width: 150,
    height: 150,
    backgroundColor: "white",
    borderRadius: 75,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 75,
    
  },
});
