import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import MovieCard from '@/Components/MovieCard';
import { topMovies } from "@/utils/MovieArray";

const Profile = () => {
  const router = useRouter();


  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image
            source={{uri:'https://mrwallpaper.com/images/thumbnail/cute-brunette-profile-picture-rawnnhmrk168c9zk.webp'}}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.name}>Payal Shinde</Text>
            <Text style={styles.email}>payalshinde2305@gmail.com</Text>
            <View>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editText}>Edit details</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.linkRow}>
          <Text style={styles.linkText}>Watchlist</Text>
          <Ionicons name="chevron-forward" size={20} />
        </TouchableOpacity>

           <View style={styles.moviesScroll}>
                       <FlatList
                         data={topMovies}
                         keyExtractor={(item, index) => index.toString()}
                         horizontal
                        showsHorizontalScrollIndicator={false}
                         renderItem={({ item }) => (
                           <MovieCard title={item.title} image={item.image} />
                         )}
                       />
              </View>


        <TouchableOpacity style={styles.linkRow}>
          <Text style={styles.linkText}>Activities</Text>
          <Ionicons name="chevron-forward" size={20} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkRow}>
          <Text style={styles.linkText}>Preferences</Text>
          <Ionicons name="chevron-forward" size={20} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkRow}>
          <Text style={styles.linkText}>Settings</Text>
          <Ionicons name="chevron-forward" size={20} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={() => router.push('/(tabs)/LoginScreen')}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    gap: 15,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 15,
    borderColor:"#000000",
    borderWidth: 0,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  email: {
    fontSize: 12,
    color: "gray",
  },
  editButton: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#000000",
    marginTop: 5,
    paddingHorizontal: 8,
    paddingVertical: 8,
  
  },
  editText: {
    fontSize: 15,
    color: "#333",
    textAlign: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 20,

  },
moviesScroll: {
    paddingLeft: 16,
    backgroundColor: '#FFFFFF',
  },
  linkRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  linkText: {
    fontSize: 16,
    fontWeight: "600",
  },
  logoutButton: {
    backgroundColor: "#000",
    margin: 20,
    padding: 12,
    borderRadius: 10,
    marginTop:90,
  },
  logoutText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "500",
  },
});