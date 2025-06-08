import React, { useState, useEffect } from "react";
import { User, Edit3, Calendar, MapPin, Phone, Mail, Clock, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const ProfileDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);

  // Simulate API calls
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock API response
    const userData = {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      phone: "+1 (555) 123-4567",
      avatar: "https://i.pravatar.cc/150?img=47",
      location: "New York, NY",
      memberSince: "2023-01-15",
      totalBookings: 23,
      preferredRooms: ["VIP Suite", "Conference Room A"]
    };

    const bookingsData = [
      {
        id: 1,
        room: "VIP Executive Suite",
        date: "2024-06-15",
        time: "14:00 - 16:00",
        status: "Confirmed",
        price: 125,
        duration: "2 hours",
        location: "Downtown Branch"
      },
      {
        id: 2,
        room: "Standard Meeting Room",
        date: "2024-06-20",
        time: "10:00 - 12:00",
        status: "Pending",
        price: 45,
        duration: "2 hours",
        location: "Midtown Branch"
      },
      {
        id: 3,
        room: "Conference Hall",
        date: "2024-06-25",
        time: "09:00 - 17:00",
        status: "Confirmed",
        price: 280,
        duration: "8 hours",
        location: "Downtown Branch"
      }
    ];

    setProfile(userData);
    setBookings(bookingsData);
    setLoading(false);
  };

  const handleEdit = () => {
    setEditing(true);
    setForm({ ...profile });
  };

  const handleCancel = () => {
    setEditing(false);
    setForm({});
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setProfile(form);
    setEditing(false);
    setSaving(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "Pending":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "Cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Confirmed":
        return <CheckCircle className="w-3 h-3" />;
      case "Pending":
        return <Clock className="w-3 h-3" />;
      case "Cancelled":
        return <AlertCircle className="w-3 h-3" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Profile Dashboard
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 sticky top-24">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src={profile?.avatar}
                    alt="Profile"
                    className="w-32 h-32 rounded-full mx-auto border-4 border-white shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full p-2 shadow-lg">
                    <User className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mt-4 mb-2">
                  {profile?.name}
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  Member since {new Date(profile?.memberSince).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long' 
                  })}
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">{profile?.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">{profile?.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">{profile?.location}</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">Total Bookings</span>
                  <span className="text-2xl font-bold text-blue-600">{profile?.totalBookings}</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>

              <button
                onClick={handleEdit}
                disabled={editing}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Edit3 className="w-4 h-4" />
                Edit Profile
              </button>
            </div>
          </div>

          {/* Bookings Section */}
          <div className="lg:col-span-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-blue-600" />
                  My Bookings
                </h3>
                <div className="text-sm text-gray-500">
                  {bookings.length} active bookings
                </div>
              </div>

              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-gradient-to-r from-white to-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-900 text-lg">
                            {booking.room}
                          </h4>
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                            {getStatusIcon(booking.status)}
                            {booking.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(booking.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {booking.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {booking.location}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">
                          ${booking.price}
                        </div>
                        <div className="text-xs text-gray-500">
                          {booking.duration}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Edit Profile
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={form.location || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your location"
                  />
                </div>
              </div>
              
              <div className="flex gap-4 mt-8">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={saving}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDashboard;