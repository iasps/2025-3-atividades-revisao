'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Star, TrendingUp } from 'lucide-react';
import { Product } from '@/types';
import { dummyApi } from '@/lib/api';

// Dados locais (variáveis) - Etapa 3 da atividade
const localProducts: Product[] = [
  {
    id: 1,
    title: "iPhone 15 Pro",
    description: "Latest iPhone with A17 Pro chip",
    price: 999,
    discountPercentage: 5.0,
    rating: 4.8,
    stock: 50,
    brand: "Apple",
    category: "smartphones",
    thumbnail: "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
    images: []
  },
  {
    id: 2,
    title: "MacBook Pro 14",
    description: "Powerful laptop for professionals",
    price: 1999,
    discountPercentage: 7.5,
    rating: 4.9,
    stock: 25,
    brand: "Apple",
    category: "laptops",
    thumbnail: "https://cdn.dummyjson.com/product-images/6/thumbnail.png",
    images: []
  },
  {
    id: 3,
    title: "Samsung Galaxy S24",
    description: "Android flagship phone",
    price: 899,
    discountPercentage: 3.2,
    rating: 4.7,
    stock: 75,
    brand: "Samsung",
    category: "smartphones",
    thumbnail: "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
    images: []
  }
];

export default function ProductList() {
  // Gerenciamento de estado - Etapa 4 da atividade
  const [products, setProducts] = useState<Product[]>(localProducts);
  const [cart, setCart] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'local' | 'api'>('local');

  // Acesso à API - Etapa 5 da atividade
  const fetchProducts = async () => {
    if (viewMode === 'api') {
      setIsLoading(true);
      try {
        const data = await dummyApi.getProducts(5);
        setProducts(data.products);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setProducts(localProducts);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [viewMode]);

  const addToCart = (productId: number) => {
    setCart([...cart, productId]);
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(id => id !== productId));
  };

  const totalPrice = products
    .filter(p => cart.includes(p.id))
    .reduce((sum, p) => sum + p.price, 0);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Lista de Produtos
            </CardTitle>
            <CardDescription>
              {viewMode === 'local' 
                ? 'Usando dados locais (variáveis)' 
                : 'Usando dados da API DummyJSON'}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'local' ? 'default' : 'outline'}
              onClick={() => setViewMode('local')}
              size="sm"
            >
              Dados Locais
            </Button>
            <Button
              variant={viewMode === 'api' ? 'default' : 'outline'}
              onClick={() => setViewMode('api')}
              size="sm"
            >
              API Online
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-3 bg-slate-50 rounded-lg">
          <div className="flex justify-between">
            <span className="font-medium">Carrinho: {cart.length} itens</span>
            <span className="font-bold">Total: R$ {totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8">Carregando produtos da API...</div>
          ) : (
            products.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-slate-100 rounded-md flex items-center justify-center">
                      <div className="text-slate-400">Imagem</div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-bold text-lg">{product.title}</h3>
                        <Badge variant={product.stock > 20 ? "default" : "destructive"}>
                          {product.stock} em estoque
                        </Badge>
                      </div>
                      <p className="text-slate-600 text-sm mt-1">{product.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-medium">{product.rating}</span>
                        </div>
                        <Badge variant="outline">{product.category}</Badge>
                        <Badge variant="secondary">{product.brand}</Badge>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold">R$ {product.price}</span>
                          {product.discountPercentage > 0 && (
                            <Badge variant="outline" className="text-green-600">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              {product.discountPercentage}% OFF
                            </Badge>
                          )}
                        </div>
                        <Button
                          variant={cart.includes(product.id) ? "destructive" : "default"}
                          onClick={() => 
                            cart.includes(product.id) 
                              ? removeFromCart(product.id)
                              : addToCart(product.id)
                          }
                          size="sm"
                        >
                          {cart.includes(product.id) ? 'Remover' : 'Adicionar'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}