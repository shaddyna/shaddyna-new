import Link from 'next/link';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  category: string;
  description: string;
  attendees: number;
  image: string;
}

export default function UpcomingEvents() {
  // Dummy data for upcoming events
  const upcomingEvents: Event[] = [
    {
      id: '1',
      title: 'Startup Pitch Night',
      date: '2024-03-15',
      location: 'Convention Center',
      category: 'Entrepreneurship',
      description: 'Monthly startup pitching event with investors',
      attendees: 150,
      image: '/event1.jpg',
    },
    {
      id: '2',
      title: 'Tech Innovation Summit',
      date: '2024-04-02',
      location: 'Digital Hub Arena',
      category: 'Technology',
      description: 'Annual technology conference with industry leaders',
      attendees: 500,
      image: '/event2.jpg',
    },
    {
      id: '3',
      title: 'Artisan Market Day',
      date: '2024-03-22',
      location: 'Downtown Plaza',
      category: 'Crafts',
      description: 'Local artisans showcasing handmade products',
      attendees: 80,
      image: '/event3.jpg',
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-[#0f1c47]">Upcoming Events</h2>
          <Link href="/events" className="text-[#bf2c7e] hover:underline">
            View all events
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Event Image</span>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-sm px-3 py-1 bg-[#0f1c47]/10 text-[#0f1c47] rounded-full">
                    {event.category}
                  </span>
                  <span className="text-sm text-[#0f1c47]/60">
                    {event.attendees} attendees
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-[#0f1c47] mb-2">{event.title}</h3>
                <p className="text-[#0f1c47]/80 mb-4">{event.description}</p>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-[#0f1c47]">
                      {formatDate(event.date)}
                    </p>
                    <p className="text-sm text-[#0f1c47]/60">{event.location}</p>
                  </div>
                  <Link
                    href={`/events/${event.id}`}
                    className="bg-[#bf2c7e] text-white px-4 py-2 rounded-full text-sm hover:bg-[#a6246d] transition-colors"
                  >
                    Register Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}