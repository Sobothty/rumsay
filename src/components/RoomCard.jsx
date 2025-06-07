const RoomCard = ({ room }) => {
  return (
    <div className="container mx-auto px-4 py-[50px] flex gap-8">
      {/* Card Section */}
      <section className="w-full">
        <div className="mb-6">
          <div className="bg-white shadow-md rounded-lg overflow-hidden flex">
            {/* Image - Left Half */}
            <div className="md:w-1/4 w-full h-60">
              <img
                src={
                  room.room_image
                    ? room.room_image
                    : "https://www.levelaccess.com/wp-content/uploads/2023/07/07-July-MRKT_Asset-for-Blog-Progress-over-Perfection_Linkedin-blog-1.jpg"
                }
                alt={room.room_type?.type || "Room"}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details - Right Half */}
            <div className="md:w-1/2 w-full p-4 flex flex-col justify-center">
              <h4 className="text-xl font-semibold mb-2">
                {room.room_number}
              </h4>
              {/* Removed Room Number display */}
              <p className="text-gray-600 mb-4">
                From ${room.room_type?.price}/night
              </p>
              <p className="text-gray-500 mb-4">{room.desc}</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-max">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RoomCard;
