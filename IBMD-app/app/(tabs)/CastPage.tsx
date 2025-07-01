import React from 'react';
import {View,Text,ScrollView,TouchableOpacity,SafeAreaView,StyleSheet,StatusBar,Image,} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { castMembers } from '@/Components/Array';
type CastMember = {
  id: string;
  name: string;
  image: string;
}

const CastPage: React.FC = () => {
    const router = useRouter();

  const renderCastMember = (member: CastMember, index: number) => (
    <TouchableOpacity key={member.id} style={styles.castMemberContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: member.image }} style={styles.castImage} />
      </View>
      <Text style={styles.castName} numberOfLines={2}>
        {member.name}
      </Text>
    </TouchableOpacity>
  );

  const renderCastGrid = () => {
    const rows = [];
    for (let i = 0; i < castMembers.length; i += 4) {
      const rowMembers = castMembers.slice(i, i + 4);
      rows.push(
        <View key={i} style={styles.castRow}>
          {rowMembers.map((member, index) => renderCastMember(member, i + index))}
        </View>
      );
    }
    return rows;
  };

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
    height: 80,
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