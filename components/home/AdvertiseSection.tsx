import React from 'react';

const AdvertiseSection = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-[#0f1c47] to-[#2d3566] rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Advertise With Us</h2>
          <p className="text-xl mb-6">Reach millions of potential customers</p>
          <button className="bg-[#bf2c7e] hover:bg-[#a8246d] text-white px-8 py-3 rounded-lg">
            Start Advertising
          </button>
        </div>
      </div>
    </section>
  );
};

export default AdvertiseSection;