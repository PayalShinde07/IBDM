import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Book } from '../Types/Book';

const { width: screenWidth } = Dimensions.get('window');
const ITEM_WIDTH = screenWidth * 0.6;

interface BookCarouselProps {
  books: Book[];
  title: string;
  onBookPress: (book: Book) => void;
}

const BookCarousel: React.FC<BookCarouselProps> = ({ books, title, onBookPress }) => {
  const renderCarouselItem = ({ item }: { item: Book }) => (
    <TouchableOpacity
      style={styles.carouselItem}
      onPress={() => onBookPress(item)}
    >
      <View style={styles.carouselImageContainer}>
        {item.imageLinks?.thumbnail ? (
          <Image
            source={{ uri: item.imageLinks.thumbnail }}
            style={styles.carouselImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.carouselPlaceholder}>
            <Ionicons name="book-outline" size={40} color="#666" />
          </View>
        )}
      </View>
      <View style={styles.carouselInfo}>
        <Text style={styles.carouselTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.carouselAuthors} numberOfLines={1}>
          {item.authors?.join(', ') || 'Unknown Author'}
        </Text>
        {item.averageRating && (
          <View style={styles.carouselRating}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.carouselRatingText}>
              {item.averageRating.toFixed(1)}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  if (books.length === 0) {
    return null;
  }

  return (
    <View style={styles.carouselContainer}>
      <Text style={styles.carouselHeader}>{title}</Text>
      <FlatList
        data={books}
        renderItem={renderCarouselItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carouselContent}
        snapToInterval={ITEM_WIDTH + 15}
        decelerationRate="fast"
        snapToAlignment="start"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    marginBottom: 20,
  },
  carouselHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  carouselContent: {
    paddingHorizontal: 20,
  },
  carouselItem: {
    width: ITEM_WIDTH,
    marginRight: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  carouselImageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  carouselImage: {
    width: 120,
    height: 180,
    borderRadius: 8,
  },
  carouselPlaceholder: {
    width: 120,
    height: 180,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselInfo: {
    alignItems: 'center',
  },
  carouselTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  carouselAuthors: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 5,
  },
  carouselRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  carouselRatingText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#666',
  },
});

export default BookCarousel;