const Home = () => {
  return (
    <div className="h-screen bg-[#0B0C10] flex flex-col justify-center items-center text-center text-white px-6">
      <h1 className="text-9xl font-bold text-[#66FCF1]">An Idea</h1>
      <p className="mt-4 max-w-2xl text-lg text-gray-300">
        A creative, functional, and alluring idea makes a nation get strong and fine in technology. From our intellectual mind, we can build, design, and develop innovative ideas.
      </p>
      <button className="mt-6 px-6 py-3 border-3 border-[#66FCF1] text-[#66FCF1] text-lg uppercase tracking-wide hover:bg-[#66FCF1] hover:text-black transition">
        Get Started
      </button>
    </div>
  );
};

export default Home;