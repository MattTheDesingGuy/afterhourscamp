import React from 'react';
import { Button } from '../components/Button';
import { Check, Users, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

export function Tickets() {
  const inclusions = [
    "All meals, snacks & drinks (bar included)",
    "Shared cabin accommodation (private upgrades available)",
    "Three days & nights of activities and themed parties",
    "Themed Nights: Friday – The Mad Scientist | Saturday – Halloween | Sunday – Carnival",
    "Pool, zipline, archery, giant swing, slip 'n' slide kickball, arts & crafts, and more",
    "Supportive, inclusive community"
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#FBB040] via-[#EA0A8C] to-[#050B2F] py-32 px-4 overflow-hidden">
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
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl text-white mb-6 drop-shadow-lg"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Get Your Tickets
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl text-white mb-4 drop-shadow"
          >
            Afterhours Camp 2026 — Adults Need Recess Too!
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-white/95 drop-shadow"
          >
            Fri 30 Oct – Mon 2 Nov 2026 • Camp Kiah, Grantville VIC
          </motion.p>
        </div>
      </section>

      {/* Ticket Card */}
      <section className="bg-[#050B2F] py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden border-t-8 border-gradient"
            style={{
              borderImage: 'linear-gradient(to right, #FBB040, #EA0A8C) 1'
            }}
          >
            <div className="p-8 md:p-12">
              <div className="text-center mb-8">
                <h2
                  className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-[#FBB040] to-[#EA0A8C] bg-clip-text text-transparent"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  General Admission
                </h2>
                <div className="inline-block bg-gradient-to-r from-[#FBB040] to-[#EA0A8C] text-white text-sm uppercase tracking-wider px-4 py-1 rounded-full mb-3">
                  Early Bird — ends 1 June
                </div>
                <div className="flex items-baseline justify-center gap-2 mb-1">
                  <span className="text-5xl text-[#1C325A]">$795</span>
                  <span className="text-xl text-gray-500 line-through">$895</span>
                </div>
                <p className="text-sm text-gray-600">+ booking fee · price returns to $895 from 2 June</p>
              </div>

              <div className="mb-8">
                <p className="text-lg text-[#1C325A] leading-relaxed">
                  Come for the games, stay for the vibes. This ticket gives you access to the full Afterhours Camp weekend — activities, themed nights, entertainment, and all the fun that comes with adult recess.
                </p>
              </div>

              <Button 
                href="https://events.humanitix.com/ck-afterhours-2026/tickets" 
                variant="primary" 
                className="w-full !text-xl !py-4"
              >
                Buy Now!
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What's Included Recap */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h3 
            className="text-4xl md:text-5xl text-center mb-12 bg-gradient-to-r from-[#FBB040] to-[#EA0A8C] bg-clip-text text-transparent"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            What's Included
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inclusions.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-3 bg-[#EEEEEF] rounded-lg p-4 shadow-sm"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-[#FBB040] to-[#EA0A8C] flex items-center justify-center mt-1">
                  <Check className="text-white" size={16} />
                </div>
                <p className="text-[#1C325A]">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solo Camper Callout */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#FBB040]/10 to-[#EA0A8C]/10 rounded-2xl p-8 border-l-4 border-gradient"
            style={{
              borderImage: 'linear-gradient(to bottom, #FBB040, #EA0A8C) 1'
            }}
          >
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-[#FBB040] to-[#EA0A8C] p-3 rounded-lg flex-shrink-0">
                <Users className="text-white" size={28} />
              </div>
              <div>
                <h4 className="text-xl mb-2 text-[#1C325A]">Coming solo?</h4>
                <p className="text-[#1C325A] leading-relaxed">
                  You're in great company. Plenty of campers arrive on their own and leave with lifelong friends.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      
    </div>
  );
}