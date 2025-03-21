{/*import { User } from "@/types/types";

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
  );*/}

  import { User } from "@/types/types";
import { FiEdit2, FiCheckCircle } from "react-icons/fi";

// ProfileHeader.tsx
interface ProfileHeaderProps {
  currentUser: User;
  setShowEditModal: (show: boolean) => void;
}

export const ProfileHeader = ({ currentUser, setShowEditModal }: ProfileHeaderProps) => (
  <header className="bg-gradient-to-br from-[#0f1c47] to-[#1a2d6d] py-20 md:py-24 px-4 sm:px-6">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
        {/* Avatar Container with Status Indicator */}
        <div className="relative">
          <img 
            src={currentUser.avatar} 
            className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-[#bf2c7e]/90 
            shadow-lg hover:border-[#bf2c7e] transition-all duration-300 mx-auto md:mx-0"
            alt="Profile" 
          />
          <FiCheckCircle className="absolute bottom-0 right-0 text-green-400 bg-white rounded-full 
          text-2xl p-1 shadow-sm" />
        </div>

        {/* Profile Info */}
        <div className="text-center md:text-left space-y-3 flex-1">
          <div className="mb-2">
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-1 animate-fade-in-up">
              {currentUser.name}
            </h1>
            <p className="text-gray-200 font-light text-sm md:text-base">
              {"Digital Creator & Technology Enthusiast"}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-start">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-[#bf2c7e] text-sm font-medium">
                {currentUser.role}
              </span>
              <div className="w-1 h-1 bg-gray-400 rounded-full" />
              <span className="text-gray-300 text-sm">
                Member since {new Date().getFullYear() - 3}
              </span>
            </div>

            <button
              onClick={() => setShowEditModal(true)}
              className="flex items-center gap-2 text-white hover:text-[#bf2c7e] transition-all
              duration-300 group px-4 py-2 rounded-full hover:bg-white/5"
            >
              <FiEdit2 className="text-lg transition-transform group-hover:scale-110" />
              <span className="text-sm font-medium">Edit Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Bar for Larger Screens */}
      <div className="hidden md:flex justify-between mt-8 pt-6 border-t border-white/10">
        {[
          { label: 'Connections', value: '2.8K' },
          { label: 'Projects', value: '142' },
          { label: 'Engagement', value: '98%' },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-gray-300">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </header>
);