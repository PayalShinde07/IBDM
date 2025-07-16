import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  SafeAreaView,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Book } from '../Types/Book';

interface BookDetailProps {
  book: Book | null;
  visible: boolean;
  isFavorite: boolean;
  onClose: () => void;
  onFavoritePress: () => void;
}

const BookDetail: React.FC<BookDetailProps> = ({
  book,
  visible,
  isFavorite,
  onClose,
  onFavoritePress,
}) => {
  const handlePreviewPress = () => {
    if (book?.previewLink) {
      Linking.openURL(book.previewLink);
    }
  };

  const handleInfoPress = () => {
    if (book?.infoLink) {
      Linking.openURL(book.infoLink);
    }
  };

  if (!book) return null;

  return (
    <Modal animationType="slide" transparent={false} visible={visible}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.headerButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Book Details</Text>
          <TouchableOpacity onPress={onFavoritePress} style={styles.headerButton}>
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavorite ? '#FF4444' : '#666'}
            />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.imageContainer}>
            {book.imageLinks?.thumbnail ? (
              <Image
                source={{ uri: book.imageLinks.thumbnail }}
                style={styles.image}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.placeholder}>
                <Ionicons name="book-outline" size={80} color="#666" />
              </View>
            )}
          </View>

          <View style={styles.info}>
            <Text style={styles.title}>{book.title}</Text>

            {book.authors && (
              <View style={styles.row}>
                <Ionicons name="person-outline" size={16} color="#666" />
                <Text style={styles.text}>{book.authors.join(', ')}</Text>
              </View>
            )}

            {book.publisher && (
              <View style={styles.row}>
                <Ionicons name="business-outline" size={16} color="#666" />
                <Text style={styles.text}>{book.publisher}</Text>
              </View>
            )}

            {book.publishedDate && (
              <View style={styles.row}>
                <Ionicons name="calendar-outline" size={16} color="#666" />
                <Text style={styles.text}>{book.publishedDate}</Text>
              </View>
            )}

            {book.pageCount && (
              <View style={styles.row}>
                <Ionicons name="document-text-outline" size={16} color="#666" />
                <Text style={styles.text}>{book.pageCount} pages</Text>
              </View>
            )}

            {book.categories && (
              <View style={styles.row}>
                <Ionicons name="pricetag-outline" size={16} color="#666" />
                <Text style={styles.text}>{book.categories.join(', ')}</Text>
              </View>
            )}

            {book.averageRating && (
              <View style={styles.row}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.text}>
                  {book.averageRating.toFixed(1)}
                  {book.ratingsCount && ` (${book.ratingsCount} ratings)`}
                </Text>
              </View>
            )}

            {book.language && (
              <View style={styles.row}>
                <Ionicons name="language-outline" size={16} color="#666" />
                <Text style={styles.text}>{book.language}</Text>
              </View>
            )}

            {book.description && (
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionTitle}>Description</Text>
                <Text style={styles.description}>
                  {book.description.replace(/<[^>]*>/g, '')}
                </Text>
              </View>
            )}

            <View style={styles.buttonContainer}>
              {book.previewLink && (
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={handlePreviewPress}
                >
                  <Ionicons name="eye-outline" size={20} color="#fff" />
                  <Text style={styles.buttonText}>Preview</Text>
                </TouchableOpacity>
              )}

              {book.infoLink && (
                <TouchableOpacity
                  style={[styles.actionButton, styles.secondaryButton]}
                  onPress={handleInfoPress}
                >
                  <Ionicons name="information-circle-outline" size={20} color="#007AFF" />
                  <Text style={[styles.buttonText, styles.secondaryButtonText]}>
                    More Info
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: 150,
    height: 225,
    borderRadius: 10,
  },
  placeholder: {
    width: 150,
    height: 225,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
    color: '#666',
    flex: 1,
  },
  descriptionContainer: {
    marginTop: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    gap: 10,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 5,
  },
  secondaryButtonText: {
    color: '#007AFF',
  },
});

export default BookDetail;