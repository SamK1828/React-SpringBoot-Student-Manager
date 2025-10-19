import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
    const [open, setOpen] = useState(false); // mobile menu
    const [profileOpen, setProfileOpen] = useState(false);
    const location = useLocation();

    const NavLink = ({ to, children }) => {
        const active = location.pathname === to;
        return (
            <Link
                to={to}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                    ${active ? "text-indigo-600 bg-indigo-50" : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"}`}
                onClick={() => setOpen(false)}
            >
                {children}
            </Link>
        );
    };

    return (
        <header className="w-full bg-white shadow-md">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left: Logo */}
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-md bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 flex items-center justify-center text-white text-lg font-bold shadow">
                                🎓
                            </div>
                            <div>
                                <div className="text-lg font-semibold text-gray-800">
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500">
                                        Student Manager
                                    </span>
                                </div>
                                <div className="text-xs text-gray-400 -mt-0.5">Manage classes • track progress • collaborate</div>
                            </div>
                        </Link>
                    </div>

                    {/* Center / Links */}
                    <nav className="hidden md:flex md:items-center md:space-x-2">
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/students">Students</NavLink>
                        <NavLink to="/about">About</NavLink>
                        <NavLink to="/courses">Courses</NavLink>
                        <NavLink to="/help">Help</NavLink>
                    </nav>

                    {/* Right: Search, CTA, Profile */}
                    <div className="flex items-center space-x-3">
                        <div className="hidden sm:flex items-center bg-gray-50 border border-gray-100 rounded-md px-2 py-1 shadow-sm">
                            <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" />
                            </svg>
                            <input
                                type="search"
                                placeholder="Search students, courses..."
                                className="bg-transparent outline-none text-sm w-48 focus:w-64 transition-all duration-200"
                            />
                        </div>

                        <Link
                            to="/students/new"
                            className="hidden sm:inline-flex items-center px-3.5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-md shadow hover:scale-105 transform transition"
                        >
                            + Add Student
                        </Link>

                        <div className="relative">
                            <button
                                onClick={() => setProfileOpen(p => !p)}
                                className="flex items-center gap-2 bg-white border border-gray-100 px-2 py-1 rounded-md hover:shadow-sm transition"
                                aria-expanded={profileOpen}
                            >
                                <div className="relative">
                                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-semibold">A</div>
                                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full" />
                                </div>
                                <div className="hidden sm:flex flex-col items-start text-left">
                                    <span className="text-sm font-medium text-gray-700">Alex Student</span>
                                    <span className="text-xs text-gray-400 -mt-0.5">Student</span>
                                </div>
                                <svg className="w-4 h-4 text-gray-400 hidden sm:block" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06-.02L10 10.67l3.71-3.48a.75.75 0 011.04 1.08l-4.25 4a.75.75 0 01-1.04 0l-4.25-4a.75.75 0 01-.02-1.06z" clipRule="evenodd" />
                                </svg>
                            </button>

                            {profileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-md shadow-lg py-1 z-20">
                                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Profile</Link>
                                    <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Settings</Link>
                                    <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50">Sign out</button>
                                </div>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <button
                            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:bg-gray-100"
                            onClick={() => setOpen(o => !o)}
                            aria-expanded={open}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {open ? (
                                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {open && (
                <div className="md:hidden border-t border-gray-100 bg-white">
                    <div className="px-4 pt-3 pb-4 space-y-1">
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/students">Students</NavLink>
                        <NavLink to="/about">About</NavLink>
                        <NavLink to="/courses">Courses</NavLink>
                        <NavLink to="/help">Help</NavLink>
                        <Link to="/students/new" className="block mt-2 px-3 py-2 rounded-md bg-indigo-600 text-white text-center">+ Add Student</Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
