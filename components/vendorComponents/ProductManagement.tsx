/*import { FiEdit, FiPlus, FiTrash } from "react-icons/fi";
import Button from "../ui/Button";
interface Product {
    id: number; // Allow both string and number
    name: string;
    stock: number;
    price: number;
} 

interface ProductManagementProps {
  products: Product[]; 
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setIsProductModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditedProduct: React.Dispatch<React.SetStateAction<Product>>;
}
  

interface ProductItemProps {
    product: Product;
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    setIsProductModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setEditedProduct: React.Dispatch<React.SetStateAction<Product>>;
  }
  

export const ProductManagement: React.FC<ProductManagementProps> = ({ 
  products, 
  setProducts, 
  setIsProductModalOpen, 
  setEditedProduct 
}) => (
  <div className="lg:col-span-2 bg-white p-3 rounded-xl shadow-md">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-xl font-semibold text-[#0f1c47]">Product Management</h3>
      <Button onClick={() => {
        setIsProductModalOpen(true);
        setEditedProduct({ id: 0, name: "", stock: 0, price: 0 });
      }}>
        Add Product
      </Button>
    </div>
    <div className="space-y-4">
      {products.map(product => (
        <ProductItem 
          key={product.id} 
          product={product}
          setProducts={setProducts}
          setEditedProduct={setEditedProduct}
          setIsProductModalOpen={setIsProductModalOpen}
        />
      ))}
    </div>
  </div>
);

const ProductItem: React.FC<ProductItemProps> = ({ 
  product, 
  setProducts, 
  setEditedProduct, 
  setIsProductModalOpen 
}) => (
  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
    <div>
      <p className="text-[#0f1c47] font-medium">{product.name}</p>
      <p className="text-sm text-gray-500">Stock: {product.stock}</p>
    </div>
    <div className="flex items-center gap-3">
      <p className="text-[#bf2c7e] font-semibold">Ksh {product.price}</p>
      <FiEdit 
        className="text-blue-500 cursor-pointer" 
        onClick={() => { setEditedProduct(product); setIsProductModalOpen(true); }}
      />
      <FiTrash 
        className="text-red-500 cursor-pointer" 
        onClick={() => setProducts(prevProducts => prevProducts.filter(p => p.id !== product.id))} 
      />
    </div>
  </div>
);*/

import { FiEdit, FiTrash } from "react-icons/fi";
import Button from "../ui/Button";

interface Product {
  id: number;
  name: string;
  stock: number;
  price: number;
}

interface ProductManagementProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setIsProductModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditedProduct: React.Dispatch<React.SetStateAction<Product>>;
}

interface ProductItemProps {
  product: Product;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setIsProductModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditedProduct: React.Dispatch<React.SetStateAction<Product>>;
}


export const ProductManagement: React.FC<ProductManagementProps> = ({
  products,
  setProducts,
  setIsProductModalOpen,
  setEditedProduct,
}) => (
  <div className="lg:col-span-2 bg-gradient-to-br from-white to-[#f8f9fd] p-4 sm:p-6 rounded-2xl shadow-xl border border-[#f0f0f0]">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h3 className="text-2xl font-bold text-[#0f1c47]">Product Management</h3>
        <p className="text-sm text-gray-500 mt-1">{products.length} products listed</p>
      </div>
      <Button
        onClick={() => {
          setIsProductModalOpen(true);
          setEditedProduct({ id: 0, name: "", stock: 0, price: 0 });
        }}
        className="group w-full sm:w-auto"
       // variant="gradient"
      >
        
        Add Product
      </Button>
    </div>

    <div className="space-y-3">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          setProducts={setProducts}
          setEditedProduct={setEditedProduct}
          setIsProductModalOpen={setIsProductModalOpen}
        />
      ))}
    </div>
  </div>
);
const ProductItem: React.FC<ProductItemProps> = ({
  product,
  setProducts,
  setEditedProduct,
  setIsProductModalOpen,
}) => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-[#f0f0f0]">
    {/* Left Side */}
    <div className="flex-1 space-y-1.5 w-full">
      <div className="flex items-center gap-3">
        <h4 className="text-base sm:text-lg font-semibold text-[#0f1c47]">{product.name}</h4>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            product.stock > 0 
              ? "bg-green-100 text-green-700" 
              : "bg-red-100 text-red-700"
          }`}
        >
          {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
        </span>
      </div>
      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
        <span>SKU: #{product.id.toString().padStart(4, '0')}</span>
        <div className="w-1 h-1 bg-gray-300 rounded-full" />
        <span>Last updated: 2d ago</span>
      </div>
    </div>

    {/* Right Side (Price & Actions) */}
    <div className="flex flex-col sm:flex-row items-center sm:items-center sm:gap-4 mt-3 sm:mt-0 sm:pl-4 w-full sm:w-auto">
      {/* Price Section */}
      <div className="flex flex-col items-center sm:items-end w-full sm:w-auto">
        <p className="text-lg sm:text-xl font-bold text-[#bf2c7e]">Ksh {product.price}</p>
        <span className="text-xs sm:text-sm text-gray-500">per unit</span>
      </div>

      {/* Icons Section */}
      <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-2.5 border-t sm:border-l border-[#00000010] sm:pl-4 pt-3 sm:pt-0 w-full sm:w-auto">
        <FiEdit
          className="text-blue-500 hover:text-blue-600 cursor-pointer text-lg sm:text-xl transition-colors"
          onClick={() => { setEditedProduct(product); setIsProductModalOpen(true); }}
        />
        <FiTrash
          className="text-red-500 hover:text-red-600 cursor-pointer text-lg sm:text-xl transition-colors"
          onClick={() => setProducts(prev => prev.filter(p => p.id !== product.id))}
        />
      </div>
    </div>
  </div>
);

