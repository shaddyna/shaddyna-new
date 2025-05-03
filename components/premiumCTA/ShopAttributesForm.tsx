import { FC } from 'react';
import { ShopCategories, ShopCategoryKey } from '@/types/CTAtypes';

const shopCategories: ShopCategories = {
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

interface ShopAttributesFormProps {
  selectedCategory: string;
  selectedValues: Record<string, string>;
  onAttributeChange: (key: string, value: string) => void;
}

export const ShopAttributesForm: FC<ShopAttributesFormProps> = ({
  selectedCategory,
  selectedValues,
  onAttributeChange
}) => {
  const attributeKeys = Object.keys(shopCategories[selectedCategory as ShopCategoryKey].attributes);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#0f1c47] border-b pb-2">Shop Specifications</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {attributeKeys.map((attribute) => {
          const category = shopCategories[selectedCategory as ShopCategoryKey];
          const options = category.attributes[attribute as keyof typeof category.attributes];
          
          return (
            <div key={attribute}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{attribute}</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0f1c47] focus:border-transparent text-[#0f1c47]"
                onChange={(e) => onAttributeChange(attribute, e.target.value)}
                value={selectedValues[attribute] || ""}
              >
                <option value="" className="text-gray-400">Select {attribute}</option>
                {options.map((option) => (
                  <option key={option} value={option} className="text-[#0f1c47]">
                    {option}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
};