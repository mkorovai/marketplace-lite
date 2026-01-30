// react-native
import { ImageSourcePropType } from 'react-native';

export type Product = {
  id: string;
  title: string;
  description: string;

  category: 'Electronics' | 'Fashion' | 'Home';

  price: number;
  oldPrice?: number;
  discountPercent?: number;

  rating: number; // 0–5
  reviewsCount: number;

  image: ImageSourcePropType;

  isFavorite: boolean;
};
