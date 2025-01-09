import React from 'react';

const TravelPlan = ({ response }) => {
  // Parse the activities string
  const activities = JSON.parse(response.activities.join(''));

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-6">
        Your Personalized Travel Plan
      </h1>

      {/* Itinerary */}
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Itinerary</h2>
        <p className="text-lg text-gray-600">{response.itinerary}</p>
      </div>

      {/* Activities */}
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Activities</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-green-600">Free Activities</h3>
            <ul className="list-disc pl-6 text-gray-700">
              {activities.slice(0, 5).map((activity, index) => (
                <li key={index} className="text-md">{activity}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-red-600">Paid Activities</h3>
            <ul className="list-disc pl-6 text-gray-700">
              {activities.slice(5).map((activity, index) => (
                <li key={index} className="text-md">{activity}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-6 text-center text-gray-600 text-sm">
        <p>&copy; 2025 TravelAssist. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default TravelPlan;
