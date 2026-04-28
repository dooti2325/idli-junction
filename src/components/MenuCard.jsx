import { useState } from 'react';

export default function MenuCard({ item }) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="menu-card group flex flex-col h-full">
      {/* Image */}
      <div className="relative h-52 overflow-hidden flex-shrink-0">
        <img
          src={imgError ? 'https://images.unsplash.com/photo-1589301760014-d929f39ce9b0?w=600&q=80' : item.image}
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
          <button id={`order-btn-${item.id}`} className="btn-ghost text-xs px-4 py-2 rounded-full">
            Order Now
          </button>
        </div>
      </div>
    </article>
  );
}
