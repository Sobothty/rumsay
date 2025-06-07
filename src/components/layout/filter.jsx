const roomTypes = ["Standard", "Deluxe", "Suite", "Family"];
const priceRanges = [
  { label: "$0 - $50", min: 0, max: 50 },
  { label: "$51 - $100", min: 51, max: 100 },
  { label: "$101+", min: 101, max: Infinity },
];
const amenitiesList = [
  "Free Wi-Fi",
  "Air Conditioning",
  "Bathtub",
  "Balcony",
  "Breakfast Included",
];
const guestOptions = [1, 2, 3, 4, 5];

// RoomFilter component
const RoomFilter = ({
  selectedTypes,
  setSelectedTypes,
  selectedPrice,
  setSelectedPrice,
  selectedAmenities,
  setSelectedAmenities,
  guests,
  setGuests,
}) => {
  const toggleItem = (stateSetter, value) => {
    stateSetter((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  return (
    <aside className="w-72 p-6 bg-white rounded-2xl flex flex-col items-start mt-5 h-fit sticky top-24">
      <h2 className="text-2xl font-extrabold mb-6 text-[#2a1a4a]">
        Filter Rooms
      </h2>
      {/* Room Types */}
      <div className="mb-6 w-full">
        <h3 className="text-lg font-semibold mb-3">Room Type</h3>
        {roomTypes.map((type) => (
          <label key={type} className="block text-sm mb-2 cursor-pointer">
            <input
              type="checkbox"
              className="mr-2 accent-[#2a1a4a]"
              checked={selectedTypes.includes(type)}
              onChange={() => toggleItem(setSelectedTypes, type)}
            />
            {type}
          </label>
        ))}
      </div>
      {/* Price Range */}
      <div className="mb-6 w-full">
        <h3 className="text-lg font-semibold mb-3">Price Range</h3>
        {priceRanges.map((range, i) => (
          <label key={i} className="block text-sm mb-2 cursor-pointer">
            <input
              type="radio"
              className="mr-2 accent-[#2a1a4a]"
              name="price"
              checked={selectedPrice?.min === range.min}
              onChange={() => setSelectedPrice(range)}
            />
            {range.label}
          </label>
        ))}
      </div>
      {/* Amenities */}
      <div className="mb-6 w-full">
        <h3 className="text-lg font-semibold mb-3">Amenities</h3>
        {amenitiesList.map((item) => (
          <label key={item} className="block text-sm mb-2 cursor-pointer">
            <input
              type="checkbox"
              className="mr-2 accent-[#2a1a4a]"
              checked={selectedAmenities.includes(item)}
              onChange={() => toggleItem(setSelectedAmenities, item)}
            />
            {item}
          </label>
        ))}
      </div>
      {/* Number of Guests */}
      <div className="mb-6 w-full">
        <h3 className="text-lg font-semibold mb-3">Guests</h3>
        <select
          className="w-full p-2 border border-gray-300 rounded-md text-sm"
          value={guests || ""}
          onChange={(e) => setGuests(Number(e.target.value))}
        >
          <option value="">Select guests</option>
          {guestOptions.map((num) => (
            <option key={num} value={num}>
              {num} Guest{num > 1 && "s"}
            </option>
          ))}
        </select>
      </div>
      {/* Clear Filters Button */}
      <button
        className="mt-6 w-full py-2 bg-[#2a1a4a] text-white rounded-lg font-semibold hover:bg-[#1d1335] transition disabled:opacity-50 text-sm"
        onClick={() => {
          setSelectedTypes([]);
          setSelectedPrice(null);
          setSelectedAmenities([]);
          setGuests(null);
        }}
        disabled={
          selectedTypes.length === 0 &&
          !selectedPrice &&
          selectedAmenities.length === 0 &&
          !guests
        }
      >
        Clear All Filters
      </button>
    </aside>
  );
};

export default RoomFilter;
