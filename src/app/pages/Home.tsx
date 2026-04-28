import { useState } from 'react';
import { Button } from '../components/Button';
import { Calendar, MapPin, Ticket, UtensilsCrossed, Home as HomeIcon, Music, Target, Users, Plus, Minus } from 'lucide-react';
import { motion } from 'motion/react';
import heroBg800 from '../../assets/hero-bg-800.webp';
import heroBg1280 from '../../assets/hero-bg-1280.webp';
import heroBg1920 from '../../assets/hero-bg-1920.webp';
import madScientistImg from '../../assets/theme-mad-scientist.webp';
import halloweenImg from '../../assets/theme-halloween.webp';
import carnivalImg from '../../assets/theme-carnival.webp';
import campSceneImg from '../../assets/camp-scene.webp';

const heroLogoSrc = `${import.meta.env.BASE_URL}brand/full-white-logo.svg`;

export function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "Is this really \"all-inclusive\"?",
      answer: "Yes. Your ticket covers meals, snacks, drinks (including alcohol), accommodation, and all activities. The only thing you need to bring is yourself and a costume or two."
    },
    {
      question: "Do I have to come with friends?",
      answer: "Not at all. Plenty of campers come solo and leave with lifelong friends. The whole weekend is designed to help you connect."
    },
    {
      question: "What time do we arrive and leave?",
      answer: "Arrive from 4pm Friday. Depart by 1pm Monday."
    },
    {
      question: "Refunds?",
      answer: "Please refer to our terms on the Humanitix booking page, or get in touch with us directly."
    }
  ];

  const inclusions = [
    { icon: UtensilsCrossed, text: "All meals, snacks, and drinks (yes, the bar's on us)" },
    { icon: HomeIcon, text: "Shared cabin accommodation (private upgrades available)" },
    { icon: Music, text: "Three days & nights of activities, parties, and pure nostalgia" },
    { icon: Target, text: "Pool, zipline, archery, giant swing, slip 'n' slide kickball, arts & crafts, and more" },
    { icon: Users, text: "A supportive, welcoming community where everyone belongs" }
  ];

  const themedNights = [
    { day: "Friday", theme: "The Mad Scientist", image: madScientistImg },
    { day: "Saturday", theme: "Halloween", image: halloweenImg },
    { day: "Sunday", theme: "Carnival", image: carnivalImg }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-40">
        {/* Hero Image Background — responsive <picture> for proper srcset */}
        <picture>
          <source
            type="image/webp"
            srcSet={`${heroBg800} 800w, ${heroBg1280} 1280w, ${heroBg1920} 1920w`}
            sizes="100vw"
          />
          <img
            src={heroBg1280}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            fetchPriority="high"
          />
        </picture>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-10 mx-auto w-full"
            style={{ maxWidth: '360px', height: 'auto', aspectRatio: '1235.54 / 1213.63' }}
          >
            <img src={heroLogoSrc} alt="Afterhours" className="w-full h-auto" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-10 max-w-3xl mx-auto leading-relaxed text-[20px]"
          >
            Three nights. One epic weekend. School camp nostalgia with grown-up freedom: play hard, laugh loud, connect, and unwind.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pb-20"
          >
            <Button to="/tickets" variant="primary">Get Tickets</Button>
            <Button
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
              variant="outline"
            >
              Learn More
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Quote Banner */}
      <section className="relative bg-gradient-to-b from-[#FBB040] via-[#EA0A8C] to-[#050B2F] py-20 px-4 overflow-hidden">
        {/* Animated Stars */}
        <div className="absolute inset-0 opacity-60">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: Math.random() * 3 + 1 + 'px',
                height: Math.random() * 3 + 1 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out ${Math.random() * 3}s infinite`,
                boxShadow: '0 0 4px rgba(255, 255, 255, 0.8)'
              }}
            />
          ))}
          <style>{`
            @keyframes twinkle {
              0%, 100% { opacity: 0.2; transform: scale(0.8); }
              50% { opacity: 1; transform: scale(1.2); }
            }
          `}</style>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2
            className="text-4xl md:text-6xl text-white mb-6 drop-shadow-lg"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Play by Day, Party by Night
          </h2>
          <p className="text-xl text-white/95 italic drop-shadow">
            "We don't grow out of play. We grow up and forget."
          </p>
        </div>
      </section>

      {/* Key Details Strip */}
      <section className="py-16 px-4 bg-[#050b2f]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <Calendar className="mx-auto mb-4 text-[#FBB040]" size={48} />
            <h3 className="text-xl mb-2" style={{ fontFamily: 'var(--font-display)' }}>Dates</h3>
            <p className="text-[#1C325A]">Fri 30 Oct (4pm) – Mon 2 Nov 2026 (1pm)</p>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <MapPin className="mx-auto mb-4 text-[#EA0A8C]" size={48} />
            <h3 className="text-xl mb-2" style={{ fontFamily: 'var(--font-display)' }}>Location</h3>
            <p className="text-[#1C325A]">
              Bayview Adventure Camp<br />
              Grantville, Victoria
            </p>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <Ticket className="mx-auto mb-4 text-[#FBB040]" size={48} />
            <h3 className="text-xl mb-2" style={{ fontFamily: 'var(--font-display)' }}>Tickets</h3>
            <p className="text-[#1C325A]">Early Bird $795 — ends 1 June<br />Secure checkout via Humanitix</p>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-20 px-4 bg-[#ffffff]">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-5xl md:text-6xl text-center mb-4 bg-gradient-to-r from-[#FBB040] to-[#EA0A8C] bg-clip-text text-transparent"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            What's Included
          </h2>
          <p className="text-center text-xl text-[#1C325A] mb-12 max-w-2xl mx-auto">
            Your ticket covers the full camp experience for the weekend.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inclusions.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#EEEEEF] rounded-xl p-6 flex items-start gap-4"
              >
                <div className="bg-gradient-to-br from-[#FBB040] to-[#EA0A8C] p-3 rounded-lg flex-shrink-0">
                  <item.icon className="text-white" size={28} />
                </div>
                <p className="text-[#1C325A] text-lg pt-2">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Themed Nights Section */}
      <section className="py-20 px-4 relative overflow-hidden bg-[#050B2F]">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-5xl md:text-6xl text-center mb-4 bg-gradient-to-r from-[#FBB040] to-[#EA0A8C] bg-clip-text text-transparent"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Themed Nights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {themedNights.map((night, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative rounded-2xl overflow-hidden shadow-xl"
              >
                <div className="aspect-[4/5] relative">
                  <img
                    src={night.image}
                    alt={night.theme}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="text-sm uppercase tracking-wider mb-2 text-[#FBB040]">{night.day}</p>
                    <h3
                      className="text-3xl"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {night.theme}
                    </h3>
                  </div>
                </div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#FBB040] transition-all duration-300 rounded-2xl"></div>
              </motion.div>
            ))}
          </div>
          <p className="text-center mt-12 text-lg text-[#ffffff]">
            Want to come solo? Perfect. Plenty of campers do.
          </p>
        </div>
      </section>

      {/* Why Come to Afterhours Section */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                className="text-5xl md:text-6xl mb-6 bg-gradient-to-r from-[#FBB040] to-[#EA0A8C] bg-clip-text text-transparent"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Why Afterhours?
              </h2>
              <p className="text-lg text-[#1C325A] mb-6 leading-relaxed">
                Because adults need recess too. Because you deserve a weekend that's just for you — no emails, no dishes, no adulting. Because this camp is full of laughter, connection, and moments that'll live rent-free in your memory forever.
              </p>
              <p className="text-lg text-[#1C325A] leading-relaxed">
                We've built this event for people who crave more than just another weekend away. It's a reset button for your soul.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={campSceneImg}
                alt="Campfire scene"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2
            className="text-5xl md:text-6xl text-center mb-12 bg-gradient-to-r from-[#FBB040] to-[#EA0A8C] bg-clip-text text-transparent"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Questions?
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-[#EEEEEF] rounded-xl overflow-hidden shadow-md">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors bg-[#ededed00]"
                >
                  <span className="text-lg text-[#1C325A] pr-4">{faq.question}</span>
                  {openFaq === index ? (
                    <Minus className="text-[#EA0A8C] flex-shrink-0" size={24} />
                  ) : (
                    <Plus className="text-[#FBB040] flex-shrink-0" size={24} />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-5 pt-2">
                    <p className="text-[#1C325A] leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative bg-gradient-to-b from-[#FBB040] via-[#EA0A8C] to-[#050B2F] py-20 px-4 overflow-hidden">
        {/* Animated Stars */}
        <div className="absolute inset-0 opacity-60">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: Math.random() * 3 + 1 + 'px',
                height: Math.random() * 3 + 1 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out ${Math.random() * 3}s infinite`,
                boxShadow: '0 0 4px rgba(255, 255, 255, 0.8)'
              }}
            />
          ))}
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2
            className="text-5xl md:text-6xl text-white mb-6 drop-shadow-lg"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Ready to Join Us?
          </h2>
          <p className="text-xl text-white mb-10 drop-shadow">
            Lock in your spot. Then start planning your costume.
          </p>
          <Button to="/tickets" variant="secondary">
            Get Tickets
          </Button>
        </div>
      </section>
    </div>
  );
}
