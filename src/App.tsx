import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useInView, useMotionValue } from 'framer-motion';
import { Sun, Moon, X, Menu, ArrowRight, Phone, Sparkles, Lock, Unlock, ArrowUpRight, ChevronUp, Code, Terminal, Cpu, Shield, Zap, Database, Globe2, Binary, MessageSquare } from 'lucide-react';

const categories = [
  "All",
  "POP ceilings",
  "Plaster board ceilings",
  "Paintings",
  "Wallpapers",
  "Interior decor",
  "Exterior decor",
  "Process"
];

const portfolioItems = [
  { img: "/plywood pop very strong 💪call for more information ☎️ 09030692526📞.jpg", cat: "POP ceilings", title: "Reinforced POP Ceiling" },
  { video: "/WhatsApp Video 2026-05-09 at 2.49.13 PM.mp4", cat: "Process", title: "Live Installation" },
  { img: "/Upgrade Your Designer False Ceiling in Just 7 Days!__Looking to transform your interiors with a stylish and modern false ceiling_ Houseserve Pvt Ltd, Sagar brings you expert craftsmanship and premium materials to .jpg", cat: "POP ceilings", title: "Modern False Ceiling" },
  { img: "/Plaster board installation in progress.jpg", cat: "Plaster board ceilings", title: "Plaster Board Work" },
  { img: "/Accent Walls In Living Room_ Artistic Paint Patterns for Statement Accent Walls.jpg", cat: "Paintings", title: "Artistic Accent Wall" },
  { img: "/3D Wall Mural Marble Gold Stripes Print Photo Wallpaper, Gray Gold Non-Woven Wall Mural Decoration Poster Picture Design Modern 400 x 280 cm (W x H) Mural for Living Room Kids Bedroom.jpg", cat: "Wallpapers", title: "3D Gold Stripe Mural" },
  { img: "/Marble Wallpaper Luxury TV Background Wallpaper Peel and Stick Wallpaper Self Adhesive Wallpaper Living Room Bedroom Wall Sticker - Etsy.jpg", cat: "Wallpapers", title: "Marble Luxury Wallpaper" },
  { img: "/Neutral Scandinavian Style Mural Wallpaper M1364 - Centimeter _ Textured Vinyl.jpg", cat: "Wallpapers", title: "Scandinavian Mural" },
  { img: "/Wallpaper for Bedroom 23 Ideas_ Transform Your Space with Style.jpg", cat: "Wallpapers", title: "Stylish Bedroom Wallpaper" },
  { video: "/WhatsApp Video 2026-05-09 at 2.49.14 PM.mp4", cat: "Process", title: "Artisan Craftsmanship" },
  { img: "/🪶 Flock Wallpaper – Textured Wallpaper Trends for Bedrooms.jpg", cat: "Wallpapers", title: "Textured Flock Wallpaper" },
  { img: "/Cozy Corner Floating Shelves with Warm LED Lighting _ Modern Minimalist Home Decor.jpg", cat: "Interior decor", title: "Floating Shelves" },
  { img: "/Design interior light blue.jpg", cat: "Interior decor", title: "Light Blue Concept" },
  { img: "/Design interior modern violet living room.jpg", cat: "Interior decor", title: "Violet Living Room" },
  { img: "/Modern and Elegant Living Room in Neutral Tones.jpg", cat: "Interior decor", title: "Elegant Neutral Lounge" },
  { img: "/Sleek TV Wall Designs for Modern Living Rooms.jpg", cat: "Interior decor", title: "Sleek TV Wall" },
  { img: "/Le style africain dans la décoration intérieure.jpg", cat: "Interior decor", title: "African Style Interior" },
  { img: "/download (1).jpg", cat: "Interior decor", title: "Modern Foyer" },
  { img: "/download (2).jpg", cat: "Interior decor", title: "Luxury Suite" },
  { img: "/download (3).jpg", cat: "Interior decor", title: "Minimalist Studio" },
  { img: "/Front Entrance Decor with Plants.jpg", cat: "Exterior decor", title: "Green Entrance" },
  { img: "/Modern Aesthetic Porch Wall Design ✨.jpg", cat: "Exterior decor", title: "Aesthetic Porch" },
  { img: "/timeless_character.jpg", cat: "Exterior decor", title: "Timeless Character" },
  { img: "/Modern Entryway Decor Ideas ✨ Luxury Foyer Design with Stylish Console & Mirror.jpg", cat: "Exterior decor", title: "Luxury Entryway" },
  { img: "/Maison fissure verticale _ comment réagir efficacement _.jpg", cat: "Fixing of crack walls", title: "Wall Crack Repair" },
  { img: "/premium_interior_ptj.jpg", cat: "Interior decor", title: "Premium Concept Suite" },
  { video: "/WhatsApp Video 2026-05-09 at 6.30.00 PM.mp4", cat: "Process", title: "Final Detailing" },
];



const serviceDetails = {
  "Interior Decoration": {
    img: "/download.jpg",
    article: "Our Interior Decoration service focuses on creating harmonious living spaces that reflect your personality. We balance color palettes, textures, and furniture arrangements to maximize both comfort and style. From minimalist modernism to classic luxury, we handle every detail including lighting, drapery, and accent pieces. Our expert decorators work closely with you to ensure every room we touch becomes a masterpiece of functional art."
  },
  "POP Ceilings": {
    img: "/plywood pop very strong 💪call for more information ☎️ 09030692526📞.jpg",
    article: "Plaster of Paris (POP) ceilings are a staple of modern architectural design. We specialize in intricate multi-layered designs, hidden LED troughs, and seamless finishes. Our POP installations are not only visually stunning but also provide excellent thermal insulation and acoustic properties for your home. Whether you're looking for a simple tray ceiling or a complex geometric pattern, our craftsmen deliver perfection."
  },
  "Wallpaper Styling": {
    img: "/Wallpaper for Bedroom 23 Ideas_ Transform Your Space with Style.jpg",
    article: "Transform your walls without the mess of paint. We offer premium wallpaper installation services featuring 3D textures, metallic accents, and bespoke murals. Our team ensures bubble-free application and perfect pattern matching, using high-quality adhesives that are durable and easy to maintain. From bold statement walls to subtle textured backdrops, we help you choose the perfect material."
  },
  "Exterior Finishes": {
    img: "/Front Entrance Decor with Plants.jpg",
    article: "Curb appeal starts with professional exterior finishing. We design and install modern porch walls, entrance features, and decorative exterior cladding. Our finishes are weather-resistant and designed to stand the test of time, giving your building a premium look that increases its market value. We use high-end materials that resist the elements while maintaining their vibrant colors."
  },
  "Structural Repair": {
    img: "/Maison fissure verticale _ comment réagir efficacement _.jpg",
    article: "Structural integrity is the foundation of any beautiful space. We provide professional repair services for wall cracks, dampness, and surface degradation. Our technique involves deep-filling structural gaps and applying high-performance binders before finishing, ensuring a perfectly smooth and permanent fix. We don't just cover cracks; we treat the root cause to prevent them from recurring."
  },
  "Software Engineering": {
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000",
    article: "As a Software Engineer student at Takoradi Technical University, I bring a unique analytical perspective to physical spaces. I design and develop robust, scalable applications and websites using modern frameworks. My approach combines the structural precision of engineering with the aesthetic finesse of interior design, resulting in digital products that are as functional as they are beautiful."
  }
};

const Counter = ({ value, label, theme }: { value: string, label: string, theme: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const target = parseInt(value);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-center">
      <div className={`text-lg md:text-2xl font-black mb-0.5 md:mb-1 transition-colors duration-700 text-blue-500`}>
        {count}{value.includes('+') ? '+' : (value.includes('.') ? '.0' : '')}
      </div>
      <div className={`text-[0.4rem] md:text-[0.55rem] uppercase tracking-widest font-black transition-colors duration-700 ${theme === 'dark' ? 'text-white/40' : 'text-blue-900/40'}`}>
        {label}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [isAuth, setIsAuth] = useState(true);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [selectedMedia, setSelectedMedia] = useState<{ type: 'image' | 'video', url: string } | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showCodeDetails, setShowCodeDetails] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light';
    if (savedTheme) setTheme(savedTheme);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = () => {
    setIsAuth(true);
    localStorage.setItem('ptj_auth', 'true');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };



  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  if (!isAuth) {
    return <Login onLogin={handleLogin} theme={theme} onToggleTheme={toggleTheme} />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`min-h-screen transition-colors duration-700 font-sans ${theme === 'dark' ? 'bg-[#0a0f1e] text-white' : 'bg-[#f8fafc] text-[#0f172a]'} antialiased selection:bg-blue-500/30`}
    >
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-blue-600 z-[60] origin-left" style={{ scaleX }} />
      
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <Hero theme={theme} />
      <About theme={theme} />
      <TechSection theme={theme} onOpenDetails={() => setShowCodeDetails(true)} />
      <Services theme={theme} onReadMore={setSelectedService} />
      <Portfolio theme={theme} onSelectMedia={(url: string, type: 'image' | 'video') => setSelectedMedia({ url, type })} />
      <Contact theme={theme} />
      <Footer theme={theme} onSelectMedia={(url: string) => setSelectedMedia({ url, type: 'image' })} />

      <AnimatePresence>
        {selectedMedia && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMedia(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl cursor-zoom-out"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full flex items-center justify-center p-0 md:p-0 transform-gpu will-change-transform"
              onClick={(e) => e.stopPropagation()}
            >
                {selectedMedia.type === 'video' ? (
                  <video 
                    src={selectedMedia.url} 
                    className="w-full h-full object-contain shadow-2xl"
                    autoPlay 
                    muted
                    loop
                    playsInline 
                  />
                ) : (
                  <img 
                    src={selectedMedia.url} 
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                    alt="Full view"
                  />
                )}
                <button 
                  onClick={() => setSelectedMedia(null)}
                  className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors bg-white/10 p-4 rounded-full backdrop-blur-md z-[110]"
                >
                  <X size={32} />
                </button>
            </motion.div>
          </motion.div>
        )}

        {selectedService && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-4 bg-black/90 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              className={`relative w-full max-w-6xl h-fit max-h-[95vh] rounded-[2rem] md:rounded-[3.5rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row border ${theme === 'dark' ? 'bg-[#0f172a] border-white/5 text-white' : 'bg-white border-blue-50 text-gray-900'}`}
            >
              <div className="w-full md:w-1/2 h-56 md:h-auto relative flex-shrink-0 overflow-hidden">
                <img src={serviceDetails[selectedService as keyof typeof serviceDetails].img} className="w-full h-full object-cover" alt={selectedService} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <button 
                  onClick={() => setSelectedService(null)} 
                  className="absolute top-4 right-4 bg-black/60 backdrop-blur-md p-3 rounded-full text-white transition-all z-30 md:hidden border border-white/20 hover:bg-red-500/80 active:scale-90"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="w-full md:w-1/2 p-6 md:p-16 flex flex-col overflow-y-auto custom-scrollbar max-h-[60vh] md:max-h-none">
                <div className="hidden md:flex justify-end mb-4">
                  <button 
                    onClick={() => setSelectedService(null)} 
                    className={`p-2.5 rounded-full transition-all border ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-blue-50 border-blue-100 text-blue-600 hover:bg-blue-100'}`}
                  >
                    <X size={20} />
                  </button>
                </div>
                <span className="text-blue-500 text-[0.55rem] md:text-[0.65rem] tracking-[0.4em] font-black mb-3 block uppercase">Expertise Details</span>
                <h3 className="text-2xl md:text-5xl font-black mb-6 md:mb-10 tracking-tight leading-tight">{selectedService}</h3>
                <div className={`text-sm md:text-lg leading-relaxed mb-10 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {serviceDetails[selectedService as keyof typeof serviceDetails].article}
                </div>
                <div className="mt-auto flex justify-between items-center pt-8 border-t border-gray-100 dark:border-white/5">
                  <button 
                    onClick={() => setSelectedService(null)} 
                    className="bg-blue-600 text-white px-8 md:px-12 py-4 md:py-5 rounded-2xl font-black uppercase text-[0.65rem] tracking-widest hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:scale-105 active:scale-95 transition-all"
                  >
                    Done Reading
                  </button>
                  <div className="flex gap-4">
                     <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500"><Sparkles size={18} /></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}


        {showCodeDetails && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className={`w-full max-w-5xl max-h-[90vh] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden border shadow-2xl flex flex-col ${theme === 'dark' ? 'bg-[#0f172a] border-white/5' : 'bg-white border-blue-100'}`}
            >
               <div className="p-6 md:p-8 border-b border-white/5 flex justify-between items-center bg-blue-600 text-white flex-shrink-0">
                  <div className="flex items-center gap-4">
                     <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center"><Terminal size={18} /></div>
                     <h3 className="text-sm md:text-lg font-black uppercase tracking-widest">Engineering Env</h3>
                  </div>
                  <button onClick={() => setShowCodeDetails(false)} className="p-2.5 bg-white/10 rounded-full hover:bg-white/20 transition-all"><X size={18} /></button>
               </div>
               
               <div className="p-6 md:p-16 overflow-y-auto custom-scrollbar flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
                     <TechDetailCard icon={<Database size={18} />} title="Backend Logic" desc="Node.js, PostgreSQL, and robust API development." theme={theme} />
                     <TechDetailCard icon={<Globe2 size={18} />} title="Cloud Systems" desc="Deployment strategies using AWS and Vercel." theme={theme} />
                     <TechDetailCard icon={<Binary size={18} />} title="Algorithms" desc="Solving complex problems with structural integrity." theme={theme} />
                  </div>
                  
                  <div className="mb-12 md:mb-16">
                     <h4 className="text-[0.65rem] md:text-sm font-black uppercase tracking-widest text-blue-500 mb-6 md:mb-8">Featured: Chale Connect</h4>
                     <div className={`p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] flex flex-col lg:flex-row gap-8 md:gap-10 items-center border transition-all ${theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-blue-50 border-blue-100 shadow-xl shadow-blue-500/5'}`}>
                        <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000" className="w-full lg:w-80 h-40 md:h-52 object-cover rounded-2xl md:rounded-[2rem] shadow-2xl shadow-black/20" alt="Chale Connect" />
                        <div>
                           <h5 className="text-xl md:text-2xl font-black mb-4 md:mb-6 leading-tight">Chale Connect Marketplace</h5>
                           <p className={`text-xs md:text-base leading-relaxed mb-6 md:mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                              A full-stack platform connecting local artisans in Takoradi. Built with real-time communication and verified profiles.
                           </p>
                           <div className="flex flex-wrap gap-2 md:gap-3 mb-4">
                              <span className="px-4 py-1.5 bg-blue-600/10 text-blue-500 rounded-full text-[0.55rem] md:text-[0.65rem] font-black uppercase tracking-widest">React</span>
                              <span className="px-4 py-1.5 bg-blue-600/10 text-blue-500 rounded-full text-[0.55rem] md:text-[0.65rem] font-black uppercase tracking-widest">Tailwind</span>
                              <span className="px-4 py-1.5 bg-blue-600/10 text-blue-500 rounded-full text-[0.55rem] md:text-[0.65rem] font-black uppercase tracking-widest">Node.js</span>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="mb-12 md:mb-16">
                     <h4 className="text-[0.65rem] md:text-sm font-black uppercase tracking-widest text-blue-500 mb-4 block">Console</h4>
                     <div className={`p-6 md:p-8 rounded-2xl md:rounded-3xl font-mono text-[0.6rem] md:text-[0.7rem] relative group border ${theme === 'dark' ? 'bg-black/40 border-white/5 text-blue-400' : 'bg-blue-50 border-blue-100 text-blue-600'}`}>
                        <div className="absolute top-4 right-4 text-[0.45rem] uppercase tracking-widest opacity-50">App.tsx</div>
                        <div className="text-green-500 mb-2">// Mastering code @ TTU</div>
                        <div>export const ChaleConnect = () ={">"} {"{"}</div>
                        <div className="pl-6">return &lt;ArtisanCard /&gt;;</div>
                        <div>{"}"};</div>
                        <br/>
                        <div className="text-white/30 italic">// Patrick Tandoh Junior - 2026</div>
                     </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-8 border-t border-white/5">
                     <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500"><Zap size={18} /></div>
                        <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500"><Shield size={18} /></div>
                     </div>
                     <button 
                        onClick={() => setShowCodeDetails(false)} 
                        className="w-1/2 sm:w-auto bg-blue-600 text-white px-5 py-2 rounded-lg font-black uppercase text-[0.5rem] tracking-[0.2em] hover:shadow-2xl transition-all mx-auto sm:mx-0"
                     >
                        Close Dashboard
                     </button>
                  </div>
               </div>
            </motion.div>
          </motion.div>
        )}

        {showScrollTop && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[60] bg-blue-600 text-white p-2.5 md:p-3 rounded-xl md:rounded-2xl shadow-2xl shadow-blue-500/40 hover:scale-110 active:scale-95 transition-all"
          >
            <ChevronUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const TechDetailCard = ({ icon, title, desc, theme }: any) => (
  <div className={`p-6 md:p-8 rounded-2xl md:rounded-3xl border transition-all ${theme === 'dark' ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-white border-blue-50 shadow-xl shadow-blue-500/5 hover:border-blue-100'}`}>
    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white mb-4 md:mb-6 shadow-lg shadow-blue-500/30">{icon}</div>
    <h4 className="text-[0.65rem] md:text-sm font-black uppercase tracking-widest mb-2">{title}</h4>
    <p className={`text-[0.6rem] md:text-xs leading-relaxed ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>{desc}</p>
  </div>
);

const Navbar = ({ theme, onToggleTheme }: any) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-3 md:py-4 shadow-2xl backdrop-blur-2xl' : 'py-5 md:py-6'} ${theme === 'dark' ? (scrolled ? 'bg-[#0a0f1e]/90 border-b border-white/5' : 'bg-transparent') : (scrolled ? 'bg-white/90 border-b border-black/5' : 'bg-transparent')}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
        <div className={`text-xl md:text-2xl font-black tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-blue-600'}`}>PTJ<span className="text-blue-500">.</span></div>
        
        <div className="hidden lg:flex gap-10 uppercase text-[0.65rem] font-bold tracking-widest text-gray-500">
          {navLinks.map(link => (
            <motion.a whileTap={{ scale: 0.9 }} key={link.name} href={link.href} className="hover:text-blue-500 transition-colors">{link.name}</motion.a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <motion.button whileTap={{ scale: 0.9 }} onClick={onToggleTheme} className={`relative w-10 h-10 md:w-12 md:h-12 rounded-full transition-all overflow-hidden flex items-center justify-center transform-gpu active:scale-90 ${theme === 'dark' ? 'bg-white/10 text-yellow-400 hover:bg-white/20' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30'}`}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="will-change-transform"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
          
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)} 
            className={`lg:hidden p-2 rounded-xl transition-all ${theme === 'dark' ? 'text-white bg-white/5' : 'text-blue-600 bg-blue-50'}`}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Backdrop & Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[45] lg:hidden"
            />
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`fixed top-[64px] left-0 w-full overflow-hidden border-t z-[50] lg:hidden ${theme === 'dark' ? 'bg-[#0a0f1e] border-white/5 shadow-2xl' : 'bg-white border-black/5 shadow-xl'}`}
            >
              <div className="flex flex-col p-6 gap-6">
                {navLinks.map(link => (
                  <motion.a 
                    whileTap={{ scale: 0.95 }}
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsOpen(false)}
                    className={`text-[0.7rem] font-black uppercase tracking-[0.3em] hover:text-blue-500 transition-colors ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
                  >
                    {link.name}
                  </motion.a>
                ))}
                <div className="pt-4 border-t border-white/5 flex justify-end items-center" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ theme }: any) => (
  <section id="home" className="relative min-h-screen flex items-center px-4 md:px-6 overflow-hidden pt-20 scroll-mt-20">
    <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
      <div className="absolute top-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-blue-600/30 rounded-full blur-[80px] md:blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-indigo-600/20 rounded-full blur-[80px] md:blur-[120px]" />
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 items-center w-full max-w-7xl mx-auto z-10 relative gap-12">
      <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="text-center md:text-left">
        <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-500 text-[0.55rem] md:text-[0.65rem] font-bold tracking-[0.2em] uppercase mb-6 md:mb-8">Professional Decorator & Software Engineer</span>
        <h1 className="text-4xl md:text-8xl font-black leading-[0.95] mb-6 md:mb-8 tracking-tighter">
          <motion.span 
            initial={{ y: 40, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block"
          >
            I'm Patrick
          </motion.span> <br className="hidden md:block" /> 
          <motion.span 
            initial={{ y: 40, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block"
          >
            Tandoh <span className="text-blue-600">Junior</span>
          </motion.span>
        </h1>
        <p className={`text-sm md:text-lg mb-8 md:mb-12 max-w-md mx-auto md:mx-0 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          A dual-identity creative bridging the gap between physical aesthetics and digital logic. From Takoradi Technical University to your living room.
        </p>
        <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6">
          <motion.a whileTap={{ scale: 0.95 }} href="#portfolio" className="bg-blue-600 text-white px-8 md:px-10 py-3.5 md:py-4 rounded-xl md:rounded-2xl font-black uppercase text-[0.65rem] tracking-widest shadow-2xl shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all">Explore Work</motion.a>
          <motion.a whileTap={{ scale: 0.95 }} href="#contact" className={`border-2 px-8 md:px-10 py-3.5 md:py-4 rounded-xl md:rounded-2xl font-black uppercase text-[0.65rem] tracking-widest hover:bg-blue-500/5 transition-all ${theme === 'dark' ? 'border-white/10 text-white' : 'border-blue-600/20 text-blue-600'}`}>Contact</motion.a>
        </div>
      </motion.div>
      
      <div className="relative mt-8 md:mt-0">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative z-10">
          <div className={`p-3 md:p-4 rounded-3xl transition-all duration-500 ${theme === 'dark' ? 'bg-transparent' : 'bg-blue-600/5 shadow-2xl shadow-blue-200/50'}`}>
            <img src="/senior designer.jpg" alt="Patrick Tandoh Junior" className="w-full max-w-lg mx-auto rounded-2xl grayscale-[20%] hover:grayscale-0 transition-all duration-700 shadow-2xl" />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-blue-600 p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-2xl hidden sm:block">
            <div className="text-white text-2xl md:text-4xl font-black">10+</div>
            <div className="text-white/70 text-[0.45rem] md:text-[0.55rem] font-black uppercase tracking-widest">Experience</div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const About = ({ theme }: any) => (
  <section id="about" className={`py-20 md:py-32 px-4 md:px-6 scroll-mt-20 ${theme === 'dark' ? 'bg-white/[0.02]' : 'bg-blue-50/50'}`}>
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
      <div className="relative order-2 md:order-1">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className={`pt-0 pb-3 px-3 md:pb-4 md:px-4 rounded-3xl transition-all duration-500 ${theme === 'dark' ? 'bg-transparent' : 'bg-blue-600/5 shadow-2xl shadow-blue-200/50'}`}>
            <img src="/WhatsApp Image 2026-05-09 at 2.49.43 PM.jpeg" className="w-full h-[400px] md:h-[600px] object-cover object-top rounded-2xl grayscale-0 md:grayscale md:hover:grayscale-0 transition-all duration-700 shadow-2xl" alt="About" />
          </div>
          <div className={`absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 p-8 md:p-12 rounded-2xl md:rounded-3xl backdrop-blur-2xl border ${theme === 'dark' ? 'bg-black/60 border-white/10 shadow-2xl shadow-black/50' : 'bg-white/80 border-blue-100 shadow-2xl shadow-blue-200/50'} w-56 md:w-72 hidden sm:block`}>
            <h3 className="text-[0.6rem] md:text-[0.65rem] uppercase tracking-[0.3em] font-black mb-4 md:mb-6 text-blue-500">The Polymath</h3>
            <p className="text-xs md:text-sm font-bold leading-relaxed italic">"Coding environments, decorating experiences."</p>
          </div>
        </motion.div>
      </div>
      <div className="order-1 md:order-2">
        <span className="text-blue-500 text-[0.6rem] md:text-[0.65rem] tracking-[0.4em] font-black mb-4 md:mb-6 block uppercase">Architect of Spaces & Systems</span>
        <h2 className="text-3xl md:text-5xl font-black mb-6 md:mb-10 tracking-tight leading-tight">Crafting Luxury <br className="hidden md:block" /> with Logic</h2>
        <p className={`text-sm md:text-lg leading-relaxed mb-8 md:mb-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Hello, I'm <span className="font-bold text-blue-500">Patrick Tandoh Junior</span>. I am a versatile <span className="font-bold">Interior Decorator</span> and <span className="font-bold">Software Engineer</span> currently schooling at <span className="text-blue-600 font-black">Takoradi Technical University</span>. I believe that great design is systematic.
        </p>
        <div className="grid grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-12">
          <InfoItem label="Based" value="Takoradi, GH" theme={theme} />
          <InfoItem label="Education" value="TTU Student" theme={theme} />
          <InfoItem label="Craft" value="Decor & Code" theme={theme} />
          <InfoItem label="Focus" value="Luxury & Logic" theme={theme} />
        </div>
      </div>
    </div>
  </section>
);

const TechSection = ({ theme, onOpenDetails }: any) => {
  return (
    <section className={`py-20 md:py-32 px-4 md:px-6 overflow-hidden relative ${theme === 'dark' ? 'bg-[#0a0a0f]' : 'bg-blue-50/20'}`}>
       <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
             <div>
                <span className="text-blue-500 text-[0.6rem] md:text-[0.65rem] tracking-[0.4em] font-black mb-4 md:mb-6 block uppercase">Digital Excellence</span>
                <h2 className="text-3xl md:text-5xl font-black mb-6 md:mb-10 tracking-tight leading-tight">Engineering the <br className="hidden md:block" /> Future of Decor</h2>
                <p className={`text-sm md:text-lg mb-8 md:mb-10 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                   As a programmer, I engineer rooms. My studies at Takoradi Technical University equip me to build digital interfaces that complement my physical craftsmanship.
                </p>
                <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
                   <TechStat icon={<Terminal size={18} />} title="Precision" desc="Modular code." theme={theme} />
                   <TechStat icon={<Cpu size={18} />} title="Architecture" desc="System design." theme={theme} />
                   <TechStat icon={<Shield size={18} />} title="Security" desc="Robust apps." theme={theme} />
                   <TechStat icon={<Zap size={18} />} title="Speed" desc="High-perf UX." theme={theme} />
                </div>
                <div className="flex justify-center md:justify-start w-full">
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    onClick={onOpenDetails}
                    className="w-[120px] bg-blue-600 text-white px-3 py-1.5 rounded-lg font-black uppercase text-[0.45rem] tracking-widest hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-1.5 mx-auto md:mx-0"
                  >
                    View Dashboard <ArrowRight size={12} />
                  </motion.button>
                </div>
             </div>
             <motion.div whileTap={{ scale: 0.98 }} className="relative group cursor-pointer" onClick={onOpenDetails}>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className={`p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border backdrop-blur-2xl transition-all relative overflow-hidden ${theme === 'dark' ? 'bg-white/[0.02] border-white/5 hover:border-blue-500/30' : 'bg-white border-blue-100 shadow-2xl'}`}
                >
                   <div className="flex items-center justify-between mb-6 md:mb-8">
                      <div className="flex gap-2">
                         <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                         <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                         <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                      </div>
                      <div className="text-[0.55rem] font-bold text-blue-500 uppercase tracking-widest">ttu_portal.exe</div>
                   </div>
                   <div className="space-y-4 md:y-6">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white"><Code size={20} /></div>
                         <div>
                            <div className="text-[0.65rem] font-black uppercase tracking-widest mb-1">Interactive Interface</div>
                            <div className="text-[0.55rem] text-gray-500">Tap to expand</div>
                         </div>
                      </div>
                      <div className={`p-4 md:p-6 rounded-2xl font-mono text-[0.65rem] leading-relaxed ${theme === 'dark' ? 'bg-black/60 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                         <div>const profile = await TTU.get("PTJ");</div>
                         <div className="pl-4">return "Magic Initiated...";</div>
                      </div>
                   </div>
                </motion.div>
             </motion.div>
          </div>
       </div>
    </section>
  );
};

const TechStat = ({ icon, title, desc, theme }: any) => (
  <div className="flex gap-3 md:gap-4">
    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 flex-shrink-0">{icon}</div>
    <div>
      <h4 className="text-[0.55rem] md:text-[0.65rem] font-black uppercase tracking-widest mb-0.5 md:mb-1">{title}</h4>
      <p className={`text-[0.5rem] md:text-[0.6rem] leading-tight ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>{desc}</p>
    </div>
  </div>
);

const InfoItem = ({ label, value, theme }: any) => (
  <div className={`p-4 md:p-6 rounded-xl md:rounded-2xl border transition-all ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-white border-blue-50 shadow-sm'}`}>
    <div className="text-blue-500 text-[0.55rem] md:text-[0.6rem] uppercase tracking-widest font-black mb-1">{label}</div>
    <div className="text-xs md:text-sm font-bold tracking-tight">{value}</div>
  </div>
);

const Services = ({ theme, onReadMore }: any) => (
  <section id="services" className="py-20 md:py-32 px-4 md:px-6 scroll-mt-20">
    <div className="max-w-7xl mx-auto text-center mb-16 md:mb-24">
      <span className="text-blue-500 text-[0.6rem] md:text-[0.65rem] tracking-[0.4em] font-black mb-4 md:mb-6 block uppercase">What I Do</span>
      <h2 className="text-3xl md:text-5xl font-black tracking-tight">Master Craftsmanship</h2>
    </div>
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      <ServiceCard theme={theme} onClick={() => onReadMore("Interior Decoration")} title="Interior Decoration" bgImg="/download.jpg" desc="Bespoke luxury materials with functional layouts." />
      <ServiceCard theme={theme} onClick={() => onReadMore("POP Ceilings")} title="POP Ceilings" bgImg="/plywood pop very strong 💪call for more information ☎️ 09030692526📞.jpg" desc="Advanced false ceiling with integrated lighting." />
      <ServiceCard theme={theme} onClick={() => onReadMore("Wallpaper Styling")} title="Wallpaper Styling" bgImg="/Wallpaper for Bedroom 23 Ideas_ Transform Your Space with Style.jpg" desc="Premium murals that redefine character." />
      <ServiceCard theme={theme} onClick={() => onReadMore("Exterior Finishes")} title="Exterior Finishes" bgImg="/Front Entrance Decor with Plants.jpg" desc="Sophisticated porch and entrance designs." />
      <ServiceCard theme={theme} onClick={() => onReadMore("Structural Repair")} title="Structural Repair" bgImg="/Maison fissure verticale _ comment réagir efficacement _.jpg" desc="Invisible fixing of wall cracks." />
      <ServiceCard theme={theme} onClick={() => onReadMore("Software Engineering")} title="Software Engineering" bgImg="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000" desc="Robust digital solutions at TTU." />
    </div>
  </section>
);

const ServiceCard = ({ title, desc, bgImg, theme, onClick }: any) => (
  <motion.div 
    whileHover={{ y: -10 }}
    whileTap={{ scale: 0.98 }}
    className={`relative p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] border overflow-hidden transition-all group ${theme === 'dark' ? 'bg-white/5 border-white/5 hover:border-blue-500/30' : 'bg-white border-blue-50 shadow-xl shadow-blue-500/5 hover:border-blue-500/50'}`}
  >
    <div className="absolute inset-0 opacity-60 group-hover:opacity-80 transition-opacity">
      <img src={bgImg} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/30 to-black/80" />
    </div>
    <div className="relative z-10">
      <h4 className="text-xl md:text-2xl font-black mb-3 md:mb-4 tracking-tight text-white">{title}</h4>
      <p className="text-xs md:text-sm leading-relaxed text-white/90 font-medium">{desc}</p>
      <motion.button 
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
        className="mt-8 md:mt-10 flex items-center text-blue-400 font-bold text-[0.6rem] md:text-[0.65rem] uppercase tracking-widest gap-2 group-hover:gap-4 transition-all"
      >
        Read More <ArrowUpRight size={14} />
      </motion.button>
    </div>
  </motion.div>
);

const Portfolio = ({ theme, onSelectMedia }: any) => {
  const [filter, setFilter] = useState("All");
  const filteredItems = filter === "All" ? portfolioItems : portfolioItems.filter(i => i.cat === filter);

  return (
    <section id="portfolio" className={`py-20 md:py-32 px-4 md:px-6 scroll-mt-20 ${theme === 'dark' ? 'bg-white/[0.02]' : 'bg-blue-50/50'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 md:mb-24 gap-10">
          <div className="text-center md:text-left">
            <span className="text-blue-500 text-[0.6rem] md:text-[0.65rem] tracking-[0.4em] font-black mb-4 block uppercase">Showcase</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">Recent Projects</h2>
          </div>
          <div className="flex flex-wrap gap-2 justify-center md:justify-end">
            {categories.map(cat => (
              <motion.button 
                key={cat}
                whileTap={{ scale: 0.9 }}
                onClick={() => setFilter(cat)}
                className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full text-[0.55rem] md:text-[0.65rem] font-black uppercase tracking-widest transition-all ${filter === cat ? 'bg-blue-600 text-white shadow-lg' : (theme === 'dark' ? 'bg-white/5 text-gray-500' : 'bg-white text-gray-500 shadow-sm')}`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <PortfolioItem key={idx} {...item} onClick={() => onSelectMedia(item.video || item.img, item.video ? 'video' : 'image')} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const PortfolioItem = ({ img, video, cat, title, onClick }: any) => (
  <motion.div 
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    whileTap={{ scale: 0.95 }}
    className="group relative cursor-pointer overflow-hidden rounded-2xl md:rounded-3xl"
    onClick={onClick}
  >
    <div className="aspect-[4/3] overflow-hidden">
      {video ? (
        <video 
          src={video} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
          autoPlay 
          muted 
          loop 
          playsInline 
        />
      ) : (
        <img src={img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:brightness-110" alt={title} />
      )}
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-5 md:p-10">
      <span className="text-blue-400 text-[0.5rem] md:text-[0.6rem] uppercase tracking-widest font-black mb-1 md:mb-2">{cat}</span>
      <h4 className="text-sm md:text-2xl font-black text-white leading-tight">{title}</h4>
    </div>
  </motion.div>
);

const MagneticButton = ({ children, className, href, target, rel }: any) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x * 0.4);
    mouseY.set(y * 0.4);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const Content = (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );

  return href ? (
    <a href={href} target={target} rel={rel} className="w-full flex justify-center">
      {Content}
    </a>
  ) : Content;
};

const Contact = ({ theme }: any) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section id="contact" ref={containerRef} onMouseMove={handleMouseMove} className="py-20 md:py-32 px-4 md:px-6 scroll-mt-20 relative overflow-hidden">
      {/* Interactive Mouse-Tracked Glow (PC only) */}
      <motion.div 
        className="absolute w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none z-0 hidden lg:block"
        style={{ x: mouseX, y: mouseY, left: -300, top: -300 }}
      />

      {/* Floating Architectural Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[Cpu, Sparkles, Database, Globe2].map((Icon, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.1, 0.2, 0.1],
              y: [0, -20, 0],
              x: [0, 10, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ 
              duration: 5 + i, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: i * 2
            }}
            className="absolute text-blue-500/20"
            style={{ 
              top: `${20 + i * 20}%`, 
              left: `${10 + i * 25}%`,
            }}
          >
            <Icon size={40 + i * 20} />
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
        {/* Left Side Magic (PC only) */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="hidden lg:flex flex-col gap-12 w-64"
        >
          <div className="group transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500 mb-4 group-hover:scale-110 transition-transform"><Cpu size={20} /></div>
            <h4 className="text-[0.65rem] font-black uppercase tracking-widest text-blue-500 mb-2">Systems Logic</h4>
            <p className={`text-[0.6rem] leading-relaxed font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-blue-900/70'}`}>Designing digital architectures with the same precision as physical spaces.</p>
          </div>
          <div className="group transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500 mb-4 group-hover:scale-110 transition-transform"><Sparkles size={20} /></div>
            <h4 className="text-[0.65rem] font-black uppercase tracking-widest text-blue-500 mb-2">Aesthetic Soul</h4>
            <p className={`text-[0.6rem] leading-relaxed font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-blue-900/70'}`}>Creating harmony through textures, colors, and sophisticated lighting.</p>
          </div>
        </motion.div>

        {/* Main Form */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-sm relative group/contact px-4 md:px-0"
        >
          <div className={`rounded-[2.5rem] py-3 px-5 md:p-10 overflow-hidden relative backdrop-blur-3xl border transition-all duration-700 z-10 ${theme === 'dark' ? 'bg-white/[0.03] border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]' : 'bg-white/70 border-blue-100 shadow-2xl shadow-blue-500/10'}`}>

            {/* Decorative shining accents */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-30" />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-30" />
            
            <div className="relative z-10 flex flex-col gap-3 md:gap-8 text-center">
              <div>
                <span className={`text-[0.5rem] tracking-[0.4em] font-black mb-3 block uppercase ${theme === 'dark' ? 'text-white/40' : 'text-blue-900/40'}`}>Collaboration</span>
                <h2 className={`text-xl md:text-2xl font-black tracking-tight leading-tight transition-colors duration-700 ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>Let's Work Together.</h2>
              </div>

              <div className={`grid grid-cols-2 gap-x-4 gap-y-1.5 py-1.5 md:py-5 border-y transition-all duration-700 ${theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-blue-100 bg-blue-50/30'}`}>
                <Counter value="60+" label="Projects" theme={theme} />
                <Counter value="5.0" label="Reviews" theme={theme} />
                <Counter value="12" label="Active" theme={theme} />
                <Counter value="08" label="Awards" theme={theme} />
              </div>

              <div className="flex flex-col gap-4 items-center">
                <div className="flex flex-col md:flex-row gap-3 w-full items-center justify-center">
                  <MagneticButton href="mailto:hello@ptj.com" className={`w-[50%] md:w-full px-6 py-3 rounded-xl font-black uppercase text-[0.55rem] tracking-widest hover:scale-105 hover:shadow-xl active:scale-95 transition-all text-center ${theme === 'dark' ? 'bg-white text-blue-900' : 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'}`}>
                    Email Me
                  </MagneticButton>
                  <MagneticButton href="https://wa.me/233247820556" target="_blank" rel="noopener noreferrer" className="w-[50%] md:w-full bg-green-500 text-white px-6 py-3 rounded-xl font-black uppercase text-[0.55rem] tracking-widest hover:scale-105 hover:shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2">
                    <MessageSquare size={14} /> WhatsApp
                  </MagneticButton>
                </div>
                <a href="tel:0247820556" className={`font-bold flex items-center gap-3 text-[0.65rem] transition-all active:scale-95 group/phone ${theme === 'dark' ? 'text-white/90 hover:text-white' : 'text-blue-900/90 hover:text-blue-600'}`}>
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all group-hover/phone:scale-110 ${theme === 'dark' ? 'border-white/20 bg-white/5 group-hover/phone:bg-white group-hover/phone:text-blue-900' : 'border-blue-100 bg-blue-50 group-hover/phone:bg-blue-600 group-hover/phone:text-white'}`}><Phone size={12} /></div>
                  <span>0247820556</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side Magic (PC only) */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="hidden lg:flex flex-col gap-12 w-64"
        >
          <div className="transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
              <span className={`text-[0.6rem] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>Availability</span>
            </div>
            <p className={`text-[0.6rem] leading-relaxed font-bold ${theme === 'dark' ? 'text-gray-400' : 'text-blue-900/80'}`}>Currently accepting new projects for Q3 & Q4 2026. Based in Takoradi, GH.</p>
          </div>
          <div className="relative overflow-hidden transition-all">
            <h4 className="text-[0.65rem] font-black uppercase tracking-widest text-blue-500 mb-2">Fast Turnaround</h4>
            <p className={`text-[0.6rem] leading-relaxed font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-blue-900/70'}`}>Efficient delivery without compromising on the luxury finish you deserve.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = ({ theme, onSelectMedia }: any) => {
  return (
    <footer className={`relative pt-20 md:pt-32 pb-10 px-4 md:px-6 overflow-hidden ${theme === 'dark' ? 'bg-[#0a0f1e]' : 'bg-[#f8fafc]'}`}>
      <div className="absolute inset-0 opacity-80 pointer-events-none">
        <img src="/interior.png" alt="Footer Background" className="w-full h-full object-cover" />
        <div className={`absolute inset-0 bg-gradient-to-t ${theme === 'dark' ? 'from-[#0a0f1e] via-[#0a0f1e]/40 to-[#0a0f1e]' : 'from-[#f8fafc] via-[#f8fafc]/20 to-[#f8fafc]'}`} />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12 text-center">
          <span className="text-blue-500 text-[0.6rem] md:text-[0.65rem] tracking-[0.4em] font-black mb-4 block uppercase">Visual Inspiration</span>
          <h3 className={`text-2xl md:text-4xl font-black tracking-tight mb-12 ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>Our Living Gallery</h3>
        </div>
        
        <div className="mb-20 overflow-hidden rounded-[2rem] md:rounded-[3rem]">
          <div className="flex flex-nowrap animate-infinite-scroll gap-3 md:gap-4 w-fit py-4" style={{ animation: 'infinite-scroll 15s linear infinite' }}>
            {[
              "/download.jpg", "/download (1).jpg", "/download (2).jpg", "/download (3).jpg", 
              "/download (4).jpg", "/download (5).jpg", "/download (6).jpg", "/download (7).jpg", 
              "/download (8).jpg", "/download (9).jpg", "/download.jpg", "/download (1).jpg"
            ].map((img, i) => (
              <motion.img 
                key={i} 
                whileTap={{ scale: 0.95 }}
                src={img} 
                onClick={() => onSelectMedia(img, 'image')} 
                className="h-32 md:h-48 w-48 md:w-72 object-cover rounded-2xl md:rounded-3xl transition-all cursor-pointer shadow-xl hover:shadow-blue-500/40 hover:scale-105 hover:brightness-110 z-0 hover:z-10" 
                alt="footer decor" 
              />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 text-center md:text-left">
          <div className="md:col-span-2">
            <div className={`text-2xl md:text-3xl font-black mb-6 tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-blue-600'}`}>PTJ<span className="text-blue-500">.</span></div>
            <p className={`max-w-md mx-auto md:mx-0 text-sm md:text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>Specialized in architectural ceiling design and high-end exterior aesthetics in Takoradi.</p>
          </div>
          <div>
            <h4 className="text-[0.6rem] font-black uppercase tracking-widest mb-6 text-blue-500">Quick Links</h4>
            <ul className={`flex flex-col gap-4 text-xs md:text-sm font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>
              <li><motion.a whileTap={{ scale: 0.95 }} href="#home" className="hover:text-blue-500">Home</motion.a></li>
              <li><motion.a whileTap={{ scale: 0.95 }} href="#portfolio" className="hover:text-blue-500">Portfolio</motion.a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[0.6rem] font-black uppercase tracking-widest mb-6 text-blue-500">Contact</h4>
            <div className={`text-xs md:text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>
              Takoradi, Western Region - GH<br/>hello@ptj.com
            </div>
          </div>
        </div>
        <div className="pt-10 border-t border-white/5 text-center text-[0.5rem] md:text-[0.6rem] uppercase tracking-[0.4em] text-gray-500 font-bold">
          © 2026 Patrick Tandoh Junior · All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

const Login = ({ onLogin, theme, onToggleTheme }: any) => {
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showP, setShowP] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    { title: "Precision", text: "Painting with care.", img: "/Accent Walls In Living Room_ Artistic Paint Patterns for Statement Accent Walls.jpg" },
    { title: "Luxury", text: "World-class decor.", img: "/Modern and Elegant Living Room in Neutral Tones.jpg" },
    { title: "Future", text: "200+ clients.", img: "/timeless_character.jpg" }
  ];

  const handle = () => {
    setLoading(true);
    setTimeout(() => {
      if (u === 'santiago' && p === 'munez') onLogin();
      else { setErr(true); setLoading(false); }
    }, 1000);
  };

  return (
    <div className={`min-h-screen flex flex-col lg:flex-row transition-colors duration-500 relative overflow-hidden ${theme === 'dark' ? 'bg-[#0a0f1e]' : 'bg-[#f8fafc]'}`}>
      {/* Cinematic Video Background */}
      <div className="absolute inset-0 z-0">
        <video 
          src="/WhatsApp Video 2026-05-09 at 6.30.00 PM.mp4" 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover opacity-30"
        />
        <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-[#0a0f1e]/70' : 'bg-[#f8fafc]/80'}`} />
        {/* Subtly sharpening overlay pattern */}
        <div className="absolute inset-0 opacity-[0.15] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 relative overflow-hidden order-2 lg:order-1 z-10">
        <div className="absolute top-6 right-6 z-20">
          <button onClick={onToggleTheme} className={`relative w-10 h-10 md:w-12 md:h-12 rounded-xl transition-all overflow-hidden flex items-center justify-center transform-gpu active:scale-90 ${theme === 'dark' ? 'bg-white/5 text-yellow-400' : 'bg-blue-50 text-blue-600 shadow-lg'}`}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="will-change-transform"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="w-full max-w-[340px] md:max-w-sm flex flex-col justify-center py-10"
        >
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative inline-block mb-4"
            >
              <div className={`text-4xl md:text-6xl font-black tracking-tighter relative z-10 ${theme === 'dark' ? 'text-white' : 'text-blue-600'}`}>
                PTJ<span className="text-blue-500">.</span>
              </div>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 border border-blue-500/20 rounded-full border-dashed"
              />
            </motion.div>
            <h1 className={`text-[0.6rem] md:text-[0.7rem] uppercase tracking-[0.5em] font-black mb-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
              System Architecture
            </h1>
            <p className={`text-[0.5rem] md:text-[0.55rem] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-gray-500' : 'text-blue-900/40'}`}>
              Secure Portal v2.0
            </p>
          </div>
          
          <div className={`p-6 md:p-10 rounded-[2.5rem] border backdrop-blur-3xl transition-all relative overflow-hidden ${theme === 'dark' ? 'bg-white/[0.03] border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]' : 'bg-white/70 border-blue-100 shadow-2xl shadow-blue-500/10'}`}>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
            <h2 className={`text-xl md:text-2xl font-black mb-8 tracking-tight text-center ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>Authentication</h2>
            <div className="space-y-6 mb-8">
              <div>
                <label className="text-[0.55rem] uppercase tracking-widest font-black text-gray-500 ml-4 mb-2 block">User Identifier</label>
                <input value={u} onChange={e => setU(e.target.value)} autoComplete="off" className={`w-full rounded-2xl p-4 outline-none transition-all border text-xs font-bold ${theme === 'dark' ? 'bg-black/40 border-white/5 text-white focus:border-blue-500 focus:bg-black/60' : 'bg-blue-50/50 border-blue-100 text-blue-900 focus:border-blue-500 focus:bg-white'}`} placeholder="Username" />
              </div>
              <div className="relative">
                <label className="text-[0.55rem] uppercase tracking-widest font-black text-gray-500 ml-4 mb-2 block">Access Key</label>
                <input type={showP ? "text" : "password"} value={p} onChange={e => setP(e.target.value)} autoComplete="new-password" className={`w-full rounded-2xl p-4 outline-none transition-all border text-xs font-bold ${theme === 'dark' ? 'bg-black/40 border-white/5 text-white focus:border-blue-500 focus:bg-black/60' : 'bg-blue-50/50 border-blue-100 text-blue-900 focus:border-blue-500 focus:bg-white'}`} placeholder="••••••••" />
                <motion.button 
                  whileTap={{ scale: 0.8 }}
                  onClick={() => setShowP(!showP)} 
                  className={`absolute right-3 bottom-3 w-10 h-10 rounded-xl transition-all flex items-center justify-center ${showP ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/40' : 'text-gray-500 hover:text-blue-500'}`}
                >
                    {showP ? <Unlock size={16} /> : <Lock size={16} />}
                </motion.button>
              </div>
              {err && (
                <motion.p 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  className="text-red-500 text-center text-[0.6rem] font-black uppercase tracking-widest bg-red-500/10 py-3 rounded-xl border border-red-500/20"
                >
                  Access Denied
                </motion.p>
              )}
              <button onClick={handle} disabled={loading} className="w-full bg-blue-600 text-white py-4.5 rounded-2xl font-black tracking-[0.2em] text-[0.7rem] uppercase hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group">
                {loading ? 'Decrypting...' : (
                  <>
                    Enter System
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
            
            <div className="relative pt-6 border-t border-gray-100 dark:border-white/5">
               <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-lg border border-white/10 flex-shrink-0">
                    <img src={slides[activeSlide].img} className="w-full h-full object-cover" alt="slide" />
                    <div className="absolute inset-0 bg-blue-600/20" />
                  </div>
                  <div>
                     <h4 className="text-[0.6rem] font-black uppercase text-blue-500 tracking-widest mb-1">{slides[activeSlide].title}</h4>
                     <p className="text-[0.55rem] text-gray-500 font-bold leading-tight line-clamp-1">{slides[activeSlide].text}</p>
                  </div>
               </div>
               <div className="flex gap-2 justify-center mt-6">
                 {slides.map((_, i) => (
                    <motion.button 
                      key={i} 
                      whileTap={{ scale: 0.8 }}
                      onClick={() => setActiveSlide(i)} 
                      className={`h-1 rounded-full transition-all duration-500 ${activeSlide === i ? 'bg-blue-500 w-6' : 'bg-gray-300 dark:bg-white/10 w-2'}`} 
                    />
                 ))}
               </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="w-full lg:w-1/2 min-h-[400px] lg:min-h-screen relative bg-blue-600 overflow-hidden flex items-center justify-center order-1 lg:order-2 z-10">
        <video 
          src="/WhatsApp Video 2026-05-09 at 2.49.14 PM.mp4" 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 to-indigo-900/80" />
        
        <div className="relative z-10 px-8 md:px-20 text-white text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }}>
            <div className="w-20 h-20 md:w-32 md:h-32 rounded-full border-2 border-white/20 flex items-center justify-center mx-auto mb-10 md:mb-16 backdrop-blur-xl">
               <Zap size={40} className="text-white md:hidden" />
               <Zap size={64} className="text-white hidden md:block" />
            </div>
            <div className="text-3xl md:text-6xl font-black tracking-tighter leading-[0.9] mb-10 italic opacity-90 max-w-2xl mx-auto uppercase">
              Physical <span className="text-blue-400">Logic</span> <br/> Digital <span className="text-blue-400">Aesthetics</span>
            </div>
            <div className="flex items-center justify-center gap-8">
               <div className="w-12 md:w-20 h-0.5 bg-blue-400/50" />
               <div className="text-[0.6rem] md:text-xs font-black uppercase tracking-[0.5em] text-blue-200">The Polymath Approach</div>
               <div className="w-12 md:w-20 h-0.5 bg-blue-400/50" />
            </div>
          </motion.div>
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-10 left-10 hidden xl:flex gap-8 text-white/50 font-mono text-[0.6rem]">
          <div className="flex flex-col"><span className="text-white font-black">2026</span>VERSION</div>
          <div className="flex flex-col"><span className="text-white font-black">TAKORADI</span>LOCATION</div>
          <div className="flex flex-col"><span className="text-white font-black">READY</span>SYSTEM</div>
        </div>
      </div>
    </div>
  );
};


export default App;
