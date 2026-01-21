
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [screenSize, setScreenSize] = useState('desktop');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // load cart count from localStorage and listen for cross-tab updates
    try {
      const stored = localStorage.getItem('mdk_cart');
      if (stored) setCartCount(JSON.parse(stored).length || 0);
    } catch (e) {}
    const onStorage = (e) => {
      if (e.key === 'mdk_cart') {
        try { setCartCount(JSON.parse(e.newValue || '[]').length || 0); } catch (err) {}
      }
    };
    window.addEventListener('storage', onStorage);
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
      window.removeEventListener('storage', onStorage);
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

  // Search state + debounce
  const [searchQuery, setSearchQuery] = useState('');
  const searchTimer = useRef(null);

  const handleSearchChange = (e) => {
    const v = e.target.value;
    setSearchQuery(v);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    // Debounce preview search or analytics
    searchTimer.current = setTimeout(() => {
      // lightweight: could call an autocomplete API here
      // For now just keep it local-friendly
      // console.debug('search preview:', v);
    }, 350);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery || searchQuery.trim() === '') return;
    // Navigate to search results page (simple behaviour)
    window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
  };

  // Dynamic styles depending on scroll
  const bgClass = isScrolled ? 'bg-white shadow-md' : 'bg-transparent';
  const textColorClass = isScrolled ? 'text-slate-800' : 'text-white';
  return (
    <div>
      <nav className={`fixed w-full z-50 transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className={`w-full ${bgClass} transition-colors duration-300 ${textColorClass}`}> 
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Left: Logo + Categories toggle */}
              <div className="flex items-center gap-3">
                <button
                  id="sidebar-toggle"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 rounded-md text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition"
                  aria-label="Toggle sidebar"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>

                <Link to="/" className="flex items-center gap-3 group" aria-label="MDK Agency">
                  <div className="w-9 h-9 bg-gradient-to-r from-teal-400 to-purple-500 rounded-md flex items-center justify-center text-white font-bold">M</div>
                  <div className="hidden md:block">
                    <div className="text-lg font-semibold text-slate-800">MDK Agency</div>
                    <div className="text-xs text-slate-500">Digital Services</div>
                  </div>
                </Link>
              </div>

              {/* Center: Category + Search (prominent) */}
              <div className="flex-1 mx-6 hidden sm:flex items-center">
                <form onSubmit={handleSearchSubmit} className="w-full">
                  <div className="w-full flex items-center bg-slate-50 border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                    <select className="appearance-none px-3 py-2 bg-transparent text-sm text-slate-700 border-r border-slate-200 outline-none">
                      <option>All</option>
                      <option>Design</option>
                      <option>Marketing</option>
                      <option>Development</option>
                      <option>Writing</option>
                    </select>
                    <input
                      type="search"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      placeholder="Search for services, gigs, and more"
                      className="flex-1 px-4 py-2 text-sm bg-transparent outline-none focus:ring-0"
                      aria-label="Search"
                    />
                    <button type="submit" className="px-4 py-2 bg-gradient-to-r from-teal-500 to-purple-500 text-white text-sm font-medium hover:opacity-95">
                      Search
                    </button>
                  </div>
                </form>
              </div>

              {/* Right: Actions (cart, notifications, auth) */}
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-3">
                  <Link to="/services" className="relative inline-flex items-center p-2 rounded-md text-slate-600 hover:bg-slate-100 transition">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
                    </svg>
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-0.5 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-semibold">{cartCount}</span>
                    )}
                  </Link>

                  <Link to="/authform" className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100 transition">Login</Link>
                  <Link to="/profile" className="px-3 py-2 rounded-md text-sm font-medium bg-gradient-to-r from-teal-500 to-purple-500 text-white shadow-sm">Become Seller</Link>
                </div>

                {/* Mobile menu toggle */}
                <button
                  id="mobile-menu-toggle"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:bg-slate-100 transition"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile expanded menu */}
          <div className={`sm:hidden transition-all duration-200 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
            <div className="px-4 pt-3 pb-4 space-y-2 bg-white border-t border-slate-200">
              <form onSubmit={handleSearchSubmit} className="mb-2">
                <div className="flex items-center gap-2">
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search services"
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-md text-sm outline-none"
                  />
                  <button type="submit" className="px-3 py-2 bg-teal-500 text-white rounded-md text-sm">Go</button>
                </div>
              </form>
              {[...navItems, ...authItems].map((item) => (
                <Link key={item.path} to={item.path} onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-slate-700 hover:bg-slate-50">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar Overlay and Sidebar (kept but styled lighter) */}
      <div className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-40' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsSidebarOpen(false)} />

      <aside id="sidebar" className={`fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-white z-50 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}>
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-lg font-bold text-slate-800">MDK Agency</div>
            <div className="text-sm text-slate-500">Explore categories</div>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="p-2 rounded-md text-slate-600 hover:bg-slate-50">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 space-y-1 overflow-y-auto h-[calc(100%-160px)]">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} onClick={handleSidebarLinkClick} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-50 text-slate-700">
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-100">
          <div className="flex gap-2">
            {authItems.map((item) => (
              <Link key={item.path} to={item.path} onClick={handleSidebarLinkClick} className="flex-1 text-center px-3 py-2 rounded-md bg-gradient-to-r from-teal-500 to-purple-500 text-white font-medium">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </aside>

      {/* Scroll progress */}
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div className="h-full bg-gradient-to-r from-teal-400 to-purple-500 transition-all duration-300" style={{ width: `${Math.min((lastScrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100)}%` }} />
      </div>
    </div>
  );
}

export default Navbar;

