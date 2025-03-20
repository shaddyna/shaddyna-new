import { FC } from "react";

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

export default EventsList;

