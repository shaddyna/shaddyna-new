// MainContent.tsx
interface MainContentProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    renderRoleContent: () => React.ReactElement;
    twoFactorEnabled: boolean;
    setTwoFactorEnabled: (enabled: boolean) => void;
  }
  
  export const MainContent = ({
    activeTab,
    setActiveTab,
    renderRoleContent,
    twoFactorEnabled,
    setTwoFactorEnabled
  }: MainContentProps) => (
    <div className="container mx-auto py-12 px-4">
      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto mb-8 border-b border-gray-200">
        {['overview', 'financial', 'activity', 'security'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === tab 
                ? 'border-b-2 border-[#bf2c7e] text-[#bf2c7e]' 
                : 'text-[#0f1c47] hover:text-[#bf2c7e]'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
  
      {/* Role-Specific Content */}
      {renderRoleContent()}
  
      {/* Security Settings */}
      <div className="mt-12 bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-xl font-semibold text-[#0f1c47] mb-6">Security Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
            <div>
              <p className="text-[#0f1c47] font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-gray-500">Add an extra layer of security</p>
            </div>
            <button 
              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              className={`w-12 h-6 rounded-full p-1 ${twoFactorEnabled ? 'bg-[#bf2c7e]' : 'bg-gray-300'}`}
            >
              <div className={`bg-white w-4 h-4 rounded-full transform transition-transform ${
                twoFactorEnabled ? 'translate-x-6' : 'translate-x-0'}`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  