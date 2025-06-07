import { useState } from 'react';
import AllRoomsType from '../components/AllRoomsCard';
import RoomFilter from '../components/layout/filter';

const BookingRoom = () => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [guests, setGuests] = useState(null);

  return (
    <div className="flex min-h-screen justify-center pt-10">
      <div className="flex w-full max-w-7xl px-4">
        {/* Sidebar */}
        <RoomFilter
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          selectedAmenities={selectedAmenities}
          setSelectedAmenities={setSelectedAmenities}
          guests={guests}
          setGuests={setGuests}
        />
        {/* Main content */}
        <main className="flex-1 p-6 lg:p-12">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Available Rooms
          </h1>
          <div>
            <AllRoomsType />
          </div>
        </main>
      </div>
    </div>
  );
};

export default BookingRoom;

