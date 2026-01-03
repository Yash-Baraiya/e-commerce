export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  sold: number;
  rating: number;
  image: string;
  status: string;
}

export interface ProductStats {
  totalProducts: number;
  inStock: number;
  outOfStock: number;
  lowStock: number;
  totalRevenue: number;
  totalSold: number;
  avgRating: number;
}
