
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Menu,
  Home,
  LogIn,
  UserPlus,
  ChevronDown,
  User,
  LogOut,
  Settings,
  Calendar,
} from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-sm shadow-md py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-doit-400 tracking-tight animate-pulse-gentle">DO!T</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/services" className="nav-link">Services</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </nav>

        {/* Authentication buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="relative group">
              <Button
                variant="ghost"
                className="flex items-center space-x-2 text-foreground hover:bg-muted"
              >
                <span>{user?.name}</span>
                <ChevronDown size={16} />
              </Button>
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                <div className="py-1 rounded-md bg-white">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-muted flex items-center"
                  >
                    <User size={16} className="mr-2" />
                    Dashboard
                  </Link>
                  <Link
                    to="/appointments"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-muted flex items-center"
                  >
                    <Calendar size={16} className="mr-2" />
                    Appointments
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-muted flex items-center"
                  >
                    <Settings size={16} className="mr-2" />
                    Settings
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted flex items-center"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" className="flex items-center space-x-2">
                  <LogIn size={16} />
                  <span>Login</span>
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="btn-primary flex items-center space-x-2">
                  <UserPlus size={16} />
                  <span>Sign Up</span>
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex items-center text-foreground"
          onClick={toggleMobileMenu}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden fixed inset-0 z-50 bg-white transform ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out pt-20`}
      >
        <div className="flex flex-col space-y-4 p-6">
          <Link to="/" className="text-foreground py-2 px-4 hover:bg-muted rounded-md">
            <Home size={16} className="inline-block mr-2" />
            Home
          </Link>
          <Link to="/services" className="text-foreground py-2 px-4 hover:bg-muted rounded-md">
            Services
          </Link>
          <Link to="/about" className="text-foreground py-2 px-4 hover:bg-muted rounded-md">
            About
          </Link>
          <Link to="/contact" className="text-foreground py-2 px-4 hover:bg-muted rounded-md">
            Contact
          </Link>

          <div className="border-t border-gray-200 pt-4 mt-4">
            {isAuthenticated ? (
              <>
                <div className="px-4 py-2 text-sm text-gray-500">
                  Signed in as <strong>{user?.name}</strong>
                </div>
                <Link to="/dashboard" className="block py-2 px-4 hover:bg-muted">
                  <User size={16} className="inline-block mr-2" />
                  Dashboard
                </Link>
                <Link to="/appointments" className="block py-2 px-4 hover:bg-muted">
                  <Calendar size={16} className="inline-block mr-2" />
                  Appointments
                </Link>
                <Link to="/settings" className="block py-2 px-4 hover:bg-muted">
                  <Settings size={16} className="inline-block mr-2" />
                  Settings
                </Link>
                <button
                  onClick={logout}
                  className="w-full text-left py-2 px-4 text-red-600 hover:bg-muted rounded-md"
                >
                  <LogOut size={16} className="inline-block mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-3">
                <Link to="/login" className="w-full">
                  <Button className="w-full justify-center" variant="outline">
                    <LogIn size={16} className="mr-2" />
                    Login
                  </Button>
                </Link>
                <Link to="/signup" className="w-full">
                  <Button className="w-full btn-primary justify-center">
                    <UserPlus size={16} className="mr-2" />
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
