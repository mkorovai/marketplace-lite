type Review = {
  comment: string;
  date: string;
  rating: number;
  reviewerName: string;
};

export type Product = {
  id: number;
  title: string;
  description: string;

  category: string;

  price: number;
  discountPercentage?: number;

  rating: number;
  reviews?: Review[];

  thumbnail: string;
};
