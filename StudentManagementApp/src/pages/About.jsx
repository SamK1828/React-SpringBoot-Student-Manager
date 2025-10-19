const About = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 text-center px-6">
      <h2 className="text-4xl font-bold text-indigo-800 mb-4">About This Project</h2>
      <p className="text-gray-700 max-w-2xl text-lg">
        This Student Management System is built using{" "}
        <span className="font-semibold text-indigo-700">React + Tailwind</span>{" "}
        for the frontend and will connect with{" "}
        <span className="font-semibold text-purple-700">Spring Boot</span> for backend APIs.
        The project demonstrates full-stack CRUD operations, API integration, and clean UI design.
      </p>
    </div>
  );
};

export default About;
