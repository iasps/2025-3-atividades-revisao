export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  birthDate: string;
  image: string;
  address: {
    address: string;
    city: string;
    postalCode: string;
    state: string;
  };
}

export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export type ApiResource = 'products' | 'users' | 'todos';