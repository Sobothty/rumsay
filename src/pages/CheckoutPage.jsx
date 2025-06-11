import React from "react"
import { useState } from "react"
import { CreditCard, Shield, ArrowLeft, Users, Trash2 } from "lucide-react"

// Custom Button Component
const Button = ({ children, variant = "default", className = "", ...props }) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    ghost: "hover:bg-gray-100 hover:text-gray-900",
    outline: "border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900",
  }
  const sizes = "h-10 py-2 px-4"

  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes} ${className}`} {...props}>
      {children}
    </button>
  )
}

// Custom Card Components
const Card = ({ children, className = "", ...props }) => (
  <div className={`rounded-lg bg-white text-gray-950 shadow-md ${className}`} {...props}>
    {children}
  </div>
)

const CardHeader = ({ children, className = "", ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
)

const CardTitle = ({ children, className = "", ...props }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h3>
)

const CardDescription = ({ children, className = "", ...props }) => (
  <p className={`text-sm text-gray-500 ${className}`} {...props}>
    {children}
  </p>
)

const CardContent = ({ children, className = "", ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
)

// Custom Input Component
const Input = ({ className = "", type = "text", ...props }) => (
  <input
    type={type}
    className={`flex h-10 w-full rounded-md bg-white px-3 py-2 text-sm shadow-sm ring-offset-white file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
)

// Custom Label Component
const Label = ({ children, className = "", ...props }) => (
  <label
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
    {...props}
  >
    {children}
  </label>
)

// Custom Select Components
const Select = ({ children, onValueChange, ...props }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState("")

  const handleValueChange = (newValue) => {
    setValue(newValue)
    onValueChange?.(newValue)
    setIsOpen(false)
  }

  return (
    <div className="relative" {...props}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { isOpen, setIsOpen, value, onValueChange: handleValueChange }),
      )}
    </div>
  )
}

const SelectTrigger = ({ children, isOpen, setIsOpen, value }) => (
  <button
    type="button"
    onClick={() => setIsOpen(!isOpen)}
    className="flex h-10 w-full items-center justify-between rounded-md bg-white px-3 py-2 text-sm shadow-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
  >
    {children}
  </button>
)

const SelectValue = ({ placeholder, value }) => (
  <span className={value ? "text-gray-900" : "text-gray-500"}>{value || placeholder}</span>
)

const SelectContent = ({ children, isOpen, onValueChange }) => {
  if (!isOpen) return null

  return (
    <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 shadow-lg">
      {React.Children.map(children, (child) => React.cloneElement(child, { onValueChange }))}
    </div>
  )
}

const SelectItem = ({ children, value, onValueChange }) => (
  <button
    type="button"
    onClick={() => onValueChange(value)}
    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
  >
    {children}
  </button>
)

// Custom Separator Component
const Separator = ({ className = "", ...props }) => (
  <div className={`shrink-0 bg-gray-200 h-[1px] w-full ${className}`} {...props} />
)

// Sample booking data with multiple rooms
const bookingDetails = {
  checkIn: "2025-06-15",
  checkOut: "2025-06-18",
  nights: 3,
  rooms: [
    {
      id: 1,
      roomType: "Deluxe King Room",
      guests: 2,
      pricePerNight: 189.99,
      image: "/placeholder.svg?height=120&width=180",
      addons: [],
    },
    {
      id: 2,
      roomType: "Superior Twin Room",
      guests: 2,
      pricePerNight: 159.99,
      image: "/placeholder.svg?height=120&width=180",
      addons: [],
    },
  ],
  hotelAddons: [],
}

export default function HotelCheckoutPage() {
  const [specialRequests, setSpecialRequests] = useState("")
  const [rooms, setRooms] = useState(bookingDetails.rooms)

  // Calculate totals
  const calculateRoomTotal = (room) => {
    return room.pricePerNight * bookingDetails.nights
  }

  const roomsTotal = rooms.reduce((sum, room) => sum + calculateRoomTotal(room), 0)
  const total = roomsTotal

  const handleBackToRooms = () => {
    // For browser history API (works without router)
    window.history.back()

    // Or navigate to specific route
    // window.location.href = '/rooms'
  }

  const handleRemoveRoom = (roomId) => {
    if (rooms.length > 1) {
      setRooms(rooms.filter((room) => room.id !== roomId))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" className="mb-4" onClick={handleBackToRooms}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Room Selection
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Booking</h1>
          <p className="text-gray-600 mt-2">Just a few more details to confirm your stay</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Forms */}
          <div className="space-y-6">
            {/* Guest Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                    1
                  </div>
                  Guest Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
                </div>
              </CardContent>
            </Card>

            {/* Stay Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                    2
                  </div>
                  Stay Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="checkIn">Check-in Date</Label>
                    <Input id="checkIn" type="date" defaultValue={bookingDetails.checkIn} />
                  </div>
                  <div>
                    <Label htmlFor="checkOut">Check-out Date</Label>
                    <Input id="checkOut" type="date" defaultValue={bookingDetails.checkOut} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="specialRequests">Special Requests (optional)</Label>
                  <textarea
                    id="specialRequests"
                    rows={3}
                    placeholder="Let us know if you have any special requests or requirements"
                    className="w-full rounded-md bg-white px-3 py-2 text-sm shadow-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                    3
                  </div>
                  Payment Information
                </CardTitle>
                <CardDescription>
                  <div className="flex items-center gap-2 mt-2">
                    <CreditCard className="w-4 h-4" />
                    We accept all major credit and debit cards
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="text-lg" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div>
                    <Label htmlFor="cvc">Security Code (CVC)</Label>
                    <Input id="cvc" placeholder="123" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input id="cardName" placeholder="John Doe" />
                </div>

                {/* Card Type Icons */}
                <div className="flex items-center gap-2 pt-2">
                  <span className="text-sm text-gray-500">We accept:</span>
                  <div className="flex gap-2">
                    <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold shadow-sm">
                      VISA
                    </div>
                    <div className="w-8 h-5 bg-red-500 rounded text-white text-xs flex items-center justify-center font-bold shadow-sm">
                      MC
                    </div>
                    <div className="w-8 h-5 bg-blue-400 rounded text-white text-xs flex items-center justify-center font-bold shadow-sm">
                      AMEX
                    </div>
                    <div className="w-8 h-5 bg-orange-500 rounded text-white text-xs flex items-center justify-center font-bold shadow-sm">
                      DISC
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Booking Summary */}
          <div className="space-y-6">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Room Details */}
                {rooms.map((room, index) => (
                  <div key={room.id} className="space-y-4">
                    {index > 0 && <Separator />}
                    <div className="flex items-start space-x-4">
                      <img
                        src={room.image || "/placeholder.svg"}
                        alt={room.roomType}
                        className="w-24 h-20 object-cover rounded-md shadow-sm"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-900">{room.roomType}</h4>
                          {rooms.length > 1 && (
                            <button
                              onClick={() => handleRemoveRoom(room.id)}
                              className="text-gray-400 hover:text-red-500"
                              aria-label="Remove room"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Users className="w-4 h-4 mr-1" />
                          <span>{room.guests} Guests</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <span className="font-medium">${room.pricePerNight.toFixed(2)}</span>
                          <span className="mx-1">×</span>
                          <span>{bookingDetails.nights} nights</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 bg-gray-50 p-3 rounded-lg shadow-sm">
                  <Shield className="w-4 h-4" />
                  <span>Secure 256-bit SSL encryption</span>
                </div>

                {/* Cancellation Policy */}
                <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg shadow-sm">
                  <p className="font-medium text-blue-700 mb-1">Free cancellation until June 13, 2025</p>
                  <p>After that, cancellations will be charged the first night's rate.</p>
                </div>

                {/* Complete Booking Button */}
                <Button className="w-full h-12 text-lg font-semibold shadow-md">
                  Complete Booking - ${total.toFixed(2)}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  By completing your booking, you agree to our Terms of Service and Privacy Policy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
