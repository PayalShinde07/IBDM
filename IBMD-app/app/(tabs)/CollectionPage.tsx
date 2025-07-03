import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet,StatusBar,TouchableOpacity,ScrollView,TextInput,SafeAreaView,Alert,Dimensions,Switch,FlatList,Image,} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 60) / 3;

type MovieItem = {
  poster_path: any;
  id: string;
  title: string;
  image: string;
  isSelected?: boolean;
  backgroundColor?: string;
}

const CollectionPage: React.FC = () => {
  const router = useRouter();
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [collectionName, setCollectionName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [movies, setMovies] = React.useState<MovieItem[]>([]); 
  const [, setLoading] = React.useState<boolean>(true); 
  
  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZGJlZjk2MGM0ZmZhNDU4MTI0N2JiMzM5OGY1NGM1ZSIsIm5iZiI6MTc1MTM1OTQxNy44ODMwMDAxLCJzdWIiOiI2ODYzOWZiOWQ2ZTg3MGNkM2RjY2Q5NzciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.jPbmLAK5whMqCoLU9kf2w4VUnGJEs6i8hVmHncGf2rc",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.results) {
          setMovies(data.results);
          setLoading(false);
        } else {
          console.log("data not found");
        }
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, []);
  
  const handleSeeMore = (): void => {
    Alert.alert('See More', 'See more movies to add');
  };

  const toggleMovieSelection = (movieId: string): void => {
    setMovies((prevMovies: MovieItem[]) =>
      prevMovies.map(movie => movie.id === movieId
          ? { ...movie, isSelected: !movie.isSelected }
          : movie
      )
    )
  };

  const togglePrivate = (value: boolean): void => {
    setIsPrivate(value);
  };

  const renderMovieItem = ({ item }: { item: MovieItem }) => (
    <View style={styles.movieWrapper}>
      <TouchableOpacity
        style={styles.movieItem}
        onPress={() => toggleMovieSelection(item.id)}
        activeOpacity={0.8}
      >
        <View style={styles.moviePoster}>
          <Image 
            source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} 
            style={styles.movieImage}
            resizeMode="cover"
          />
          <View style={styles.addIconContainer}>
            <MaterialCommunityIcons
              name={item.isSelected ? "check-circle" : "plus-circle"}
              size={24}
              color={item.isSelected ? "#4CAF50" : "#FFF"}
            />
          </View>
        </View>
      </TouchableOpacity>
      <Text style={styles.movieLabel}>{item.title.toLowerCase()}</Text>
    </View>
  );

  const renderRow = ({ item, index }: { item: MovieItem[]; index: number }) => (
    <View style={styles.movieRow} key={index}>
      {item.map((movie, movieIndex) => (
        <View key={`${movie.id}-${movieIndex}`}>
          {renderMovieItem({ item: movie })}
        </View>
      ))}
    </View>
  );

  const groupedMovies = movies.reduce<MovieItem[][]>((rows, movie, index) => {
    if (index % 3 === 0) {
      rows.push([movie]);
    } else {
      rows[rows.length - 1].push(movie);
    }
    return rows;
  }, []);

  return (
    <View style={styles.outerContainer}>
              <StatusBar barStyle="dark-content" backgroundColor="#F5C842" />
              <SafeAreaView style={styles.safeArea}>
          
                <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(tabs)/WatchList')}>
              <MaterialCommunityIcons name="chevron-left" size={34} color="#000" />
            </TouchableOpacity>
            <Text style={styles.imdbLogo}>Create a Collection</Text>
          </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.privateContainer}>
          <Switch
            value={isPrivate}
            onValueChange={togglePrivate}
            trackColor={{ false: '#000000', true: '#F5C842' }}
            thumbColor={isPrivate ? '#FFF' : '#FFF'}
            ios_backgroundColor="#E0E0E0"
          />
          <Text style={styles.privateLabel}>Private</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Collection name"
            placeholderTextColor="#999"
            value={collectionName}
            onChangeText={setCollectionName}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.textInput, styles.descriptionInput]}
            placeholder="Description"
            placeholderTextColor="#999"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={2}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.addFromHereContainer}>
          <View style={styles.addFromHereHeader}>
            <Text style={styles.addFromHereTitle}>Add from here</Text>
            <TouchableOpacity onPress={handleSeeMore}>
              <Text style={styles.seeMore}>See More</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={groupedMovies}
            renderItem={renderRow}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
    </View>
  );
};

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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  privateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  privateLabel: {
    fontSize: 17,
    color: '#000',
    marginLeft: 12,
    fontWeight: '400',
  },
  inputContainer: {
    marginBottom: 12,
  },
  textInput: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 17,
    color: '#000',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  descriptionInput: {
    height: 80,
    paddingTop: 16,
  },
  addFromHereContainer: {
    marginTop: 20,
    paddingBottom: 30,
  },
  addFromHereHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  addFromHereTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  seeMore: {
    color: '#FFB800',
    fontSize: 16,
    fontWeight: '400',
  },
  movieRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  movieWrapper: {
    alignItems: 'center',
    width: ITEM_WIDTH,
  },
  movieItem: {
    width: ITEM_WIDTH,
    marginBottom: 8,
  },
  moviePoster: {
    width: '100%',
    height: 140,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  movieImage: {
    width: '100%',
    height: '100%',
  },
  addIconContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 12,
    padding: 2,
  },
  movieLabel: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    fontWeight: '400',
    marginTop: 4,
  },
});

export default CollectionPage;