import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-800 via-indigo-700 to-purple-700 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                {/* Brand */}
                <div className="flex items-center space-x-4">
                    <div className="bg-white/10 p-2 rounded-lg flex items-center justify-center transform transition-transform duration-200 hover:scale-105">
                        <span className="text-2xl">🎓</span>
                    </div>
                    <div>
                        <Link to="/" className="font-semibold text-lg leading-tight hover:underline">
                            Student Manager
                        </Link>
                        <div className="text-xs text-white/80">Manage students, courses & progress</div>
                    </div>
                </div>

                {/* Desktop navigation */}
                <div className="hidden md:flex items-center space-x-6">
                    <Link to="/" className="px-3 py-2 rounded-md hover:bg-white/10 transition-colors">
                        Home
                    </Link>
                    <Link to="/students" className="px-3 py-2 rounded-md hover:bg-white/10 transition-colors">
                        Students
                    </Link>
                    <Link to="/about" className="px-3 py-2 rounded-md hover:bg-white/10 transition-colors">
                        About
                    </Link>
                </div>

                {/* Actions */}
                <div className="hidden md:flex items-center space-x-4">
                    <div className="relative">
                        <input
                            type="search"
                            placeholder="Search students..."
                            className="w-full max-w-xs md:w-56 bg-white/10 placeholder-white/70 text-white text-sm rounded-md py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-white/30 transition"
                            aria-label="Search students"
                        />
                        {/* <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1016.65 16.65z" />
                    </svg> */}
                    </div>

                    <Link
                        to="/add-student"
                        className="bg-white text-indigo-700 px-3 py-2 rounded-md font-medium hover:shadow-md transition"
                    >
                        + Add Student
                    </Link>

                    {/* <details className="relative">
                    <summary className="flex items-center gap-3 cursor-pointer rounded-full p-1 hover:bg-white/10 transition">
                        <img
                            src="https://ui-avatars.com/api/?name=Admin&background=6366f1&color=fff"
                            alt="User"
                            className="w-8 h-8 rounded-full ring-2 ring-white/30"
                        />
                    </summary>
                    <div className="absolute right-0 mt-2 w-48 bg-white/95 text-indigo-900 rounded-md shadow-lg overflow-hidden">
                        <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-indigo-50">Profile</Link>
                        <Link to="/settings" className="block px-4 py-2 text-sm hover:bg-indigo-50">Settings</Link>
                        <div className="border-t border-indigo-100" />
                        <button className="w-full text-left px-4 py-2 text-sm hover:bg-indigo-50">Sign out</button>
                    </div>
                </details> */}
                </div>

                {/* Mobile menu */}
                <div className="md:hidden">
                    <details className="relative">
                        <summary
                            className="p-2 rounded-md hover:bg-white/10 cursor-pointer"
                            aria-label="Open menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </summary>
                        <div className="mt-2 bg-white/5 rounded-md p-3 space-y-2">
                            <Link to="/" className="block px-3 py-2 rounded-md hover:bg-white/10">Home</Link>
                            <Link to="/students" className="block px-3 py-2 rounded-md hover:bg-white/10">Students</Link>
                            <Link to="/about" className="block px-3 py-2 rounded-md hover:bg-white/10">About</Link>
                            <Link to="/add-student" className="block mt-1 bg-white text-indigo-700 px-3 py-2 rounded-md text-center">+ Add Student</Link>
                        </div>
                    </details>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
