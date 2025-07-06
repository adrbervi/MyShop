export interface Rating {
  count: number;
  rate: number;
}

export default interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  imageUrl: string;
  rating: Rating;
}

export interface FetchState {
  data: Product[];
  loading: boolean;
  error: string | null;
}
