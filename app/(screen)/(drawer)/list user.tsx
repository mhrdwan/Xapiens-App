import api from "@/api/api";
import UserCard from "@/components/Card";
import { router,useRouter, useSegments  } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";

export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export const styles = StyleSheet.create({
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

export default function ListUser() {
  const [listUser, setListUser] = useState<User[]>([]);
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const fetchUsers = async (page: number = 1) => {
    try {
      const response = await api.get(`users?page=${page}`);
      setListUser(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const routers = useSegments();

  console.log(routers)
  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const filterUser = listUser.filter(
    (user) =>
      `${user.first_name} ${user.last_name}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#f0f0f0", justifyContent: "flex-start" }}>
      <TextInput
        style={styles.searchInput}
        placeholder="Cari Nama"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      
      <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 5 }}>
        <TouchableOpacity style={styles.navigationButton} onPress={handlePreviousPage} disabled={page === 1}>
          <Text style={styles.navigationText}>Sebelumnya</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navigationButton} onPress={handleNextPage}>
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
