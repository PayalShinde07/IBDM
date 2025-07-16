import { Book, GoogleBooksResponse } from '@/Types/Book';

const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes';

export class BookService {
  static async searchBooks(query: string): Promise<Book[]> {
    try {
      const response = await fetch(
        `${GOOGLE_BOOKS_API}?q=${encodeURIComponent(query)}&maxResults=20`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      
      const data: GoogleBooksResponse = await response.json();
      
      if (data.items) {
        return data.items.map(item => ({
          ...item.volumeInfo,
          id: item.id,
        }));
      }
      
      return [];
    } catch (error) {
      console.error('Error searching books:', error);
      throw error;
    }
  }

  static async getBookDetails(bookId: string): Promise<Book | null> {
    try {
      const response = await fetch(`${GOOGLE_BOOKS_API}/${bookId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch book details');
      }
      
      const data = await response.json();
      return {
        ...data.volumeInfo,
        id: data.id,
      };
    } catch (error) {
      console.error('Error fetching book details:', error);
      return null;
    }
  }

  static async getFeaturedBooks(): Promise<Book[]> {
    try {
      const categories = ['fiction', 'science', 'history', 'biography', 'technology'];
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      
      const response = await fetch(
        `${GOOGLE_BOOKS_API}?q=subject:${randomCategory}&maxResults=10&orderBy=relevance`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch featured books');
      }
      
      const data: GoogleBooksResponse = await response.json();
      
      if (data.items) {
        return data.items.map(item => ({
          ...item.volumeInfo,
          id: item.id,
        }));
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching featured books:', error);
      return [];
    }
  }
}