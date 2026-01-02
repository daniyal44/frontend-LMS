
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [screenSize, setScreenSize] = useState('desktop');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Navbar background effect
      setIsScrolled(currentScrollY > 50);
      
      // Hide/show navbar on scroll
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down - hide navbar
          setIsVisible(false);
        } else {
          // Scrolling up - show navbar
          setIsVisible(true);
        }
      } else {
        // At top - always show
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) { // sm
        setScreenSize('mobile');
      } else if (width >= 640 && width < 768) { // sm-md
        setScreenSize('small-tablet');
      } else if (width >= 768 && width < 1024) { // md-lg
        setScreenSize('tablet');
      } else if (width >= 1024 && width < 1280) { // lg-xl
        setScreenSize('desktop');
      } else { // xl and above
        setScreenSize('large-desktop');
      }
    };

    // Initial calls
    handleResize();
    handleScroll();

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [lastScrollY]);

  // Close sidebar when clicking on a link
  const handleSidebarLinkClick = () => {
    setIsSidebarOpen(false);
    setIsMenuOpen(false);
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById('sidebar');
      const sidebarToggle = document.getElementById('sidebar-toggle');
      const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
      
      if (isSidebarOpen && sidebar && !sidebar.contains(event.target) && 
          sidebarToggle && !sidebarToggle.contains(event.target) &&
          mobileMenuToggle && !mobileMenuToggle.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen]);

  // Close mobile menu on resize to larger screens
  useEffect(() => {
    const handleResizeCloseMenu = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResizeCloseMenu);
    return () => window.removeEventListener('resize', handleResizeCloseMenu);
  }, [isMenuOpen]);

  // Navigation items
  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/about', label: 'About', icon: '👥' },
    { path: '/services', label: 'Services', icon: '⚡' },
    
    { path: '/contact', label: 'Contact', icon: '📞' },
    { path: '/complaint', label: 'Complaint', icon: '📝' }
  ];

  const authItems = [
    { path: '/authform', label: 'Login', icon: '🔐', gradient: 'from-teal-500 to-teal-600' },
    { path: '/profile', label: 'Profile', icon: '👤', gradient: 'from-green-500 to-green-600' }
  ];

  // Responsive navigation logic
  const getVisibleNavItems = () => {
    switch(screenSize) {
      case 'mobile':
        return navItems.slice(0, 0); // Show none in mobile (use sidebar/menu)
      case 'small-tablet':
        return navItems.slice(0, 3); // Show 3 items on small tablets
      case 'tablet':
        return navItems.slice(0, 4); // Show 4 items on tablets
      case 'desktop':
        return navItems.slice(0, 5); // Show 5 items on desktop
      case 'large-desktop':
        return navItems; // Show all items on large screens
      default:
        return navItems.slice(0, 4);
    }
  };

  const visibleNavItems = getVisibleNavItems();

  return (
    <div>
      <nav className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        isScrolled ? 'bg-slate-900/95 backdrop-blur-lg shadow-xl py-1' : 'bg-transparent py-3'
      }`}>
        <div className="max-w-[100vw] px-2 sm:px-4 lg:px-6 xl:px-8 2xl:px-10">
          <div className="flex justify-between items-center">
            {/* Logo and Sidebar Toggle */}
            <div className="flex items-center flex-shrink-0">
              <button
                id="sidebar-toggle"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="mr-2 sm:mr-3 p-1.5 sm:p-2 rounded-lg text-gray-400 hover:text-white hover:bg-purple-800/50 transition-all duration-200"
                aria-label="Toggle sidebar"
              >
                <div className="w-5 h-5 sm:w-6 sm:h-6 relative">
                  <span className="absolute left-0 top-1 w-full h-0.5 bg-current transition-all"></span>
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-current transition-all"></span>
                  <span className="absolute left-0 bottom-1 w-full h-0.5 bg-current transition-all"></span>
                </div>
              </button>
              
              <div className="flex-shrink-0">
                <Link 
                  to="/" 
                  className="text-lg sm:text-xl lg:text-2xl font-bold text-white hover:scale-105 transition-transform duration-200"
                >
                  <span className="bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">
                    MDK Agency
                  </span>
                </Link>
              </div>
            </div>
            
            {/* Desktop Navigation - Responsive item display */}
            <div className="hidden sm:flex flex-1 justify-center">
              <div className="flex items-center space-x-0.5 lg:space-x-1 xl:space-x-2 max-w-full overflow-hidden">
                {visibleNavItems.map((item) => (
                  <Link 
                    key={item.path}
                    to={item.path}
                    className="px-2 py-1.5 lg:px-3 lg:py-2 xl:px-4 rounded-lg text-xs lg:text-sm font-medium text-gray-300 hover:text-white hover:bg-purple-800/50 transition-all duration-200 hover:scale-105 flex items-center whitespace-nowrap"
                  >
                    <span className="mr-1 lg:mr-2 text-sm lg:text-lg">{item.icon}</span>
                    <span className="hidden xs:inline">{item.label}</span>
                  </Link>
                ))}
                
                {/* More dropdown for hidden items */}
                {screenSize !== 'large-desktop' && navItems.length > visibleNavItems.length && (
                  <div className="relative group">
                    <button className="px-2 py-1.5 lg:px-3 lg:py-2 rounded-lg text-xs lg:text-sm font-medium text-gray-300 hover:text-white hover:bg-purple-800/50 transition-all duration-200 flex items-center">
                      <span className="mr-1 lg:mr-2">⋯</span>
                      <span>More</span>
                    </button>
                    <div className="absolute top-full left-0 mt-1 w-48 bg-slate-800/95 backdrop-blur-lg rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      {navItems.slice(visibleNavItems.length).map((item) => (
                        <Link 
                          key={item.path}
                          to={item.path}
                          className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-purple-800/50 transition-all duration-200 first:rounded-t-lg last:rounded-b-lg flex items-center"
                        >
                          <span className="mr-3 text-lg">{item.icon}</span>
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Auth Buttons - Responsive sizing */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              {/* Desktop Auth Buttons */}
              <div className="hidden sm:flex items-center space-x-1 lg:space-x-2">
                {authItems.map((item) => (
                  <Link 
                    key={item.path}
                    to={item.path}
                    className={`px-2 py-1.5 lg:px-3 lg:py-2 xl:px-4 rounded-lg text-xs lg:text-sm font-medium bg-gradient-to-r ${item.gradient} text-white hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-teal-500/25 whitespace-nowrap`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              
              {/* Mobile menu button */}
              <button
                id="mobile-menu-toggle"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="sm:hidden inline-flex items-center justify-center p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-purple-800/50 focus:outline-none transition-all duration-200"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <div className="w-5 h-5 relative">
                  <span className={`absolute left-0 top-1 w-full h-0.5 bg-current transition-all duration-300 ${
                    isMenuOpen ? 'rotate-45 top-2' : ''
                  }`}></span>
                  <span className={`absolute left-0 top-2 w-full h-0.5 bg-current transition-all duration-300 ${
                    isMenuOpen ? 'opacity-0' : ''
                  }`}></span>
                  <span className={`absolute left-0 top-3 w-full h-0.5 bg-current transition-all duration-300 ${
                    isMenuOpen ? '-rotate-45 top-2' : ''
                  }`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        <div className={`sm:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-3 pt-2 pb-4 space-y-1 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800">
            {[...navItems, ...authItems].map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center ${
                  authItems.some(authItem => authItem.path === item.path) 
                    ? `bg-gradient-to-r ${item.gradient} text-white` 
                    : 'text-gray-300 hover:text-white hover:bg-purple-800/50'
                }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Sidebar Overlay */}
      <div 
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ${
          isSidebarOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* Enhanced Responsive Sidebar */}
      <div 
        id="sidebar"
        className={`fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-slate-900/95 backdrop-blur-lg shadow-2xl z-50 transform transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="text-xl sm:text-2xl font-bold text-white"
              onClick={handleSidebarLinkClick}
            >
              <span className="bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">
                MDK Agency
              </span>
            </Link>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1.5 sm:p-2 rounded-lg text-gray-400 hover:text-white hover:bg-purple-800/50 transition-all duration-200"
              aria-label="Close sidebar"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable Sidebar Content */}
        <div className="h-[calc(100%-200px)] overflow-y-auto">
          <div className="p-4 space-y-1">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                onClick={handleSidebarLinkClick}
                className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-purple-800/50 transition-all duration-200 group"
              >
                <span className="text-lg mr-3 group-hover:scale-110 transition-transform duration-200">
                  {item.icon}
                </span>
                <span className="font-medium text-sm sm:text-base">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Sidebar Auth Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800 bg-slate-900/95">
          <div className="space-y-2">
            {authItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                onClick={handleSidebarLinkClick}
                className={`flex items-center justify-center px-4 py-3 rounded-lg bg-gradient-to-r ${item.gradient} text-white font-medium hover:scale-105 transition-all duration-200 text-sm sm:text-base`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div 
          className="h-full bg-gradient-to-r from-teal-400 to-purple-400 transition-all duration-300 ease-out"
          style={{
            width: `${Math.min((lastScrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100)}%`
          }}
        ></div>
      </div>
    </div>
  );
}

export default Navbar;

