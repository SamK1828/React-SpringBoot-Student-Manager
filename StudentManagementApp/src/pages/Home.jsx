const Home = () => {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-center px-6">
      <h1 className="text-5xl font-bold text-indigo-800 mb-4">
        Welcome to <span className="text-purple-700">Student Manager</span>
      </h1>
      <p className="text-gray-700 text-lg max-w-2xl">
        A modern student management dashboard built using{" "}
        <span className="font-semibold text-indigo-700">React</span> and{" "}
        <span className="font-semibold text-purple-700">Spring Boot</span>.
        Manage records, track performance, and stay organized effortlessly.
      </p>
      <button className="mt-6 bg-indigo-700 text-white px-6 py-3 rounded-md hover:bg-indigo-800 transition">
        Get Started
      </button>
    </div>
  );
};

export default Home;
