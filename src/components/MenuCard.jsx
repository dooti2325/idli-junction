import { useState } from 'react';
import { FALLBACK_IMAGE } from '../data/menu';

export default function MenuCard({ item }) {
  const [imgError, setImgError] = useState(false);
  const orderText = encodeURIComponent(`Hi Idli Junction, I would like to order ${item.name}.`);
  const orderHref = `https://wa.me/919209521933?text=${orderText}`;

  return (
    <article className="menu-card group flex flex-col h-full">
      {/* Image */}
      <div className="relative h-52 overflow-hidden flex-shrink-0">
        <img
          src={imgError ? FALLBACK_IMAGE : item.image}
          alt={item.name}
          loading="lazy"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient overlay on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category badge */}
        <span className="absolute top-3.5 left-3.5 badge">
          {item.category}
        </span>

        {item.featured && (
          <span className="absolute bottom-3.5 left-3.5 bg-charcoal/85 text-white font-body font-semibold text-[11px] px-3 py-1 rounded-full shadow-sm">
            House favorite
          </span>
        )}

        {/* Price badge */}
        <span className="absolute top-3.5 right-3.5 bg-white font-body font-bold text-spice text-sm px-3 py-1 rounded-full shadow-sm">
          ₹{item.price}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-6">
        <h3 className="font-display text-lg font-semibold text-charcoal mb-2 leading-snug group-hover:text-spice transition-colors duration-200">
          {item.name}
        </h3>
        <p className="font-body text-charcoal/55 text-sm leading-relaxed flex-grow mb-5">
          {item.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 mt-auto pt-4 border-t border-gray-100">
          <span className="font-display text-xl font-bold text-spice">₹{item.price}</span>
          <a
            id={`order-btn-${item.id}`}
            href={orderHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost text-xs px-4 py-2 rounded-full"
          >
            Order Now
          </a>
        </div>
      </div>
    </article>
  );
}
