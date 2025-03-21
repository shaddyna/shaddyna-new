export const ProfileNavbar = ({ onBack }: { onBack: () => void }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-white/10 lg:hidden">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <button
          className="p-2 bg-white/50 hover:bg-white/10 rounded-full transition-colors"
          onClick={onBack}
        >
          <svg className="w-6 h-6 text-[#0f1c47]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="p-2 bg-white/50 hover:bg-white/10 rounded-full transition-colors">
          <svg className="w-6 h-6 text-[#0f1c47]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>
    </nav>
  );
};
  