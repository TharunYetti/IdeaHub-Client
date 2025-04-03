import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Menu, UserCircle, LogOut, Settings, LogIn, User } from "lucide-react";
import Cookies from "js-cookie"
const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const profileRef = useRef(null);

  // Function to check authentication based on cookies
  const checkAuth = () => {
    // let token = Cookies.get("jwt"); // Retrieve token from cookies
    const token = localStorage.getItem("token");
    // console.log(token);
    // console.log(localStorage.getItem("token"));
    setIsAuthenticated(!!token);
    if (!token) {
      setProfileOpen(false); // Close profile dropdown if user is not authenticated
    }
  };

  useEffect(() => {
    checkAuth(); // Check auth on component mount

    // Listen for token changes in cookies
    const interval = setInterval(checkAuth, 1000); // Check every second (better than reloading)
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const handleLogout = () => {
    Cookies.remove("token"); // Remove authentication token
    setIsAuthenticated(false);
    setProfileOpen(false); // Close profile dropdown on logout
    navigate("/login"); // Redirect to login page
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#0B0C10]/50 backdrop-blur-md text-white p-4 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="group relative text-xl font-bold">
          IdeaHub
          <span className="absolute left-1/2 bottom-[-2px] w-0 h-0.5 bg-[#66FCF1] transition-all duration-300 group-hover:w-20 group-hover:left-0"></span>
        </Link>
        <div className="space-x-6 flex">
          {["Feed", "Saved", "Liked"].map((item, index) => (
            <Link key={index} to={`/${item.toLowerCase()}`} className="group relative text-lg px-4">
              {item}
              <span className="absolute left-1/2 bottom-[-2px] w-0 h-0.5 bg-[#66FCF1] transition-all duration-300 group-hover:w-20 group-hover:left-0"></span>
            </Link>
          ))}
        </div>
        {/* <div className="space-x-4 flex">
          <Link to="/signin" className="group relative text-lg px-4">
            Login
            <span className="absolute left-1/2 bottom-[-2px] w-0 h-0.5 bg-[#66FCF1] transition-all duration-300 group-hover:w-20 group-hover:left-0"></span>  
          </Link>
        </div> */}
        {/* Profile & Authentication Options */}
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          // If user is logged in, show Profile & Logout
          <div className="relative" ref={profileRef}>
            <button
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-500"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <UserCircle className="w-8 h-8 text-white" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50">
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 text-blue-500 flex gap-2 items-center">
                  <User className="w-4 h-4"/>Profile</Link>
                <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-blue-500">
                  <Settings className="w-4 h-4" /> Settings
                </Link>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-blue-500"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 text-blue-500" /> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          // If user is not logged in, show Login button
        <div className="space-x-4 flex">
          <Link to="/signin" className="flex items-center gap-2 group relative text-lg px-4 py-2 transition">
            <LogIn className="w-5 h-5" />Login
            <span className="absolute left-1/2 bottom-[-2px] w-0 h-0.5 bg-[#66FCF1] transition-all duration-300 group-hover:w-20 group-hover:left-0"></span>  
          </Link>
        </div>
        )}

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <Menu className="w-6 h-6 text-white" />
        </button>
      </div>
      </div>
    </nav>
  );
};

export default Navbar;