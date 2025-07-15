import React from 'react';

const features = [
  {
    title: 'Raise Complaints',
    description: 'Submit complaints with all necessary details and track their progress.',
    icon: '📝',
  },
  {
    title: 'Assign & Resolve',
    description: 'Admins assign complaints to appropriate staff for quick resolution.',
    icon: '🔄',
  },
  {
    title: 'Track Status',
    description: 'Real-time updates on complaint status for all stakeholders.',
    icon: '📊',
  },
];

const LandingPage = () => {
  return (
    <div
      className="min-h-screen overflow-y-scroll scrollbar-hide bg-fixed bg-cover bg-center flex flex-col"
      style={{ backgroundImage: `url('/bg.jpg')` }} // ✅ Path to your image
    >
      {/* Overlay */}
      <div className="bg-white/80 backdrop-blur-sm flex flex-col flex-grow">

        {/* Hero Section */}
        <div className="py-24 px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Complaint Tracker System
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Empowering institutions to handle complaints with speed, clarity, and transparency.
          </p>
        </div>

        {/* Features */}
        <div className="py-16 px-6 max-w-7xl mx-auto w-full">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Key Features
          </h2>
          <div className="grid gap-10 md:grid-cols-3 sm:grid-cols-1">
            {features.map((f, idx) => (
              <div
                key={idx}
                className="bg-white/90 backdrop-blur-md border border-gray-200 shadow-md rounded-xl p-6 text-center transition hover:shadow-xl"
              >
                <div className="text-5xl mb-4">{f.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600">{f.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="py-6 text-gray-800 text-center mt-auto">
          <div className="container mx-auto px-4">
            <p>© {new Date().getFullYear()} Complaint Tracker • Built with 💙 by Team Nagesh</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
