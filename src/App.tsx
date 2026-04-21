import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useParams } from 'react-router-dom';
import { motion, AnimatePresence, useTransform, useScroll, useSpring, useInView, useMotionValue, animate } from 'motion/react';
import { Menu, X, Phone, Mail, MapPin, Instagram, Facebook, Twitter, Search, Filter, ArrowRight, Gauge, Fuel, Settings2, ShieldCheck, Zap, Box, Camera, Globe } from 'lucide-react';

import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Badge } from './components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './components/ui/card';
import { Separator } from './components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from './components/ui/sheet';
import { Car, cars as carData } from './data/cars';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { Language } from './locales/translations';
import BorderGlow from './components/BorderGlow/BorderGlow';
import MagicBento from './components/MagicBento/MagicBento';
import ElasticSlider from './components/ElasticSlider/ElasticSlider';
import Plasma from './components/Plasma/Plasma';

// --- Components ---

const SectionReveal = ({ children, className }: { children: React.ReactNode, className?: string, key?: React.Key }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    style={{ willChange: "transform, opacity" }}
    className={className}
  >
    {children}
  </motion.div>
);

const AnimatedCounter = ({ value, suffix = '', decimals = 0 }: { value: number, suffix?: string, decimals?: number }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [display, setDisplay] = useState(decimals === 0 ? "0" + suffix : (0).toFixed(decimals) + suffix);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 3,
        ease: [0.16, 1, 0.3, 1], // Custom cinematic ease
        onUpdate(latest) {
          const val = latest.toFixed(decimals);
          const parsed = parseFloat(val);
          if (decimals === 0) {
            setDisplay(Math.floor(parsed).toLocaleString() + suffix);
          } else {
            setDisplay(parsed.toFixed(decimals) + suffix);
          }
        }
      });
      return () => controls.stop();
    }
  }, [isInView, value, decimals, suffix]);

  return <span ref={ref} className="tabular-nums">{display}</span>;
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { t, language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.inventory'), path: '/inventory' },
    { name: t('nav.financing'), path: '/financing' },
    { name: t('nav.sell'), path: '/sell' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 h-16 sm:h-20 transition-all duration-300 px-4 sm:px-6 md:px-10 flex items-center justify-between border-white/10 shrink-0 ${isScrolled ? 'bg-charcoal/95 backdrop-blur-md shadow-lg border-b' : 'bg-transparent border-b'}`}>
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 sm:w-10 sm:h-10 crimson-bg flex items-center justify-center rounded-lg font-black italic text-white text-sm sm:text-base">AE</div>
          <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white uppercase">
            AUTO<span className="crimson-text">ELITE</span> <span className="hidden xs:inline">MOTORS</span>
          </span>
        </Link>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`hover:text-white transition-colors ${location.pathname === link.path ? 'text-white' : 'text-white/70'}`}
          >
            {link.name}
          </Link>
        ))}
        
        <div className="flex items-center gap-2 bg-white/5 p-1 rounded-sm border border-white/10">
          <button 
            onClick={() => setLanguage('en')}
            className={`px-2 py-0.5 text-[10px] font-black transition-all ${language === 'en' ? 'crimson-bg text-white' : 'text-white/40 hover:text-white'}`}
          >
            EN
          </button>
          <button 
            onClick={() => setLanguage('fr')}
            className={`px-2 py-0.5 text-[10px] font-black transition-all ${language === 'fr' ? 'crimson-bg text-white' : 'text-white/40 hover:text-white'}`}
          >
            FR
          </button>
        </div>

        <Button 
          className="px-6 py-2.5 crimson-bg text-white rounded-none font-black italic uppercase tracking-tighter hover:bg-red-700 transition-colors border-none" 
          asChild
        >
          <Link to="/#contact">{t('nav.reserve')}</Link>
        </Button>
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden flex items-center gap-4">
        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-sm border border-white/10">
          <button 
            onClick={() => setLanguage('en')}
            className={`px-2 py-0.5 text-[10px] font-black transition-all ${language === 'en' ? 'crimson-bg text-white' : 'text-white/40 hover:text-white'}`}
          >
            EN
          </button>
          <button 
            onClick={() => setLanguage('fr')}
            className={`px-2 py-0.5 text-[10px] font-black transition-all ${language === 'fr' ? 'crimson-bg text-white' : 'text-white/40 hover:text-white'}`}
          >
            FR
          </button>
        </div>
        <Sheet>
          <SheetTrigger render={<Button variant="ghost" size="icon" className="text-white" />}>
            <Menu className="w-6 h-6" />
          </SheetTrigger>
          <SheetContent side="right" className="bg-charcoal border-white/10 text-white">
            <div className="flex flex-col space-y-6 mt-12">
              {navLinks.map((link) => (
                <Link key={link.name} to={link.path} className="text-xl font-medium hover:text-crimson">
                  {link.name}
                </Link>
              ))}
              <Button 
                className="crimson-bg hover:bg-red-700 text-white rounded-none w-full font-black uppercase tracking-tighter py-6" 
                asChild
              >
                <Link to="/#contact">{t('nav.reserve').toUpperCase()}</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-charcoal border-t border-white/5 pt-32 pb-16 px-10 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-24">
          <div className="md:col-span-1 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 crimson-bg flex items-center justify-center rounded-xl font-black italic text-white shadow-lg">AE</div>
              <span className="text-2xl font-black tracking-tight text-white uppercase">AUTO<span className="crimson-text">ELITE</span></span>
            </div>
            <p className="text-white/40 leading-relaxed font-medium">The world's most distinguished collection of certified pre-owned luxury and performance assets.</p>
            <div className="flex gap-5">
              {['Instagram', 'X', 'LinkedIn'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:crimson-bg hover:scale-110 transition-all duration-300">
                  <span className="sr-only">{social}</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[.4em] mb-10">{t('nav.inventory')}</h4>
            <ul className="space-y-6">
              <li><Link to="/inventory" className="text-white/60 hover:text-crimson font-bold uppercase text-xs tracking-widest transition-colors">{t('nav.inventory')}</Link></li>
              <li><Link to="/sell" className="text-white/60 hover:text-crimson font-bold uppercase text-xs tracking-widest transition-colors">{t('contact.form.options.sell')}</Link></li>
              <li><Link to="/financing" className="text-white/60 hover:text-crimson font-bold uppercase text-xs tracking-widest transition-colors">Elite Financing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[.4em] mb-10">Assistance</h4>
            <ul className="space-y-6">
              <li><Link to="/#contact" className="text-white/60 hover:text-crimson font-bold uppercase text-xs tracking-widest transition-colors">{t('nav.contact')}</Link></li>
              <li><Link to="/#contact" className="text-white/60 hover:text-crimson font-bold uppercase text-xs tracking-widest transition-colors">Schedule Viewing</Link></li>
              <li><a href="#" className="text-white/60 hover:text-crimson font-bold uppercase text-xs tracking-widest transition-colors">{t('contact.info.location')}</a></li>
              <li><Link to="/#contact" className="text-white/60 hover:text-crimson font-bold uppercase text-xs tracking-widest transition-colors">Our Process</Link></li>
            </ul>
          </div>

          <div className="space-y-10">
            <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[.4em] mb-10">Concierge</h4>
            <div className="space-y-6">
              <p className="text-xs font-bold text-white uppercase tracking-widest">Global Support: <span className="crimson-text block mt-2 text-base">+1 (800) AUTO-ELITE</span></p>
              <p className="text-xs font-black text-white uppercase tracking-widest">Flagship: <span className="text-white/40 block mt-2">101 Rue de la Montagne, Montreal, QC</span></p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-16 border-t border-white/5 gap-10 text-[10px] font-black uppercase tracking-[.5em] text-white/20">
          <div>{t('footer.legal')} {t('footer.privacy')} & {t('footer.terms')}.</div>
          <div className="flex flex-wrap justify-center gap-10">
            <span className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full crimson-bg"></div> 160-POINT INSPECTION
            </span>
            <span className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full crimson-bg"></div> 24-MONTH WARRANTY
            </span>
            <span className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full crimson-bg"></div> NATIONWIDE DELIVERY
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const ContactSection = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Webhook for the Home Page Contact Form
    const WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/o7aUwpKbtkP4AOP0pEjC/webhook-trigger/4cd9dfc1-6a74-40d6-8850-387928a38860";
    
    const formData = new FormData(e.target as HTMLFormElement);
    const payload = Object.fromEntries(formData.entries());

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      setStatus('success');
    } catch (error) {
      console.error("Webhook submission failed:", error);
      setStatus('success'); // Still show success to user typically for lead captures
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-24">
          <SectionReveal className="space-y-8 sm:space-y-12">
            <div>
              <h2 className="text-[10px] sm:text-xs font-black text-crimson uppercase tracking-[0.5em] mb-4">{t('contact.tag')}</h2>
              <h3 className="text-4xl sm:text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.95] uppercase italic">{t('contact.title')} <br/><span className="crimson-text">{t('contact.title_next')}</span></h3>
            </div>
            
            <div className="space-y-6 sm:space-y-10">
              <p className="text-lg sm:text-xl text-white/50 leading-relaxed font-medium">{t('contact.description')}</p>
              
              <div className="grid gap-6 sm:gap-8">
                {[
                  { icon: <Phone className="w-5 h-5 sm:w-6 sm:h-6" />, label: "Direct Line", val: "+1 (800) AUTO-ELITE" },
                  { icon: <Mail className="w-5 h-5 sm:w-6 sm:h-6" />, label: "Inquiries", val: "private@autoelite.com" },
                  { icon: <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />, label: t('contact.info.location'), val: "Montreal, Quebec" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 sm:gap-6 group">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 glass rounded-2xl flex items-center justify-center text-crimson group-hover:crimson-bg group-hover:text-white transition-all duration-500">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[9px] sm:text-[10px] font-black text-white/30 uppercase tracking-widest">{item.label}</p>
                      <p className="text-lg sm:text-xl font-bold text-white uppercase italic">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>

          <SectionReveal className="relative group">
            <BorderGlow
              edgeSensitivity={20}
              glowColor="0 91% 50%"
              backgroundColor="rgba(20, 20, 20, 0.4)"
              borderRadius={48}
              glowRadius={50}
              glowIntensity={1.2}
              coneSpread={25}
              animated={true}
              colors={['#DC2626', '#991B1B', '#450A0A']}
              fillOpacity={0}
              className="backdrop-blur-3xl border-white/5 shadow-[0_50px_100px_rgba(0,0,0,0.5)]"
            >
              <div className="p-12 lg:p-20">
                {status === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-8"
                  >
                    <div className="w-24 h-24 crimson-bg rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(220,38,38,0.4)]">
                       <ShieldCheck className="w-12 h-12 text-white" />
                    </div>
                    <h4 className="text-4xl font-black text-white uppercase tracking-tighter">{t('contact.form.success_title')}</h4>
                    <p className="text-white/50 text-lg">{t('contact.form.success_desc')}</p>
                    <Button onClick={() => setStatus('idle')} variant="outline" className="border-white/10 text-white rounded-none uppercase font-black tracking-widest h-14 px-10">{t('contact.form.new_inquiry')}</Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                      <div className="space-y-4">
                        <label className="text-[12px] font-black text-white/30 uppercase tracking-[.4em]">{t('contact.form.name')}</label>
                        <Input name="fullName" className="bg-transparent border-0 border-b border-white/10 rounded-none h-14 px-0 focus:border-crimson transition-all text-xl font-bold text-white placeholder:text-white/10" required />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[12px] font-black text-white/30 uppercase tracking-[.4em]">{t('contact.form.email')}</label>
                        <Input name="emailProfile" type="email" className="bg-transparent border-0 border-b border-white/10 rounded-none h-14 px-0 focus:border-crimson transition-all text-xl font-bold text-white" required />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[12px] font-black text-white/30 uppercase tracking-[.4em]">{t('contact.form.phone')}</label>
                        <Input name="phoneNumber" className="bg-transparent border-0 border-b border-white/10 rounded-none h-14 px-0 focus:border-crimson transition-all text-xl font-bold text-white" />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[12px] font-black text-white/30 uppercase tracking-[.4em]">{t('contact.form.interests')}</label>
                        <div className="relative">
                          <select name="interests" className="w-full bg-transparent border-0 border-b border-white/10 rounded-none h-14 px-0 focus:border-crimson transition-all text-xl font-black outline-none text-white appearance-none cursor-pointer">
                            <option className="bg-charcoal text-base font-sans" value="Acquisition Inquiry">{t('contact.form.options.acquisition')}</option>
                            <option className="bg-charcoal text-base font-sans" value="Sell Vehicle">{t('contact.form.options.sell')}</option>
                            <option className="bg-charcoal text-base font-sans" value="Capital / Financing">{t('contact.form.options.financing')}</option>
                            <option className="bg-charcoal text-base font-sans" value="Consignment">{t('contact.form.options.consignment')}</option>
                            <option className="bg-charcoal text-base font-sans" value="Service">Service</option>
                          </select>
                          <div className="absolute right-0 bottom-4 pointer-events-none text-white/20">
                             <Search className="w-5 h-5 rotate-90" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4 pt-4 md:col-span-2">
                        <label className="text-[12px] font-black text-white/30 uppercase tracking-[.4em]">Vehicle (Optional)</label>
                        <div className="relative">
                          <select name="vehicle" className="w-full bg-transparent border-0 border-b border-white/10 rounded-none h-14 px-0 focus:border-crimson transition-all text-xl font-black outline-none text-white appearance-none cursor-pointer">
                            <option className="bg-charcoal text-base font-sans" value="">-- None --</option>
                            {carData.map(car => (
                              <option key={car.id} className="bg-charcoal text-base font-sans" value={`${car.make} ${car.model}`}>{car.make} {car.model}</option>
                            ))}
                          </select>
                          <div className="absolute right-0 bottom-4 pointer-events-none text-white/20">
                             <Search className="w-5 h-5 rotate-90" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6 pt-6">
                      <label className="text-[12px] font-black text-white/30 uppercase tracking-[.4em]">{t('contact.form.message')} (OPTIONAL)</label>
                      <textarea name="initialMessage" placeholder={t('contact.form.message')} className="w-full bg-transparent border-0 border-b border-white/10 rounded-none min-h-[140px] focus:border-crimson transition-all text-xl font-bold outline-none text-white p-0 resize-none" />
                    </div>
                    <Button type="submit" disabled={status === 'loading'} className="w-full crimson-bg py-10 rounded-none font-black text-2xl uppercase tracking-tighter hover:bg-red-700 transition-all hover:scale-[1.02] shadow-[0_20px_50px_rgba(220,38,38,0.3)] border-none">
                      {status === 'loading' ? t('contact.form.submit').replace('RESERVE NOW', '...') : t('contact.form.submit')}
                    </Button>
                  </form>
                )}
              </div>
            </BorderGlow>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
};

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const { t, language } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <Link to={`/cars/${car.id}`} className="block h-full cursor-pointer">
        <BorderGlow
          edgeSensitivity={20}
          glowColor="0 91% 50%"
          backgroundColor="rgba(20, 20, 20, 0.4)"
          borderRadius={12}
          glowRadius={30}
          glowIntensity={1}
          coneSpread={25}
          animated={false}
          colors={['#DC2626', '#991B1B', '#450A0A']}
          fillOpacity={0}
          className="h-full group"
        >
          <div className="glass rounded-xl overflow-hidden transition-all h-full flex flex-col border-none bg-black/40">
            <div className="h-48 overflow-hidden bg-white/5 relative">
              <img 
                src={car.image} 
                alt={`${car.make} ${car.model}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 z-10">
                <Badge className="crimson-bg text-white rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest border-none pointer-events-none">
                  {car.year}
                </Badge>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-[10px] crimson-text font-bold uppercase tracking-widest mb-1">{car.make}</p>
                  <h3 className="text-lg font-bold text-white group-hover:text-crimson transition-colors">{car.model}</h3>
                </div>
              </div>
              
              <div className="flex gap-4 text-[11px] text-white/40 font-medium mb-6">
                <span>{car.year}</span>
                <span>•</span>
                <span>{car.mileage.toLocaleString()} {language === 'fr' ? 'km' : 'mi'}</span>
                <span>•</span>
                <span>{car.transmission}</span>
              </div>
  
              <div className="flex justify-between items-center pt-4 border-t border-white/5 mt-auto">
                <p className="text-xl font-bold crimson-text">${car.price.toLocaleString()}</p>
                <div className="text-[10px] uppercase font-extrabold text-white/20 tracking-tighter">{language === 'fr' ? 'Certifié' : 'Certified'}</div>
              </div>
            </div>
          </div>
        </BorderGlow>
      </Link>
    </motion.div>
  );
};

const SellYourCar = () => {
  const { language } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const content = {
    en: {
      title: "SELL YOUR",
      highlight: "MASTERPIECE",
      desc: "We offer the most competitive market valuations and a seamless acquisition process for premium luxury and performance vehicles.",
      steps: [
        { title: "EXPERT APPRAISAL", desc: "Our specialists provide valuations based on real-time global auction data and condition excellence." },
        { title: "INSTANT SETTLEMENT", desc: "Once inspected, we offer immediate wire transfers upon documentation completion." },
        { title: "WHITE-GLOVE PICKUP", desc: "Nationwide enclosed transport services for all accepted vehicle acquisitions." }
      ],
      form_title: "TELL US ABOUT YOUR VEHICLE",
      placeholders: {
        make: "Vehicle Make",
        model: "Vehicle Model",
        year: "Year",
        mileage: "Mileage",
        price: "Expected Price",
        more: "Tell us more about the condition, modifications, and service history..."
      },
      btn: "SUBMIT APPRAISAL REQUEST"
    },
    fr: {
      title: "VENDEZ VOTRE",
      highlight: "CHEF-D'ŒUVRE",
      desc: "Nous offrons les évaluations de marché les plus compétitives et un processus d'acquisition fluide pour les véhicules de luxe et de performance.",
      steps: [
        { title: "EXPERTISE", desc: "Nos spécialistes fournissent des évaluations basées sur les données d'enchères mondiales en temps réel." },
        { title: "RÈGLEMENT INSTANTANÉ", desc: "Une fois inspectés, nous offrons des virements immédiats dès la finalisation de la documentation." },
        { title: "RAMASSAGE VIP", desc: "Services de transport fermé à l'échelle nationale pour toutes les acquisitions de véhicules acceptées." }
      ],
      form_title: "PARLEZ-NOUS DE VOTRE VÉHICULE",
      placeholders: {
        make: "Marque du véhicule",
        model: "Modèle du véhicule",
        year: "Année",
        mileage: "Kilométrage",
        price: "Prix attendu",
        more: "Dites-nous en plus sur l'état, les modifications et l'historique d'entretien..."
      },
      btn: "SOUMETTRE LA DEMANDE D'ÉVALUATION"
    }
  };

  const t_page = content[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Specific Webhook for the Sell Your Car Form
    const SELL_WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/o7aUwpKbtkP4AOP0pEjC/webhook-trigger/893587ef-b72d-4b3b-8bb7-56f544687c14";
    
    const formData = new FormData(e.target as HTMLFormElement);
    const payload: Record<string, any> = Object.fromEntries(formData.entries());

    if (payload.vehicleMake && payload.vehicleModel) {
      payload.vehicle = `${payload.vehicleMake} ${payload.vehicleModel}`;
    }

    try {
      await fetch(SELL_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      setStatus('success');
    } catch (error) {
      console.error("Webhook submission failed:", error);
      setStatus('success');
    }
  };

  return (
    <div className="pt-24 sm:pt-40 pb-20 container mx-auto px-4 sm:px-10">
      <SectionReveal className="text-center空间-y-4 sm:space-y-6 mb-12 sm:mb-20">
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-white tracking-tight uppercase leading-tight">{t_page.title} <span className="crimson-text">{t_page.highlight}</span></h1>
        <p className="text-white/50 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed font-medium">{t_page.desc}</p>
      </SectionReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
        {[Zap, ShieldCheck, Phone].map((Icon, i) => (
          <SectionReveal key={i} className="glass p-8 sm:p-10 rounded-2xl space-y-4 sm:space-y-6 hover:border-crimson transition-all group">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/5 rounded-full flex items-center justify-center text-crimson group-hover:crimson-bg group-hover:text-white transition-all">
              <Icon className="w-6 h-6 sm:w-8 sm:h-8"/>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white uppercase tracking-tight">{t_page.steps[i].title}</h3>
            <p className="text-white/40 leading-relaxed text-sm sm:text-base font-medium">{t_page.steps[i].desc}</p>
          </SectionReveal>
        ))}
      </div>

      <SectionReveal className="glass p-6 sm:p-12 rounded-[1.5rem] sm:rounded-[2rem] max-w-4xl mx-auto border-white/5 shadow-2xl">
        {status === 'success' ? (
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }} 
             animate={{ opacity: 1, scale: 1 }}
             className="text-center space-y-8 py-6 sm:py-10"
           >
             <div className="w-16 h-16 sm:w-20 sm:h-20 crimson-bg rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(220,38,38,0.4)]">
                <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
             </div>
             <h4 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tighter">Appraisal Received</h4>
             <p className="text-white/50 text-base sm:text-lg">Our acquisitions desk will contact you within 24 hours.</p>
             <Button onClick={() => setStatus('idle')} variant="outline" className="border-white/10 text-white rounded-none uppercase font-black tracking-widest h-12 sm:h-14 px-8 sm:px-10">Submit Another</Button>
           </motion.div>
        ) : (
          <>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-8 text-center uppercase tracking-tight">{t_page.form_title}</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
              <div className="md:col-span-1 grid grid-cols-1 xs:grid-cols-2 gap-4">
                <Input name="vehicleMake" placeholder={t_page.placeholders.make} required className="bg-white/5 border-white/10 py-5 sm:py-7 rounded-none font-bold text-white focus:border-crimson" />
                <Input name="vehicleModel" placeholder={t_page.placeholders.model} required className="bg-white/5 border-white/10 py-5 sm:py-7 rounded-none font-bold text-white focus:border-crimson" />
              </div>
              <Input name="vehicleYear" placeholder={t_page.placeholders.year} required className="bg-white/5 border-white/10 py-5 sm:py-7 rounded-none font-bold text-white focus:border-crimson" />
              <Input name="vehicleMileage" placeholder={t_page.placeholders.mileage} required className="bg-white/5 border-white/10 py-5 sm:py-7 rounded-none font-bold text-white focus:border-crimson" />
              <Input name="vehiclePrice" placeholder={t_page.placeholders.price} required className="bg-white/5 border-white/10 py-5 sm:py-7 rounded-none font-bold text-white focus:border-crimson" />
              
              <div className="md:col-span-2 space-y-6 sm:space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                  <Input name="fullName" placeholder="Your Full Name" required className="bg-white/5 border-white/10 py-5 sm:py-7 rounded-none font-bold text-white focus:border-crimson" />
                  <Input name="emailProfile" type="email" placeholder="Your Email Address" required className="bg-white/5 border-white/10 py-5 sm:py-7 rounded-none font-bold text-white focus:border-crimson" />
                </div>
                <Input name="phoneNumber" placeholder="Phone Number" className="bg-white/5 border-white/10 py-5 sm:py-7 rounded-none font-bold text-white focus:border-crimson" />
                <input type="hidden" name="interests" value="Sell Vehicle" />
                <textarea name="initialMessage" placeholder={t_page.placeholders.more} className="w-full bg-white/5 border border-white/10 p-4 sm:p-6 min-h-[120px] sm:min-h-[150px] outline-none text-white font-bold focus:border-crimson transition-all" />
              </div>

              <Button type="submit" disabled={status === 'loading'} className="md:col-span-2 py-6 sm:py-8 crimson-bg text-white font-black text-base sm:text-lg uppercase tracking-tight rounded-none hover:bg-red-700 transition-all shadow-xl border-none">
                 {status === 'loading' ? 'SUBMITTING...' : t_page.btn}
              </Button>
            </form>
          </>
        )}
      </SectionReveal>
    </div>
  );
};

const Financing = () => {
  const { language } = useLanguage();
  return (
    <div className="pt-24 sm:pt-40 pb-0 overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-10">
        <SectionReveal className="text-center space-y-6 sm:space-y-8 mb-16 sm:mb-32 max-w-4xl mx-auto">
          <div className="inline-block px-4 py-2 glass rounded-none text-[10px] sm:text-xs font-black uppercase tracking-[0.5em] crimson-text">{language === 'fr' ? 'Solutions de Capital' : 'Capital Solutions'}</div>
          <h1 className="text-4xl sm:text-6xl md:text-9xl font-black text-white tracking-tighter uppercase leading-[0.95]">{language === 'fr' ? 'FINANCEMENT' : 'ASSET'} <br/><span className="crimson-text italic">{language === 'fr' ? "D'ACTIFS" : 'FINANCING'}</span></h1>
          <p className="text-white/50 text-lg sm:text-2xl max-w-2xl mx-auto font-medium leading-relaxed">{language === 'fr' ? 'Solutions de liquidité sophistiquées adaptées à l’acquisition de chefs-d’œuvre automobiles.' : 'Sophisticated liquidity solutions tailored for the acquisition of high-value automotive masterpieces.'}</p>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center mb-24 sm:mb-40">
          <SectionReveal className="space-y-10 lg:space-y-12">
            <h2 className="text-3xl sm:text-4xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9] italic">{language === 'fr' ? 'LIQUIDITÉ' : 'BESPOKE'} <br/><span className="crimson-text">{language === 'fr' ? 'SUR MESURE' : 'LIQUIDITY'}</span></h2>
            <p className="text-white/50 leading-relaxed text-lg lg:text-xl font-medium">{language === 'fr' ? "Qu'il s'agisse d'acquérir un seul actif de qualité concours ou de diversifier une collection complète, nos partenaires financiers offrent la stabilité et la confidentialité requises." : "Whether acquiring a single concours-grade asset or diversifying a full collection, our financial partners provide the stability and confidentiality required for luxury acquisitions."}</p>
            <div className="grid gap-8 lg:gap-12">
               {[
                 { title: language === 'fr' ? "LIENS BANCAIRES PRIVÉS" : "PRIVATE BANKING TIES", desc: language === 'fr' ? "Accès à des lignes de crédit exclusives avec des institutions bancaires privées mondiales." : "Access to exclusive lines of credit with global private banking institutions." },
                 { title: language === 'fr' ? "HORIZONS ÉTENDUS" : "EXTENDED HORIZONS", desc: language === 'fr' ? "Conditions allant jusqu'à 144 mois pour les actifs patrimoniaux qualifiés." : "Terms reaching up to 144 months for qualified heritage assets." },
                 { title: language === 'fr' ? "LEASING DE PORTEFEUILLE" : "PORTFOLIO LEASING", desc: language === 'fr' ? "Structures de leasing à haute valeur résiduelle conçues pour une propriété fiscalement avantageuse." : "High-residual leasing structures designed for tax-efficient ownership." }
               ].map((item, i) => (
                 <div key={i} className="flex gap-6 sm:gap-8 group">
                   <div className="w-10 h-10 sm:w-12 sm:h-12 glass flex items-center justify-center shrink-0 border border-white/10 group-hover:crimson-bg transition-all rounded-xl">
                     <div className="w-1.5 h-1.5 rounded-full bg-white" />
                   </div>
                   <div className="space-y-1 sm:space-y-2">
                     <h4 className="font-black text-white text-lg sm:text-xl tracking-tight uppercase group-hover:crimson-text transition-colors">{item.title}</h4>
                     <p className="text-white/40 font-medium leading-relaxed text-sm sm:text-base">{item.desc}</p>
                   </div>
                 </div>
               ))}
            </div>
          </SectionReveal>

          <SectionReveal className="relative group p-0 sm:p-4">
             <div className="absolute -inset-10 bg-crimson/5 blur-[100px] rounded-full hidden sm:block" />
             <div className="relative glass p-8 sm:p-16 rounded-[2rem] sm:rounded-[4rem] border-white/5 space-y-8 sm:space-y-12">
                <h3 className="text-2xl sm:text-3xl font-black text-white uppercase italic tracking-tighter">THE ADVANTAGE</h3>
                <p className="text-white/50 text-base sm:text-lg leading-relaxed font-medium">Our acquisition desk works directly with our financial underwriters to provide a seamless application-to-approval-to-delivery pipeline.</p>
                <div className="space-y-6 sm:space-y-8">
                  <div className="p-6 sm:p-8 bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl">
                     <p className="text-4xl sm:text-5xl font-black text-white mb-2 tracking-tighter italic">98%</p>
                     <p className="text-[10px] font-black text-white/30 uppercase tracking-[.4em]">APPROVAL RATE FOR ELITE PROFILES</p>
                  </div>
                  <div className="p-6 sm:p-8 bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl">
                     <p className="text-4xl sm:text-5xl font-black text-white mb-2 tracking-tighter italic">&lt;4H</p>
                     <p className="text-[10px] font-black text-white/30 uppercase tracking-[.4em]">AVG. UNDERWRITING DECISION TIME</p>
                  </div>
                </div>
                <Button 
                  className="w-full py-8 sm:py-10 crimson-bg text-white font-black text-xl sm:text-2xl uppercase tracking-tighter rounded-none shadow-[0_20px_50px_rgba(220,38,38,0.3)] hover:scale-[1.05] transition-all border-none" 
                  asChild
                >
                   <Link to="/#contact">START APPLICATION</Link>
                </Button>
             </div>
          </SectionReveal>
        </div>
      </div>
    </div>
  );
};
  const Home = () => {
  const featuredCars = carData.slice(0, 6);
  const { t, language } = useLanguage();

  return (
    <div className="space-y-0 pt-16 sm:pt-20 overflow-x-hidden relative">
      {/* Hero */}
      <section className="h-[calc(100vh-64px)] sm:h-[calc(100vh-80px)] min-h-[500px] sm:min-h-[700px] flex items-center px-4 sm:px-10 gap-12 relative w-full z-10 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
           <div className="absolute inset-0 opacity-30">
              <Plasma color="#DC2626" speed={0.6} scale={1.2} opacity={1} mouseInteractive={true} />
           </div>
           {/* Dark Gradient Overlay replacing maskImage to smoothly fade edges to charcoal background without browser rendering bugs */}
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#1a1a1a_90%)]" />
        </div>
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12 w-full h-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full lg:w-1/2 space-y-6 sm:space-y-10 text-center lg:text-left pt-12 lg:pt-0"
          >
          <div className="inline-block px-3 py-1 glass rounded text-[10px] sm:text-xs font-bold uppercase tracking-widest crimson-text shadow-[0_0_20px_rgba(220,38,38,0.2)]">
            {t('hero.tag')}
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-9xl font-black leading-[0.95] tracking-tighter text-white uppercase">
            {t('hero.title_part1')}<br/><span className="crimson-text text-glow italic">{t('hero.title_extraordinary')}</span>
          </h1>
          <p className="text-white/60 text-base sm:text-xl max-w-md mx-auto lg:mx-0 leading-relaxed font-medium">
            {t('hero.description')}
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 pt-4">
            <Button 
              size="lg" 
              className="px-8 sm:px-10 py-6 sm:py-9 crimson-bg rounded-none font-black text-lg sm:text-xl hover:bg-red-700 transition-all hover:scale-105 border-none shadow-[0_20px_50px_rgba(220,38,38,0.3)]" 
              asChild
            >
              <Link to="/inventory">{t('hero.cta_showroom')}</Link>
            </Button>
            <Button 
              size="lg" 
              className="px-8 sm:px-10 py-6 sm:py-9 glass rounded-none font-black text-lg sm:text-xl hover:bg-white/10 border-white/20 bg-transparent text-white transition-all"
              asChild
            >
              <Link to="/#process">{t('hero.cta_learn')}</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className="hidden lg:flex flex-1 h-[600px] rounded-[3rem] overflow-hidden relative border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.8)] group"
        >
          <img 
            src="https://images.unsplash.com/photo-1621932953986-15fcfec8327c?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
            alt="Porsche 911"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-16 left-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 1 }}
            >
              <p className="text-sm crimson-text font-black uppercase tracking-[.4em] mb-2">Editor's Choice</p>
              <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter">2022 PORSCHE 911 <br/> Carrera GTS</h3>
            </motion.div>
          </div>
          <div className="absolute top-10 right-10 w-20 h-20 glass rounded-full flex items-center justify-center animate-pulse border border-white/20">
             <ArrowRight className="w-8 h-8 text-white -rotate-45" />
          </div>
        </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <SectionReveal>
        <section className="bg-black/60 backdrop-blur-xl py-12 sm:py-20 border-y border-white/10">
          <div className="container mx-auto px-4 sm:px-6 flex flex-wrap justify-center lg:justify-between items-center gap-8 sm:gap-12 lg:gap-0">
            {[
              { label: 'Vehicles Sold', value: 4500, suffix: '+' },
              { label: 'Certified Assets', value: 250, suffix: '+' },
              { label: 'Rating', value: 4.9, suffix: '/5', decimals: 1 },
              { label: 'Market Presence', value: 25, suffix: 'y' },
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center px-4 sm:px-10 border-x first:border-l-0 last:border-r-0 border-white/5"
              >
                <p className="text-3xl sm:text-5xl font-black text-white mb-2 italic tabular-nums">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} decimals={stat.decimals || 0} />
                </p>
                <p className="text-[8px] sm:text-[10px] text-white/30 uppercase tracking-[.5em] font-black">
                  {language === 'fr' ? (
                    stat.label === 'Vehicles Sold' ? 'Véhicules Vendus' :
                    stat.label === 'Certified Assets' ? 'Atouts Certifiés' :
                    stat.label === 'Rating' ? 'Évaluation' :
                    'Présence sur le Marché'
                  ) : stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </SectionReveal>

      {/* Featured Cars */}
      <section className="py-24 sm:py-40 container mx-auto px-4 sm:px-6">
        <SectionReveal className="flex flex-col md:flex-row justify-between items-end mb-12 sm:mb-20 gap-8">
          <div className="space-y-4">
            <h2 className="text-[10px] sm:text-xs font-black text-crimson uppercase tracking-[0.5em]">{t('filters.highlights')}</h2>
            <h3 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter uppercase">Showroom <span className="crimson-text italic">Elite</span></h3>
          </div>
          <Link to="/inventory" className="text-white hover:text-crimson font-black text-[10px] sm:text-sm uppercase tracking-widest flex items-center transition-all group px-4 py-2 glass border-none mb-4 sm:mb-0">
            {t('car_card.full_collection')} <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-3" />
          </Link>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
          {featuredCars.map((car, i) => (
            <SectionReveal key={car.id}>
              <CarCard car={car} />
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* Heritage & Elite Process Restoration */}
      <section id="process" className="py-32 sm:py-60 relative px-4 sm:px-6 overflow-hidden border-t border-white/5">
        <div className="container mx-auto">
          {/* History */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center mb-32 sm:mb-60">
            <SectionReveal className="space-y-12 sm:space-y-16">
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-[10px] sm:text-xs font-black text-crimson uppercase tracking-[0.5em]">{t('heritage.tag')}</h2>
                <h3 className="text-5xl sm:text-6xl md:text-9xl font-black text-white tracking-tighter leading-[0.9] uppercase italic">{t('heritage.est')} <br/><span className="crimson-text">1999</span></h3>
              </div>
              <div className="space-y-6 sm:space-y-10">
                <p className="text-lg sm:text-2xl text-white/50 leading-relaxed font-medium italic">
                  "{t('heritage.quote')}"
                </p>
                <div className="h-px w-full bg-gradient-to-r from-crimson to-transparent" />
                <p className="text-white/40 text-base sm:text-xl leading-relaxed font-medium">
                  {t('heritage.description')}
                </p>
              </div>
            </SectionReveal>

            <SectionReveal className="relative">
              <motion.div 
                className="relative z-10 aspect-[4/5] sm:aspect-square glass rounded-[2rem] sm:rounded-[4rem] overflow-hidden border border-white/10 shadow-[0_100px_150px_rgba(0,0,0,0.8)]"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.8 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=2000" 
                  alt="Heritage Asset"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute top-6 sm:top-10 left-6 sm:left-10 space-y-2 pointer-events-none z-10">
                  <p className="text-[9px] sm:text-[10px] font-black crimson-text uppercase tracking-[.4em]">{t('heritage.interactive_tag').replace('INTERACTIVE', 'CLASSIC')}</p>
                  <h4 className="text-xl sm:text-2xl font-black text-white italic tracking-tighter uppercase">{t('heritage.virtual_asset').split(' ')[0]}<br/>{t('heritage.virtual_asset').split(' ')[1]}</h4>
                </div>
              </motion.div>
              <div className="absolute -top-16 -right-16 w-48 sm:w-64 h-48 sm:h-64 border-2 border-crimson/20 rounded-full animate-spin-slow pointer-events-none hidden sm:block" />
            </SectionReveal>
          </div>

          {/* Steps & Difference */}
          <div className="space-y-20 sm:space-y-32">
            <SectionReveal className="text-center max-w-4xl mx-auto space-y-4 sm:space-y-6">
              <h2 className="text-[10px] sm:text-xs font-black text-crimson uppercase tracking-[0.5em]">The Elite Protocol</h2>
              <h3 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-tight">WHAT WE DO <br/><span className="crimson-text italic">DIFFERENTLY</span></h3>
              <p className="text-base sm:text-xl text-white/40 font-medium leading-relaxed">Unlike traditional dealerships, our process follows a rigorous curation protocol designed for the global collector.</p>
            </SectionReveal>

            <div className="mt-12">
              <SectionReveal>
                <MagicBento 
                  items={[
                    { label: "PROTOCOL", title: "CURATION", description: "We only acquire the top 1% of the market. Our inventory is vetted for mechanical integrity, historical relevance, and investment potential." },
                    { label: "PROTOCOL", title: "VERIFICATION", description: "Our 160-point elite certification exceeds factory CPO requirements. Every detail is restored to preserve absolute aesthetic purity." },
                    { label: "PROTOCOL", title: "ACQUISITION", description: "Custom liquidity solutions and private banking ties allow for seamless asset movement with minimal capital fatigue." },
                    { label: "PROTOCOL", title: "HANDOVER", description: "Global white-glove delivery via enclosed high-security logistics. We handle all cross-border documentation and certifications." }
                  ]}
                  textAutoHide={false}
                  enableStars={true}
                  enableSpotlight={true}
                  enableBorderGlow={true}
                  enableTilt={true}
                  enableMagnetism={true}
                  clickEffect={true}
                  spotlightRadius={300}
                  particleCount={12}
                  glowColor="220, 38, 38"
                />
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-60 relative overflow-hidden bg-black flex items-center justify-center text-center">
        <div className="absolute inset-0 opacity-20">
           <img src="https://images.unsplash.com/photo-1542362567-b058c02b9ac1?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-black to-charcoal" />
        
        <SectionReveal className="relative z-10 max-w-5xl px-6 space-y-12">
          <h2 className="text-6xl md:text-9xl font-black text-white tracking-tighter uppercase leading-[0.9]">DOMINATE THE <br/><span className="crimson-text text-glow italic">ASPHALT</span></h2>
          <p className="text-2xl text-white/40 max-w-3xl mx-auto font-medium">
            Join the exclusive circle of AutoElite enthusiasts. Your next masterpiece awaits.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-8">
             <Button 
               size="lg" 
               className="px-16 py-10 crimson-bg text-white font-black text-2xl rounded-none shadow-[0_20px_60px_rgba(220,38,38,0.4)] hover:scale-110 transition-all border-none" 
               asChild
             >
                <Link to="/#contact">CONTACT EXPERT</Link>
             </Button>
             <Button 
               size="lg" 
               variant="outline" 
               className="px-16 py-10 border-white/20 text-white hover:bg-white hover:text-black font-black text-2xl rounded-none transition-all" 
               asChild
             >
                <Link to="/inventory">VISIT SHOWROOM</Link>
             </Button>
          </div>
        </SectionReveal>
      </section>

      <ContactSection />
    </div>
  );
};

const Inventory = () => {
  const { t, language } = useLanguage();
  const [filteredCars, setFilteredCars] = useState(carData);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [selectedType, setSelectedType] = useState<string>('All');

  useEffect(() => {
    let result = carData;
    if (searchTerm) {
      result = result.filter(car => 
        car.make.toLowerCase().includes(searchTerm.toLowerCase()) || 
        car.model.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedType !== 'All') {
      result = result.filter(car => car.type === selectedType);
    }
    result = result.filter(car => car.price <= priceRange[1]);
    setFilteredCars(result);
  }, [searchTerm, selectedType, priceRange]);

  const carTypes = ['All', 'SUV', 'Sedan', 'Coupe', 'Convertible'];

  return (
    <div className="pt-24 sm:pt-40 pb-20 container mx-auto px-4 sm:px-10">
      <SectionReveal className="mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-2 sm:mb-4 uppercase">{language === 'fr' ? 'NOTRE' : 'OUR'} <span className="crimson-text uppercase">{language === 'fr' ? 'COLLECTION' : 'COLLECTION'}</span></h1>
        <p className="text-white/50 text-base sm:text-lg font-medium">{language === 'fr' ? `Parcourez notre inventaire exclusif de ${carData.length} véhicules.` : `Browse our exclusive inventory of ${carData.length} premium vehicles.`}</p>
      </SectionReveal>

      <SectionReveal className="glass p-6 sm:p-10 rounded-2xl flex flex-col lg:flex-row items-stretch lg:items-end justify-between gap-6 sm:gap-10 mb-12 sm:mb-16 shadow-2xl relative overflow-hidden group border-white/5">
        <div className="absolute top-0 right-0 w-32 h-32 bg-crimson/10 blur-3xl -z-10 group-hover:bg-crimson/20 transition-all" />
        
        <div className="flex-1 w-full space-y-2 sm:space-y-4">
          <label className="text-[10px] uppercase font-black text-white opacity-40 tracking-[.2em]">{language === 'fr' ? 'Rechercher Marque & Modèle' : 'Search Make & Model'}</label>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-white/30 group-focus-within:text-crimson transition-colors" />
            <Input 
              placeholder={t('filters.search_placeholder')} 
              className="pl-10 sm:pl-12 bg-white/5 border-white/10 rounded-none h-12 sm:h-14 text-base sm:text-lg focus:border-crimson transition-all font-bold"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 w-full space-y-2 sm:space-y-4">
          <label className="text-[10px] uppercase font-black text-white opacity-40 tracking-[.2em]">{language === 'fr' ? 'Type de Véhicule' : 'Vehicle Type'}</label>
          <select 
            className="w-full bg-white/5 border border-white/10 rounded-none h-12 sm:h-14 px-4 text-white focus:outline-none focus:border-crimson appearance-none cursor-pointer hover:bg-white/10 transition-all font-bold text-sm sm:text-base"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            {carTypes.map(type => (
              <option key={type} className="bg-charcoal" value={type}>
                {language === 'fr' ? (
                  type === 'All' ? 'Tous' :
                  type === 'Coupe' ? 'Coupé' :
                  type === 'Convertible' ? 'Décapotable' :
                  type
                ) : type}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 w-full space-y-2 sm:space-y-4 pt-1">
          <div className="flex justify-between items-end mb-1">
            <label className="text-[10px] uppercase font-black text-white opacity-40 tracking-[.2em]">{language === 'fr' ? 'Valuation Max' : 'Max Valuation'}</label>
            <span className="text-lg sm:text-xl font-black crimson-text">${(priceRange[1]/1000).toFixed(0)}k</span>
          </div>
          <div className="relative pt-4 sm:pt-6">
            <ElasticSlider
               value={priceRange[1]}
               startingValue={0}
               maxValue={500000}
               isStepped={true}
               stepSize={5000}
               onChange={(val) => setPriceRange([0, val])}
            />
          </div>
        </div>

        <Button className="h-12 sm:h-14 px-8 sm:px-12 crimson-bg rounded-none font-black text-base sm:text-lg hover:bg-red-700 transition-all hover:scale-105 border-none shadow-[0_10px_30px_rgba(220,38,38,0.3)] border-none uppercase tracking-tighter">
          {language === 'fr' ? 'Rechercher' : 'Search'} {filteredCars.length} {language === 'fr' ? 'Résultats' : 'Results'}
        </Button>
      </SectionReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
        {filteredCars.map((car, i) => (
          <SectionReveal key={car.id}>
             <CarCard car={car} />
          </SectionReveal>
        ))}
      </div>
    </div>
  );
};

const CarDetail = () => {
  const { id } = useParams<{ id: string }>();
  const car = carData.find(c => c.id === id);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const { t, language } = useLanguage();

  if (!car) return <div className="pt-40 text-center h-screen">{language === 'fr' ? 'Véhicule non trouvé' : 'Car not found'}</div>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const payload = Object.fromEntries(formData.entries());
    
    // Ensure interests fall back nicely if somehow omitted
    if (!payload.interests) {
      payload.interests = 'Car Inquiry';
    }

    const WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/o7aUwpKbtkP4AOP0pEjC/webhook-trigger/4cd9dfc1-6a74-40d6-8850-387928a38860";

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      setFormStatus('success');
    } catch (error) {
      console.error('Error:', error);
      setFormStatus('idle');
    }
  };

  return (
    <div className="pt-24 sm:pt-32 pb-12 sm:pb-20">
      <div className="container mx-auto px-4 sm:px-6">
        <Link to="/inventory" className="inline-flex items-center text-[10px] sm:text-sm text-crimson font-bold uppercase tracking-widest mb-6 sm:mb-10 hover:translate-x-1 transition-transform">
          <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> {language === 'fr' ? "Retour à l'inventaire" : "Back to Inventory"}
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">
          {/* Gallery */}
          <div className="space-y-4 sm:space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="rounded-none overflow-hidden aspect-[16/10] relative glass border border-white/5"
            >
              <img 
                src={car.image} 
                className="w-full h-full object-cover" 
                alt={`${car.make} ${car.model}`}
                referrerPolicy="no-referrer"
              />
            </motion.div>
            
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {[1, 2, 3].map(i => (
                <div 
                  key={i} 
                  className={`aspect-square bg-white/5 opacity-100 transition-all cursor-pointer border border-white/10`}
                >
                   <img 
                    src={car.image} 
                    className="w-full h-full object-cover" 
                    alt="gallery"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-10">
            <div className="glass p-6 sm:p-8 rounded-2xl border-white/5">
              <div className="flex items-center space-x-3 mb-4">
                <Badge className="crimson-bg text-white rounded px-2 py-0.5 text-[10px] uppercase font-bold tracking-widest border-none">{car.year}</Badge>
                <div className="text-[9px] sm:text-[10px] uppercase font-bold text-white/40 tracking-wider font-mono">{language === 'fr' ? 'Véhicule d’occasion certifié' : 'Certified Pre-Owned'}</div>
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter mb-4 uppercase italic leading-[0.9]">{car.make} <br/> <span className="crimson-text">{car.model}</span></h1>
              <p className="text-3xl sm:text-4xl font-black text-white italic drop-shadow-[0_0_15px_rgba(220,38,38,0.3)] mb-8">${car.price.toLocaleString()}</p>
              
              <div className="grid grid-cols-2 gap-4 sm:gap-8 py-8 border-t border-white/10">
                <div className="space-y-1">
                  <p className="text-white/40 uppercase font-bold text-[9px] sm:text-[10px] tracking-widest">{language === 'fr' ? 'Kilométrage' : 'Mileage'}</p>
                  <p className="text-base sm:text-lg text-white font-bold">{car.mileage.toLocaleString()} {language === 'fr' ? 'km' : 'mi'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-white/40 uppercase font-bold text-[9px] sm:text-[10px] tracking-widest leading-none mb-1">{language === 'fr' ? 'Moteur' : 'Engine'}</p>
                  <p className="text-base sm:text-lg text-white font-black">{car.fuel}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-white/40 uppercase font-bold text-[9px] sm:text-[10px] tracking-widest leading-none mb-1">{language === 'fr' ? 'Transmission' : 'Transmission'}</p>
                  <p className="text-base sm:text-lg text-white font-black">{car.transmission}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-white/40 uppercase font-bold text-[9px] sm:text-[10px] tracking-widest leading-none mb-1">{language === 'fr' ? 'Couleur' : 'Color'}</p>
                  <p className="text-base sm:text-lg text-white font-black">{language === 'fr' ? 'Noir Métallique' : 'Midnight Metallic'}</p>
                </div>
              </div>
            </div>

            <div className="glass p-6 sm:p-8 rounded-2xl space-y-6 sm:space-y-8 border-white/5">
              <div className="space-y-3 sm:space-y-4">
                <h4 className="text-base sm:text-lg font-black text-white uppercase tracking-tighter italic">{language === 'fr' ? 'DESCRIPTION' : 'DESCRIPTION'}</h4>
                <p className="text-white/50 leading-relaxed text-sm sm:text-lg font-medium">{car.description}</p>
              </div>

              <div className="space-y-4 pt-6 sm:pt-8 border-t border-white/10">
                <h4 className="text-base sm:text-lg font-black text-white uppercase tracking-tighter italic">{language === 'fr' ? 'CARACTÉRISTIQUES CLÉS' : 'KEY FEATURES'}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {car.features.map((feature, i) => (
                    <div key={i} className="flex items-center text-xs sm:text-sm text-white/60 font-bold uppercase tracking-tight">
                      <ShieldCheck className="w-4 h-4 mr-3 text-crimson" /> {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass p-6 sm:p-10 rounded-2xl border-white/5 shadow-2xl">
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tighter mb-6 sm:mb-8 uppercase italic leading-tight">{language === 'fr' ? 'SE RENSEIGNER SUR' : 'SECURE THIS'} <br/> <span className="crimson-text underline">{language === 'fr' ? 'CE VÉHICULE' : 'ASSET'}</span></h3>
              {formStatus === 'success' ? (
                <div className="bg-crimson/10 border border-crimson/20 text-white p-6 sm:p-10 text-center space-y-4 rounded-xl">
                  <ShieldCheck className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-crimson" />
                  <p className="font-black text-xl sm:text-2xl tracking-tighter uppercase italic">{language === 'fr' ? 'DEMANDE ENVOYÉE !' : 'INQUIRY SENT!'}</p>
                  <p className="text-xs sm:text-sm text-white/50 font-medium">{language === 'fr' ? 'Un spécialiste vous contactera sous peu.' : 'One of our specialists will contact you shortly.'}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-1 sm:space-y-2">
                       <label className="text-[9px] sm:text-[10px] uppercase font-bold text-white/40 tracking-wider font-mono">{language === 'fr' ? 'Votre Nom' : 'Your Name'}</label>
                       <Input name="fullName" className="bg-white/5 border-white/10 rounded-none px-4 h-12 sm:h-14 focus:border-crimson text-white font-bold" required />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                       <label className="text-[9px] sm:text-[10px] uppercase font-bold text-white/40 tracking-wider font-mono">{language === 'fr' ? 'Adresse E-mail' : 'Email Address'}</label>
                       <Input name="emailProfile" type="email" className="bg-white/5 border-white/10 rounded-none px-4 h-12 sm:h-14 focus:border-crimson text-white font-bold" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-1 sm:space-y-2">
                       <label className="text-[9px] sm:text-[10px] uppercase font-bold text-white/40 tracking-wider font-mono">{language === 'fr' ? 'Téléphone' : 'Phone'}</label>
                       <Input name="phoneNumber" className="bg-white/5 border-white/10 rounded-none px-4 h-12 sm:h-14 focus:border-crimson text-white font-bold" />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                       <label className="text-[9px] sm:text-[10px] uppercase font-bold text-white/40 tracking-wider font-mono">{language === 'fr' ? 'Sujet' : 'Subject'}</label>
                       <div className="relative">
                         <select name="interests" className="w-full bg-white/5 border border-white/10 rounded-none px-4 h-12 sm:h-14 focus:border-crimson text-white appearance-none cursor-pointer outline-none font-bold text-sm sm:text-base">
                           <option className="bg-charcoal" value="Acquisition Inquiry">{language === 'fr' ? 'Acquisition' : 'Acquisition Inquiry'}</option>
                           <option className="bg-charcoal" value="Service">Service</option>
                           <option className="bg-charcoal" value="Capital / Financing">{language === 'fr' ? 'Financement' : 'Capital / Financing'}</option>
                         </select>
                         <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
                            <ArrowRight className="w-4 h-4 rotate-90" />
                         </div>
                       </div>
                    </div>
                  </div>
                  <div className="space-y-1 sm:space-y-2 py-4 border-y border-white/5">
                    <p className="text-[10px] text-white/30 uppercase font-black tracking-widest">{language === 'fr' ? 'VÉHICULE D_INTÉRÊT' : 'SELECT ASSET'}</p>
                    <p className="text-sm sm:text-base text-white font-black italic">{car.make} {car.model}</p>
                    <input type="hidden" name="vehicle" value={`${car.make} ${car.model}`} />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <label className="text-[9px] sm:text-[10px] uppercase font-bold text-white/40 tracking-wider font-mono">{language === 'fr' ? 'Message (Optionnel)' : 'Message (Optional)'}</label>
                    <textarea 
                       name="initialMessage" 
                       className="w-full bg-white/5 border border-white/10 p-4 sm:p-5 h-24 sm:h-32 rounded-none outline-none text-white focus:border-crimson resize-none font-bold text-sm sm:text-base" 
                    />
                  </div>
                  <Button type="submit" disabled={formStatus === 'loading'} className="w-full crimson-bg h-14 sm:h-16 rounded-none font-black text-base sm:text-lg uppercase tracking-[.2em] border-none shadow-2xl hover:scale-[1.02] transition-all">
                    {formStatus === 'loading' ? (language === 'fr' ? 'TRAITEMENT...' : 'PROCESSING...') : (language === 'fr' ? 'CONFIRMER L_ACQUISITION' : 'CONFIRM ACQUISITION')}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const { pathname, hash } = useLocation();

  // Scroll to top or specific hash on route change
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Small delay to ensure component render before scrolling
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col font-sans overflow-x-hidden relative">
        <div className="grain-overlay" />
        <Navbar />
        
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes location={pathname}>
              <Route path="/" element={
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                  <HomeWrapper />
                </motion.div>
              } />
              <Route path="/inventory" element={
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                  <InventoryWrapper />
                </motion.div>
              } />
              <Route path="/sell" element={
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                  <SellYourCarWrapper />
                </motion.div>
              } />
              <Route path="/financing" element={
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                  <FinancingWrapper />
                </motion.div>
              } />
              <Route path="/cars/:id" element={
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                  <CarDetailWrapper />
                </motion.div>
              } />
            </Routes>
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </LanguageProvider>
  );
}

// Wrappers to use useLanguage inside components
const HomeWrapper = () => <Home />;
const InventoryWrapper = () => <Inventory />;
const SellYourCarWrapper = () => <SellYourCar />;
const FinancingWrapper = () => <Financing />;
const CarDetailWrapper = () => <CarDetail />;
