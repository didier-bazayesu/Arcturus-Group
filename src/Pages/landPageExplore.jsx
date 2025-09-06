import React from "react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Header */}
      <header className="w-[95%] mx-auto py-4 flex items-center justify-between">
        <img
          src="../src/Pages/img/tabiya-logo-dm-color 1.png"
          alt="Tabiya Logo"
          className="h-10"
        />

        <nav className="hidden md:flex gap-6 text-lg font-medium">
          <span className="hover:underline cursor-pointer">Home</span>
          <span className="hover:underline cursor-pointer">About</span>
          <span className="hover:underline cursor-pointer">Services</span>
          <span className="hover:underline cursor-pointer">Explore</span>
        </nav>

        <button className="hidden md:block px-6 py-2 rounded-2xl bg-[#2B7669] text-white font-semibold">
          Account
        </button>

        {/* Mobile menu */}
        <img
          src="./images/menu.png"
          alt="Menu"
          className="h-6 block md:hidden cursor-pointer"
        />
      </header>

      {/* Hero Section */}
      <section className="w-[95%] mx-auto mt-8 flex flex-col items-center text-center gap-6">
        <h1 className="text-3xl md:text-5xl font-bold text-[#032147] leading-snug">
          Unlock Skills. Connect Opportunities.
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl">
          Tabiya builds open-source tools to map the world of skills and
          occupations — making labor markets more efficient, equitable, and
          inclusive.
        </p>

        <button className="mt-4 px-8 py-3 rounded-2xl bg-[#032147] text-white text-lg hover:bg-blue-900 transition">
          Explore Skills & Occupations
        </button>
      </section>

      {/* Stats Section */}
      <section className="w-[95%] mx-auto mt-12 flex flex-wrap justify-center gap-6">
        {[
          { label: "Total Occupations", value: "3,000+" },
          { label: "Occupation Groups", value: "650+" },
          { label: "Skills", value: "14,000+" },
          { label: "Associations", value: "130,000+" },
          { label: "Skills Groups", value: "650+" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="w-[45%] md:w-[30%] lg:w-[18%] bg-gray-100 text-[#2B7669] h-28 flex flex-col justify-center items-center rounded-2xl shadow-md"
          >
            <h2 className="text-lg font-semibold">{item.label}</h2>
            <p className="text-xl">{item.value}</p>
          </div>
        ))}
      </section>

      {/* Call-to-Action */}
      <div className="mt-16 w-[90%] md:w-[50%] lg:w-[30%] mx-auto text-center">
        <button className="w-full py-4 rounded-2xl bg-[#2B7669] text-white text-xl hover:bg-[#225c52] transition">
          Try Compass Career Assistant
        </button>
      </div>

      <footer className="mt-16 py-6 bg-gray-200 text-center text-gray-700">
        © 2025 Tabiya – Empowering Skills & Opportunities
      </footer>
    </div>
  );
};

export default HomePage;
