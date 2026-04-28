import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import useScrollReveal from '../../hooks/useScrollReveal';

const GALLERY_IMAGES = [
  { src: '/images/idli_platter.png', alt: 'Soft Idli with Sambar', span: 'row-span-2' },
  { src: '/images/masala_dosa.png', alt: 'Masala Dosa closeup' },
  { src: '/images/medu_vada.png', alt: 'Medu Vada' },
  { src: '/images/filter_coffee.png', alt: 'Filter Coffee' },
  { src: '/images/hero_bg.png', alt: 'Set Dosa' },
  { src: '/images/chef_cooking.png', alt: 'Chef cooking', span: 'col-span-2' },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);
  useScrollReveal();

  return (
    <section id="gallery" className="py-28 bg-white">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <p className="section-label mb-3">A Visual Feast</p>
          <h2 className="section-title mb-5">Our Gallery</h2>
          <div className="section-divider mx-auto mb-6" />
          <p className="font-body text-charcoal/55 max-w-md mx-auto text-sm leading-relaxed">
            A glimpse into our kitchen — where tradition and craft come alive on every plate.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 reveal">
          {GALLERY_IMAGES.map((img, i) => (
            <div
              key={i}
              id={`gallery-img-${i}`}
              onClick={() => setLightbox(img)}
              className={`relative group overflow-hidden rounded-2xl cursor-pointer 
                ${img.span || ''} 
                ${img.span === 'row-span-2' ? 'h-full min-h-[360px]' : 'h-52 md:h-60'}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-3 group-hover:translate-y-0">
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-float">
                    <ZoomIn size={20} className="text-spice" />
                  </div>
                </div>
              </div>
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="font-body text-white text-sm font-medium">{img.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-charcoal/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
          style={{ animation: 'fadeIn 0.3s ease' }}
        >
          <button
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X size={20} />
          </button>
          <img
            src={lightbox.src.replace('w=800', 'w=1400')}
            alt={lightbox.alt}
            className="max-h-[88vh] max-w-full w-auto object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-6 left-0 right-0 text-center text-white/70 font-body text-sm">{lightbox.alt}</p>
        </div>
      )}
    </section>
  );
}
