import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Book } from '../Types/Book';
import { BookService } from '../services/BookService';
import { StorageService } from '../utils/storage';
import BookCarousel from '../components/BookCarousel';
import BookItem from '../components/BookItem';
import BookDetail from '../components/BookDetail';
import HeaderBook from '../components/HeaderBook';

export const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [books, setBooks] = useState<Book[]>([]);
  const [favorites, setFavorites] = useState<Book[]>([]);
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const [detailModalVisible, setDetailModalVisible] = useState<boolean>(false);
  const [isLoadingFeatured, setIsLoadingFeatured] = useState<boolean>(true);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    await loadFavorites();
    await loadFeaturedBooks();
  };

  const loadFavorites = async () => {
    try {
      const favs = await StorageService.getFavorites();
      setFavorites(favs);
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const loadFeaturedBooks = async () => {
    try {
      setIsLoadingFeatured(true);
      const featured = await BookService.getFeaturedBooks();
      setFeaturedBooks(featured);
    } catch (error) {
      console.error('Error loading featured books:', error);
    } finally {
      setIsLoadingFeatured(false);
    }
  };

  const searchBooks = async () => {
    if (!searchQuery.trim()) {
      Alert.alert('Error', 'Please enter a search term');
      return;
    }

    setIsLoading(true);
    try {
      const results = await BookService.searchBooks(searchQuery);
      setBooks(results);
      
      if (results.length === 0) {
        Alert.alert('No Results', 'No books found for your search');
      }
    } catch (error) {
      console.error('Error searching books:', error);
      Alert.alert('Error', 'Failed to search books. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = async (book: Book) => {
    try {
      const newFavorites = await StorageService.toggleFavorite(book);
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Error toggling favorite:', error);
      Alert.alert('Error', 'Failed to update favorites');
    }
  };

  const isFavorite = (bookId: string): boolean => {
    return favorites.some(fav => fav.id === bookId);
  };

  const openBookDetail = (book: Book) => {
    setSelectedBook(book);
    setDetailModalVisible(true);
  };

  const closeBookDetail = () => {
    setDetailModalVisible(false);
    setSelectedBook(null);
  };

  const handleFavoriteToggle = () => {
    if (selectedBook) {
      toggleFavorite(selectedBook);
    }
  };

  const renderBookItem = ({ item }: { item: Book }) => (
    <BookItem
      book={item}
      isFavorite={isFavorite(item.id)}
      onPress={() => openBookDetail(item)}
      onFavoritePress={() => toggleFavorite(item)}
    />
  );

  const currentBooks = showFavorites ? favorites : books;
  const hasSearched = books.length > 0 || searchQuery.trim() !== '';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appTitle}>📚 BookNerd</Text>
        <TouchableOpacity
          style={styles.favoritesToggle}
          onPress={() => setShowFavorites(!showFavorites)}
        >
          <Ionicons
            name={showFavorites ? 'search' : 'heart'}
            size={24}
            color={showFavorites ? '#666' : '#FF4444'}
          />
        </TouchableOpacity>
      </View>

      {!showFavorites && (
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Ionicons name="search" size={20} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for books..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={searchBooks}
            />
          </View>
          <TouchableOpacity style={styles.searchButton} onPress={searchBooks}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
      )}

      {showFavorites && (
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsTitle}>Your Favorites</Text>
          <Text style={styles.resultsCount}>
            {favorites.length} {favorites.length === 1 ? 'book' : 'books'}
          </Text>
        </View>
      )}

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Searching books...</Text>
        </View>
      ) : (
        <FlatList
          data={currentBooks}
          renderItem={renderBookItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.booksList}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            !showFavorites && !hasSearched ? (
              <View>
                {isLoadingFeatured ? (
                  <View style={styles.featuredLoading}>
                    <ActivityIndicator size="large" color="#007AFF" />
                    <Text style={styles.loadingText}>Loading featured books...</Text>
                  </View>
                ) : (
                  <BookCarousel
                    books={featuredBooks}
                    title="Featured Books"
                    onBookPress={openBookDetail}
                  />
                // <HeaderBook/>
                )}
              </View>
            ) : hasSearched && !showFavorites ? (
              <View style={styles.resultsHeader}>
                <Text style={styles.resultsTitle}>Search Results</Text>
                <Text style={styles.resultsCount}>
                  {books.length} {books.length === 1 ? 'book' : 'books'}
                </Text>
              </View>
            ) : null
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons
                name={showFavorites ? 'heart-outline' : 'book-outline'}
                size={80}
                color="#ccc"
              />
              <Text style={styles.emptyText}>
                {showFavorites
                  ? 'No favorite books yet'
                  : hasSearched
                  ? 'No books found'
                  : 'Search for books to get started'}
              </Text>
            </View>
          }
        />
      )}

      <BookDetail
        book={selectedBook}
        visible={detailModalVisible}
        isFavorite={selectedBook ? isFavorite(selectedBook.id) : false}
        onClose={closeBookDetail}
        onFavoritePress={handleFavoriteToggle}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  favoritesToggle: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
    gap: 10,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  searchButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultsHeader: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  resultsCount: {
    fontSize: 14,
    color: '#666',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  booksList: {
    paddingBottom: 20,
  },
  featuredLoading: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyText: {
    marginTop: 20,
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    lineHeight: 24,
  },
});
