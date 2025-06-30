import React, { JSX } from 'react';
import {View,Text,SafeAreaView,StatusBar,StyleSheet,ScrollView,Image,TouchableOpacity, FlatList,} from 'react-native';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from 'expo-router';


interface MovieProps {
  title: string;
  image: string;
}

const MovieCard: React.FC<MovieProps> = ({ title, image }) => (
  <TouchableOpacity style={styles.movieCard}>
    <Image source={{ uri: image }} style={styles.movieImage} />
    <Text style={styles.movieTitle}>{title}</Text>
  </TouchableOpacity>
);

export default function Home(): JSX.Element {

  const router = useRouter();
  const topMovies = [
    { title: 'Hawkeye', 
      image: 'https://cdn.marvel.com/content/1x/hawkeye_lob_crd_04.jpg'
     },
    { title: 'Thor: Love and Thunder', 
      image: 'https://m.media-amazon.com/images/M/MV5BZjRiMDhiZjQtNjk5Yi00ZDcwLTkyYTEtMDc1NjdmNjFhNGIzXkEyXkFqcGc@._V1_.jpg' 
    },
    { title: 'The Lord of the Rings', 
      image: 'https://tolkiengateway.net/w/images/thumb/5/5e/The_Lord_of_the_Rings_-_The_Return_of_the_King_-_Ensemble_poster.jpg/640px-The_Lord_of_the_Rings_-_The_Return_of_the_King_-_Ensemble_poster.jpg' 
    },
     { title: 'Avengers', 
      image: 'https://images1.wionews.com/images/ZB-EN/900x1600/2023/5/5/1683302779303_AvengersAgeofUltron.jpg' 
    },
  ];

  const upcomingMovies = [
    { title: 'Chhaava', 
      image: 'https://stat4.bollywoodhungama.in/wp-content/uploads/2023/10/Chhaava.jpg' 
    },
    { title: 'Inception', 
      image: 'https://c8.alamy.com/comp/2JH2PW0/movie-poster-inception-2010-2JH2PW0.jpg' 
    },
    { title: 'Avatar', 
      image: 'https://m.media-amazon.com/images/M/MV5BNmQxNjZlZTctMWJiMC00NGMxLWJjNTctNTFiNjA1Njk3ZDQ5XkEyXkFqcGc@._V1_.jpg' 
    },
    { title: 'Maleficent', 
      image: 'https://photogallery.indiatimes.com/movies/international/maleficent/photo/35618380/Poster-of-Hollywood-dark-fantasy-adventure-film-Maleficent-starring-Angelina-Jolie-.jpg' 
    },
  ];

  const recommendedMovies = [
    { title: 'Avengers', 
      image: 'https://images1.wionews.com/images/ZB-EN/900x1600/2023/5/5/1683302779303_AvengersAgeofUltron.jpg' 
    },
    { title: 'Maleficent', 
      image: 'https://photogallery.indiatimes.com/movies/international/maleficent/photo/35618380/Poster-of-Hollywood-dark-fantasy-adventure-film-Maleficent-starring-Angelina-Jolie-.jpg' 
    },
    { title: 'Jumanji', 
      image: 'https://qqcdnpictest.mxplay.com/pic/bce7ae02445dad432bdab581e180ceef/en/2x3/312x468/d5f863cd13cc307123989701f8b72fdf_1280x1920.webp' 
    },
    { title: 'Hawkeye', 
      image: 'https://cdn.marvel.com/content/1x/hawkeye_lob_crd_04.jpg'
     },
  ];

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

          <View style={styles.featuredSection}>
            <Image
              source={{ uri: 'https://m.media-amazon.com/images/S/pv-target-images/cd1315256292e7814afe0b8a5e25e6d2c752aea049deb5df61b6d3ebbbff777d.jpg' }}
              style={styles.featuredImage}
            />
            <View style={styles.featuredOverlay}>
              <Text style={styles.featuredTitle}>House of the Dragon</Text>
              <Text style={styles.featuredDescription}>
                An internal succession war within House Targaryen at the height of its power, 172 years before the birth of Daenerys Targaryen.
              </Text>
              <TouchableOpacity style={styles.seeMoreButton} onPress={() => router.push('/(tabs)/MovieDetail')}>
                <Text style={styles.seeMoreText}>See More</Text>
              </TouchableOpacity>
            </View>
          </View>

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
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Upcoming Movies</Text>
              <TouchableOpacity>
                <Text style={styles.seeMoreLink}>See More</Text>
              </TouchableOpacity>
            </View>
           <View style={styles.moviesScroll}>
            <FlatList
              data={upcomingMovies}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <MovieCard title={item.title} image={item.image} />
              )}
            />
    </View>
          </View>


          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>You might also like</Text>
              <TouchableOpacity>
                <Text style={styles.seeMoreLink}>See More</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.moviesScroll}>
             <FlatList
               data={recommendedMovies}
               keyExtractor={(item, index) => index.toString()}
               horizontal
               showsHorizontalScrollIndicator={false}
               renderItem={({ item }) => (
                 <MovieCard title={item.title} image={item.image} />
               )}
             />
    </View>
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
  featuredSection: {
    position: 'relative',
    height: 300,
    backgroundColor: '#FFFFFF',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  featuredOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 16,
  },
  featuredTitle: {
    color: '#F5C842',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    zIndex: 2,
  },
  featuredDescription: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 16,
    marginBottom: 12,
    zIndex: 2,
  },
  seeMoreButton: {
    backgroundColor: '#F5C418',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  seeMoreText: {
    color: '#000000',
    fontSize: 14,
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
  moviesScroll: {
    paddingLeft: 16,
    backgroundColor: '#FFFFFF',
  },
  movieCard: {
    marginRight: 12,
    width: 120,
    backgroundColor: '#FFFFFF',
  },
  movieImage: {
    width: 120,
    height: 180,
    borderRadius: 8,
    marginBottom: 8,
  },
  movieTitle: {
    fontSize: 12,
    color: '#000000',
    textAlign: 'center',
    lineHeight: 16,
  },
});