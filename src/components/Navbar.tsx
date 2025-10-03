'use client';

import { useState, useEffect } from 'react';

interface NavbarProps {
  title?: string;
  onAddNew?: () => void;
  onSearch?: (query: string) => void;
}

export default function Navbar({ title = "RSS CSE Setup", onAddNew, onSearch }: NavbarProps) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [searchQuery, setSearchQuery] = useState("");

  // Set dark mode as default on component mount
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleAddNew = () => {
    if (onAddNew) {
      onAddNew();
    } else {
      // Placeholder action
      alert("Add New functionality will be integrated with Google Form soon!");
    }
  };

  return (
    <nav className="w-full bg-[var(--background)] border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-screen mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Project Title */}
          <h1 className="text-xl sm:text-2xl lg:text-4xl font-black text-[var(--foreground)] tracking-tight whitespace-nowrap bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {title}
          </h1>

          {/* Center Search Box */}
          <div className="flex-1 max-w-2xl mx-6">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-400 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search through RSS feeds, categories, and URLs..."
                className="w-full pl-12 pr-4 py-3 bg-[var(--card-bg)] text-[var(--foreground)] border-2 border-gray-600 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 placeholder-gray-400 shadow-lg group-hover:shadow-xl text-sm"
              />
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Add New Button */}
            <button
              onClick={handleAddNew}
              className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-xs sm:text-sm lg:text-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-full shadow-lg transition duration-300 whitespace-nowrap"
            >
              Add New +
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-xs sm:text-sm lg:text-lg bg-gradient-to-r from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-800 text-white font-semibold rounded-full shadow-lg transition duration-300 whitespace-nowrap"
            >
              {theme === "light" ? "🌞 Light" : "🌙 Dark"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
