import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, Cloud, Wind, Sun, CloudRain, CloudDrizzle, Moon } from "lucide-react";
const Header = () => {
  const [open, setOpen] = useState(false);
  const [weatherData, setWeatherData] = useState({
    temperature: 28,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12
  });
  const [darkMode, setDarkMode] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get appropriate weather icon based on condition
  const getWeatherIcon = () => {
    const condition = weatherData.condition.toLowerCase();

    if (condition.includes("rain") || condition.includes("shower")) {
      return <CloudRain className="h-5 w-5 text-blue-500" />;
    } else if (condition.includes("drizzle") || condition.includes("mist")) {
      return <CloudDrizzle className="h-5 w-5 text-blue-400" />;
    } else if (condition.includes("cloud") || condition.includes("overcast")) {
      return <Cloud className="h-5 w-5 text-gray-500" />;
    } else if (condition.includes("wind") || condition.includes("breeze")) {
      return <Wind className="h-5 w-5 text-gray-600" />;
    } else {
      return <Sun className="h-5 w-5 text-yellow-500" />;
    }
  };

    // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  
  // Simulate weather data fetch
  useEffect(() => {

    
    // In a real app, you would fetch this from your weather API
    const fetchWeather = () => {
      // This is mock data - replace with actual API call
      const conditions = ["Sunny", "Partly Cloudy", "Cloudy", "Light Rain", "Windy"];
      const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];

      setWeatherData({
        temperature: Math.floor(Math.random() * 10) + 25, // 25-35°C
        condition: randomCondition,
        humidity: Math.floor(Math.random() * 30) + 50, // 50-80%
        windSpeed: Math.floor(Math.random() * 15) + 5 // 5-20 km/h
      });
    };

    fetchWeather();
    // Update weather every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex h-20 items-center justify-between px-4 md:px-6 bg-white border-b-2 relative">
      <div className="flex items-center gap-4" ref={menuRef}>
        {/* MENU BUTTON */}
        <div className="relative">
          <Button
            className="bg-red-600 text-white hover:bg-red-700"
            onClick={() => setOpen(!open)}
          >
            <Menu className="h-6 w-6 mr-2" />
            MENU
          </Button>

          {/* DROPDOWN / SIDEBAR MENU */}
          {open && (
            <div
              className="absolute left-[-25px] top-14 z-50 w-62 bg-white pl-[50px] border-gray-200 rounded-lg shadow-lg p-4 transition-all duration-300 ease-in-out"
              onMouseLeave={() => setOpen(false)}
            >
              <nav className="flex flex-col space-y-2 text-base font-medium text-gray-700">
                <Link to="/" className="hover:text-red-600">HOME</Link>
                <Link to="/government" className="hover:text-red-600">BUSINESS LISTS</Link>
                <Link to="/city-programs" className="hover:text-red-600">BUSINESS REGISTER</Link>
                <Link to="/qc-e-services" className="hover:text-red-600">MAPS</Link>
                <Link to="/public-notices" className="hover:text-red-600">SATELLITE IMAGES</Link>
                <Link to="/media" className="hover:text-red-600">GENERATE REPORT</Link>
              </nav>
            </div>
          )}
        </div>

        {/* LOGO + TITLE */}
        <div className="hidden md:flex items-center gap-2">
          <img src="/assets/logo.png" alt="Quezon City Logo" className="h-12" />
          <h1 className="text-2xl font-bold text-gray-700">LGU Province</h1>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-4">
        {/* WEATHER DISPLAY */}

        <Link to="/dashboard-summary" >


          <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-2 rounded-lg border border-blue-200">
            {/* Weather Icon and Temperature */}
            <div className="flex items-center gap-2">
              {getWeatherIcon()}
              <span className="text-lg font-bold text-gray-800">
                {weatherData.temperature}°C
              </span>
            </div>

            {/* Weather Details */}
            <div className="hidden sm:flex flex-col text-xs text-gray-600 border-l border-blue-200 pl-3">
              <div className="flex items-center gap-1">
                <Cloud className="h-3 w-3" />
                <span>{weatherData.condition}</span>
              </div>
              <div className="flex items-center gap-1">
                <Wind className="h-3 w-3" />
                <span>{weatherData.windSpeed} km/h</span>
              </div>
            </div>
          </div>


          {/* SIMPLIFIED WEATHER FOR MOBILE */}
          <div className="flex sm:hidden items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
            {getWeatherIcon()}
            <span className="text-sm font-semibold text-gray-800">
              {weatherData.temperature}°C
            </span>
          </div>

        </Link>


        {/* DARK/LIGHT TOGGLE */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`relative w-14 h-8 rounded-full transition-colors duration-300 flex items-center ${darkMode ? "bg-gray-700" : "bg-gray-300"
            }`}
        >
          <span
            className={`absolute left-1 top-1 w-6 h-6 rounded-full bg-white flex items-center justify-center transition-all duration-300 ${darkMode ? "translate-x-6" : "translate-x-0"
              }`}
          >
            {darkMode ? (
              <Moon className="h-4 w-4 text-gray-800" />
            ) : (
              <Sun className="h-4 w-4 text-yellow-500" />
            )}
          </span>
        </button>

        {/* SEARCH BAR - Placeholder for future implementation */}
        <div className="relative">
          {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-8 pr-4 py-2 rounded-full border-2"
          /> */}
        </div>
      </div>
    </header >
  );
};

export default Header;