// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { Link } from "react-router-dom";
// import { motion, useTransform, useSpring } from "framer-motion";

// import Navbar from "./Navbar";

// /**
//  * CUSTOM HOOK: useScrollState
//  * Optimized with useCallback and cleanup
//  */
// const useScrollState = (threshold = 20) => {
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > threshold);
//     };

//     // Throttle scroll event for better performance
//     let ticking = false;
//     const throttledScroll = () => {
//       if (!ticking) {
//         requestAnimationFrame(() => {
//           handleScroll();
//           ticking = false;
//         });
//         ticking = true;
//       }
//     };

//     window.addEventListener("scroll", throttledScroll, { passive: true });
//     return () => window.removeEventListener("scroll", throttledScroll);
//   }, [threshold]);

//   return isScrolled;
// };

// /**
//  * COMPONENT: TiltCard
//  * Improved with better accessibility and performance
//  */
// const TiltCard = ({ children, className = "" }) => {
//   const x = useSpring(0, { stiffness: 300, damping: 30 });
//   const y = useSpring(0, { stiffness: 300, damping: 30 });

//   const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
//   const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);

//   const handleMouseMove = useCallback((e) => {
//     const rect = e.currentTarget.getBoundingClientRect();
//     x.set((e.clientX - rect.left) / rect.width - 0.5);
//     y.set((e.clientY - rect.top) / rect.height - 0.5);
//   }, [x, y]);

//   const handleMouseLeave = useCallback(() => {
//     x.set(0);
//     y.set(0);
//   }, [x, y]);

//   return (
//     <motion.div
//       onMouseMove={handleMouseMove}
//       onMouseLeave={handleMouseLeave}
//       style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
//       className={`relative rounded-2xl transition-shadow duration-500 hover:shadow-2xl ${className}`}
//       role="presentation"
//       aria-label="Interactive card with tilt effect"
//     >
//       {children}
//     </motion.div>
//   );
// };

// /**
//  * COMPONENT: StatCounter
//  * Optimized with requestAnimationFrame and proper cleanup
//  */
// const StatCounter = ({ number, label, suffix = "+" }) => {
//   const [count, setCount] = useState(0);
//   const countRef = useRef(null);
//   const animationRef = useRef(null);
//   const observerRef = useRef(null);

//   const target = parseInt(number, 10);

//   useEffect(() => {
//     const startCounter = () => {
//       let startTime;
//       const duration = 2000; // 2 seconds

//       const animate = (timestamp) => {
//         if (!startTime) startTime = timestamp;
//         const elapsed = timestamp - startTime;
//         const progress = Math.min(elapsed / duration, 1);
        
//         // Easing function for smooth animation
//         const easeOut = 1 - Math.pow(1 - progress, 3);
//         const currentCount = Math.floor(easeOut * target);
        
//         setCount(currentCount);

//         if (progress < 1) {
//           animationRef.current = requestAnimationFrame(animate);
//         } else {
//           setCount(target);
//         }
//       };

//       animationRef.current = requestAnimationFrame(animate);
//     };

//     observerRef.current = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           startCounter();
//           if (observerRef.current) {
//             observerRef.current.disconnect();
//           }
//         }
//       },
//       { threshold: 0.5, rootMargin: "50px" }
//     );

//     if (countRef.current) {
//       observerRef.current.observe(countRef.current);
//     }

//     return () => {
//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current);
//       }
//       if (observerRef.current) {
//         observerRef.current.disconnect();
//       }
//     };
//   }, [target]);

//   return (
//     <div ref={countRef} className="text-center" aria-label={`${label}: ${count}${suffix}`}>
//       <div className="text-4xl font-extrabold text-gray-900 tracking-tight" aria-live="polite">
//         {count}{suffix}
//       </div>
//       <div className="text-sm uppercase tracking-widest text-indigo-600 font-bold mt-1">
//         {label}
//       </div>
//     </div>
//   );
// };

// /**
//  * COMPONENT: TechStackItem
//  * Reusable component for tech stack items
//  */
// const TechStackItem = ({ href, children }) => (
//   <a
//     href={href}
//     target="_blank"
//     rel="noopener noreferrer"
//     className="text-2xl font-bold hover:text-indigo-600 transition-colors duration-300"
//     aria-label={`Visit ${children} website`}
//   >
//     {children}
//   </a>
// );

// /**
//  * COMPONENT: ProcessStep
//  * Reusable component for process steps
//  */
// const ProcessStep = ({ index, title, description }) => (
//   <div className="flex gap-6" role="listitem">
//     <div 
//       className="flex-shrink-0 w-12 h-12 rounded-full border border-indigo-500 flex items-center justify-center text-indigo-400 font-bold"
//       aria-hidden="true"
//     >
//       0{index + 1}
//     </div>
//     <div>
//       <h3 className="text-xl font-bold mb-2">{title}</h3>
//       <p className="text-slate-400">{description}</p>
//     </div>
//   </div>
// );

// function About() {
//   const isScrolled = useScrollState();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const processSteps = [
//     {
//       title: "Deep Analysis",
//       description: "We audit your existing data pipeline using customized Python scripts."
//     },
//     {
//       title: "AI Integration",
//       description: "Deploying proprietary models that sync with your existing CRM/ERP."
//     },
//     {
//       title: "Scalable Growth",
//       description: "Monitoring results via real-time dashboards for 24/7 optimization."
//     }
//   ];

//   const techStackItems = [
//     { name: "React", href: "https://react.dev" },
//     { name: "TailwindCSS", href: "https://tailwindcss.com" },
//     { name: "AWS", href: "https://aws.amazon.com" },
//     { name: "Google Cloud AI", href: "https://cloud.google.com/ai" }
//   ];

//   return (
//     <div className="antialiased font-sans bg-slate-50 overflow-x-hidden">
//       <Navbar isScrolled={isScrolled} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

//       {/* --- HERO SECTION --- */}
//       <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           <div className="flex flex-col lg:flex-row items-center gap-16">
//             <motion.div 
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6 }}
//               className="flex-1 text-center lg:text-left"
//             >
//               <span 
//                 className="inline-block py-1 px-3 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4"
//                 role="note"
//               >
//                 The Future of Work is Here
//               </span>
//               <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-tight mb-6">
//                 Redefining <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Intelligence</span> In Business
//               </h1>
//               <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0">
//                 MDK Agency leverages{" "}
//                 <a 
//                   href="https://openai.com" 
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   className="underline decoration-indigo-300 hover:text-indigo-600 transition-colors"
//                 >
//                   Advanced LLMs
//                 </a>{" "}
//                 and custom neural networks to automate the mundane and supercharge the creative.
//               </p>
              
//               <div className="flex flex-wrap justify-center lg:justify-start gap-4">
//                 <Link 
//                   to="/contact" 
//                   className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                 >
//                   Book a Free Audit
//                 </Link>
//                 <a 
//                   href="#process" 
//                   className="px-8 py-4 bg-white text-slate-900 rounded-xl font-bold border border-slate-200 hover:border-indigo-600 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                 >
//                   Our Methodology
//                 </a>
//               </div>
//             </motion.div>

//             <motion.div 
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               className="flex-1 w-full max-w-xl"
//             >
//               <TiltCard className="bg-white p-4 shadow-2xl">
//                 <img 
//                   src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" 
//                   alt="AI Visualization showing data analytics dashboard" 
//                   className="rounded-lg mb-6 w-full h-64 object-cover"
//                   loading="lazy"
//                 />
//                 <div className="grid grid-cols-3 gap-4" role="list" aria-label="Company statistics">
//                   <StatCounter number="10" label="X Growth" />
//                   <StatCounter number="99" label="Accuracy" suffix="%" />
//                   <StatCounter number="24" label="Support" suffix="/7" />
//                 </div>
//               </TiltCard>
//             </motion.div>
//           </div>
//         </div>
//       </header>

//       {/* --- TECH STACK SECTION --- */}
//       <section className="py-16 bg-white border-y border-slate-100">
//         <div className="max-w-7xl mx-auto px-4">
//           <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-widest mb-10">
//             Powered by Industry Leaders
//           </p>
//           <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
//             {techStackItems.map((item) => (
//               <TechStackItem key={item.name} href={item.href}>
//                 {item.name}
//               </TechStackItem>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* --- PROCESS SECTION --- */}
//       <section id="process" className="py-24 bg-slate-900 text-white">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="grid lg:grid-cols-2 gap-20 items-center">
//             <div>
//               <h2 className="text-4xl font-bold mb-8">
//                 How we deliver <span className="text-indigo-400">results</span>.
//               </h2>
//               <div className="space-y-12" role="list" aria-label="Our process steps">
//                 {processSteps.map((step, index) => (
//                   <ProcessStep
//                     key={step.title}
//                     index={index}
//                     title={step.title}
//                     description={step.description}
//                   />
//                 ))}
//               </div>
//             </div>
//             <div className="relative">
//               <div className="absolute -inset-4 bg-indigo-500/20 blur-3xl rounded-full" aria-hidden="true"></div>
//               <img 
//                 src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" 
//                 className="relative rounded-2xl shadow-2xl border border-slate-700" 
//                 alt="Our team collaborating in a modern office"
//                 loading="lazy"
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* --- FOOTER --- */}
//       <footer className="bg-slate-50 pt-20 pb-10 border-t border-slate-200">
//         <div className="max-w-7xl mx-auto px-4 text-center">
//           <h2 className="text-3xl font-bold text-slate-900 mb-8">Ready to evolve?</h2>
//           <Link 
//             to="/contact" 
//             className="inline-block px-12 py-5 bg-slate-900 text-white rounded-full font-bold hover:bg-black transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
//           >
//             Start Your Journey
//           </Link>
//           <div className="mt-20 pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
//             <div className="text-slate-500 text-sm">
//               © 2025 <span className="font-bold">MDK Agency</span>. Built with React & Framer Motion.
//             </div>
//             <div className="flex gap-8 text-sm font-medium text-slate-600">
//               <a href="/privacy" className="hover:text-indigo-600 transition-colors">
//                 Privacy Policy
//               </a>
//               <a href="/terms" className="hover:text-indigo-600 transition-colors">
//                 Terms of Service
//               </a>
//               <a 
//                 href="https://linkedin.com" 
//                 target="_blank" 
//                 rel="noopener noreferrer"
//                 className="hover:text-indigo-600 transition-colors"
//               >
//                 LinkedIn
//               </a>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default About;


import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, useTransform, useSpring, AnimatePresence } from "framer-motion";

import Navbar from "./Navbar";

/**
 * CUSTOM HOOK: useScrollState
 * Optimized with useCallback and cleanup
 */
const useScrollState = (threshold = 20) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    // Throttle scroll event for better performance
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

    // Set initial state
    handleScroll();

    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [threshold]);

  return isScrolled;
};

/**
 * COMPONENT: TiltCard
 * Improved with better accessibility and performance
 */
const TiltCard = ({ children, className = "" }) => {
  const cardRef = useRef(null);
  const x = useSpring(0, { stiffness: 300, damping: 30 });
  const y = useSpring(0, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;
    
    x.set(xPos);
    y.set(yPos);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        rotateX, 
        rotateY, 
        transformStyle: "preserve-3d",
        perspective: 1000 
      }}
      className={`relative rounded-2xl transition-shadow duration-500 hover:shadow-2xl ${className}`}
      role="presentation"
      aria-label="Interactive card with tilt effect"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {children}
    </motion.div>
  );
};

/**
 * COMPONENT: StatCounter
 * Optimized with requestAnimationFrame and proper cleanup
 */
const StatCounter = ({ number, label, suffix = "+" }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const animationRef = useRef(null);
  const observerRef = useRef(null);

  const target = typeof number === 'string' ? parseInt(number, 10) : number;

  useEffect(() => {
    const startCounter = () => {
      let startTime;
      const duration = 2000; // 2 seconds

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentCount = Math.floor(easeOut * target);
        
        setCount(currentCount);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          setCount(target);
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    };

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startCounter();
          if (observerRef.current) {
            observerRef.current.disconnect();
          }
        }
      },
      { threshold: 0.5, rootMargin: "50px" }
    );

    if (countRef.current) {
      observerRef.current.observe(countRef.current);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [target]);

  return (
    <div 
      ref={countRef} 
      className="text-center" 
      aria-label={`${label}: ${count}${suffix}`}
    >
      <div 
        className="text-4xl font-extrabold text-gray-900 tracking-tight" 
        aria-live="polite"
      >
        {count}{suffix}
      </div>
      <div className="text-sm uppercase tracking-widest text-indigo-600 font-bold mt-1">
        {label}
      </div>
    </div>
  );
};

/**
 * COMPONENT: TechStackItem
 * Reusable component for tech stack items
 */
const TechStackItem = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-2xl font-bold hover:text-indigo-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-lg p-2"
    aria-label={`Visit ${children} website`}
  >
    {children}
  </a>
);

/**
 * COMPONENT: ProcessStep
 * Reusable component for process steps
 */
const ProcessStep = ({ index, title, description }) => (
  <motion.div 
    className="flex gap-6" 
    role="listitem"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay: index * 0.1 }}
  >
    <div 
      className="flex-shrink-0 w-12 h-12 rounded-full border border-indigo-500 flex items-center justify-center text-indigo-400 font-bold bg-slate-800"
      aria-hidden="true"
    >
      0{index + 1}
    </div>
    <div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-slate-400">{description}</p>
    </div>
  </motion.div>
);

function About() {
  const isScrolled = useScrollState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Memoize processSteps to prevent unnecessary re-renders
  const processSteps = useMemo(() => [
    {
      title: "Deep Analysis",
      description: "We audit your existing data pipeline using customized Python scripts."
    },
    {
      title: "AI Integration",
      description: "Deploying proprietary models that sync with your existing CRM/ERP."
    },
    {
      title: "Scalable Growth",
      description: "Monitoring results via real-time dashboards for 24/7 optimization."
    }
  ], []);

  const techStackItems = useMemo(() => [
    { name: "React", href: "https://react.dev" },
    { name: "TailwindCSS", href: "https://tailwindcss.com" },
    { name: "AWS", href: "https://aws.amazon.com" },
    { name: "Google Cloud AI", href: "https://cloud.google.com/ai" }
  ], []);

  // Handle smooth scroll for anchor links
  const handleSmoothScroll = useCallback((e) => {
    const href = e.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <div className="antialiased font-sans bg-slate-50 overflow-x-hidden">
      <Navbar isScrolled={isScrolled} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* --- HERO SECTION --- */}
      <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-violet-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1 text-center lg:text-left"
            >
              <motion.span 
                className="inline-block py-1 px-3 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4"
                role="note"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                The Future of Work is Here
              </motion.span>
              <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-tight mb-6">
                Redefining{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  Intelligence
                </span>{" "}
                In Business
              </h1>
              <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0">
                MDK Agency leverages{" "}
                <a 
                  href="https://openai.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline decoration-indigo-300 hover:text-indigo-600 transition-colors font-medium"
                >
                  Advanced LLMs
                </a>{" "}
                and custom neural networks to automate the mundane and supercharge the creative.
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <Link 
                  to="/contact" 
                  className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Book a Free Audit
                </Link>
                <button 
                  onClick={handleSmoothScroll}
                  className="px-8 py-4 bg-white text-slate-900 rounded-xl font-bold border border-slate-200 hover:border-indigo-600 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Our Methodology
                </button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 w-full max-w-xl"
            >
              <TiltCard className="bg-white p-6 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" 
                  alt="AI Visualization showing data analytics dashboard" 
                  className="rounded-lg mb-6 w-full h-64 object-cover"
                  loading="lazy"
                  width={800}
                  height={400}
                />
                <div className="grid grid-cols-3 gap-4" role="list" aria-label="Company statistics">
                  <StatCounter number={10} label="X Growth" />
                  <StatCounter number={99} label="Accuracy" suffix="%" />
                  <StatCounter number={24} label="Support" suffix="/7" />
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </div>
      </header>

      {/* --- TECH STACK SECTION --- */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-widest mb-10">
            Powered by Industry Leaders
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
            {techStackItems.map((item) => (
              <TechStackItem key={item.name} href={item.href}>
                {item.name}
              </TechStackItem>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROCESS SECTION --- */}
      <section id="process" className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <motion.h2 
                className="text-4xl font-bold mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                How we deliver <span className="text-indigo-400">results</span>.
              </motion.h2>
              <div className="space-y-12" role="list" aria-label="Our process steps">
                {processSteps.map((step, index) => (
                  <ProcessStep
                    key={step.title}
                    index={index}
                    title={step.title}
                    description={step.description}
                  />
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-indigo-500/20 blur-3xl rounded-full" aria-hidden="true"></div>
              <motion.img 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" 
                className="relative rounded-2xl shadow-2xl border border-slate-700 w-full h-auto" 
                alt="Our team collaborating in a modern office"
                loading="lazy"
                width={800}
                height={600}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-50 pt-20 pb-10 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl font-bold text-slate-900 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to evolve?
          </motion.h2>
          <Link 
            to="/contact" 
            className="inline-block px-12 py-5 bg-slate-900 text-white rounded-full font-bold hover:bg-black transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
          >
            Start Your Journey
          </Link>
          <div className="mt-20 pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-slate-500 text-sm">
              © 2025 <span className="font-bold">MDK Agency</span>. Built with React & Framer Motion.
            </div>
            <div className="flex gap-8 text-sm font-medium text-slate-600">
              <Link to="/privacy" className="hover:text-indigo-600 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-indigo-600 transition-colors">
                Terms of Service
              </Link>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-indigo-600 transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Add CSS for blob animation */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}

export default About;