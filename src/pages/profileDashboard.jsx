import React, { useState } from "react";

// Dummy user and booking data for demonstration
const userData = {
  name: "John Doe",
  email: "john@example.com",
  phone: "081-234-5678",
  avatar: "https://i.pravatar.cc/150?img=3",
};

const bookings = [
  {
    id: 1,
    room: "VIP Room",
    date: "2024-06-10",
    status: "Confirmed",
    price: 60,
  },
  {
    id: 2,
    room: "Normal Room",
    date: "2024-06-15",
    status: "Pending",
    price: 15,
  },
];

const ProfileDashboard = () => {
  const [profile, setProfile] = useState(userData);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(profile);

  const handleEdit = () => {
    setEditing(true);
    setForm(profile);
  };

  const handleCancel = () => {
    setEditing(false);
    setForm(profile);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setProfile(form);
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex justify-center py-12">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-10 flex flex-col gap-10">
        {/* Profile Section */}
        <div className="flex items-center gap-8">
          <img
            src={profile.avatar}
            alt="avatar"
            className="w-28 h-28 rounded-full border-4 border-blue-200 shadow"
          />
          <div>
            <h2 className="text-3xl font-bold text-blue-700 mb-2">
              {profile.name}
            </h2>
            <p className="text-gray-600">{profile.email}</p>
            <p className="text-gray-600">{profile.phone}</p>
            <button
              className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
              onClick={handleEdit}
              disabled={editing}
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Edit Profile Modal */}
        {editing && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <form
              className="bg-white rounded-xl shadow-lg p-8 flex flex-col gap-4 w-full max-w-md"
              onSubmit={handleSave}
            >
              <h3 className="text-xl font-bold mb-2 text-blue-700">
                Edit Profile
              </h3>
              <label className="font-medium">
                Name
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="block w-full mt-1 p-2 border rounded"
                  required
                />
              </label>
              <label className="font-medium">
                Email
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="block w-full mt-1 p-2 border rounded"
                  required
                />
              </label>
              <label className="font-medium">
                Phone
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="block w-full mt-1 p-2 border rounded"
                  required
                />
              </label>
              <div className="flex gap-4 mt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded font-semibold hover:bg-gray-300 transition"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Booking Section */}
        <div>
          <h3 className="text-2xl font-bold text-blue-700 mb-6">
            My Bookings
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl shadow">
              <thead>
                <tr>
                  <th className="py-3 px-4 text-left text-blue-700">Room</th>
                  <th className="py-3 px-4 text-left text-blue-700">Date</th>
                  <th className="py-3 px-4 text-left text-blue-700">Status</th>
                  <th className="py-3 px-4 text-left text-blue-700">Price</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-t">
                    <td className="py-2 px-4">{b.room}</td>
                    <td className="py-2 px-4">{b.date}</td>
                    <td className="py-2 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          b.status === "Confirmed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="py-2 px-4">${b.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
