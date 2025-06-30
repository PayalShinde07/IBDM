import React, { useState } from 'react';
import {View,Text,TextInput,ScrollView,TouchableOpacity,Image,StyleSheet,StatusBar,SafeAreaView,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MovieShow {
  id: string;
  title: string;
  year?: string;
  image: string;
}

const Browser: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All Shows');
  const [searchText, setSearchText] = useState('');
  const moviesShows: MovieShow[] = [
    {
      id: '1',
      title: 'Hawkeye', 
      image: 'https://cdn.marvel.com/content/1x/hawkeye_lob_crd_04.jpg',
    },
    {
      id: '2',
     title: 'Thor: Love and Thunder', 
      image: 'https://m.media-amazon.com/images/M/MV5BZjRiMDhiZjQtNjk5Yi00ZDcwLTkyYTEtMDc1NjdmNjFhNGIzXkEyXkFqcGc@._V1_.jpg'
    },
    {
      id: '3',
      title: 'The Lord of the Rings', 
      image: 'https://tolkiengateway.net/w/images/thumb/5/5e/The_Lord_of_the_Rings_-_The_Return_of_the_King_-_Ensemble_poster.jpg/640px-The_Lord_of_the_Rings_-_The_Return_of_the_King_-_Ensemble_poster.jpg'
    },
    {
      id: '4',
      title: 'Avengers', 
      image: 'https://images1.wionews.com/images/ZB-EN/900x1600/2023/5/5/1683302779303_AvengersAgeofUltron.jpg' 
    },
    {
      id: '5',
      title: "The Boys",
      image: 'https://cdnb.artstation.com/p/assets/images/images/031/128/313/large/mayank-kumarr-2.jpg?1602685224',
    },
    {
      id: '6',
      title: 'The Shark Tank',
      image: 'https://qph.cf2.quoracdn.net/main-qimg-0cbe18cdabc9cab371089a18442a38b2-lq',
    },
  ];

  const renderMovieItem = (item: MovieShow) => (
    <TouchableOpacity key={item.id} style={styles.movieItem}>
      <Image source={{ uri: item.image }} style={styles.movieImage} />
      <View style={styles.movieInfo}>
        <Text style={styles.movieTitle}>
          {item.title} {item.year && (`${item.year}`)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#666"
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={20} color="#666" />
        </TouchableOpacity>
      </View>

  
      <View style={styles.categoriesContainer}>
           
                <View style={styles.tabContainer}>
                  <TouchableOpacity style={[styles.tabButton, styles.tab, activeTab === 'All Shows' && styles.activeTab]} onPress={() => setActiveTab('All Shows')}>
                  <Text style={styles.tabText}>All Shows</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.tabButton, styles.tab, activeTab === 'Movies' && styles.activeTab]} onPress={() => setActiveTab('Movies')} >
                    <Text style={styles.tabText}>Movies</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.tabButton, styles.tab, activeTab === 'TV Shows' && styles.activeTab]} onPress={() => setActiveTab('TV Shows')}>
                    <Text style={styles.tabText}>TV Shows</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.tabButton, styles.tab, activeTab === 'Streamings' && styles.activeTab]} onPress={() => setActiveTab('Streamings')}>
                    <Text style={styles.tabText}>Streamings</Text>
                  </TouchableOpacity>
                </View>
      </View>

      {/* Movies/Shows Grid */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.moviesGrid}>
          {moviesShows.map((item) => renderMovieItem(item))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
    categoriesContainer: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 5,
  },
  categoriesList: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
   categoryButton: {
    backgroundColor: '#fffbde',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 9,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#F5C842',
    minWidth: 30,
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 16,
    color: '#F5C842',
    fontWeight: '400',
    alignContent: 'center',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 18,
    paddingVertical: 5,
    marginTop: 30,
  },
  searchIcon: {
    marginRight: 8,
    color: '#F5C842',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  filterButton: {
    padding: 8,
    marginTop: 30,
  },
  contentContainer: {
    padding: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginBottom: 24,
  },
  tabButton: {
    flex: 1,
    paddingVertical:10,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginRight: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffef85',
    backgroundColor: '#edf0f2',
  },
  tabText: {
    fontSize: 14,
    color: '#ffe016',
    fontWeight: '400',
  },
  tabsContainer: {
    marginVertical: 8,
  },
  tabsContent: {
    paddingHorizontal: 10,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 5,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#fff8c8',
  },
  activeTab: {
    backgroundColor: '#FFA500',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  moviesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  movieItem: {
    width: '48%',
    marginBottom: 20,
  },
  movieImage: {
    width: '100%',
    height: 280,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  movieInfo: {
    marginTop: 8,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});

export default Browser;