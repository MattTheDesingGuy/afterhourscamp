import { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '../components/Button';
import { Mail, Phone, MessageCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xzdylokk';

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        const data = await res.json().catch(() => null);
        const msg = data?.errors?.[0]?.message || `Submission failed (${res.status}). Please try again or email us directly.`;
        setStatus('error');
        setErrorMsg(msg);
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try again or email us directly.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
            Get in Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white drop-shadow"
          >
            Got a question, want to chat, or just want to say g'day? We'd love to hear from you.
          </motion.p>
        </div>
      </section>

      {/* Contact Details */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-[#FBB040]/10 to-[#EA0A8C]/10 rounded-2xl p-8 text-center"
            >
              <div className="bg-gradient-to-br from-[#FBB040] to-[#EA0A8C] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="text-white" size={32} />
              </div>
              <h3 className="text-xl mb-3 text-[#1C325A]">Email Us</h3>
              <a 
                href="mailto:afterhourscamp1@gmail.com"
                className="text-lg text-[#EA0A8C] hover:text-[#FBB040] transition-colors"
              >
                afterhourscamp1@gmail.com
              </a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-[#FBB040]/10 to-[#EA0A8C]/10 rounded-2xl p-8 text-center"
            >
              <div className="bg-gradient-to-br from-[#FBB040] to-[#EA0A8C] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="text-white" size={32} />
              </div>
              <h3 className="text-xl mb-3 text-[#1C325A]">Call Us</h3>
              <a 
                href="tel:0402510836"
                className="text-lg text-[#EA0A8C] hover:text-[#FBB040] transition-colors"
              >
                0402 510 836
              </a>
            </motion.div>
          </div>

          <p className="text-center text-gray-600 mb-12">
            We usually reply within 24 hours.
          </p>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#EEEEEF] rounded-2xl p-8 md:p-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <MessageCircle className="text-[#EA0A8C]" size={32} />
              <h2 
                className="text-3xl bg-gradient-to-r from-[#FBB040] to-[#EA0A8C] bg-clip-text text-transparent"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Send us a message
              </h2>
            </div>

            {status === 'success' ? (
              <div className="bg-white rounded-lg p-8 text-center">
                <CheckCircle2 className="text-[#EA0A8C] mx-auto mb-4" size={56} />
                <h3 className="text-2xl text-[#1C325A] mb-2">Message sent!</h3>
                <p className="text-[#1C325A] mb-6">
                  Thanks — we'll get back to you soon.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="text-[#EA0A8C] hover:text-[#FBB040] underline transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-[#1C325A] mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={status === 'submitting'}
                    className="w-full px-4 py-3 rounded-lg bg-white border-2 border-transparent focus:border-[#FBB040] focus:outline-none transition-colors disabled:opacity-60"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-[#1C325A] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={status === 'submitting'}
                    className="w-full px-4 py-3 rounded-lg bg-white border-2 border-transparent focus:border-[#FBB040] focus:outline-none transition-colors disabled:opacity-60"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-[#1C325A] mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    disabled={status === 'submitting'}
                    className="w-full px-4 py-3 rounded-lg bg-white border-2 border-transparent focus:border-[#FBB040] focus:outline-none transition-colors resize-none disabled:opacity-60"
                    placeholder="What's on your mind?"
                  />
                </div>

                {status === 'error' && (
                  <div role="alert" className="bg-red-50 border border-red-200 text-red-800 rounded-lg px-4 py-3 text-sm">
                    {errorMsg}
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full md:w-auto"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? 'Sending…' : 'Send Message'}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* FAQ Link */}
      <section className="bg-white py-16 px-4 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-[#1C325A] mb-4">
            Looking for answers?{' '}
            <Link
              to="/#faq"
              className="text-[#EA0A8C] hover:text-[#FBB040] transition-colors underline"
            >
              Check our FAQ on the home page
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Bottom CTA */}
      
    </div>
  );
}