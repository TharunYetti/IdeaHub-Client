import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // Only for Sign-Up
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const url = isSignUp
        ? "http://localhost:8080/api/auth/register"
        : "http://localhost:8080/api/auth/login";

      const payload = isSignUp ? { username, email, password } : { email, password };

      const response = await axios.post(url, payload, {
        headers: { "Content-Type": "application/json" },withCredentials:true});
      console.log(`${isSignUp ? "Sign-Up" : "Login"} Success:`, response.data);
      setUsername(""); setEmail(""); setPassword(""); 
      localStorage.setItem("token", response.data);
      // alert(`${isSignUp ? "Sign-Up" : "Login"} Successful!`);
      toast.success(`${ isSignUp ? "Registered successfully, Please login" : "Logged In Successfully!"}`, {duration:2000, position:"top-right"});
      navigate("/");
    } catch (err) {
      console.error(`${isSignUp ? "Sign-Up" : "Login"} Failed:`, err.response?.data || err.message);
      toast.error(`${isSignUp ? "Sign-Up" : "Login"} Failed: ${err.response?.data || err.message}`);
      setError(err.response?.data?.message || `${isSignUp ? "Sign-Up" : "Login"} failed`);
    }
  };

  return (
    <div className="h-screen bg-[#0B0C10] flex justify-center items-center text-white">
      <div className="bg-[#1F2833] p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-[#66FCF1] text-center">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        <form onSubmit={handleAuth} className="mt-6">
          {isSignUp && (
            <div className="mb-4">
              <label className="block text-gray-300">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 mt-1 bg-[#0B0C10] border border-gray-500 rounded focus:border-[#66FCF1] outline-none"
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-1 bg-[#0B0C10] border border-gray-500 rounded focus:border-[#66FCF1] outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-1 bg-[#0B0C10] border border-gray-500 rounded focus:border-[#66FCF1] outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full mt-4 p-3 bg-[#66FCF1] text-black font-bold uppercase tracking-wide hover:bg-[#45A29E] transition"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>
        <p className="text-center mt-4 text-gray-400">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-[#66FCF1] ml-1 underline hover:text-[#45A29E]"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;