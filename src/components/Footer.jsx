import React from "react";
import { Facebook, Instagram, Youtube, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className=" hidden md:block display:none bg-white text-gray-800 py-10 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
        {/* Product */}
        <div>
          <h3 className="font-semibold mb-4">Product</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Landing Page
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Popup Builder
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Web-design
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Content
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Integrations
              </a>
            </li>
          </ul>
        </div>

        {/* Use Cases */}
        <div>
          <h3 className="font-semibold mb-4">Use Cases</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Web-designers
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Marketers
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Small Business
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Website Builder
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-semibold mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Academy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Themes
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Hosting
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Developers
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Support
              </a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Teams
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-4">Contact</h3>
          <div className="text-sm mb-2 flex items-start gap-2">
            <span className="text-lg">📍</span>
            <span>
              Wisconsin Ave, Suite 700
              <br />
              Chevy Chase, Maryland 20815
            </span>
          </div>
          <div className="text-sm mb-4 flex items-center gap-2">
            <span className="text-lg">✉️</span>
            <span>support@figma.com</span>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Follow us</p>
            <div className="flex space-x-4 text-xl">
              <a href="#">
                <Facebook className="hover:text-blue-600" />
              </a>
              <a href="#">
                <Instagram className="hover:text-pink-500" />
              </a>
              <a href="#">
                <Send className="hover:text-sky-400" />
              </a>
              <a href="#">
                <Youtube className="hover:text-red-600" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className=" mt-10 pt-6 text-sm text-center text-gray-500 space-x-4">
        <a href="#" className="hover:underline">
          Privacy Policy
        </a>
        <a href="#" className="hover:underline">
          Terms of Use
        </a>
        <a href="#" className="hover:underline">
          Sales and Refunds
        </a>
        <a href="#" className="hover:underline">
          Legal
        </a>
        <a href="#" className="hover:underline">
          Site Map
        </a>
        <p className="mt-2 text-xs">© 2021 All Rights Reserved</p>
      </div>
    </footer>
  );
}
