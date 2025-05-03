import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from '@/context/AuthContext';
import { SkillForm } from '@/components/skillComponent/skillForm';
import { Skill } from '@/types/skills';

const AddSkillButton = () => {
  const { user, isLoading: authLoading, refreshUser } = useAuth();
  const [checking, setChecking] = useState(false);
  const [showAddSkillForm, setShowAddSkillForm] = useState(false);
  const [showMembershipPrompt, setShowMembershipPrompt] = useState(false);

  const handleClick = async () => {
    if (authLoading || !user) return;
  
    setChecking(true);
  
    // First refresh user data from server
    await refreshUser();
    
    // Get updated user from localStorage
    const updatedUser = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (updatedUser?.member) {
      setShowAddSkillForm(true);
    } else {
      setShowMembershipPrompt(true);
    }
  
    setChecking(false);
  };

  const handleCancel = () => {
    setShowAddSkillForm(false);
    setShowMembershipPrompt(false);
  };

  const handleFormSubmit = (skill: Omit<Skill, 'id' | 'createdAt' | 'createdBy' | 'likes' | 'stats'>) => {
    // Handle form submission logic here
    console.log('Skill submitted:', skill);
    setShowAddSkillForm(false);
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={checking || authLoading}
        className="relative flex items-center px-6 py-3 bg-gradient-to-r from-[#bf2c7e] to-[#d64285] text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group overflow-hidden disabled:opacity-50"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-[#d64285] to-[#e84a8b] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>

        <span className="relative flex items-center">
          {checking ? (
            <FontAwesomeIcon icon={faSpinner} spin className="mr-3 text-lg" />
          ) : (
            <FontAwesomeIcon icon={faPlus} className="mr-3 text-lg group-hover:rotate-90 transition-transform duration-300" />
          )}
          <span className="font-medium tracking-wide">Add Skill</span>
        </span>
      </button>

      {/* Modals or Dialogs below */}
      {showAddSkillForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
            <h2 className="text-xl font-semibold text-[#0f1c47] mb-4">Add New Skill</h2>
            <SkillForm onSubmit={handleFormSubmit} />
            <div className="flex justify-end mt-6">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 mr-2"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showMembershipPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg w-full max-w-md text-center">
            <h2 className="text-xl font-bold text-[#bf2c7e] mb-4">Become a Member</h2>
            <p className="text-gray-700 mb-6">You need to become a member to post your skills and get hired.</p>
            <button
              className="px-6 py-3 bg-[#bf2c7e] text-white rounded-md hover:bg-[#a8256d]"
              onClick={() => {
                // redirect to membership payment page or show payment modal
                alert("Redirect to payment flow (to be implemented)");
              }}
            >
              Upgrade Now
            </button>
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 mt-4"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddSkillButton;