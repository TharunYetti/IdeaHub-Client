import { Link } from "react-router-dom";

const Navbar = () => {
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
        <div className="space-x-4 flex">
          <Link to="/signin" className="group relative text-lg px-4">
            Login
            <span className="absolute left-1/2 bottom-[-2px] w-0 h-0.5 bg-[#66FCF1] transition-all duration-300 group-hover:w-20 group-hover:left-0"></span>  
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;