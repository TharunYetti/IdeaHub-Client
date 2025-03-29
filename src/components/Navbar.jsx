import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-transparent text-white p-4 fixed top-0 left-0 w-full shadow-md z-50">
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
          <Link to="/login" className="group relative text-lg px-4">
            Login
            <span className="absolute left-1/2 bottom-[-2px] w-0 h-0.5 bg-[#66FCF1] transition-all duration-300 group-hover:w-20 group-hover:left-0"></span>  
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;