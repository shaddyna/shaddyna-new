
  // MainContent.tsx
interface MainContentProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  renderRoleContent: () => React.ReactElement;
  twoFactorEnabled: boolean;
  setTwoFactorEnabled: (enabled: boolean) => void;
  onLogout: () => void; // Add logout handler prop
}

export const MainContent = ({
  activeTab,
  setActiveTab,
  renderRoleContent,
  twoFactorEnabled,
  setTwoFactorEnabled,
  onLogout // Destructure the new prop
}: MainContentProps) => (
  <div className="container mx-auto py-12 px-0">
  
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
      {/*<h3 className="text-xl font-semibold text-[#0f1c47] mb-6">Security Settings</h3>
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
      </div>*
      
      {/* Logout Button - Added below security settings */}
      <div className="mt-8 pt-6 border-t border-gray-200 flex justify-center">
  <button
    onClick={onLogout}
    className="w-full max-w-xs py-3 px-5 bg-[#bf2c7e] text-white font-semibold hover:bg-[#a8246d] active:bg-[#8a1c5a] rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
    </svg>
    Sign Out
  </button>
</div>
    </div>
  </div>
);




/*interface MainContentProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  renderRoleContent: () => React.ReactElement;
  twoFactorEnabled: boolean;
  setTwoFactorEnabled: (enabled: boolean) => void;
  onLogout: () => void; // Add logout handler prop
}

export const MainContent = ({
  activeTab,
  setActiveTab,
  renderRoleContent,
  twoFactorEnabled = false,
  setTwoFactorEnabled = () => {},
  onLogout
}: MainContentProps) => {
  return (
    <div className="container mx-auto py-12 px-0">
      {/* Navigation Tabs *
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

      {/* Role-Specific Content *
      {renderRoleContent()}

      {/* Security Settings *
      <div className="mt-12 bg-white p-6 rounded-xl shadow-sm">
        {/* Optional security settings section *
        {setTwoFactorEnabled && (
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
        )}
        
        {/* Logout Button *
        <div className="mt-8 pt-6 border-t border-gray-200 flex justify-center">
          <button
            onClick={onLogout}
            className="w-full max-w-xs py-3 px-5 bg-[#bf2c7e] text-white font-semibold hover:bg-[#a8246d] active:bg-[#8a1c5a] rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};*/
  