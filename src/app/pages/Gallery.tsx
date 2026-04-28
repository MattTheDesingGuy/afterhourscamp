import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

// Auto-discover gallery images. Drop a .webp into src/assets/gallery/<year>/
// and it will appear without code changes.
const galleryModules = import.meta.glob<string>('../../assets/gallery/*/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
});

type YearFolder = { year: string; images: string[] };

function buildYearFolders(): YearFolder[] {
  const byYear = new Map<string, string[]>();
  for (const [path, url] of Object.entries(galleryModules)) {
    const match = path.match(/\/gallery\/([^/]+)\//);
    if (!match) continue;
    const year = match[1];
    if (!byYear.has(year)) byYear.set(year, []);
    byYear.get(year)!.push(url);
  }
  // Sort each year's images by path (stable, alphabetical) and sort years newest-first.
  for (const list of byYear.values()) list.sort();
  return Array.from(byYear.entries())
    .map(([year, images]) => ({ year, images }))
    .sort((a, b) => b.year.localeCompare(a.year));
}

export function Gallery() {
  const yearFolders = useMemo(buildYearFolders, []);
  const [selectedYear, setSelectedYear] = useState<string>(yearFolders[0]?.year ?? '');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const currentYearData = yearFolders.find(folder => folder.year === selectedYear);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#FBB040] via-[#EA0A8C] to-[#050B2F] pt-40 pb-20 px-4 overflow-hidden">
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
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1
            className="text-5xl md:text-7xl text-white mb-6 drop-shadow-lg"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Gallery
          </h1>
          <p className="text-xl text-white/95 drop-shadow max-w-2xl mx-auto">
            {selectedYear
              ? `Relive the memories from ${selectedYear}`
              : 'Glimpses of the magic, memories, and mayhem from past camps'
            }
          </p>
        </div>
      </section>

      {/* Gallery Content Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Year Filter Menu */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {yearFolders.map((folder) => (
              <button
                key={folder.year}
                onClick={() => {
                  setSelectedYear(folder.year);
                  setSelectedImage(null);
                }}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  selectedYear === folder.year
                    ? 'bg-gradient-to-r from-[#FBB040] to-[#EA0A8C] text-white shadow-lg scale-105'
                    : 'bg-[#EEEEEF] text-[#1C325A] hover:bg-[#FBB040] hover:text-white'
                }`}
              >
                {folder.year}
              </button>
            ))}
          </div>

          {/* Images Grid View */}
          {currentYearData && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentYearData.images.map((src, index) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg cursor-pointer"
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && currentYearData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-[#FBB040] transition-colors"
              onClick={() => setSelectedImage(null)}
              aria-label="Close lightbox"
            >
              <X size={40} />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-w-5xl max-h-[90vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={currentYearData.images[selectedImage]}
                alt=""
                className="w-full h-full object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
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
            Be Part of the Story
          </h2>
          <p className="text-xl text-white mb-10 drop-shadow">
            These could be your memories. Join us at Afterhours.
          </p>
          <Link
            to="/tickets"
            className="inline-block bg-white text-[#EA0A8C] px-8 py-4 rounded-full text-lg hover:bg-[#EEEEEF] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Get Your Tickets
          </Link>
        </div>
      </section>
    </div>
  );
}
