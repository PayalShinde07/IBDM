import React, { useEffect } from 'react';
import {View,Text,ScrollView,TouchableOpacity,SafeAreaView,StyleSheet,StatusBar,Image,} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';


type ApiCastMember = {
  id: number;
  name: string;
  profile_path: string | null;
  known_for_department: string;
  popularity: number;
}

const CastPage: React.FC = () => {
    const router = useRouter();

    const [member, setMember] = React.useState<ApiCastMember[]>([]);
    const [, setLoading] = React.useState<boolean>(true); 

    useEffect(() => {
      fetch("https://api.themoviedb.org/3/person/popular?language=en-US&page=1", {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZGJlZjk2MGM0ZmZhNDU4MTI0N2JiMzM5OGY1NGM1ZSIsIm5iZiI6MTc1MTM1OTQxNy44ODMwMDAxLCJzdWIiOiI2ODYzOWZiOWQ2ZTg3MGNkM2RjY2Q5NzciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.jPbmLAK5whMqCoLU9kf2w4VUnGJEs6i8hVmHncGf2rc",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.results) {
            setMember(data.results);
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



  const renderApiCastMember = (member: ApiCastMember, index: number) => (
    <TouchableOpacity key={`api-${member.id}-${index}`} style={styles.castMemberContainer}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ 
            uri: member.profile_path 
              ? `https://image.tmdb.org/t/p/w500${member.profile_path}` 
              : 'https://via.placeholder.com/150x150?text=No+Image'
          }} 
          style={styles.castImage} 
        />
      </View>
      <Text style={styles.castName} numberOfLines={2}>
        {member.name}
      </Text>
    </TouchableOpacity>
  );

  const renderCastGrid = () => {
    const rows = [];
    

    if (member.length > 0) {
      for (let i = 0; i < member.length; i += 4) {
        const rowMembers = member.slice(i, i + 4);
        rows.push(
          <View key={`api-row-${i}`} style={styles.castRow}>
            {rowMembers.map((memberItem, index) => renderApiCastMember(memberItem, i + index))}
          </View>
        );
      }
    } 
     return rows;
      }
    
   

  return (
    <View style={styles.outerContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5C418" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(tabs)/MovieDetail')}>
            <MaterialCommunityIcons name="chevron-left" size={34} color="#000" />
          </TouchableOpacity>
          <Text style={styles.imdbLogo}>Cast</Text>
        </View>

        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.castContainer}>
            {renderCastGrid()}
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
    backgroundColor: '#F5C418',
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
  scrollContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  castContainer: {
    padding: 16,
  },
  castRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  castMemberContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  imageContainer: {
    width: 80,
    height: 90,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
    backgroundColor: '#F0F0F0',
  },
  castImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  castName: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 16,
    minHeight: 32,
  },
});

export default CastPage;