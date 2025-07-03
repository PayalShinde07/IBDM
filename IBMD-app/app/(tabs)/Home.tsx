import React, { JSX } from 'react';
import {View,Text,SafeAreaView,StatusBar,StyleSheet,ScrollView,Image,TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from 'expo-router';
import Upcoming from '@/Components/Upcoming';
import TopMovies from '@/Components/TopMovies';
import PopularMovies from '@/Components/PopularMovies';
import HeaderMovies from '@/Components/HeaderMovies';


export default function Home(): JSX.Element {

  const router = useRouter();

  return (
    <View style={styles.outerContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5C418" />
      <SafeAreaView style={styles.safeArea}>
  
        <View style={styles.header}>
          <Text style={styles.imdbLogo}>IMDb</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/Notification')}>
          <MaterialCommunityIcons name="bell" size={24} color="black" />
        </TouchableOpacity>
        </View>


        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <HeaderMovies/>

          <View style={styles.section}>
            <View style={styles.dailyPick}>
              <Image
                source={{ uri: '' }}
                style={styles.dailyPickImage}
              />
              <View style={styles.dailyPickContent}>
                <Text style={styles.dailyPickDay}>Wednesday</Text>
                <Text style={styles.dailyPickDescription}>
                  Follows Wednesday Addams years as a student, when she attempts to master.
                </Text>
                <View style={styles.genreContainer}>
                  <Text style={styles.genreTag}>Adventure</Text>
                  <Text style={styles.genreTag}>Action</Text>
                </View>
                <TouchableOpacity style={styles.viewButton}>
                  <Text style={styles.viewButtonText}>View</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Top 10 Movies for you</Text>
              <TouchableOpacity>
                <Text style={styles.seeMoreLink}>See More</Text>
              </TouchableOpacity>
            </View>
            
           <TopMovies/>
    
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Upcoming Movies</Text>
              <TouchableOpacity>
                <Text style={styles.seeMoreLink}>See More</Text>
              </TouchableOpacity>
            </View>
            <Upcoming/>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>You might also like</Text>
              <TouchableOpacity>
                <Text style={styles.seeMoreLink}>See More</Text>
              </TouchableOpacity>
            </View>
           <PopularMovies/>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
  },
  header: {
    backgroundColor: '#F5C418',
    paddingVertical: 25,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imdbLogo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
  },
 
  section: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
  },
  dailyPick: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  dailyPickImage: {
    width: 80,
    height: 120,
    borderRadius: 8,
    marginRight: 20,
  },
  dailyPickContent: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginLeft: 60,
  },
  dailyPickDay: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  dailyPickDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 18,
    marginBottom: 8,
  },
  genreContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  genreTag: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
    color: '#000000',
    marginRight: 8,
  },
  viewButton: {
    backgroundColor: '#F5C418',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  viewButtonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  seeMoreLink: {
    fontSize: 14,
    color: '#F5C418',
    fontWeight: '600',
  },
 
});