import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useParams, Navigate } from 'react-router-dom';
import { motion, AnimatePresence, useInView, animate } from 'motion/react';
import { Menu, Phone, Mail, MapPin, Instagram, Search, ArrowRight, ShieldCheck, Zap, BadgeCheck, Wrench, KeyRound, CircleAlert } from 'lucide-react';

import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Badge } from './components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from './components/ui/sheet';
import { Car, cars as carData } from './data/cars';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { Analytics } from '@vercel/analytics/react';
import { Language, translations } from './locales/translations';
import BorderGlow from './components/BorderGlow/BorderGlow';
import MagicBento from './components/MagicBento/MagicBento';
import ElasticSlider from './components/ElasticSlider/ElasticSlider';
import Plasma from './components/Plasma/Plasma';

// --- Site constants (single source of truth) ---

export const SITE = {
  name: 'AK Flips',
  tagline: 'Flipped Right. Priced Right.',
  email: 'Abdullahkhawaja2004@gmail.com',
  phone: '+1 (514) 812-1406',
  phoneHref: 'tel:+15148121406',
  instagram: 'https://www.instagram.com/ak.flips._',
  instagramHandle: '@ak.flips._',
  city: 'Montreal, Quebec',
  logo: '/ak-flips-logo.jpg',
};

// --- FormSubmit helper (dual inbox) ---
// Every lead is POSTed to BOTH inboxes below. Both addresses receive a
// FormSubmit activation email on first submission — it must be clicked
// before leads start arriving.

const FORM_ENDPOINTS = [
  'https://formsubmit.co/ajax/Abdullahkhawaja2004@gmail.com',
  'https://formsubmit.co/ajax/Sharafath2001@hotmail.com',
];

interface LeadResult {
  ok: boolean;
  partial: boolean; // true when at least one inbox received the lead, but not all
}

const submitLead = async (payload: Record<string, unknown>, subject?: string): Promise<LeadResult> => {
  const body = JSON.stringify({
    _subject: subject || 'New lead — AK Flips website',
    _template: 'table',
    _captcha: 'false',
    ...payload,
  });
  const results = await Promise.allSettled(
    FORM_ENDPOINTS.map((url) =>
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body,
      }).then((res) => {
        if (!res.ok) throw new Error(`FormSubmit error ${res.status} for ${url}`);
      })
    )
  );
  const succeeded = results.filter((r) => r.status === 'fulfilled').length;
  if (succeeded === FORM_ENDPOINTS.length) return { ok: true, partial: false };
  if (succeeded > 0) return { ok: true, partial: true };
  throw new Error('All FormSubmit endpoints failed');
};

// Fire-and-forget: email BOTH inboxes when a visitor taps the phone number.
// Never blocks the tel: link — failures are swallowed silently.
const notifyEvent = (event: string, subject: string, note: string) => {
  const body = JSON.stringify({
    _subject: subject,
    _template: 'table',
    _captcha: 'false',
    event,
    page: typeof window !== 'undefined' ? window.location.href : '',
    time: new Date().toISOString(),
    note,
  });
  FORM_ENDPOINTS.forEach((url) => {
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body,
      keepalive: true,
    }).catch(() => {});
  });
};

const notifyPhoneClick = () =>
  notifyEvent('phone_click', '📞 Phone tap — AK Flips website', 'A visitor tapped the phone number on the AK Flips website.');
const notifyInstagramClick = () =>
  notifyEvent('instagram_click', '📸 Instagram visit — AK Flips website', 'A visitor clicked through to Instagram from the AK Flips website.');
const notifyEmailCopy = () =>
  notifyEvent('email_copy', '✉️ Email copied — AK Flips website', 'A visitor copied the email address from the AK Flips website.');

// Honest partial-delivery note shown on success screens when only one inbox got the lead.
const PartialNote = ({ partial }: { partial: boolean }) => {
  const { language } = useLanguage();
  if (!partial) return null;
  return (
    <p className="text-amber-300/90 text-xs sm:text-sm font-medium bg-amber-500/10 border border-amber-500/20 rounded-lg px-4 py-3">
      {language === 'fr'
        ? "Note : votre message a bien été reçu, mais l'envoi vers l'une de nos boîtes a été interrompu. Sans réponse sous 24 h, écrivez-nous sur Instagram @ak.flips._."
        : "Heads up: your message was received, but delivery to one of our inboxes was interrupted. If you don't hear back within 24 hours, message us on Instagram @ak.flips._."}
    </p>
  );
};

// --- Shared components ---

const SectionReveal = ({ children, className }: { children: React.ReactNode, className?: string, key?: React.Key }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const AnimatedCounter = ({ value, suffix = '', decimals = 0 }: { value: number, suffix?: string, decimals?: number }) => {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && ref.current) {
      const controls = animate(0, value, {
        duration: 3,
        ease: [0.16, 1, 0.3, 1],
        onUpdate(latest) {
          if (!ref.current) return;
          const val = latest.toFixed(decimals);
          const parsed = parseFloat(val);
          if (decimals === 0) {
            ref.current.textContent = Math.floor(parsed).toLocaleString() + suffix;
          } else {
            ref.current.textContent = parsed.toFixed(decimals) + suffix;
          }
        }
      });
      return () => controls.stop();
    }
  }, [isInView, value, decimals, suffix]);

  return <span ref={ref} className="tabular-nums">{decimals === 0 ? "0" + suffix : (0).toFixed(decimals) + suffix}</span>;
};

const LanguageToggle = ({ compact = false }: { compact?: boolean }) => {
  const { language, setLanguage } = useLanguage();
  return (
    <div className={`flex items-center gap-${compact ? '1' : '2'} bg-white/5 p-1 rounded-sm border border-white/10`}>
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
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.inventory'), path: '/inventory' },
    { name: t('nav.how'), path: '/how-it-works' },
    { name: t('nav.sell'), path: '/sell' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 h-16 sm:h-20 transition-all duration-300 px-4 sm:px-6 md:px-10 flex items-center justify-between border-white/10 shrink-0 ${isScrolled ? 'bg-charcoal/95 backdrop-blur-md shadow-lg border-b' : 'bg-transparent border-b'}`}>
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-3">
          <img src={SITE.logo} alt="AK Flips logo" className="w-9 h-9 sm:w-11 sm:h-11 rounded-full object-cover ring-2 ring-red-600/60 shadow-[0_0_20px_rgba(220,38,38,0.35)]" />
          <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white uppercase">
            AK <span className="crimson-text">FLIPS</span>
          </span>
        </Link>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8">
        <div className="flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`hover:text-white transition-colors ${location.pathname === link.path ? 'text-white' : 'text-white/70'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <LanguageToggle />

        <Button
          className="px-6 py-2.5 crimson-bg text-white rounded-none font-black italic uppercase tracking-tighter hover:bg-red-700 transition-colors border-none"
          asChild
        >
          <Link to="/#contact">{t('nav.reserve')}</Link>
        </Button>
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden flex items-center gap-4">
        <LanguageToggle compact />
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
  const { t, language } = useLanguage();
  return (
    <footer className="bg-charcoal border-t border-white/5 pt-32 pb-16 px-10 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-24">
          <div className="md:col-span-1 space-y-8">
            <div className="flex items-center gap-3">
              <img src={SITE.logo} alt="AK Flips logo" className="w-12 h-12 rounded-full object-cover ring-2 ring-red-600/60 shadow-lg" />
              <span className="text-2xl font-black tracking-tight text-white uppercase">AK <span className="crimson-text">FLIPS</span></span>
            </div>
            <p className="text-white/40 leading-relaxed font-medium">{t('footer.tagline')}</p>
            <div className="flex gap-5">
              <a href={SITE.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"
                onClick={notifyInstagramClick}
                className="w-10 h-10 glass rounded-full flex items-center justify-center hover:crimson-bg hover:scale-110 transition-all duration-300 text-white">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[.4em] mb-10">{t('nav.inventory')}</h4>
            <ul className="space-y-6">
              <li><Link to="/inventory" className="text-white/60 hover:text-crimson font-bold uppercase text-xs tracking-widest transition-colors">{t('nav.inventory')}</Link></li>
              <li><Link to="/how-it-works" className="text-white/60 hover:text-crimson font-bold uppercase text-xs tracking-widest transition-colors">{t('nav.how')}</Link></li>
              <li><Link to="/sell" className="text-white/60 hover:text-crimson font-bold uppercase text-xs tracking-widest transition-colors">{t('nav.sell')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[.4em] mb-10">{language === 'fr' ? 'Aide' : 'Assistance'}</h4>
            <ul className="space-y-6">
              <li><Link to="/#contact" className="text-white/60 hover:text-crimson font-bold uppercase text-xs tracking-widest transition-colors">{t('nav.contact')}</Link></li>
              <li><Link to="/#contact" className="text-white/60 hover:text-crimson font-bold uppercase text-xs tracking-widest transition-colors">{language === 'fr' ? 'Réserver une visite' : 'Book a Viewing'}</Link></li>
              <li><Link to="/how-it-works" className="text-white/60 hover:text-crimson font-bold uppercase text-xs tracking-widest transition-colors">{language === 'fr' ? 'Notre processus' : 'Our Process'}</Link></li>
            </ul>
          </div>

          <div className="space-y-10">
            <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[.4em] mb-10">{t('nav.contact')}</h4>
            <div className="space-y-6">
              <p className="text-xs font-bold text-white uppercase tracking-widest">{language === 'fr' ? 'Téléphone' : 'Phone'}: <a href={SITE.phoneHref} onClick={notifyPhoneClick} className="crimson-text block mt-2 text-base hover:underline">{SITE.phone}</a></p>
              <p className="text-xs font-bold text-white uppercase tracking-widest">Email: <a href={`mailto:${SITE.email}`} onCopy={notifyEmailCopy} className="crimson-text block mt-2 text-base break-all hover:underline">{SITE.email}</a></p>
              <p className="text-xs font-black text-white uppercase tracking-widest">{t('contact.info.location')}: <span className="text-white/40 block mt-2">{SITE.city}</span></p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-16 border-t border-white/5 gap-10 text-[10px] font-black uppercase tracking-[.5em] text-white/20">
          <div>{t('footer.legal')} {t('footer.privacy')} & {t('footer.terms')}.</div>
          <div className="flex flex-wrap justify-center gap-10">
            <span className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full crimson-bg"></div> {language === 'fr' ? 'INSPECTION COMPLÈTE' : 'FULL INSPECTION'}
            </span>
            <span className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full crimson-bg"></div> {language === 'fr' ? 'TITRE PROPRE' : 'CLEAN TITLE'}
            </span>
            <span className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full crimson-bg"></div> CARFAX {language === 'fr' ? 'DISPONIBLE' : 'AVAILABLE'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const testimonials = [
  {
    name: "Karim B.",
    role: "en" as Language,
    quoteEn: "Bought the Civic off AK last month. Car was exactly as described, fresh brakes, super clean. Easiest car purchase I've ever made.",
    quoteFr: "J'ai acheté la Civic à AK le mois dernier. L'auto était exactement comme décrite, freins neufs, super propre. L'achat le plus simple que j'ai fait.",
    asset: "2019 Honda Civic LX"
  },
  {
    name: "Sophie L.",
    role: "en" as Language,
    quoteEn: "He sent me the Carfax before I even asked and answered every question the same day. You can tell he actually cares about the cars he flips.",
    quoteFr: "Il m'a envoyé le Carfax avant même que je le demande et a répondu à toutes mes questions le jour même. On voit qu'il tient à ses autos.",
    asset: "2018 Toyota Corolla LE"
  },
  {
    name: "Jean-Marc D.",
    role: "en" as Language,
    quoteEn: "Fair price, no pressure, and the Rogue drives perfect through winter. I'd buy from AK Flips again without hesitation.",
    quoteFr: "Prix juste, aucune pression, et le Rogue roule parfaitement l'hiver. J'achèterais chez AK Flips encore sans hésiter.",
    asset: "2016 Nissan Rogue SV"
  }
];

const TestimonialSection = () => {
  const [index, setIndex] = useState(0);
  const { language } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 sm:py-40 relative border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="container mx-auto px-4 sm:px-10 relative z-10">
        <SectionReveal className="text-center mb-16 sm:mb-24">
          <h2 className="text-[10px] sm:text-xs font-black text-crimson uppercase tracking-[0.5em] mb-4">{language === 'fr' ? 'Ils nous font confiance' : 'Word On The Street'}</h2>
          <h3 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.95] italic">
            {language === 'fr' ? 'Ils roulent' : 'Happy'} <br /><span className="crimson-text">{language === 'fr' ? 'avec AK' : 'Drivers'}</span>
          </h3>
        </SectionReveal>

        <div className="max-w-5xl mx-auto relative h-[400px] sm:h-[450px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full flex flex-col items-center text-center p-8 sm:p-16 border-white/5 bg-white/[0.02] backdrop-blur-3xl rounded-[2rem] sm:rounded-[4rem] border justify-center shadow-[0_50px_100px_rgba(0,0,0,0.5)]"
            >
              <div className="flex gap-2 mb-8 text-crimson">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-6 sm:w-6 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                ))}
              </div>
              <p className="text-xl sm:text-3xl md:text-4xl text-white font-medium leading-[1.2] italic tracking-tight mb-12 max-w-4xl">
                "{language === 'fr' ? testimonials[index].quoteFr : testimonials[index].quoteEn}"
              </p>
              <div>
                <p className="text-lg sm:text-2xl font-black text-white uppercase tracking-widest mb-1">{testimonials[index].name}</p>
                <p className="text-[10px] sm:text-xs text-white/40 font-bold uppercase tracking-[0.3em]">
                  <span className="crimson-text">{language === 'fr' ? 'Acheteur vérifié' : 'Verified Buyer'}</span> • {testimonials[index].asset}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute -bottom-12 sm:-bottom-16 flex gap-4">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-12 sm:w-16 h-1 rounded-full transition-all duration-500 ${index === i ? 'bg-crimson scale-y-150' : 'bg-white/10 hover:bg-white/30'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [partial, setPartial] = useState(false);
  const { t, language } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPartial(false);
    setStatus('loading');

    const formData = new FormData(e.target as HTMLFormElement);
    const payload = Object.fromEntries(formData.entries());

    try {
      const result = await submitLead(payload, 'New contact lead — AK Flips website');
      setPartial(result.partial);
      setStatus('success');
    } catch (error) {
      console.error("FormSubmit failed:", error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-center">
          <SectionReveal className="space-y-6 sm:space-y-12">
            <div>
              <h2 className="text-[10px] sm:text-xs font-black text-crimson uppercase tracking-[0.5em] mb-4">{t('contact.tag')}</h2>
              <h3 className="text-4xl sm:text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.95] uppercase italic">{t('contact.title')} <br /><span className="crimson-text">{t('contact.title_next')}</span></h3>
            </div>

            <div className="space-y-6 sm:space-y-10">
              <p className="text-lg sm:text-xl text-white/50 leading-relaxed font-medium">{t('contact.description')}</p>

              <div className="grid gap-6 sm:gap-8">
                {[
                  { icon: <Phone className="w-5 h-5 sm:w-6 sm:h-6" />, label: language === 'fr' ? 'Téléphone' : 'Phone', val: SITE.phone, href: SITE.phoneHref },
                  { icon: <Mail className="w-5 h-5 sm:w-6 sm:h-6" />, label: "Email", val: SITE.email, href: `mailto:${SITE.email}` },
                  { icon: <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />, label: "Instagram", val: SITE.instagramHandle, href: SITE.instagram },
                  { icon: <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />, label: t('contact.info.location'), val: SITE.city },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 sm:gap-6 group">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 glass rounded-2xl flex items-center justify-center text-crimson group-hover:crimson-bg group-hover:text-white transition-all duration-500">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[9px] sm:text-[10px] font-black text-white/30 uppercase tracking-widest">{item.label}</p>
                      {item.href ? (
                        <a href={item.href}
                          onClick={item.href === SITE.phoneHref ? notifyPhoneClick : item.href === SITE.instagram ? notifyInstagramClick : undefined}
                          onCopy={item.href.startsWith('mailto:') ? notifyEmailCopy : undefined}
                          target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="text-lg sm:text-xl font-bold text-white uppercase italic hover:text-crimson transition-colors break-all">{item.val}</a>
                      ) : (
                        <p className="text-lg sm:text-xl font-bold text-white uppercase italic">{item.val}</p>
                      )}
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
              <div className="p-5 sm:p-8 md:p-10 lg:p-20">
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-4 sm:space-y-8"
                  >
                    <div className="w-12 h-12 sm:w-24 sm:h-24 crimson-bg rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(220,38,38,0.4)]">
                      <BadgeCheck className="w-6 h-6 sm:w-12 sm:h-12 text-white" />
                    </div>
                    <h4 className="text-xl sm:text-4xl font-black text-white uppercase tracking-tighter">{t('contact.form.success_title')}</h4>
                    <p className="text-white/50 text-sm sm:text-lg">{t('contact.form.success_desc')}</p>
                    <PartialNote partial={partial} />
                    <Button onClick={() => setStatus('idle')} variant="outline" className="border-white/10 text-white rounded-none uppercase font-black tracking-widest h-10 sm:h-14 px-6 sm:px-10 text-xs sm:text-base">{t('contact.form.new_inquiry')}</Button>
                  </motion.div>
                ) : status === 'error' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-4 sm:space-y-8"
                  >
                    <div className="w-12 h-12 sm:w-24 sm:h-24 bg-red-900/40 border border-red-600/40 rounded-full flex items-center justify-center mx-auto">
                      <CircleAlert className="w-6 h-6 sm:w-12 sm:h-12 text-red-400" />
                    </div>
                    <h4 className="text-xl sm:text-4xl font-black text-white uppercase tracking-tighter">{language === 'fr' ? "ÉCHEC DE L'ENVOI" : 'SEND FAILED'}</h4>
                    <p className="text-white/50 text-sm sm:text-lg">{language === 'fr' ? "Quelque chose a mal tourné. Réessayez ou contactez-nous directement." : 'Something went wrong. Try again or reach us directly.'}</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button onClick={() => setStatus('idle')} className="crimson-bg text-white rounded-none uppercase font-black tracking-widest h-10 sm:h-14 px-6 sm:px-10 text-xs sm:text-base border-none">{language === 'fr' ? 'Réessayer' : 'Try Again'}</Button>
                      <Button asChild variant="outline" className="border-white/10 text-white rounded-none uppercase font-black tracking-widest h-10 sm:h-14 px-6 sm:px-10 text-xs sm:text-base">
                        <a href={SITE.instagram} target="_blank" rel="noreferrer" onClick={notifyInstagramClick}>Instagram</a>
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-12 gap-y-4 sm:gap-y-10">
                      <div className="space-y-1 sm:space-y-2">
                        <label className="text-[9px] sm:text-[12px] font-black text-white/30 uppercase tracking-[.4em]">{t('contact.form.name')}</label>
                        <Input name="name" className="bg-transparent border-0 border-b border-white/10 rounded-none h-8 sm:h-14 px-0 focus:border-crimson transition-all text-base sm:text-xl font-bold text-white placeholder:text-white/10" required />
                      </div>
                      <div className="space-y-1 sm:space-y-2">
                        <label className="text-[9px] sm:text-[12px] font-black text-white/30 uppercase tracking-[.4em]">{t('contact.form.email')}</label>
                        <Input name="email" type="email" className="bg-transparent border-0 border-b border-white/10 rounded-none h-8 sm:h-14 px-0 focus:border-crimson transition-all text-base sm:text-xl font-bold text-white" required />
                      </div>
                      <div className="space-y-1 sm:space-y-2">
                        <label className="text-[9px] sm:text-[12px] font-black text-white/30 uppercase tracking-[.4em]">{t('contact.form.phone')}</label>
                        <Input name="phone" type="tel" className="bg-transparent border-0 border-b border-white/10 rounded-none h-8 sm:h-14 px-0 focus:border-crimson transition-all text-base sm:text-xl font-bold text-white" />
                      </div>
                      <div className="space-y-1 sm:space-y-2">
                        <label className="text-[9px] sm:text-[12px] font-black text-white/30 uppercase tracking-[.4em]">{t('contact.form.interests')}</label>
                        <div className="relative">
                          <select name="interest" className="w-full bg-transparent border-0 border-b border-white/10 rounded-none h-8 sm:h-14 px-0 focus:border-crimson transition-all text-base sm:text-xl font-black outline-none text-white appearance-none cursor-pointer">
                            <option className="bg-charcoal text-base font-sans" value="Buying a car">{t('contact.form.options.buy')}</option>
                            <option className="bg-charcoal text-base font-sans" value="Selling my car">{t('contact.form.options.sell')}</option>
                            <option className="bg-charcoal text-base font-sans" value="General question">{t('contact.form.options.question')}</option>
                          </select>
                          <div className="absolute right-0 bottom-1 sm:bottom-4 pointer-events-none text-white/20">
                            <Search className="w-3 h-3 sm:w-5 sm:h-5 rotate-90" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1 sm:space-y-2 pt-1 sm:pt-4 sm:col-span-2">
                        <label className="text-[9px] sm:text-[12px] font-black text-white/30 uppercase tracking-[.4em]">{language === 'fr' ? 'Véhicule (Optionnel)' : 'Vehicle (Optional)'}</label>
                        <div className="relative">
                          <select name="vehicle" className="w-full bg-transparent border-0 border-b border-white/10 rounded-none h-8 sm:h-14 px-0 focus:border-crimson transition-all text-base sm:text-xl font-black outline-none text-white appearance-none cursor-pointer">
                            <option className="bg-charcoal text-base font-sans" value="">-- {language === 'fr' ? 'Aucun' : 'None'} --</option>
                            {carData.map(car => (
                              <option key={car.id} className="bg-charcoal text-base font-sans" value={`${car.year} ${car.make} ${car.model}`}>{car.year} {car.make} {car.model}</option>
                            ))}
                          </select>
                          <div className="absolute right-0 bottom-1 sm:bottom-4 pointer-events-none text-white/20">
                            <Search className="w-3 h-3 sm:w-5 sm:h-5 rotate-90" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 sm:space-y-6 pt-2 sm:pt-6">
                      <label className="text-[9px] sm:text-[12px] font-black text-white/30 uppercase tracking-[.4em]">{t('contact.form.message')}</label>
                      <textarea name="message" className="w-full bg-transparent border-0 border-b border-white/10 rounded-none min-h-[60px] sm:min-h-[140px] focus:border-crimson transition-all text-base sm:text-xl font-bold outline-none text-white p-0 resize-none" />
                    </div>
                    <Button type="submit" disabled={status === 'loading'} className="w-full crimson-bg py-4 sm:py-10 rounded-none font-black text-lg sm:text-2xl uppercase tracking-tighter hover:bg-red-700 transition-all hover:scale-[1.01] shadow-[0_20px_50px_rgba(220,38,38,0.3)] border-none">
                      {status === 'loading' ? t('contact.form.sending') : t('contact.form.submit')}
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
  const { language } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
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
          <div className="glass rounded-xl overflow-hidden transition-all h-full flex flex-col border-none bg-black/40 group-hover:border-red-600/40 group-hover:shadow-[0_20px_60px_rgba(220,38,38,0.15)]">
            <div className="h-48 overflow-hidden bg-white/5 relative">
              <img
                src={car.image}
                alt={`${car.year} ${car.make} ${car.model}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
                <span>{car.mileage.toLocaleString()} km</span>
                <span>•</span>
                <span>{car.transmission}</span>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-white/5 mt-auto">
                <p className="text-xl font-bold crimson-text">${car.price.toLocaleString()}</p>
                <div className="text-[10px] uppercase font-extrabold text-white/20 tracking-tighter">{language === 'fr' ? 'Inspectée' : 'Inspected'}</div>
              </div>
            </div>
          </div>
        </BorderGlow>
      </Link>
    </motion.div>
  );
};

const TrustSection = () => {
  const { t, language } = useLanguage();
  const items = translations[language].trust.items;
  const icons = [ShieldCheck, BadgeCheck, Search, Zap];
  return (
    <section className="py-24 sm:py-32 relative border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-10">
        <SectionReveal className="text-center mb-12 sm:mb-16">
          <h2 className="text-[10px] sm:text-xs font-black text-crimson uppercase tracking-[0.5em]">{t('trust.tag')}</h2>
        </SectionReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <SectionReveal key={i} className="glass p-8 rounded-2xl space-y-4 hover:border-crimson/60 hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-crimson group-hover:crimson-bg group-hover:text-white transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white uppercase tracking-tight">{item.title}</h3>
                <p className="text-white/40 leading-relaxed text-sm font-medium">{item.desc}</p>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const SellYourCar = () => {
  const { language } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [partial, setPartial] = useState(false);

  const content = {
    en: {
      title: "SELL US",
      highlight: "YOUR CAR",
      desc: "Thinking of selling? We buy clean used cars directly — fast offer, fair price, no tire-kickers. It's how we keep fresh flips coming.",
      steps: [
        { title: "TELL US ABOUT IT", desc: "Send your car's details with the form below. Photos help us move faster." },
        { title: "GET A FAIR OFFER", desc: "We check the market and your car's condition, then make you a straight, honest offer." },
        { title: "GET PAID FAST", desc: "Accept the offer and we handle the paperwork and pickup. Money in your pocket, hassle-free." }
      ],
      form_title: "TELL US ABOUT YOUR CAR",
      placeholders: {
        make: "Make (e.g. Honda)",
        model: "Model (e.g. Civic)",
        year: "Year",
        mileage: "Mileage (km)",
        price: "Your asking price ($)",
        more: "Condition, accidents, service history, anything we should know..."
      },
      btn: "GET MY OFFER",
      success_title: "REQUEST RECEIVED",
      success_desc: "Thanks! We'll review your car and get back to you within 24 hours.",
      another: "Submit Another"
    },
    fr: {
      title: "VENDEZ-NOUS",
      highlight: "VOTRE AUTO",
      desc: "Vous pensez vendre? On achète des autos d'occasion propres directement — offre rapide, prix juste, sans niaisage. C'est comme ça qu'on garde du nouveau stock.",
      steps: [
        { title: "DITES-NOUS TOUT", desc: "Envoyez les détails de votre auto avec le formulaire ci-dessous. Des photos nous aident à aller plus vite." },
        { title: "RECEVEZ UNE OFFRE JUSTE", desc: "On vérifie le marché et l'état de votre auto, puis on vous fait une offre franche et honnête." },
        { title: "SOYEZ PAYÉ RAPIDEMENT", desc: "Acceptez l'offre et on s'occupe de la paperasse et du ramassage. Argent en poche, sans tracas." }
      ],
      form_title: "PARLEZ-NOUS DE VOTRE AUTO",
      placeholders: {
        make: "Marque (ex. Honda)",
        model: "Modèle (ex. Civic)",
        year: "Année",
        mileage: "Kilométrage (km)",
        price: "Votre prix demandé ($)",
        more: "État, accidents, historique d'entretien, tout ce qu'on devrait savoir..."
      },
      btn: "OBTENIR MON OFFRE",
      success_title: "DEMANDE REÇUE",
      success_desc: "Merci! On va examiner votre auto et vous répondre dans les 24 heures.",
      another: "Soumettre une autre"
    }
  };

  const t_page = content[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPartial(false);
    setStatus('loading');

    const formData = new FormData(e.target as HTMLFormElement);
    const payload: Record<string, any> = Object.fromEntries(formData.entries());

    if (payload.vehicleMake && payload.vehicleModel) {
      payload.vehicle = `${payload.vehicleYear || ''} ${payload.vehicleMake} ${payload.vehicleModel}`.trim();
    }

    try {
      const result = await submitLead(payload, 'Sell-my-car lead — AK Flips website');
      setPartial(result.partial);
      setStatus('success');
    } catch (error) {
      console.error("FormSubmit failed:", error);
      setStatus('error');
    }
  };

  return (
    <div className="pt-24 sm:pt-40 pb-20 container mx-auto px-4 sm:px-10">
      <SectionReveal className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-20">
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-white tracking-tight uppercase leading-tight">{t_page.title} <span className="crimson-text">{t_page.highlight}</span></h1>
        <p className="text-white/50 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed font-medium">{t_page.desc}</p>
      </SectionReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
        {[Zap, ShieldCheck, KeyRound].map((Icon, i) => (
          <SectionReveal key={i} className="glass p-8 sm:p-10 rounded-2xl space-y-4 sm:space-y-6 hover:border-crimson/60 hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/5 rounded-full flex items-center justify-center text-crimson group-hover:crimson-bg group-hover:text-white transition-all">
              <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div className="text-4xl font-black crimson-text/30 italic">0{i + 1}</div>
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
              <BadgeCheck className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h4 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tighter">{t_page.success_title}</h4>
            <p className="text-white/50 text-base sm:text-lg">{t_page.success_desc}</p>
            <PartialNote partial={partial} />
            <Button onClick={() => setStatus('idle')} variant="outline" className="border-white/10 text-white rounded-none uppercase font-black tracking-widest h-12 sm:h-14 px-8 sm:px-10">{t_page.another}</Button>
          </motion.div>
        ) : status === 'error' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8 py-6 sm:py-10"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-900/40 border border-red-600/40 rounded-full flex items-center justify-center mx-auto">
              <CircleAlert className="w-8 h-8 sm:w-10 sm:h-10 text-red-400" />
            </div>
            <h4 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tighter">{language === 'fr' ? "ÉCHEC DE L'ENVOI" : 'SEND FAILED'}</h4>
            <p className="text-white/50 text-base sm:text-lg">{language === 'fr' ? "Réessayez ou écrivez-nous directement." : 'Please try again or message us directly.'}</p>
            <Button onClick={() => setStatus('idle')} className="crimson-bg text-white rounded-none uppercase font-black tracking-widest h-12 sm:h-14 px-8 sm:px-10 border-none">{language === 'fr' ? 'Réessayer' : 'Try Again'}</Button>
          </motion.div>
        ) : (
          <>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-8 text-center uppercase tracking-tight">{t_page.form_title}</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
              <div className="md:col-span-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input name="vehicleMake" placeholder={t_page.placeholders.make} required className="bg-white/5 border-white/10 py-3 sm:py-5 rounded-none font-bold text-white focus:border-crimson h-10 sm:h-12" />
                <Input name="vehicleModel" placeholder={t_page.placeholders.model} required className="bg-white/5 border-white/10 py-3 sm:py-5 rounded-none font-bold text-white focus:border-crimson h-10 sm:h-12" />
              </div>
              <Input name="vehicleYear" placeholder={t_page.placeholders.year} required className="bg-white/5 border-white/10 py-3 sm:py-5 rounded-none font-bold text-white focus:border-crimson h-10 sm:h-12" />
              <Input name="vehicleMileage" placeholder={t_page.placeholders.mileage} required className="bg-white/5 border-white/10 py-3 sm:py-5 rounded-none font-bold text-white focus:border-crimson h-10 sm:h-12" />
              <Input name="vehiclePrice" placeholder={t_page.placeholders.price} required className="bg-white/5 border-white/10 py-3 sm:py-5 rounded-none font-bold text-white focus:border-crimson h-10 sm:h-12" />

              <div className="md:col-span-2 space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
                  <Input name="name" placeholder={language === 'fr' ? 'Votre nom complet' : 'Your Full Name'} required className="bg-white/5 border-white/10 py-3 sm:py-5 rounded-none font-bold text-white focus:border-crimson h-10 sm:h-12" />
                  <Input name="email" type="email" placeholder={language === 'fr' ? 'Votre courriel' : 'Your Email Address'} required className="bg-white/5 border-white/10 py-3 sm:py-5 rounded-none font-bold text-white focus:border-crimson h-10 sm:h-12" />
                </div>
                <Input name="phone" type="tel" placeholder={language === 'fr' ? 'Téléphone' : 'Phone Number'} className="bg-white/5 border-white/10 py-3 sm:py-5 rounded-none font-bold text-white focus:border-crimson h-10 sm:h-12" />
                <textarea name="message" placeholder={t_page.placeholders.more} className="w-full bg-white/5 border border-white/10 p-3 sm:p-5 min-h-[100px] sm:min-h-[120px] outline-none text-white font-bold focus:border-crimson transition-all text-sm sm:text-base" />
              </div>

              <Button type="submit" disabled={status === 'loading'} className="md:col-span-2 py-4 sm:py-6 crimson-bg text-white font-black text-sm sm:text-base uppercase tracking-widest rounded-none hover:bg-red-700 transition-all shadow-xl border-none">
                {status === 'loading' ? (language === 'fr' ? 'ENVOI...' : 'SUBMITTING...') : t_page.btn}
              </Button>
            </form>
          </>
        )}
      </SectionReveal>
    </div>
  );
};

const HowItWorks = () => {
  const { t, language } = useLanguage();
  const steps = translations[language].process.steps;
  const trustItems = translations[language].trust.items;
  const icons = [Search, Wrench, KeyRound];

  return (
    <div className="pt-20 sm:pt-40 pb-0 overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-10">
        <SectionReveal className="text-center space-y-6 sm:space-y-8 mb-16 sm:mb-32 max-w-4xl mx-auto">
          <div className="inline-block px-4 py-2 glass rounded-none text-[10px] sm:text-xs font-black uppercase tracking-[0.5em] crimson-text">{t('process.tag')}</div>
          <h1 className="text-4xl sm:text-6xl md:text-9xl font-black text-white tracking-tighter uppercase leading-[0.95]">{t('process.title')} <br /><span className="crimson-text italic">{t('process.title_accent')}</span></h1>
          <p className="text-white/50 text-lg sm:text-2xl max-w-2xl mx-auto font-medium leading-relaxed">{t('process.description')}</p>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-10 mb-24 sm:mb-40">
          {steps.map((step, i) => {
            const Icon = icons[i % icons.length];
            return (
              <SectionReveal key={i} className="relative glass p-8 sm:p-12 rounded-[2rem] border-white/5 space-y-6 hover:border-crimson/50 hover:-translate-y-1 transition-all duration-300 group">
                <div className="text-6xl sm:text-7xl font-black text-white/5 group-hover:text-crimson/20 transition-colors italic absolute top-6 right-8">0{i + 1}</div>
                <div className="w-14 h-14 sm:w-16 sm:h-16 crimson-bg rounded-2xl flex items-center justify-center text-white shadow-[0_10px_30px_rgba(220,38,38,0.4)]">
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight italic">{step.title}</h3>
                <p className="text-white/50 leading-relaxed font-medium">{step.desc}</p>
              </SectionReveal>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center mb-24 sm:mb-40">
          <SectionReveal className="space-y-10 lg:space-y-12">
            <h2 className="text-3xl sm:text-4xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9] italic">{language === 'fr' ? 'AUCUNE' : 'ZERO'} <br /><span className="crimson-text">{language === 'fr' ? 'SURPRISE' : 'SURPRISES'}</span></h2>
            <p className="text-white/50 leading-relaxed text-lg lg:text-xl font-medium">{language === 'fr' ? "Pas de frais cachés, pas de pression, pas de jeux de concessionnaire. Le prix affiché est le prix que vous payez — pour une auto inspectée et prête à rouler." : "No hidden fees, no pressure, no dealership games. The price you see is the price you pay — for a car that's inspected and ready to drive."}</p>
            <div className="grid gap-8 lg:gap-10">
              {trustItems.map((item, i) => (
                <div key={i} className="flex gap-6 sm:gap-8 group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 glass flex items-center justify-center shrink-0 border border-white/10 group-hover:crimson-bg transition-all rounded-xl">
                    <ShieldCheck className="w-5 h-5 text-crimson group-hover:text-white transition-colors" />
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
              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase italic tracking-tighter">{language === 'fr' ? "PRÊT À ROULER?" : 'READY TO ROLL?'}</h3>
              <p className="text-white/50 text-base sm:text-lg leading-relaxed font-medium">{language === 'fr' ? "Parcourez l'inventaire actuel — les autos partent vite, alors ne dormez pas dessus." : 'Browse the current inventory — cars move fast, so don\'t sleep on them.'}</p>
              <div className="space-y-6 sm:space-y-8">
                <div className="p-6 sm:p-8 bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl">
                  <p className="text-4xl sm:text-5xl font-black text-white mb-2 tracking-tighter italic">{carData.length}</p>
                  <p className="text-[10px] font-black text-white/30 uppercase tracking-[.4em]">{language === 'fr' ? 'AUTOS DISPONIBLES MAINTENANT' : 'CARS AVAILABLE RIGHT NOW'}</p>
                </div>
                <div className="p-6 sm:p-8 bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl">
                  <p className="text-4xl sm:text-5xl font-black text-white mb-2 tracking-tighter italic">100%</p>
                  <p className="text-[10px] font-black text-white/30 uppercase tracking-[.4em]">{language === 'fr' ? 'INSPECTÉES AVANT AFFICHAGE' : 'INSPECTED BEFORE LISTING'}</p>
                </div>
              </div>
              <Button
                className="w-full py-5 sm:py-8 crimson-bg text-white font-black text-lg sm:text-2xl uppercase tracking-widest rounded-none shadow-[0_20px_50px_rgba(220,38,38,0.3)] hover:scale-[1.01] transition-all border-none"
                asChild
              >
                <Link to="/inventory">{language === 'fr' ? "VOIR L'INVENTAIRE" : 'BROWSE INVENTORY'}</Link>
              </Button>
            </div>
          </SectionReveal>
        </div>
      </div>
    </div>
  );
};

// --- Call modal: hero "Call" button opens a name+phone form first.
// On submit the lead goes to BOTH inboxes, then the phone call is placed.
const CallModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setSending(true);
    // Fire the lead without awaiting: awaiting would break the user-gesture
    // chain and mobile browsers would block the tel: navigation below.
    // The page stays alive behind the phone app, so the request completes.
    submitLead(
      { name: name.trim(), phone: phone.trim(), source: 'hero_call_button' },
      '📞 Call request — AK Flips website'
    ).catch(() => {
      // Lead failed to send — the call still goes through.
    });
    onClose();
    window.location.href = SITE.phoneHref;
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ scale: 0.92, y: 24 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 24 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="relative glass rounded-2xl p-6 sm:p-8 w-full max-w-sm max-h-[90dvh] overflow-y-auto border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.8)]"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 rounded-full crimson-bg flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(220,38,38,0.4)]">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">{t('callModal.title')}</h3>
            <p className="text-white/50 text-sm mt-1 mb-6">{t('callModal.subtitle')}</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder={t('callModal.name')}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-white/5 border-white/15 text-white placeholder:text-white/30 h-12 text-base"
              />
              <Input
                placeholder={t('callModal.phone')}
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="bg-white/5 border-white/15 text-white placeholder:text-white/30 h-12 text-base"
              />
              <Button
                type="submit"
                disabled={sending}
                className="w-full crimson-bg rounded-none font-black text-base py-6 hover:bg-red-700 transition-all border-none"
              >
                <Phone className="w-5 h-5 mr-2" />
                {sending ? t('callModal.sending') : t('callModal.submit')}
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Home = () => {
  const featuredCars = carData.slice(0, 5);
  const { t, language } = useLanguage();
  const [callOpen, setCallOpen] = useState(false);
  const steps = translations[language].process.steps;
  const stepIcons = [Search, Wrench, KeyRound];

  return (
    <div className="space-y-0 pt-16 sm:pt-20 overflow-x-hidden relative">
      {/* Hero */}
      <section className="h-auto min-h-[auto] py-16 sm:h-[calc(100vh-80px)] sm:min-h-[750px] md:min-h-[850px] md:pb-40 lg:min-h-[700px] lg:pb-0 flex items-center px-4 sm:px-10 gap-12 relative w-full z-10 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 opacity-100 hidden sm:block">
            <Plasma color="#DC2626" speed={0.6} scale={1.2} opacity={0.3} mouseInteractive={true} />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#1a1a1a_90%)]" />
        </div>
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12 w-full h-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full lg:w-1/2 space-y-6 sm:space-y-10 text-center lg:text-left lg:pt-0 md:mb-12 lg:mb-0 relative z-20"
          >
            <div className="inline-block px-3 py-1 glass rounded text-[10px] sm:text-xs font-bold uppercase tracking-widest crimson-text shadow-[0_0_20px_rgba(220,38,38,0.2)]">
              {t('hero.tag')}
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.95] tracking-tighter text-white uppercase pointer-events-none">
              {t('hero.title_part1')}<br /> <span className="crimson-text text-glow italic">{t('hero.title_extraordinary')}</span>
            </h1>
            <p className="text-white/60 text-base sm:text-xl max-w-md mx-auto lg:mx-0 leading-relaxed font-medium">
              {t('hero.description')}
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 pt-4">
              <Button
                size="lg"
                className="px-6 sm:px-10 py-4 sm:py-7 crimson-bg rounded-none font-black text-base sm:text-xl hover:bg-red-700 transition-all hover:scale-105 border-none shadow-[0_20px_50px_rgba(220,38,38,0.3)]"
                asChild
              >
                <Link to="/inventory">{t('hero.cta_showroom')}</Link>
              </Button>
              <Button
                size="lg"
                className="px-6 sm:px-10 py-4 sm:py-7 glass rounded-none font-black text-base sm:text-xl hover:bg-white/10 border-white/20 bg-transparent text-white transition-all"
                asChild
              >
                <Link to="/how-it-works">{t('hero.cta_learn')}</Link>
              </Button>
              <Button
                size="lg"
                onClick={() => setCallOpen(true)}
                className="px-6 sm:px-10 py-4 sm:py-7 rounded-none font-black text-base sm:text-xl bg-white text-black hover:bg-white/85 transition-all hover:scale-105 border-none"
              >
                <Phone className="w-5 h-5 mr-2" />
                {t('hero.cta_call')}
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
              src="/cars/nissan-rogue-2016.jpg"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
              alt="2016 Nissan Rogue SV"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-16 left-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 1 }}
              >
                <p className="text-sm crimson-text font-black uppercase tracking-[.4em] mb-2">{t('detail.just_flipped')}</p>
                <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter">2016 NISSAN ROGUE <br /> SV — $12,900</h3>
              </motion.div>
            </div>
            <Link to="/cars/5" className="absolute top-10 right-10 w-20 h-20 glass rounded-full flex items-center justify-center animate-pulse border border-white/20 hover:crimson-bg transition-colors">
              <ArrowRight className="w-8 h-8 text-white -rotate-45" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <SectionReveal>
        <section className="bg-black/60 backdrop-blur-xl pt-2 pb-8 sm:py-24 md:pt-96 md:pb-48 lg:py-20 border-y border-white/10">
          <div className="container mx-auto px-4 sm:px-6 flex flex-wrap justify-center lg:justify-between items-center gap-8 sm:gap-12 lg:gap-0">
            {[
              { labelEn: 'Cars Flipped', labelFr: 'Autos revendues', value: 120, suffix: '+' },
              { labelEn: 'Happy Drivers', labelFr: 'Conducteurs heureux', value: 120, suffix: '+' },
              { labelEn: 'Google Rating', labelFr: 'Note Google', value: 4.9, suffix: '/5', decimals: 1 },
              { labelEn: 'Avg. Days Listed', labelFr: 'Jours en vente (moy.)', value: 9, suffix: '' },
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
                  {language === 'fr' ? stat.labelFr : stat.labelEn}
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
            <h3 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter uppercase">{language === 'fr' ? 'En stock' : 'On The Lot'} <span className="crimson-text italic">{language === 'fr' ? 'maintenant' : 'Now'}</span></h3>
          </div>
          <Link to="/inventory" className="text-white hover:text-crimson font-black text-[10px] sm:text-sm uppercase tracking-widest flex items-center transition-all group px-4 py-2 glass border-none mb-4 sm:mb-0">
            {t('car_card.full_collection')} <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-3" />
          </Link>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
          {featuredCars.map((car) => (
            <SectionReveal key={car.id}>
              <CarCard car={car} />
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* How It Works teaser */}
      <section id="process" className="py-32 sm:py-40 relative px-4 sm:px-6 overflow-hidden border-t border-white/5">
        <div className="container mx-auto">
          <div className="space-y-20 sm:space-y-32">
            <SectionReveal className="text-center max-w-4xl mx-auto space-y-4 sm:space-y-6">
              <h2 className="text-[10px] sm:text-xs font-black text-crimson uppercase tracking-[0.5em]">{t('process.tag')}</h2>
              <h3 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-tight">{t('process.title')} <br /><span className="crimson-text italic">{t('process.title_accent')}</span></h3>
              <p className="text-base sm:text-xl text-white/40 font-medium leading-relaxed">{t('process.description')}</p>
            </SectionReveal>

            <div className="mt-12">
              <SectionReveal>
                <MagicBento
                  items={steps.map((s) => ({ label: t('process.tag').toUpperCase(), title: s.title.toUpperCase(), description: s.desc }))}
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

            <SectionReveal className="text-center">
              <Button size="lg" className="px-10 sm:px-14 py-4 sm:py-6 crimson-bg rounded-none font-black text-base sm:text-lg hover:bg-red-700 transition-all hover:scale-105 border-none uppercase tracking-tighter" asChild>
                <Link to="/how-it-works">{t('process.cta')} <ArrowRight className="ml-2 w-5 h-5 inline" /></Link>
              </Button>
            </SectionReveal>
          </div>

          {/* Flipper steps cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10 mt-24 sm:mt-32">
            {steps.map((step, i) => {
              const Icon = stepIcons[i % stepIcons.length];
              return (
                <SectionReveal key={i} className="glass p-8 sm:p-10 rounded-2xl space-y-5 hover:border-crimson/50 hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
                  <div className="text-5xl font-black text-white/5 group-hover:text-crimson/20 transition-colors italic absolute top-4 right-6">0{i + 1}</div>
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-crimson group-hover:crimson-bg group-hover:text-white transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-black text-white uppercase tracking-tight">{step.title}</h4>
                  <p className="text-white/40 leading-relaxed font-medium">{step.desc}</p>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-60 relative overflow-hidden bg-black flex items-center justify-center text-center">
        <div className="absolute inset-0 opacity-20">
          <img src="/cars/toyota-corolla-2018.jpg" className="w-full h-full object-cover grayscale" loading="lazy" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-black to-charcoal" />

        <SectionReveal className="relative z-10 max-w-5xl px-6 space-y-12">
          <h2 className="text-6xl md:text-9xl font-black text-white tracking-tighter uppercase leading-[0.9]">{language === 'fr' ? 'VOTRE PROCHAINE AUTO' : 'YOUR NEXT CAR'} <br /><span className="crimson-text text-glow italic">{language === 'fr' ? 'EST DÉJÀ PRÊTE' : 'IS ALREADY FLIPPED'}</span></h2>
          <p className="text-2xl text-white/40 max-w-3xl mx-auto font-medium">
            {language === 'fr' ? "Les bonnes autos partent vite. Écrivez-nous avant qu'elle soit vendue." : 'Good cars move fast. Message us before someone else drives it home.'}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-8">
            <Button
              size="lg"
              className="px-16 py-10 crimson-bg text-white font-black text-2xl rounded-none shadow-[0_20px_60px_rgba(220,38,38,0.4)] hover:scale-110 transition-all border-none"
              asChild
            >
              <Link to="/#contact">{language === 'fr' ? 'NOUS CONTACTER' : 'CONTACT AK'}</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-16 py-10 border-white/20 text-white hover:bg-white hover:text-black font-black text-2xl rounded-none transition-all"
              asChild
            >
              <Link to="/inventory">{language === 'fr' ? "VOIR L'INVENTAIRE" : 'BROWSE CARS'}</Link>
            </Button>
          </div>
        </SectionReveal>
      </section>

      <TrustSection />
      <TestimonialSection />
      <ContactSection />
      <CallModal open={callOpen} onClose={() => setCallOpen(false)} />
    </div>
  );
};

const Inventory = () => {
  const { t, language } = useLanguage();
  const [filteredCars, setFilteredCars] = useState(carData);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 30000]);
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

  const carTypes = ['All', 'SUV', 'Sedan'];

  return (
    <div className="pt-20 sm:pt-40 pb-20 container mx-auto px-4 sm:px-10">
      <SectionReveal className="mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-2 sm:mb-4 uppercase">{language === 'fr' ? "NOTRE" : 'CURRENT'} <span className="crimson-text uppercase">{t('nav.inventory')}</span></h1>
        <p className="text-white/50 text-base sm:text-lg font-medium">{language === 'fr' ? `Parcourez nos ${carData.length} autos disponibles — inspectées et prêtes à partir.` : `Browse our ${carData.length} available cars — inspected and ready to go.`}</p>
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
                    type
                ) : (type === 'All' ? t('filters.all') : type)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 w-full space-y-2 sm:space-y-4 pt-1">
          <div className="flex justify-between items-end mb-1">
            <label className="text-[10px] uppercase font-black text-white opacity-40 tracking-[.2em]">{language === 'fr' ? 'Prix Max' : 'Max Price'}</label>
            <span className="text-lg sm:text-xl font-black crimson-text">${(priceRange[1] / 1000).toFixed(0)}k</span>
          </div>
          <div className="relative pt-4 sm:pt-6">
            <ElasticSlider
              value={priceRange[1]}
              startingValue={0}
              maxValue={30000}
              isStepped={true}
              stepSize={500}
              onChange={(val) => setPriceRange([0, val])}
            />
          </div>
        </div>

        <Button className="h-12 sm:h-14 px-8 sm:px-12 crimson-bg rounded-none font-black text-base sm:text-lg hover:bg-red-700 transition-all hover:scale-105 shadow-[0_10px_30px_rgba(220,38,38,0.3)] border-none uppercase tracking-tighter">
          {filteredCars.length} {language === 'fr' ? 'Résultats' : 'Results'}
        </Button>
      </SectionReveal>

      {filteredCars.length === 0 ? (
        <div className="text-center py-20 text-white/40">
          <p className="text-xl font-bold uppercase tracking-widest">{language === 'fr' ? 'Aucune auto ne correspond à votre recherche.' : 'No cars match your search.'}</p>
          <p className="mt-2">{language === 'fr' ? 'Essayez d’élargir vos filtres.' : 'Try widening your filters.'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
          {filteredCars.map((car) => (
            <SectionReveal key={car.id}>
              <CarCard car={car} />
            </SectionReveal>
          ))}
        </div>
      )}
    </div>
  );
};

const CarDetail = () => {
  const { id } = useParams<{ id: string }>();
  const car = carData.find(c => c.id === id);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [partial, setPartial] = useState(false);
  const { language } = useLanguage();

  if (!car) return <div className="pt-40 text-center h-screen text-white">{language === 'fr' ? 'Auto non trouvée' : 'Car not found'}</div>;

  const description = language === 'fr' && car.descriptionFr ? car.descriptionFr : car.description;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPartial(false);
    setFormStatus('loading');

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const payload = Object.fromEntries(formData.entries());

    try {
      const result = await submitLead(payload, `Car inquiry — ${car.year} ${car.make} ${car.model} — AK Flips`);
      setPartial(result.partial);
      setFormStatus('success');
    } catch (error) {
      console.error('FormSubmit failed:', error);
      setFormStatus('error');
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
                alt={`${car.year} ${car.make} ${car.model}`}
              />
            </motion.div>
          </div>

          {/* Details */}
          <div className="space-y-10">
            <div className="glass p-6 sm:p-8 rounded-2xl border-white/5">
              <div className="flex items-center space-x-3 mb-4">
                <Badge className="crimson-bg text-white rounded px-2 py-0.5 text-[10px] uppercase font-bold tracking-widest border-none">{car.year}</Badge>
                <div className="text-[9px] sm:text-[10px] uppercase font-bold text-white/40 tracking-wider font-mono">{language === 'fr' ? 'Inspectée et prête' : 'Inspected & Ready'}</div>
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter mb-4 uppercase italic leading-[0.9]">{car.make} <br /> <span className="crimson-text">{car.model}</span></h1>
              <p className="text-3xl sm:text-4xl font-black text-white italic drop-shadow-[0_0_15px_rgba(220,38,38,0.3)] mb-8">${car.price.toLocaleString()}</p>

              <div className="grid grid-cols-2 gap-4 sm:gap-8 py-8 border-t border-white/10">
                <div className="space-y-1">
                  <p className="text-white/40 uppercase font-bold text-[9px] sm:text-[10px] tracking-widest">{language === 'fr' ? 'Kilométrage' : 'Mileage'}</p>
                  <p className="text-base sm:text-lg text-white font-bold">{car.mileage.toLocaleString()} km</p>
                </div>
                <div className="space-y-1">
                  <p className="text-white/40 uppercase font-bold text-[9px] sm:text-[10px] tracking-widest leading-none mb-1">{language === 'fr' ? 'Carburant' : 'Fuel'}</p>
                  <p className="text-base sm:text-lg text-white font-black">{language === 'fr' ? 'Essence' : car.fuel}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-white/40 uppercase font-bold text-[9px] sm:text-[10px] tracking-widest leading-none mb-1">{language === 'fr' ? 'Transmission' : 'Transmission'}</p>
                  <p className="text-base sm:text-lg text-white font-black">{language === 'fr' ? 'Automatique' : car.transmission}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-white/40 uppercase font-bold text-[9px] sm:text-[10px] tracking-widest leading-none mb-1">{language === 'fr' ? 'Carrosserie' : 'Body Type'}</p>
                  <p className="text-base sm:text-lg text-white font-black">{car.type}</p>
                </div>
              </div>
            </div>

            <div className="glass p-6 sm:p-8 rounded-2xl space-y-6 sm:space-y-8 border-white/5">
              <div className="space-y-3 sm:space-y-4">
                <h4 className="text-base sm:text-lg font-black text-white uppercase tracking-tighter italic">{language === 'fr' ? 'DESCRIPTION' : 'DESCRIPTION'}</h4>
                <p className="text-white/50 leading-relaxed text-sm sm:text-lg font-medium">{description}</p>
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
            <div className="glass p-5 sm:p-8 rounded-2xl border-white/5 shadow-2xl">
              <h3 className="text-lg sm:text-2xl font-black text-white tracking-tighter mb-4 sm:mb-8 uppercase italic leading-tight">{language === 'fr' ? 'INTÉRESSÉ PAR' : 'INTERESTED IN'} <br /> <span className="crimson-text underline">{language === 'fr' ? 'CETTE AUTO?' : 'THIS CAR?'}</span></h3>
              {formStatus === 'success' ? (
                <div className="bg-crimson/10 border border-crimson/20 text-white p-5 sm:p-10 text-center space-y-4 rounded-xl">
                  <BadgeCheck className="w-10 h-10 sm:w-16 sm:h-16 mx-auto text-crimson" />
                  <p className="font-black text-lg sm:text-2xl tracking-tighter uppercase italic">{language === 'fr' ? 'DEMANDE ENVOYÉE!' : 'INQUIRY SENT!'}</p>
                  <p className="text-xs sm:text-sm text-white/50 font-medium">{language === 'fr' ? 'AK vous contactera sous peu.' : 'AK will contact you shortly.'}</p>
                  <PartialNote partial={partial} />
                </div>
              ) : formStatus === 'error' ? (
                <div className="bg-red-950/40 border border-red-600/30 text-white p-5 sm:p-10 text-center space-y-4 rounded-xl">
                  <CircleAlert className="w-10 h-10 sm:w-16 sm:h-16 mx-auto text-red-400" />
                  <p className="font-black text-lg sm:text-2xl tracking-tighter uppercase italic">{language === 'fr' ? "ÉCHEC DE L'ENVOI" : 'SEND FAILED'}</p>
                  <p className="text-xs sm:text-sm text-white/50 font-medium">{language === 'fr' ? 'Réessayez ou contactez-nous directement.' : 'Try again or reach us directly.'}</p>
                  <Button onClick={() => setFormStatus('idle')} className="crimson-bg border-none rounded-none uppercase font-black tracking-widest">{language === 'fr' ? 'Réessayer' : 'Try Again'}</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                    <div className="space-y-1">
                      <label className="text-[9px] sm:text-[10px] uppercase font-bold text-white/40 tracking-wider font-mono">{language === 'fr' ? 'Votre Nom' : 'Your Name'}</label>
                      <Input name="name" className="bg-white/5 border-white/10 rounded-none px-3 h-10 sm:h-12 focus:border-crimson text-white font-bold" required />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] sm:text-[10px] uppercase font-bold text-white/40 tracking-wider font-mono">{language === 'fr' ? 'Courriel' : 'Email Address'}</label>
                      <Input name="email" type="email" className="bg-white/5 border-white/10 rounded-none px-3 h-10 sm:h-12 focus:border-crimson text-white font-bold" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                    <div className="space-y-1">
                      <label className="text-[9px] sm:text-[10px] uppercase font-bold text-white/40 tracking-wider font-mono">{language === 'fr' ? 'Téléphone' : 'Phone'}</label>
                      <Input name="phone" type="tel" className="bg-white/5 border-white/10 rounded-none px-3 h-10 sm:h-12 focus:border-crimson text-white font-bold" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] sm:text-[10px] uppercase font-bold text-white/40 tracking-wider font-mono">{language === 'fr' ? 'Sujet' : 'Subject'}</label>
                      <div className="relative">
                        <select name="interest" className="w-full bg-white/5 border border-white/10 rounded-none px-3 h-10 sm:h-12 focus:border-crimson text-white appearance-none cursor-pointer outline-none font-bold text-xs sm:text-base">
                          <option className="bg-charcoal" value="Test drive">{language === 'fr' ? 'Essai routier' : 'Test Drive'}</option>
                          <option className="bg-charcoal" value="Buy this car">{language === 'fr' ? 'Acheter cette auto' : 'Buy This Car'}</option>
                          <option className="bg-charcoal" value="Question">{language === 'fr' ? 'Question' : 'Question'}</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
                          <ArrowRight className="w-3 h-3 rotate-90" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1 py-3 border-y border-white/5">
                    <p className="text-[9px] text-white/30 uppercase font-black tracking-widest">{language === 'fr' ? "VÉHICULE D'INTÉRÊT" : 'VEHICLE OF INTEREST'}</p>
                    <p className="text-xs sm:text-base text-white font-black italic">{car.year} {car.make} {car.model} — ${car.price.toLocaleString()}</p>
                    <input type="hidden" name="vehicle" value={`${car.year} ${car.make} ${car.model}`} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] sm:text-[10px] uppercase font-bold text-white/40 tracking-wider font-mono">{language === 'fr' ? 'Message (Optionnel)' : 'Message (Optional)'}</label>
                    <textarea
                      name="message"
                      className="w-full bg-white/5 border border-white/10 p-3 h-20 sm:h-28 rounded-none outline-none text-white focus:border-crimson resize-none font-bold text-xs sm:text-base"
                    />
                  </div>
                  <Button type="submit" disabled={formStatus === 'loading'} className="w-full crimson-bg h-12 sm:h-14 rounded-none font-black text-xs sm:text-base uppercase tracking-[.2em] border-none shadow-2xl hover:scale-[1.02] transition-all">
                    {formStatus === 'loading' ? (language === 'fr' ? 'ENVOI...' : 'SENDING...') : (language === 'fr' ? "JE SUIS INTÉRESSÉ" : "I'M INTERESTED")}
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
              <Route path="/how-it-works" element={
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                  <HowItWorksWrapper />
                </motion.div>
              } />
              <Route path="/financing" element={<Navigate to="/how-it-works" replace />} />
              <Route path="/cars/:id" element={
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                  <CarDetailWrapper />
                </motion.div>
              } />
            </Routes>
          </AnimatePresence>
        </main>

        <Footer />
        <Analytics />
      </div>
    </LanguageProvider>
  );
}

// Wrappers to use useLanguage inside components
const HomeWrapper = () => <Home />;
const InventoryWrapper = () => <Inventory />;
const SellYourCarWrapper = () => <SellYourCar />;
const HowItWorksWrapper = () => <HowItWorks />;
const CarDetailWrapper = () => <CarDetail />;
