import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  User2,
  LayoutDashboard,
  Settings,
  LogOut,
  ShoppingCart,
} from "lucide-react";
import axios from "axios";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about-us" },
  { name: "Services", href: "/services" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact", href: "/contact-us" },
];

export default function NavbarPage() {
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const activePath = location.pathname;

  // Auth state
  const [profile, setProfile] = useState(null);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setProfile(null);
        return;
      }
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data?.data) {
          setProfile(res.data.data);
        } else {
          setProfile(null);
        }
      } catch {
        setProfile(null);
      }
    };
    fetchProfile();
  }, [token]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuOpen]);

  const isAuthenticated = !!token && !!profile;

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setProfile(null);
    setUserMenuOpen(false);
    navigate("/");
  };

  // Add to Cart handler (stub)
  const handleAddToCart = () => {
    // TODO: Connect to cart logic
    alert("Added to cart!");
  };

  return (
    <nav className="sticky top-4 z-50 mx-auto max-w-[1280px] min-w-[320px] sm:min-w-[640px] rounded-2xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg shadow-xl border border-gray-200 dark:border-gray-800 px-6 py-3 flex items-center transition-all duration-300">
      <Link to="/" className="flex items-center gap-3">
        <img src="/Rumsay-nobg.png" className="h-15 w-auto" alt="Rumsay Logo" />
      </Link>
      <div className="flex-1" />
      {/* Desktop nav links */}
      <div className="hidden md:flex gap-2 items-center">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            className={`relative px-4 py-2 rounded-lg font-semibold transition-all duration-200
              ${
                activePath === link.href
                  ? "text-primary"
                  : "text-gray-700 dark:text-gray-200 hover:text-primary"
              }
              group
            `}
          >
            {link.name}
            {activePath === link.href && (
              <span className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-primary to-blue-400 rounded-full"></span>
            )}
          </Link>
        ))}
        {/* Modern Add to Cart button (only show if authenticated) */}
        {isAuthenticated && (
          <button
            onClick={handleAddToCart}
            className="ml-2 flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
        )}
        {/* Hide Sign In/Out/Up if authenticated, show user icon */}
        {!isAuthenticated && (
          <>
            <Link
              to="/sign-in"
              className="ml-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-400 to-primary text-white font-bold shadow hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Sign In
            </Link>
            <Link
              to="/sign-up"
              className="ml-4 px-6 py-2 rounded-full bg-gradient-to-r from-primary to-blue-500 text-white font-bold shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Sign Up
            </Link>
          </>
        )}
        {isAuthenticated && profile && (
          <div
            id="user-icon"
            className="ml-4 flex items-center gap-2 relative cursor-pointer"
            ref={userMenuRef}
          >
            <button
              className="flex items-center gap-2 focus:outline-none"
              onClick={() => setUserMenuOpen((prev) => !prev)}
            >
              <User2 className="w-7 h-7 text-primary dark:text-white transition-transform duration-200" />
              <span className="font-semibold text-gray-700 dark:text-gray-200">
                {profile.name || "User"}
              </span>
            </button>
            {/* User dropdown menu */}
            <div
              className={`absolute right-0 top-12 min-w-[180px] bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50 transition-all duration-300 origin-top-right ${
                userMenuOpen
                  ? "scale-100 opacity-100 pointer-events-auto"
                  : "scale-95 opacity-0 pointer-events-none"
              }`}
              style={{
                boxShadow: userMenuOpen
                  ? "0 8px 32px 0 rgba(31,38,135,0.15)"
                  : undefined,
              }}
            >
              <Link
                to="/dashboard"
                className="flex items-center gap-3 px-5 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-t-xl transition-all duration-200"
                onClick={() => setUserMenuOpen(false)}
              >
                <LayoutDashboard className="w-5 h-5 text-blue-500" />
                Dashboard
              </Link>
              <Link
                to="/settings"
                className="flex items-center gap-3 px-5 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                onClick={() => setUserMenuOpen(false)}
              >
                <Settings className="w-5 h-5 text-green-500" />
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-5 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-b-xl transition-all duration-200"
              >
                <LogOut className="w-5 h-5" />
                Log out
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Mobile menu toggle */}
      <button
        type="button"
        aria-label="Toggle navigation"
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/30 ml-2 transition"
        onClick={() => setOpen((prev) => !prev)}
      >
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {open ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>
      {/* Mobile nav links */}
      <div
        className={`absolute left-0 top-[72px] w-full px-4 md:hidden transition-all duration-500 z-40 ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-5 pointer-events-none"
        }`}
      >
        <div className="rounded-2xl bg-white/90 dark:bg-gray-900/95 shadow-xl border border-gray-200 dark:border-gray-800 flex flex-col gap-2 py-4 px-4 backdrop-blur-lg">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`relative px-4 py-2 rounded-lg font-semibold transition-all duration-200
                ${
                  activePath === link.href
                    ? "text-primary"
                    : "text-gray-700 dark:text-gray-200 hover:text-primary"
                }
                group
              `}
              onClick={() => setOpen(false)}
            >
              {link.name}
              {activePath === link.href && (
                <span className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-primary to-blue-400 rounded-full"></span>
              )}
            </Link>
          ))}
          {/* Modern Add to Cart button for mobile (only show if authenticated) */}
          {isAuthenticated && (
            <button
              onClick={handleAddToCart}
              className="mt-2 flex items-center justify-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
          )}
          {/* Hide Sign In/Out/Up if authenticated, show user icon */}
          {!isAuthenticated && (
            <>
              <Link
                to="/sign-in"
                className="mt-2 px-6 py-2 rounded-full bg-gradient-to-r from-blue-400 to-primary text-white font-bold shadow hover:scale-105 active:scale-95 transition-all duration-200 text-center"
                onClick={() => setOpen(false)}
              >
                Sign In
              </Link>
              <Link
                to="/sign-up"
                className="mt-2 px-6 py-2 rounded-full bg-gradient-to-r from-primary to-blue-500 text-white font-bold shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 text-center"
                onClick={() => setOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
          {isAuthenticated && profile && (
            <div className="mt-4 flex items-center gap-2 justify-center relative">
              <button
                className="flex items-center gap-2 focus:outline-none"
                onClick={() => setUserMenuOpen((prev) => !prev)}
              >
                <User2 className="w-7 h-7 text-primary dark:text-white transition-transform duration-200" />
                <span className="font-semibold text-gray-700 dark:text-gray-200">
                  {profile.name || "User"}
                </span>
              </button>
              <div
                className={`absolute right-0 top-12 min-w-[180px] bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50 transition-all duration-300 origin-top-right ${
                  userMenuOpen
                    ? "scale-100 opacity-100 pointer-events-auto"
                    : "scale-95 opacity-0 pointer-events-none"
                }`}
                style={{
                  boxShadow: userMenuOpen
                    ? "0 8px 32px 0 rgba(31,38,135,0.15)"
                    : undefined,
                }}
              >
                <Link
                  to="/admin"
                  className="flex items-center gap-3 px-5 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-t-xl transition-all duration-200"
                  onClick={() => {
                    setUserMenuOpen(false);
                    setOpen(false);
                  }}
                >
                  <LayoutDashboard className="w-5 h-5 text-blue-500" />
                  Dashboard
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center gap-3 px-5 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                  onClick={() => {
                    setUserMenuOpen(false);
                    setOpen(false);
                  }}
                >
                  <Settings className="w-5 h-5 text-green-500" />
                  Settings
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-5 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-b-xl transition-all duration-200"
                >
                  <LogOut className="w-5 h-5" />
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
