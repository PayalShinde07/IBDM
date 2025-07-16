import AsyncStorage from '@react-native-async-storage/async-storage';
import { Book } from '../Types/Book';

const FAVORITES_KEY = '@booknerd_favorites';

export class StorageService {
  static async getFavorites(): Promise<Book[]> {
    try {
      const favoritesJson = await AsyncStorage.getItem(FAVORITES_KEY);
      return favoritesJson ? JSON.parse(favoritesJson) : [];
    } catch (error) {
      console.error('Error loading favorites:', error);
      return [];
    }
  }

  static async saveFavorites(favorites: Book[]): Promise<void> {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
      throw error;
    }
  }

  static async toggleFavorite(book: Book): Promise<Book[]> {
    try {
      const favorites = await this.getFavorites();
      const isFavorite = favorites.some(fav => fav.id === book.id);
      
      let newFavorites: Book[];
      if (isFavorite) {
        newFavorites = favorites.filter(fav => fav.id !== book.id);
      } else {
        newFavorites = [...favorites, book];
      }
      
      await this.saveFavorites(newFavorites);
      return newFavorites;
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw error;
    }
  }

  static async isFavorite(bookId: string): Promise<boolean> {
    try {
      const favorites = await this.getFavorites();
      return favorites.some(fav => fav.id === bookId);
    } catch (error) {
      console.error('Error checking favorite:', error);
      return false;
    }
  }
}