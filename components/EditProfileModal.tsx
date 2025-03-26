import { User } from "@/types/profile";

interface EditProfileModalProps {
    showEditModal: boolean;
    setShowEditModal: (show: boolean) => void;
    currentUser: User;
  }
  
  export const EditProfileModal = ({ 
    showEditModal,
    setShowEditModal,
    currentUser
  }: EditProfileModalProps) => (
    showEditModal && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
        <div className="container mx-auto p-4 h-full flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#0f1c47]">Edit Profile</h2>
              <button 
                onClick={() => setShowEditModal(false)}
                className="text-gray-500 hover:text-[#bf2c7e]"
              >
                ✕
              </button>
            </div>
            
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#0f1c47] mb-2">Name</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg"
                  defaultValue={currentUser.firstName}
                />
              </div>
              <button className="w-full bg-[#bf2c7e] text-white py-3 rounded-lg hover:bg-opacity-90">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  );