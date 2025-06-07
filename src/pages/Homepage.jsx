import Categories from "./Categories";
import CheckInOut from "./checkInOut";
import AllRooms from "./AllRooms";
import Gallery from "../components/Gallery";
import React from "react";
import {
  FaConciergeBell,
  FaKey,
  FaDumbbell,
  FaWifi,
  FaParking,
  FaTshirt,
  FaUsers,
  FaCar,
  FaDog,
  FaSwimmer,
  FaUtensils,
  FaSpa,
} from "react-icons/fa";

const amenities = [
  { icon: <FaConciergeBell />, label: "Concierge" },
  { icon: <FaKey />, label: "Digital Key" },
  { icon: <FaDumbbell />, label: "Fitness Center" },
  { icon: <FaWifi />, label: "Free Internet Access" },
  { icon: <FaParking />, label: "Free Parking" },
  { icon: <FaTshirt />, label: "Laundry" },
  { icon: <FaUsers />, label: "Meeting Facilities" },
  { icon: <FaCar />, label: "Valet Parking" },
  { icon: <FaDog />, label: "Pet Friendly" },
  { icon: <FaSwimmer />, label: "Pool" },
  { icon: <FaUtensils />, label: "Restaurant On-Site" },
  { icon: <FaConciergeBell />, label: "Room Service" }, // Reuse this icon
  { icon: <FaSpa />, label: "Spa" },
];

export default function Homepage() {
  return (
    <>
      <main className="w-full m-auto max-w-7xl ">
        {/* Hero Section */}

        <section className=" w-full h-[200px] md:h-[300px] lg:h-[500px] bg-[url('src/assets/banner.jpg')] bg-cover bg-center flex items-center justify-center rounded-2xl mt-10 shadow-lg relative">
          {/* Mask/Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent rounded-2xl"></div>

          {/* Your content here */}
          <div className="relative z-10 text-white text-center">
            <h1 className="text-3xl md:text-5xl font-bold">Welcome</h1>
            <p className="mt-4 text-lg">This is a masked background</p>
          </div>
          {/* Datepicker and Button */}
          {/* <DatePickerForm /> */}
        </section>

        {/* checkin checkout guests and room */}
        <section className="mb-[30px]">
          <CheckInOut />
        </section>

        {/* categories */}
          <Categories />
        

        {/* Amenities Section */}
        <section className="bg-white py-16 text-[#2a1a4a]">
          <h2 className="text-3xl font-semibold mb-[70px]">Ameneties</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
            {amenities.map((item, index) => (
              <div key={index} className="flex items-center gap-8 text-left">
                <div className="text-2xl text-[#2a1a4a] opacity-80">
                  {item.icon}
                </div>
                <span className="text-lg">{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* all rooms section */}
        <section>
          <AllRooms />
        </section>

        {/* preview */}
        <section className="bg-white py-16 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <img
              src="/preview-hotel.jpg" // Change this to your preview image path
              alt="Hotel Preview"
              className="w-full h-80 object-cover rounded-2xl shadow-lg"
            />
            <div>
              <h2 className="text-4xl font-bold text-blue-700 mb-4">
                Discover Luxury & Comfort
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Experience the best stay at our hotel in Cambodia. From cozy
                standard rooms to elegant VIP suites, we make every night
                special. Let us pamper you with top amenities and beautiful
                views.
              </p>
              <a
                href="#rooms"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
              >
                Explore Rooms
              </a>
            </div>
          </div>
        </section>

        
      </main>

      {/* Gallery */}
        <section className="w-full">
          <Gallery />
        </section>
    </>
  );
}
