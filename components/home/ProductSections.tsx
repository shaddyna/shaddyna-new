import { useState, useEffect } from 'react';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

interface Product {
  _id: string;
  name: string;
  price?: number;
  images: string[];
  rating?: number;
  createdAt: string;
  category?: string;
  isNew?: boolean;
  isTrending?: boolean;
  isDiscounted?: boolean;
  originalPrice?: number;
}

const ProductSections = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ... (keep your existing useEffect and data fetching logic)
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchProducts = async () => {
      try {
        const cachedProducts = localStorage.getItem("products");
        if (cachedProducts && isMounted) {
          setProducts(JSON.parse(cachedProducts));
          setIsLoading(false);
          return;
        }

        const response = await fetch(
          "https://shaddyna-backend.onrender.com/api/products/all",
          { signal }
        );
        
        if (!response.ok) throw new Error("Failed to fetch products");
        
        const data = await response.json();
        
        const fetchedProducts: Product[] = data.products.map((product: any) => ({
          _id: product._id,
          name: product.name || 'Unnamed Product',
          price: product.price ?? 0,
          images: product.images || [],
          rating: product.rating || Math.floor(Math.random() * 5) + 1,
          createdAt: product.createdAt,
          category: product.category,
          isNew: product.isNew,
          isTrending: product.isTrending,
          isDiscounted: product.isDiscounted,
          originalPrice: product.originalPrice
        }));
        
        if (isMounted) {
          localStorage.setItem("products", JSON.stringify(fetchedProducts));
          setProducts(fetchedProducts);
          setError(null);
        }
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError' && isMounted) {
          console.error("Error fetching products:", err);
          setError("Failed to load products. Please try again later.");
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-[#bf2c7e]/20 h-12 w-12"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg inline-block">
          {error}
        </div>
      </div>
    );
  }

  return (
    <section className="py-6 sm:py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">All Products</h2>
          {/* Optional: Add a filter/sort dropdown here */}
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="group bg-white rounded-xl shadow-xs hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col"
              >
                {/* Product Image */}
                <div className="relative w-full aspect-[3/4] overflow-hidden">
                  <img
                    src={product.images[0] || 'https://placehold.co/300x400?text=No+Image'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    {product.isNew && (
                      <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full">
                        New
                      </span>
                    )}
                    {product.isDiscounted && (
                      <span className="text-xs bg-[#bf2c7e] text-white px-2 py-1 rounded-full">
                        Sale
                      </span>
                    )}
                  </div>
                  <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full backdrop-blur-sm hover:bg-white transition-colors">
                    <FiHeart className="h-4 w-4 text-gray-700 hover:text-[#bf2c7e]" />
                  </button>
                </div>

                {/* Product Details */}
                <div className="p-3 sm:p-4 flex flex-col flex-grow">
                  <div className="mb-1">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">
                      {product.category || 'Uncategorized'}
                    </p>
                    <h3 className="text-sm sm:text-base font-medium text-gray-900 line-clamp-2">
                      {product.name}
                    </h3>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-2 sm:mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        i < (product.rating || 0) ? (
                          <AiFillStar key={i} className="text-yellow-400 w-3 h-3 sm:w-4 sm:h-4" />
                        ) : (
                          <AiOutlineStar key={i} className="text-gray-300 w-3 h-3 sm:w-4 sm:h-4" />
                        )
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
                  </div>

                  {/* Price */}
                  <div className="mt-auto">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm sm:text-base font-bold text-[#bf2c7e]">
                          Ksh{(product.price ?? 0).toLocaleString()}
                        </span>
                        {product.isDiscounted && product.originalPrice && (
                          <span className="text-xs text-gray-400 line-through ml-2">
                            Ksh{(product.originalPrice ?? 0).toLocaleString()}
                          </span>
                        )}
                      </div>
                      <button className="p-2 bg-[#0f1c47] text-white rounded-full hover:bg-[#0f1c47]/90 transition-colors">
                        <FiShoppingCart className="h-3 w-3 sm:h-4 sm:w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <p className="text-gray-500">No products available</p>
            <button className="mt-4 text-sm text-[#bf2c7e] hover:underline">
              Refresh products
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductSections;



