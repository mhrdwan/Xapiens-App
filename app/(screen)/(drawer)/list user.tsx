import api from "@/api/api";
import { Link, router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

const UserCard = ({ user }: { user: User }) => {
  if (!user) return null;
  const openModal = () => {
    router.push({
      pathname: '/modal',
      params: { 
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        avatar: user.avatar
      }
    });
  };
  return (
    <TouchableOpacity onPress={openModal}>
      <View style={styles.card}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text
            style={styles.name}
          >{`${user.first_name} ${user.last_name}`}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 20,
    margin: 10,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  userInfo: {
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
  searchInput: {
    padding: 10,
    margin: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
    fontWeight: "500",
    color: "black",
  },
  navigationButton: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    alignItems: "center",
    width: 100,
  },
  navigationText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
});

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export default function App() {
  const [listUser, setListUser] = useState<User[]>([]);
  
  async function fetchUsers(page: number = 1) {
    try {
      const response = await api.get(`users?page=${page}`);
      setListUser(response.data.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  }
  const [searchTerm, setSearchTerm] = useState("");
  const filterUser = listUser.filter(
    (user) =>
      `${user.first_name} ${user.last_name}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f0f0f0",
        justifyContent: "flex-start",
      }}
    >
      {/* <Link href="/modal" >Test modal</Link> */}
      <View>
        <TextInput
          style={styles.searchInput}
          placeholder="Cari Nama"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 5,
        }}
      >
        <TouchableOpacity
          style={styles.navigationButton}
          // onPress={handleNextPage}
          // disabled={loading}
        >
          <Text style={styles.navigationText}>Sebelumnya</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navigationButton}
          // onPress={handleNextPage}
          // disabled={loading}
        >
          <Text style={styles.navigationText}>Selanjutnya</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filterUser}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <UserCard user={item} />}
      />
    </View>
  );
}
