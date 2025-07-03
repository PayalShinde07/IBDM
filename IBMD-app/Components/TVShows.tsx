import React, { JSX, useEffect } from "react";
import { FlatList, View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function TVShows(): JSX.Element {

  const [movies, setMovies] = React.useState([]);
  const [, setLoading] = React.useState(true);
  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1", {
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

  return (
   <View style={styles.moviesScroll}>
                 <FlatList
                  data={movies}
                  keyExtractor={(item, index) => index.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }: { item: { poster_path: string; title: string } }) => (
                   <View style={styles.movieCard}>
                    <TouchableOpacity>
                    <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.movieImage} />
                    <Text numberOfLines={1} style={styles.movieTitle}>{item.title}</Text>
                    </TouchableOpacity>
                   </View>
                  )}
                />
               </View>
            
  );
}

const styles = StyleSheet.create({
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