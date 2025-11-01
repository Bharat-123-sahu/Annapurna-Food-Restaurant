import React from 'react';

// Main App Component
export default function Hero() {
  return (
    <div className="bg-[#0D2F3F] min-h-screen text-white font-sans">
      <FoodNav />
      <Hero />
    </div>
  );
}

// Navigation Bar Component
function FoodNav() {
  return (
    <nav className="container mx-auto flex justify-between items-center py-4 px-6 lg:px-0">
      {/* Logo */}
      <div className="text-2xl font-bold text-white">FoodApp</div>

      {/* Nav Links & Search (Desktop) */}
      <div className="hidden md:flex items-center space-x-6">
        <a href="#" className="text-gray-200 hover:text-white transition-colors">Home</a>
        <a href="#" className="text-gray-200 hover:text-white transition-colors">Foods</a>
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent border border-gray-600 rounded-full px-4 py-1.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors"
        />
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center space-x-3">
        <button className="bg-transparent border border-gray-400 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-white hover:text-[#0D2F3F] transition-colors">
          Sign Up
        </button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors">
          Log In
        </button>
      </div>
    </nav>
  );
}

// Hero Section Component
function Hero() {
  // Placeholder images
  const saladImage = "https://images.unsplash.com/photo-1512621776951-a57141f2e9ef?q=80&w=1470&auto=format&fit=crop";
  const saladFallback = "https://placehold.co/600x600/333333/FFFFFF?text=Delicious+Salad";
  
  const foodPlateImage = "https://placehold.co/300x150/f4f4f4/333?text=Fresh+Food+Example";
  const foodPlateFallback = "https://placehold.co/300x150/CCCCCC/FFFFFF?text=Food";

  return (
    <div className="container mx-auto px-6 py-12 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* === Left Column: Text Content === */}
        <div className="flex flex-col gap-6 relative">
          
          {/* Section 1 */}
          <div>
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              <span className="text-red-500">Be The Fastest</span> In Delivering Your Food
            </h1>
            <p className="text-gray-300 max-w-lg mt-4 text-lg">
              Lorem ipsum is simply dummy text of the printing and typesetting industry.
            </p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium mt-6 transition-colors self-start">
              Get Started
            </button>
          </div>

          {/* Section 2 */}
          <div className="mt-10 lg:mt-16">
            <h2 className="text-3xl lg:text-4xl font-bold">Fresh Food for You</h2>
            <p className="text-gray-300 max-w-lg mt-3">
              Lorem ipsum is simply dummy text of the printing and typesetting industry.
            </p>
            <a href="#" className="text-green-400 font-medium inline-flex items-center gap-2 mt-4 hover:underline">
              More <span>&rarr;</span>
            </a>
            
            {/* Small floating food image */}
            <img 
              src={foodPlateImage}
              alt="Fresh food plate"
              onError={(e) => { e.target.onerror = null; e.target.src=foodPlateFallback; }}
              className="w-48 lg:w-64 absolute -right-0 -bottom-16 lg:-right-16 lg:-bottom-24 transform -rotate-12 rounded-lg shadow-xl hidden lg:block"
            />
          </div>

        </div>

        {/* === Right Column: Image Content === */}
        <div className="flex items-center justify-center pb-12 md:py-0">
          <div className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[550px] lg:h-[550px] rounded-full overflow-hidden shadow-2xl border-8 border-[#1a4a5f]">
            <img 
              src={saladImage}
              alt="Fresh salad in a bowl"
              onError={(e) => { e.target.onerror = null; e.target.src=saladFallback; }}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
