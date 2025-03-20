import { User } from "@/types/types";

// ProfileHeader.tsx
interface ProfileHeaderProps {
    currentUser: User;
    setShowEditModal: (show: boolean) => void;
  }

  export const ProfileHeader = ({ currentUser, setShowEditModal }: ProfileHeaderProps) => (
    <div className="bg-[#0f1c47] py-24 px-3">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <img 
            src={currentUser.avatar} 
            className="w-24 h-24 rounded-full border-4 border-[#bf2c7e]" 
            alt="Profile" 
          />
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">{currentUser.name}</h1>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#bf2c7e] text-white text-sm">
                {currentUser.role}
              </span>
              <button 
                onClick={() => setShowEditModal(true)}
                className="text-white hover:text-[#bf2c7e] transition-colors"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );