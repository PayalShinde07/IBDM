export interface Book {
  poster_path: any;
  volumeInfo: any;
  id: string;
  title: string;
  authors?: string[];
  description?: string;
  publishedDate?: string;
  pageCount?: number;
  categories?: string[];
  averageRating?: number;
  ratingsCount?: number;
  imageLinks?: {
    thumbnail?: string;
    small?: string;
    medium?: string;
    large?: string;
  };
  previewLink?: string;
  infoLink?: string;
  publisher?: string;
  language?: string;
}

export interface GoogleBooksResponse {
  items?: {
    id: string;
    volumeInfo: Book;
  }[];
  totalItems: number;
}