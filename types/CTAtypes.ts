// Define types for our shop categories
export type ShopCategory = {
    label: string;
    attributes: Record<string, string[]>;
  };
  
  export type ShopCategories = {
    fashion: ShopCategory;
    electronics: ShopCategory;
    food: ShopCategory;
    homegoods: ShopCategory;
    art: ShopCategory;
  };
  
  export const shopCategories: ShopCategories = {
    fashion: {
      label: "Fashion",
      attributes: {
        "Clothing Type": ["Men", "Women", "Kids", "Unisex"],
        "Specialty": ["Casual", "Formal", "Sports", "Traditional"]
      }
    },
    electronics: {
      label: "Electronics",
      attributes: {
        "Product Type": ["Mobile", "Computers", "Home Appliances", "Accessories"],
        "Brand Specialty": ["Single Brand", "Multi Brand"]
      }
    },
    food: {
      label: "Food",
      attributes: {
        "Cuisine": ["Local", "International", "Fusion"],
        "Service Type": ["Dine-in", "Takeaway", "Delivery"]
      }
    },
    homegoods: {
      label: "Home Goods",
      attributes: {
        "Product Range": ["Furniture", "Decor", "Kitchenware", "Bedding"],
        "Style": ["Modern", "Traditional", "Minimalist"]
      }
    },
    art: {
      label: "Art",
      attributes: {
        "Art Type": ["Paintings", "Sculptures", "Photography", "Digital"],
        "Style": ["Contemporary", "Traditional", "Abstract"]
      }
    }
  };
  
  export type ShopCategoryKey = keyof typeof shopCategories;
  export type SocialMedia = { platform: string; url: string };