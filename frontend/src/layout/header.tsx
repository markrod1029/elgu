import { Menu, Search, Cloud, Wind, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex h-20 items-center justify-between px-4 md:px-6 bg-white border-b-2">
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="bg-red-600 text-white hover:bg-red-700 md:hidden">
              <Menu className="h-6 w-6 mr-2" />
              MENU
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
                <img src="/assets/logo.png" alt="Quezon City Logo" className="h-8 w-8" />
                <span>QC CITIZEN GUIDES</span>
              </Link>
              <Link to="/">HOME</Link>
              <Link to="/mayors-desk">MAYOR'S DESK</Link>
              <Link to="/government">GOVERNMENT</Link>
              <Link to="/city-programs">CITY PROGRAMS</Link>
              <Link to="/qc-e-services">QC E-SERVICES</Link>
              <Link to="/public-notices">PUBLIC NOTICES</Link>
              <Link to="/media">MEDIA</Link>
              <Link to="/peoples-corner">PEOPLE'S CORNER</Link>
              <Link to="/qc-gov-faqs">QC GOV FAQS</Link>
              <Link to="/calendar">CALENDAR</Link>
              <Link to="/places-to-visit">PLACES TO VISIT</Link>
              <Link to="/careers">CAREERS</Link>
              <Link to="/about-qc">ABOUT QC</Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="hidden md:flex items-center gap-2">
          <Button className="bg-red-600 text-white hover:bg-red-700">
            <Menu className="h-6 w-6 mr-2" />
            MENU
          </Button>
          <img src="/assets/logo.png" alt="Quezon City Logo" className="h-12" />
          <h1 className="text-2xl font-bold text-gray-700">QUEZON CITY GOV.PH</h1>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-3">
          <Sun size={24} />
          <Cloud size={24} />
          <Wind size={24} />
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="pl-8 pr-4 py-2 rounded-full border-2" />
        </div>
      </div>
    </header>
  );
};

export default Header;