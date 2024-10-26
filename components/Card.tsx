import { router } from "expo-router";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { User, styles } from "../app/(screen)/(drawer)/list user"; 

export default function UserCard({ user }: { user: User }) {
  if (!user) return null;

  const openModal = () => {
    router.push({
      pathname: '/modal',
      params: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  };

  return (
    <TouchableOpacity onPress={openModal}>
      <View style={styles.card}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{`${user.first_name} ${user.last_name}`}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
