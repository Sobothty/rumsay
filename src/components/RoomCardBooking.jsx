import { useEffect, useState } from "react";

const AllRoomsType = () => {
  const [roomTypes, setRoomTypes] = useState([]);

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/room-types`
        );
        const result = await res.json();
        setRoomTypes(result.data || []);
      } catch (err) {
        console.error("Failed to fetch room types:", err);
      }
    };
    fetchRoomTypes();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {roomTypes.map((room) => (
        <div
          key={room.id}
          className="rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden border border-gray-100 bg-white flex flex-col"
        >
          <img
            src={room.image_url || "src/assets/categories/category-room.jpg"}
            alt={room.type}
            className="w-full h-56 object-cover"
          />
          <div className="p-6 flex flex-col flex-1">
            <h3 className="text-2xl font-bold text-[#2a1a4a] mb-2">
              {room.type}
            </h3>
            <p className="text-gray-600 text-base mb-3 line-clamp-2">
              {room.description}
            </p>
            <ul className="flex flex-wrap gap-3 text-sm text-gray-500 mb-4">
              <li>👥 {room.capacity} Guests</li>
              {/* Add more features here if available */}
            </ul>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-xl font-bold text-[#2a1a4a]">
                ${room.price}/night
              </span>
              <button className="px-5 py-2 bg-gradient-to-r from-[#2a1a4a] to-[#4b2e83] text-white rounded-full text-base font-semibold shadow hover:scale-105 transition">
                Book Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllRoomsType;
