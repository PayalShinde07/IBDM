import React from 'react';
import {View,Text,Image,TouchableOpacity,SafeAreaView,StyleSheet,StatusBar,FlatList,} from 'react-native';
import { MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { notifications } from '@/Components/Array';
type NotificationItem ={
  id: string;
  title: string;
  timeAgo: string;
  image: string;
  iconType: 'video' | 'image' | 'file' | 'clock' | 'heart';
}

const Notification: React.FC = () => {
    const router = useRouter();
 
  const getIconComponent = (iconType: string) => {
    const iconProps = {
      size: 20,
      color: '#000000',
    };

    switch (iconType) {
      case 'video':
        return <MaterialCommunityIcons name="video" {...iconProps} />;
      case 'image':
        return <MaterialCommunityIcons name="image" {...iconProps} />;
      case 'file':
        return <MaterialCommunityIcons name="file-document" {...iconProps} />;
      case 'clock':
        return <MaterialCommunityIcons name="clock" {...iconProps} />;
      case 'heart':
        return <MaterialCommunityIcons name="heart" {...iconProps} />;
      default:
        return <MaterialCommunityIcons name="bell" {...iconProps} />;
    }
  };

  const renderNotificationItem = ({ item }: { item: NotificationItem }) => (
    <TouchableOpacity style={styles.notificationItem}>
      <Image source={{ uri: item.image }} style={styles.profileImage} />
      <View style={styles.contentContainer}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.timeAgo}>{item.timeAgo}</Text>
      </View>
      <View style={styles.iconContainer}>
        {getIconComponent(item.iconType)}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.outerContainer}>
          <StatusBar barStyle="dark-content" backgroundColor="#F5C842" />
          <SafeAreaView style={styles.safeArea}>
      
            <View style={styles.header}>
              <Text style={styles.imdbLogo}>Notification</Text>
        <TouchableOpacity style={styles.settingsButton} onPress={() => router.push('/(tabs)/LoginScreen')}>
          <MaterialCommunityIcons name="cog" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.markAllContainer}>
        <TouchableOpacity style={styles.hamburgerButton} onPress={() => router.push('/(tabs)/Filter')}>
          <Ionicons name="filter" size={24} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.markAllText}>Mark all as read</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.notificationsList}
      />
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

  settingsButton: {
    padding: 5,
  },
  markAllContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  hamburgerButton: {
    padding: 5,
  },
  markAllText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
  },
  notificationsList: {
    paddingBottom: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginVertical: 5,
    width: '100%',
    height: 80,
    padding: 10,
    alignItems: 'flex-start',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  contentContainer: {
    flex: 1,
    marginRight: 10,
  },
  notificationTitle: {
    fontSize: 15,
    color: '#000000',
    lineHeight: 20,
    marginBottom: 5,
  },
  timeAgo: {
    fontSize: 12,
    color: '#666',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    marginRight: 15,
  },
});

export default Notification;