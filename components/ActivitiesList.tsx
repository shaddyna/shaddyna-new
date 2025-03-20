import { FC } from "react";

const activities = [
  "John joined Tech Innovation shelf",
  "New product added to Shop 2",
  "Sarah posted Web Development skill",
];

const ActivitiesList: FC = () => {
  return (
    <section className="py-12 bg-gray-50 bg-opacity-60">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-[#0f1c47]">Recent Activities</h2>
        <ul className="space-y-4">
          {activities.map((activity, index) => (
            <li key={index} className="bg-white p-4 rounded-lg shadow-sm text-gray-700">
              {activity}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ActivitiesList;

