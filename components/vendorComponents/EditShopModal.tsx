import Button from "../ui/Button";
import { Shop } from '@/types/profile';

  interface EditShopModalProps {
    isOpen: boolean;
    onClose: () => void;
    editedShop: Shop;
    setEditedShop: (shop: Shop) => void;
    handleSaveShop: () => void;
  }
  
export const EditShopModal: React.FC<EditShopModalProps> = ({
  isOpen,
  onClose,
  editedShop,
  setEditedShop,
  handleSaveShop,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Edit Shop Details</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Shop Name"
            className="w-full p-2 border rounded"
            value={editedShop.name}
            onChange={(e) => setEditedShop({ ...editedShop, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Logo URL"
            className="w-full p-2 border rounded"
            value={editedShop.logo}
            onChange={(e) => setEditedShop({ ...editedShop, logo: e.target.value })}
          />
          <textarea
            placeholder="Description"
            className="w-full p-2 border rounded"
            value={editedShop.description}
            onChange={(e) => setEditedShop({ ...editedShop, description: e.target.value })}
          />
          <div className="flex gap-2">
            <Button onClick={handleSaveShop}>Save Changes</Button>
            <Button onClick={onClose}>Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
