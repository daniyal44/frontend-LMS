import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Rocket, Code, Brain, BarChart3, Globe, Shield,
  ArrowRight, CheckCircle, Zap, MessageSquare,
  ChevronRight, Star, Cpu, Layers
} from 'lucide-react';
import Navbar from './Navbar';

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAccountPrompt, setShowAccountPrompt] = useState(false);
  const [intendedPath, setIntendedPath] = useState(null);

  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const auth = localStorage.getItem('isAuthenticated');
    return auth === '1' || auth === 'true';
  });

  // Service routes mapping
  const serviceRoutes = {
    'Web Development': '/webdevpage',
    'AI Integration': '/aiintegrationpage',
    'UI/UX Design': '/uxdesign',
    'Digital Marketing': '/digitalmarket'
  };

  // Company routes mapping
  const companyRoutes = {
    'About Us': '/about',
    'Careers': '/careers',
    'Case Studies': '/workpage',
    'Contact': '/contact'
  };

  // Services data
  const services = [
    { icon: Brain, title: 'AI Automation', desc: 'LLM integration, Chatbots, and automated workflows that save 100+ hours/month.' },
    { icon: Code, title: 'Full-Stack Dev', desc: 'React, Node.js, and Python architectures built for speed and scalability.' },
    { icon: BarChart3, title: 'Data Analytics', desc: 'Turn raw data into actionable insights with custom dashboarding.' },
    { icon: Globe, title: 'SEO & Marketing', desc: 'Technical SEO and programmatic content generation strategies.' },
    { icon: Shield, title: 'Cyber Security', desc: 'Enterprise-grade security protocols to protect your digital assets.' },
    { icon: Zap, title: 'Rapid Prototyping', desc: 'From concept to MVP in weeks, not months.' },
  ];

  const processSteps = [
    { title: "Discovery & Strategy", text: "We dive deep into your business logic to architect a solution that fits." },
    { title: "Agile Development", text: "Bi-weekly sprints with deliverables you can test and provide feedback on." },
    { title: "AI Integration", text: "Injecting intelligence into the core of your product for automation." },
    { title: "Launch & Scale", text: "CI/CD pipelines setup for zero-downtime deployment and scaling." }
  ];

  const technologies = ['React', 'Next.js', 'Node.js', 'Python', 'TensorFlow', 'AWS'];

  useEffect(() => {
    const handleStorage = () => {
      const auth = localStorage.getItem('isAuthenticated');
      setIsAuthenticated(auth === '1' || auth === 'true');
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Show account prompt after 7 seconds
    const promptTimer = setTimeout(() => {
      if (!isAuthenticated) {
        setShowAccountPrompt(true);
      }
    }, 7000);

    window.addEventListener('storage', handleStorage);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(promptTimer);
    };
  }, [isAuthenticated]);

  const handleNavigate = (path) => {
    if (isAuthenticated) {
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIntendedPath(path);
      setShowAuthModal(true);
    }
  };

  const handleServiceNavigate = (serviceName) => {
    const path = serviceRoutes[serviceName] || '/services';
    handleNavigate(path);
  };

  const goToLogin = () => {
    setShowAuthModal(false);
    setShowAccountPrompt(false);
    navigate('/authform');
  };

  const goToSignup = () => {
    setShowAuthModal(false);
    setShowAccountPrompt(false);
    navigate('/authform', { state: { mode: 'signup' } });
  };

  const goToAuthForm = () => {
    setShowAccountPrompt(false);
    navigate('/authform');
  };

  const demoLogin = () => {
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
    setShowAuthModal(false);
    setShowAccountPrompt(false);
    if (intendedPath) {
      navigate(intendedPath);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans selection:bg-teal-500/30 overflow-x-hidden">
      <Navbar 
        isScrolled={isScrolled} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
      />

      {/* --- BACKGROUND EFFECTS --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 pt-32 md:pt-40 pb-24 md:pb-32 px-4">
        <div className="max-w-7xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 backdrop-blur-md mb-8 animate-fade-in-up">
            <span className="flex h-2 w-2 rounded-full bg-teal-400 mr-2 animate-pulse"></span>
            <span className="text-sm text-gray-300 font-medium">Agency V2.0 is Live</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight mb-6 md:mb-8 leading-tight animate-fade-in-up delay-100">
            We Architect the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-purple-400 to-teal-400 bg-[length:200%_auto] animate-gradient">
              Digital Future
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base md:text-lg lg:text-xl text-slate-400 mb-8 md:mb-10 leading-relaxed animate-fade-in-up delay-200 px-4">
            MDK Agency combines cognitive AI with high-end engineering to build
            platforms that don't just function—they perform, scale, and dominate.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-5 animate-fade-in-up delay-300 px-4">
            <button
              onClick={() => handleNavigate('/services')}
              className="group relative px-6 md:px-8 py-3 md:py-4 bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold rounded-xl transition-all duration-300 shadow-[0_0_40px_-10px_rgba(20,184,166,0.5)] hover:scale-105 w-full sm:w-auto"
            >
              <span className="flex items-center justify-center gap-2">
                Start Your Transformation <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button
              onClick={() => handleNavigate('/workpage')}
              className="group px-6 md:px-8 py-3 md:py-4 bg-slate-800/50 border border-slate-700 hover:border-purple-500/50 text-white font-semibold rounded-xl backdrop-blur-md transition-all duration-300 hover:scale-105 w-full sm:w-auto"
            >
              View Our Work
            </button>
          </div>

          {/* Hero Dashboard Preview Image */}
          <div className="mt-12 md:mt-20 relative mx-auto max-w-4xl lg:max-w-5xl animate-fade-in-up delay-500 px-4">
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-purple-600 rounded-2xl blur opacity-20"></div>
            <div className="relative rounded-2xl border border-slate-700/50 bg-slate-900/50 backdrop-blur-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="MDK Dashboard Interface"
                className="w-full opacity-80 object-cover h-[200px] md:h-[300px] lg:h-[400px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES GRID --- */}
      <section className="relative z-10 py-16 md:py-24 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">Our Expertise</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
              We don't just build websites; we build comprehensive digital ecosystems tailored to your business logic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {services.map((service, idx) => (
              <div
                key={idx}
                onClick={() => handleNavigate('/services')}
                className="group relative p-6 md:p-8 rounded-2xl bg-slate-800/20 border border-slate-700/50 hover:bg-slate-800/40 hover:border-teal-500/30 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 border border-slate-600">
                    <service.icon className="w-5 h-5 md:w-6 md:h-6 text-teal-400" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-white group-hover:text-teal-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- OUR PROCESS --- */}
      <section className="relative z-10 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8">
                The MDK <span className="text-teal-400">Blueprint</span>
              </h2>
              <p className="text-slate-400 mb-6 md:mb-8 text-base md:text-lg">
                We've refined a delivery process that eliminates guesswork. Transparency at every stage ensures your vision aligns perfectly with the output.
              </p>

              <div className="space-y-6 md:space-y-8">
                {processSteps.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-teal-400 font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="text-base md:text-lg font-bold text-white mb-1">{step.title}</h4>
                      <p className="text-slate-400 text-sm md:text-base">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative mt-8 lg:mt-0">
              <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-teal-500 to-purple-600 rounded-full blur-2xl md:blur-3xl opacity-20"></div>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Team collaboration"
                className="relative rounded-2xl border border-slate-700 shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- TECH STACK --- */}
      <section className="py-8 md:py-12 border-y border-slate-800 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6 md:mb-8">Powered by Modern Technologies</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 lg:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {technologies.map((tech) => (
              <div key={tech} className="text-base md:text-xl font-bold text-slate-300 flex items-center gap-2">
                <Cpu className="w-4 h-4 md:w-5 md:h-5" /> {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="relative z-10 py-16 md:py-24 px-4">
        <div className="max-w-4xl lg:max-w-5xl mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-purple-600 rounded-3xl blur opacity-30"></div>
          <div className="relative bg-[#0f1523] border border-slate-700 rounded-3xl p-8 md:p-12 lg:p-20 text-center overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">Ready to Scale?</h2>
              <p className="text-base md:text-xl text-slate-300 mb-8 md:mb-10 max-w-2xl mx-auto">
                Join the forward-thinking companies transforming their operations with MDK's AI-driven solutions.
              </p>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <button
                  onClick={() => handleNavigate('/contact')}
                  className="px-6 md:px-8 py-3 md:py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg shadow-white/10 w-full sm:w-auto"
                >
                  Get a Quote
                </button>
                <button
                  onClick={goToSignup}
                  className="px-6 md:px-8 py-3 md:py-4 bg-transparent border border-slate-600 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors w-full sm:w-auto"
                >
                  Create Free Account
                </button>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-48 h-48 md:w-64 md:h-64 bg-teal-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-purple-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-slate-800 bg-[#0B0F19] pt-12 md:pt-20 pb-6 md:pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
            <div className="space-y-4">
              <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-500">MDK.</div>
              <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                Lahore-based digital agency specializing in Artificial Intelligence, Web Development, and Strategic Design.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4 md:mb-6 text-lg">Services</h4>
              <ul className="space-y-2 md:space-y-3 text-slate-400">
                {Object.keys(serviceRoutes).map(item => (
                  <li 
                    key={item} 
                    className="hover:text-teal-400 cursor-pointer transition-colors text-sm md:text-base" 
                    onClick={() => handleServiceNavigate(item)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4 md:mb-6 text-lg">Company</h4>
              <ul className="space-y-2 md:space-y-3 text-slate-400">
                {Object.keys(companyRoutes).map(item => (
                  <li 
                    key={item} 
                    className="hover:text-teal-400 cursor-pointer transition-colors text-sm md:text-base" 
                    onClick={() => navigate(companyRoutes[item])}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4 md:mb-6 text-lg">Newsletter</h4>
              <div className="flex flex-col gap-3">
                <input 
                  type="email" 
                  placeholder="Enter email address" 
                  className="bg-slate-900 border border-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-teal-500 transition-colors text-sm md:text-base" 
                />
                <button className="bg-teal-500 text-slate-900 font-bold rounded-lg px-4 py-3 hover:bg-teal-400 transition-colors text-sm md:text-base">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs md:text-sm">
            <p>&copy; {new Date().getFullYear()} MDK Agency. All rights reserved.</p>
            <div className="flex gap-4 md:gap-6 mt-4 md:mt-0">
              <Link to="/privacy" className="cursor-pointer hover:text-white">Privacy Policy</Link>
              <Link to="/terms" className="cursor-pointer hover:text-white">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* --- MODALS --- */}

      {/* Account Prompt Modal */}
      {showAccountPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowAccountPrompt(false)} />
          <div className="relative bg-[#0f1523] border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl shadow-teal-500/20">
            <div className="bg-slate-900/50 rounded-xl p-6 md:p-8">
              <div className="flex justify-between items-start mb-4 md:mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-teal-500/20 rounded-full flex items-center justify-center text-teal-400">
                  <Rocket className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <button onClick={() => setShowAccountPrompt(false)} className="text-slate-500 hover:text-white">✕</button>
              </div>

              <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">Unlock the Full Experience</h3>
              <p className="text-slate-400 mb-6 md:mb-8 text-sm md:text-base">
                MDK Agency offers exclusive tools and case studies for members. Create a free account to access our dashboard.
              </p>

              <div className="space-y-3">
                <button onClick={goToSignup} className="w-full py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-teal-500/25 transition-all text-sm md:text-base">
                  Create Free Account
                </button>
                <button onClick={goToLogin} className="w-full py-3 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors text-sm md:text-base">
                  Log In
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Auth Block Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setShowAuthModal(false)} />
          <div className="relative bg-[#0f1523] border border-red-500/30 rounded-2xl max-w-md w-full p-6 md:p-8 shadow-2xl shadow-red-900/20">
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 md:w-8 md:h-8 text-red-500" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">Access Restricted</h3>
              <p className="text-slate-400 mb-6 md:mb-8 text-sm md:text-base">
                You need to be an authenticated client or member to view <span className="text-teal-400 font-mono">{intendedPath}</span>.
              </p>

              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <button onClick={goToLogin} className="py-3 bg-teal-500 text-slate-900 font-bold rounded-lg hover:bg-teal-400 transition-colors text-sm md:text-base">
                  Log In
                </button>
                <button onClick={goToSignup} className="py-3 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors text-sm md:text-base">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Styles for Animations */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          opacity: 0;
          animation: fadeInUp 0.8s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-500 { animation-delay: 0.5s; }
      `}</style>
    </div>
  );
}

export default Home;