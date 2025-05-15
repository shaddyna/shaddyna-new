interface Skill {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  priceType: string;
  createdBy: {
    name: string;
    avatar: string;
    location: string;
  };
}

export default function FeaturedSkills() {
  // Dummy data for featured skills
  const featuredSkills: Skill[] = [
    {
      id: '1',
      title: 'Web Development',
      description: 'Custom websites and web applications',
      category: 'Technology',
      price: 50,
      priceType: 'hourly',
      createdBy: {
        name: 'Alex Johnson',
        avatar: '',
        location: 'San Francisco',
      },
    },
    {
      id: '2',
      title: 'Graphic Design',
      description: 'Logo design and branding',
      category: 'Design',
      price: 300,
      priceType: 'fixed',
      createdBy: {
        name: 'Sarah Miller',
        avatar: '',
        location: 'New York',
      },
    },
    {
      id: '3',
      title: 'Personal Training',
      description: 'Custom fitness plans',
      category: 'Health',
      price: 70,
      priceType: 'hourly',
      createdBy: {
        name: 'Mike Chen',
        avatar: '',
        location: 'Chicago',
      },
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-[#0f1c47]">Featured Skills</h2>
          <a href="/hub" className="text-[#bf2c7e] hover:underline">
            Explore the Hub
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredSkills.map((skill) => (
            <div key={skill.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#0f1c47] mb-2">{skill.title}</h3>
                <p className="text-[#0f1c47]/80 mb-4">{skill.description}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm px-3 py-1 bg-[#0f1c47]/10 text-[#0f1c47] rounded-full">
                    {skill.category}
                  </span>
                  <span className="text-lg font-bold text-[#bf2c7e]">
                    {skill.priceType === 'hourly' ? `Ksh ${skill.price}/hr` : `Ksh ${skill.price}`}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                    <span className="text-gray-500 text-xs">Avatar</span>
                  </div>
                  <div>
                    <p className="font-medium text-[#0f1c47]">{skill.createdBy.name}</p>
                    <p className="text-sm text-[#0f1c47]/60">{skill.createdBy.location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}