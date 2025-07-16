import React, { JSX, useEffect, useState } from "react";
import { View, Image, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useRouter } from "expo-router";
import  { Book } from "../Types/Book";

export default function HeaderBook(): JSX.Element {

   const router = useRouter();
   const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
   const [, setLoading] = React.useState(true);
   
      useEffect(() => {
        fetch("https://www.googleapis.com/books/v1/volumes", {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZGJlZjk2MGM0ZmZhNDU4MTI0N2JiMzM5OGY1NGM1ZSIsIm5iZiI6MTc1MTM1OTQxNy44ODMwMDAxLCJzdWIiOiI2ODYzOWZiOWQ2ZTg3MGNkM2RjY2Q5NzciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.jPbmLAK5whMqCoLU9kf2w4VUnGJEs6i8hVmHncGf2rc",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.results) {
              setFeaturedBooks(data.results);
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
  <View style={styles.carouselContainer}>
            <Carousel
              loop
              autoPlay
              autoPlayInterval={3000}
              width={Dimensions.get('window').width}
              height={300}
              data={featuredBooks}
              scrollAnimationDuration={1000}
              renderItem={({ item }: { item: Book }) => (
                <View style={styles.featuredSection}>
                  <Image source={{ uri: item.imageLinks?.thumbnail }} style={styles.featuredImage} />
                  <View style={styles.featuredOverlay}>
                    <Text style={styles.featuredTitle}>{item.volumeInfo?.title}</Text>
                    <Text style={styles.featuredDescription}>
                      {(item.volumeInfo?.description?.length || 0) > 100 
                        ? item.volumeInfo?.description?.slice(0, 120) + "..." 
                        : item.volumeInfo?.description}
                    </Text>
                    <TouchableOpacity
                      style={styles.seeMoreButton}
                      onPress={() => router.push('/')}
                    >
                      <Text style={styles.seeMoreText}>See More</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </View>
            
  );
}

const styles = StyleSheet.create({
   carouselContainer: {
  height: 300,
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
});