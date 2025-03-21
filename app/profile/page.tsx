"use client";
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { ProfileHeader } from '@/components/ProfileHeader';
import { MainContent } from '@/components/MainContent';
import { User } from '@/types/profile';
import { dummyUser, dummyOrders, dummyUsers, dummyProducts } from '@/data/dummyData';
import { EditProfileModal } from '@/components/EditProfileModal';
import axios from 'axios';
import { ProfileNavbar } from '@/components/ProfileNavBar';
import { AdminDashboard } from '@/components/AdminDashboard';
import UserDashboard from '@/components/UserDashboard';
import { ProductModal } from '@/components/vendorComponents/ProductModal';
import { WithdrawalModal } from '@/components/vendorComponents/WithdrawalModal';
import { WithdrawalRequests } from '@/components/vendorComponents/WithdrawalRequest';
import { ProductManagement } from '@/components/vendorComponents/ProductManagement';
import { ShopSection } from '@/components/vendorComponents/ShopSection';
import { SalesDashboard } from '@/components/vendorComponents/SalesDashboard';
import { Order } from '@/types/profile'; 
import { CustomerOrders } from '@/components/vendorComponents/CustomerOrder';
import { EditShopModal } from '@/components/vendorComponents/EditShopModal';
import { Shop } from '@/types/profile';

interface Withdrawal {
  id: string;
  amount: number;
  status: "Completed" | "Pending"; }

// types/profile.ts
export interface Product {
  id: number;
  name: string;
  stock: number;
  price: number;
}


const productCategories = {
  Car: {
    label: "Car",
    attributes: {
      Model: ["Toyota", "Ford", "Tesla"],
      Mileage: ["0-10K", "10K-50K", "50K+"],
      FuelType: ["Petrol", "Diesel", "Electric"],
      Transmission: ["Manual", "Automatic"],
      Year: ["2020", "2021", "2022"],
    },
  },
  Phone: {
    label: "Phone",
    attributes: {
      Brand: ["Apple", "Samsung", "OnePlus"],
      Storage: ["64GB", "128GB", "256GB"],
      CameraPixel: ["12MP", "48MP", "108MP"],
      BatteryLife: ["3000mAh", "4000mAh", "5000mAh"],
    },
  },
  Clothes: {
    label: "Clothes",
    attributes: {
      Brand: ["Nike", "Adidas", "Puma", "Kings"],
      Size: ["S", "M", "L", "XL"],
      Color: ["Red", "Blue", "Black", "White"],
      Material: ["Cotton", "Polyester", "Denim"],
    },
  },
};



const API_URL = "https://shaddyna-backend.onrender.com/api/products"; // Adjust based on backend URL



export default function ProfilePage() {
  const [withdrawalAmount, setWithdrawalAmount] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [productName, setProductName] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const router = useRouter();
  //const categoryAttributes = selectedCategory ? productCategories[selectedCategory as keyof typeof productCategories].attributes : null;
  const categoryAttributes = selectedCategory 
  ? productCategories[selectedCategory as keyof typeof productCategories].attributes 
  : null;


  const attributeKeys = categoryAttributes ? Object.keys(categoryAttributes) : [];

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
    setSelectedValues({});
    setCurrentStep(0);
  };

  const handleAttributeChange = (attribute: string, value: string) => {
    setSelectedValues((prev) => ({ ...prev, [attribute]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages([...images, ...Array.from(event.target.files)]);
    }
  };
  
  const nextStep = () => {
    if (currentStep < attributeKeys.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("stock", productStock);
    formData.append("price", productPrice);
    formData.append("category", selectedCategory!);
    formData.append("attributes", JSON.stringify(selectedValues));
    images.forEach((image) => formData.append("images", image));
  
    try {
      const response = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      alert("Product Created Successfully!");
      setProductName("");
      setProductStock("");
      setProductPrice("");
      setSelectedCategory(null);
      setSelectedValues({});
      setImages([]);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  const [currentUser, setCurrentUser] = useState<User>(dummyUser);
  const [activeTab, setActiveTab] = useState('overview');
  const [showEditModal, setShowEditModal] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [shop, setShop] = useState({
    name: "Mizzo Collections",
    logo: "https://via.placeholder.com/100",
    description: "Your one-stop shop for the latest trends.",
    categories: ["Fashion", "Accessories"],
    contactEmail: "contact@mizzo.com",
    socialMedia: {
      instagram: "@mizzo_collections",
      facebook: "MizzoCollections"
    }
  });

// In your profile page
const [products, setProducts] = useState<Product[]>(dummyProducts); // Initialize here
const [isProductModalOpen, setIsProductModalOpen] = useState(false);
const [editedProduct, setEditedProduct] = useState<Product>({ id: 0, name: "", stock: 0, price: 0 });
const [orders, setOrders] = useState<Order[]>([
  {
    id: "101", customer: "John Doe", total: 12000, status: "Pending",
    product: '',
    amount: 0,
    date: ''
  },
  {
    id: "102", customer: "Jane Smith", total: 8000, status: "Completed",
    product: '',
    amount: 0,
    date: ''
  },
]);

  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([
    { id: "201", amount: 5000, status: "Pending" },
    { id: "202", amount: 12000, status: "Completed" },
  ]);


 
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);


  
const [editedShop, setEditedShop] = useState<Shop>({ ...shop });
const [isShopEditModalOpen, setIsShopEditModalOpen] = useState(false);

  // Shop Management
  const handleSaveShop = () => {
    setShop(editedShop);
    setIsShopEditModalOpen(false);
  };

  // Calculate total revenue
  const totalRevenue = orders
    .filter(order => order.status === "Completed")
    .reduce((sum, order) => sum + order.total, 0);

    const renderRoleContent = () => {

      const [editedProduct, setEditedProduct] = useState<Product>({ 
        id: 0, 
        name: "", 
        stock: 0, 
        price: 0 
      });
      switch(currentUser.role) {
        case 'user':
          return (
            <UserDashboard dummyOrders={dummyOrders} />
          );
          
        case 'vendor':
          const handleWithdrawalRequest = () => {
            if (withdrawalAmount <= 0) {
              alert("Please enter a valid amount");
              return;
            }
            const newWithdrawal: Withdrawal = {
              id: (withdrawals.length + 1).toString(), // Convert number to string
              amount: withdrawalAmount,
              status: "Pending",
            };
            setWithdrawals([...withdrawals, newWithdrawal]);
            setIsWithdrawalModalOpen(false);
            setWithdrawalAmount(0);
          };
          

        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-3">
            <ShopSection 
              shop={shop} 
              setIsShopEditModalOpen={setIsShopEditModalOpen}
            />
            
            <ProductManagement
              products={products}
              setProducts={setProducts}
              setIsProductModalOpen={setIsProductModalOpen}
              setEditedProduct={setEditedProduct}
            />
            
            <SalesDashboard 
              totalRevenue={totalRevenue} 
              orders={orders} 
            />
            
            <CustomerOrders orders={orders} />
            
            <WithdrawalRequests 
              withdrawals={withdrawals}
              setIsWithdrawalModalOpen={setIsWithdrawalModalOpen}
            />
      
                 
      <EditShopModal
        isOpen={isShopEditModalOpen}
        onClose={() => setIsShopEditModalOpen(false)}
        editedShop={editedShop}
        setEditedShop={setEditedShop}
        handleSaveShop={handleSaveShop}
      />
       <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        productCategories={productCategories}
        selectedCategory={selectedCategory}
        handleCategoryChange={handleCategoryChange}
        productName={editedProduct.name}
        setProductName={(name) => setEditedProduct(prev => ({...prev, name}))}
        productStock={editedProduct.stock.toString()}
        setProductStock={(stock) => setEditedProduct(prev => ({...prev, stock: Number(stock)}))}
        productPrice={editedProduct.price.toString()}
        setProductPrice={(price) => setEditedProduct(prev => ({...prev, price: Number(price)}))}
        attributeKeys={attributeKeys}
        selectedValues={selectedValues}
        handleAttributeChange={handleAttributeChange}
        handleImageUpload={handleImageUpload}
        images={images}
        removeImage={removeImage}
        handleSubmit={(e) => {
          e.preventDefault();
          if (editedProduct.id === 0) {
            // Add new product
            const newProduct = { ...editedProduct, id: products.length + 1 };
            setProducts([...products, newProduct]);
          } else {
            // Update existing product
            setProducts(products.map(p => p.id === editedProduct.id ? editedProduct : p));
          }
          setIsProductModalOpen(false);
          setEditedProduct({ id: 0, name: "", stock: 0, price: 0 });
        }}
      />

            
            <WithdrawalModal
        isOpen={isWithdrawalModalOpen}
        onClose={() => setIsWithdrawalModalOpen(false)}
        withdrawalAmount={withdrawalAmount}
        setWithdrawalAmount={setWithdrawalAmount}
        handleWithdrawalRequest={handleWithdrawalRequest}
      />
          </div>
        );
        case 'admin':
          return (
            <AdminDashboard dummyUsers={dummyUsers} />
          );
      }
    };

  return (
    <div className="min-h-screen bg-gray-50">
     <ProfileNavbar onBack={() => router.back()} />
      <ProfileHeader 
        currentUser={currentUser} 
        setShowEditModal={setShowEditModal} 
      />
      <MainContent
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        renderRoleContent={renderRoleContent}
        twoFactorEnabled={twoFactorEnabled}
        setTwoFactorEnabled={setTwoFactorEnabled}
      />
      <EditProfileModal
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        currentUser={currentUser}
      />
    </div>
  );
}