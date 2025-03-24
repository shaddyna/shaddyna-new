/*import { FC } from "react";

const events = ["Investment Workshop", "Tech Summit", "Fashion Expo"];

const EventsList: FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-[#0f1c47]">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {events.map((event) => (
            <div key={event} className="p-6 border-2 border-[#0f1c47] rounded-lg">
              <h3 className="text-xl font-semibold mb-2">{event}</h3>
              <button className="bg-[#bf2c7e] text-white px-4 py-2 rounded-md">
                Join Event
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsList;*/

"use client"; // <-- Add this at the top

import { FC } from "react";
import { FiMapPin, FiCalendar } from "react-icons/fi";

interface Event {
  id: string;
  title: string;
  image: string;
  location: string;
  date: string;
  price: string;
}

interface EventsListProps {
  events?: Event[];
  onSelectEvent?: (event: Event) => void;
}

const defaultEvents: Event[] = [
  {
    id: "1",
    title: "Investment Workshop",
    image: "/images/investment-workshop.jpg",
    location: "New York, NY",
    date: "June 15, 2023",
    price: "49"
  },
  {
    id: "2",
    title: "Tech Summit",
    image: "/images/tech-summit.jpg",
    location: "San Francisco, CA",
    date: "July 22, 2023",
    price: "99"
  },
  {
    id: "3",
    title: "Fashion Expo",
    image: "/images/fashion-expo.jpg",
    location: "Los Angeles, CA",
    date: "August 5, 2023",
    price: "79"
  }
];

const EventsList: FC<EventsListProps> = ({ 
  events = defaultEvents, 
  onSelectEvent = () => {} 
}) => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-[#0f1c47]">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div 
              key={event.id} 
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1c47]/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-xl font-bold text-white truncate">{event.title}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <FiMapPin className="text-[#bf2c7e]" />
                    <span className="text-sm text-white/90">{event.location}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-[#0f1c47]">
                    <FiCalendar className="text-[#bf2c7e]" />
                    <span className="text-sm font-medium">{event.date}</span>
                  </div>
                  <button
                    onClick={() => onSelectEvent(event)}
                    className="bg-[#bf2c7e] text-white px-4 py-2 rounded-full hover:bg-[#a02468] transition-colors flex items-center gap-2"
                  >
                   Ksh <span>{event.price}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsList;
