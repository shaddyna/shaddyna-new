import { FC } from 'react';
import ShopCard from './ShopCard';

interface ShopListProps {
  shops: {
    _id: string;
    name: string;
    category: string;
    rating?: number;
    products?: number;
    description?: string;
    owner?: string;
    social?: string[];
    isFeatured?: boolean;
    image?: string;
    location?: string;
    contact?: string;
    openingHours?: string;
  }[];
  isFollowing: { [key: string]: boolean };
  onFollow: (shopId: string) => void;
  onClick: (shopId: string) => void;
  viewMode: 'grid' | 'list';
}

const ShopList: FC<ShopListProps> = ({ shops, isFollowing, onFollow, onClick, viewMode }) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6`}>
      {shops.map((shop) => (
        <ShopCard
          key={shop._id}
          shop={shop}
          isFollowing={isFollowing[shop._id] || false}
          onFollow={onFollow}
          onClick={onClick}
        />
      ))}
    </div>
  );
};

export default ShopList;