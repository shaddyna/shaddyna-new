"use client";
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { ProfileHeader } from '@/components/ProfileHeader';
import { MainContent } from '@/components/MainContent';
import { dummyProducts } from '@/data/dummyData';
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
import { EditShopModal } from '@/components/vendorComponents/EditShopModal';
import { Shop } from '@/types/profile';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { SellerOrders } from '@/components/vendorComponents/SellerOrders';

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
  const router = useRouter();
 // const { user, isLoading: authLoading } = useAuth();
  const { user, isLoading: authLoading, logout } = useAuth();
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);



  // Now you can use the authenticated user directly
  const [activeTab, setActiveTab] = useState('overview');
  const [showEditModal, setShowEditModal] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [productName, setProductName] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sellerId, setSellerId] = useState<string | null>(null);



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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    if (!productName || !productStock || !productPrice || !selectedCategory) {
      alert("Please fill all required fields");
      setIsSubmitting(false);
      return;
    }
  
    if (user?.role === 'seller' && !sellerId) {
      alert("Seller information not available. Please try again later.");
      setIsSubmitting(false);
      return;
    }
  
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("stock", productStock);
    formData.append("price", productPrice);
    formData.append("category", selectedCategory);
    formData.append("attributes", JSON.stringify(selectedValues));
  
    if (sellerId) {
      formData.append("sellerId", sellerId);
    }
  
    images.forEach((image) => formData.append("images", image));
  
    // ✅ Log form data
    console.log("Form data being sent:");
    for (const [key, value] of formData.entries()) {
      if (key === "images") {
        console.log(`${key}:`, (value as File).name);
      } else {
        console.log(`${key}:`, value);
      }
    }
  
    try {
      const { data } = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      //setProducts([...products, data]);
  
      // Reset form
      setProductName("");
      setProductStock("");
      setProductPrice("");
      setSelectedCategory(null);
      setSelectedValues({});
      setImages([]);
      setIsProductModalOpen(false);
  
      alert(`Product ${data.name} created successfully!`);
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Add this useEffect to fetch seller ID when modal opens
  useEffect(() => {
    const fetchSellerId = async () => {
      if (user?.role === 'seller' && user.email && isProductModalOpen) {
        try {
          const response = await fetch('https://shaddyna-backend.onrender.com/api/sellers');
          if (!response.ok) {
            throw new Error('Failed to fetch sellers');
          }
          const sellers = await response.json();
          const matchedSeller = sellers.find((seller: any) => seller.email === user.email);
          if (matchedSeller) {
            setSellerId(matchedSeller._id);
          } else {
            console.error('No seller profile found for this user');
          }
        } catch (err) {
          console.error('Error fetching sellers:', err);
        }
      }
    };
  
    fetchSellerId();
  }, [isProductModalOpen, user]);
  
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
//const [products, setProducts] = useState<Product[]>(dummyProducts); // Initialize here
const [editedProduct, setEditedProduct] = useState<Product>({ id: 0, name: "", stock: 0, price: 0 });


  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([
    { id: "201", amount: 5000, status: "Pending" },
    { id: "202", amount: 12000, status: "Completed" },
  ]);


 
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);


  
//const [editedShop, setEditedShop] = useState<Shop>({ ...shop });
const [isShopEditModalOpen, setIsShopEditModalOpen] = useState(false);

  // Shop Management
/*  const handleSaveShop = () => {
    setShop(editedShop);
    setIsShopEditModalOpen(false);
  };*/

  // Calculate total revenue
 // const totalRevenue = orders
   // .filter(order => order.status === "Completed")
    //.reduce((sum, order) => sum + order.total, 0);

    if (authLoading || !user) {
      return <div>Loading...</div>;
    }

    const renderRoleContent = () => {

      const [editedProduct, setEditedProduct] = useState<Product>({ 
        id: 0, 
        name: "", 
        stock: 0, 
        price: 0 
      });
      switch(user.role) {
        case 'customer':
          return (
            <UserDashboard />
          );
          
        case 'seller':
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
            
            {/*<ProductManagement
              products={products}
              setProducts={setProducts}
              setIsProductModalOpen={setIsProductModalOpen}
              setEditedProduct={setEditedProduct}
            />*/}
            
           {/*} <SalesDashboard 
              //totalRevenue={totalRevenue} 
              //orders={orders} 
            />*/}
            
            <SellerOrders />
            
            <WithdrawalRequests 
              withdrawals={withdrawals}
              setIsWithdrawalModalOpen={setIsWithdrawalModalOpen}
            />                 
     {/*} <EditShopModal
        isOpen={isShopEditModalOpen}
        onClose={() => setIsShopEditModalOpen(false)}
        editedShop={editedShop}
        setEditedShop={setEditedShop}
        handleSaveShop={handleSaveShop}
      />*/}
      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => {
          setIsProductModalOpen(false);
          setSellerId(null);
        }}
        sellerId={sellerId}
        productCategories={productCategories}
        selectedCategory={selectedCategory}
        handleCategoryChange={(e) => setSelectedCategory(e.target.value)}
        productName={productName}
        setProductName={setProductName}
        productStock={productStock}
        setProductStock={setProductStock}
        productPrice={productPrice}
        setProductPrice={setProductPrice}
        attributeKeys={attributeKeys}
        selectedValues={selectedValues}
        handleAttributeChange={(key, value) => 
          setSelectedValues(prev => ({ ...prev, [key]: value }))
        }
        handleImageUpload={(e) => {
          if (e.target.files) {
            const newImages = Array.from(e.target.files).slice(0, 5 - images.length);
            setImages([...images, ...newImages]);
          }
        }}
        images={images}
        removeImage={(index) => setImages(images.filter((_, i) => i !== index))}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
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
            <AdminDashboard/>
          );
      }
    };

    const handleLogout = async () => {
      setIsLoggingOut(true);
      try {
        await logout();
        // The logout function already handles redirect, so no need to push here
      } catch (error) {
        console.error('Logout failed:', error);
      } finally {
        setIsLoggingOut(false);
      }
    };

  return (
    <div className="min-h-screen bg-gray-50">
     <ProfileNavbar onBack={() => router.back()} />
      <ProfileHeader 
        currentUser={user} 
        setShowEditModal={setShowEditModal} 
      />
      <MainContent
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        renderRoleContent={renderRoleContent}
        twoFactorEnabled={twoFactorEnabled}
        setTwoFactorEnabled={setTwoFactorEnabled}
        onLogout={handleLogout} 
      />
      <EditProfileModal
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        currentUser={user}
      />
    </div>
  );
}
