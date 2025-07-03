import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image,SafeAreaView, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import collections   from '@/utils/MovieArray';
import TVShows from '@/Components/TVShows';


export default function Watchlist() {
  const router= useRouter();
  return (
   <View style={styles.outerContainer}>
          <StatusBar barStyle="dark-content" backgroundColor="#F5C842" />
          <SafeAreaView style={styles.safeArea}>
      
            <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(tabs)/MovieDetail')}>
          <MaterialCommunityIcons name="chevron-left" size={34} color="#000" />
        </TouchableOpacity>
        <Text style={styles.imdbLogo}>Watchlist</Text>
      </View>

      <TouchableOpacity style={styles.createButton} onPress={() => router.push('/(tabs)/CollectionPage')}>
        <Text style={styles.createButtonText}>+  Create a collection</Text>
      </TouchableOpacity>

      <View style={styles.gridContainer}>
        {collections.map((item) => (
          <View key={item.id} style={styles.collectionCard}>
            <Image source={{ uri: item.image }} style={styles.collectionImage} />
            <View style={styles.overlay}>
              <Text style={styles.collectionText}>{item.title}</Text>
              <Text style={styles.collectionCount}>({item.count})</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.suggestionHeader}>
        <Text style={styles.suggestionTitle}>You might also like</Text>
        <TouchableOpacity>
          <Text style={styles.seeMore}>See More</Text>
        </TouchableOpacity>
      </View>
      <TVShows/>
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
    backgroundColor: '#F5C842',
    paddingVertical: 30,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imdbLogo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginTop:20,
  },

  backButton: {
    marginRight: 12,
    marginTop:20,
  },

  createButton: { 
    backgroundColor: 'black',
     margin: 15, borderRadius: 8,
      alignItems: 'center',
       padding: 12 ,
      },
  createButtonText: {
     color: 'white',
      fontSize: 16, 
      paddingHorizontal: 15,
     },
  gridContainer: { 
    flexDirection: 'row',
     flexWrap: 'wrap', 
     justifyContent: 'space-around',
     },
  collectionCard: {
    width: '45%',
    height: 160,
    marginVertical: 10,
    overflow: 'hidden',
    position: 'relative' ,
    },
  collectionImage: {
     width: '100%',
      height: '100%', 
      resizeMode: 'cover' ,
    },
  overlay: { 
    position: 'absolute',
    top: 0, 
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)', 
    justifyContent: 'center', 
    alignItems: 'center' ,
      },
  collectionText:
   { 
    color: 'white', 
    fontSize: 16,
    fontWeight: '600' ,
    },
  collectionCount: { 
    color: 'white', 
    fontSize: 14,
     marginTop: 4 ,
    },
  suggestionHeader: {
     flexDirection: 'row', 
     justifyContent: 'space-between', 
     alignItems: 'center',
      paddingHorizontal: 15,
       marginTop: 10 ,
      },
  suggestionTitle: {
    fontSize: 18, 
    fontWeight: 'bold',
    paddingBottom: 10,
     },
  seeMore: {
    color: '#F5A623',
     paddingBottom: 10,
    },
  
});