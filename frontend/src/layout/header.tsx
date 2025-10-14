import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu,  Cloud, Wind, Sun } from "lucide-react";
// import { Menu, Search, Cloud, Wind, Sun } from "lucide-react";
// import { Input } from "@/components/ui/input";

const Header = () => {
  const [open, setOpen] = useState(false);
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
                <Link to="/mayors-desk" className="hover:text-red-600">MAYOR'S DESK</Link>
                <Link to="/government" className="hover:text-red-600">GOVERNMENT</Link>
                <Link to="/city-programs" className="hover:text-red-600">CITY PROGRAMS</Link>
                <Link to="/qc-e-services" className="hover:text-red-600">QC E-SERVICES</Link>
                <Link to="/public-notices" className="hover:text-red-600">PUBLIC NOTICES</Link>
                <Link to="/media" className="hover:text-red-600">MEDIA</Link>
                <Link to="/peoples-corner" className="hover:text-red-600">PEOPLE'S CORNER</Link>
                <Link to="/qc-gov-faqs" className="hover:text-red-600">QC GOV FAQS</Link>
                <Link to="/calendar" className="hover:text-red-600">CALENDAR</Link>
                <Link to="/places-to-visit" className="hover:text-red-600">PLACES TO VISIT</Link>
                <Link to="/careers" className="hover:text-red-600">CAREERS</Link>
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
        <div className="hidden md:flex items-center gap-3">
          <Sun size={24} />
          <Cloud size={24} />
          <Wind size={24} />
        </div>

        {/* SEARCH BAR */}
        <div className="relative">
          {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-8 pr-4 py-2 rounded-full border-2"
          /> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
