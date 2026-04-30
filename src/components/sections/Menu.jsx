import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import MenuCard from '../MenuCard';
import useScrollReveal from '../../hooks/useScrollReveal';
import { DEFAULT_MENU_ITEMS } from '../../data/menu';

function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-card">
      <div className="skeleton h-52 w-full" />
      <div className="p-5 space-y-3">
        <div className="skeleton h-4 w-3/4" />
        <div className="skeleton h-3 w-full" />
        <div className="skeleton h-3 w-5/6" />
        <div className="flex justify-between mt-4">
          <div className="skeleton h-5 w-16" />
          <div className="skeleton h-9 w-28 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default function Menu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState('All');
  useScrollReveal();

  useEffect(() => {
    let unsub = () => {};
    try {
      if (!db) {
        setItems(DEFAULT_MENU_ITEMS);
        setLoading(false);
        return;
      }
      const q = query(collection(db, 'menu_items'), orderBy('category'));
      unsub = onSnapshot(q, (snap) => {
        const arr = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setItems(arr.length ? arr : DEFAULT_MENU_ITEMS);
        setLoading(false);
      }, () => { setItems(DEFAULT_MENU_ITEMS); setLoading(false); });
    } catch {
      setItems(DEFAULT_MENU_ITEMS);
      setLoading(false);
    }
    return unsub;
  }, []);

  const visibleItems = items.filter(item => item.available !== false);
  const categories = ['All', ...new Set(visibleItems.map(item => item.category).filter(Boolean))];
  const filtered = active === 'All' ? visibleItems : visibleItems.filter(i => i.category === active);

  return (
    <section id="menu" className="py-28 bg-cream">
      {/* Decorative top bg dot */}
      <div className="absolute left-0 -mt-16 w-72 h-72 bg-dots opacity-60 pointer-events-none" />

      <div className="section-container relative">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <p className="section-label mb-3">What We Serve</p>
          <h2 className="section-title mb-5">Our Menu</h2>
          <div className="section-divider mx-auto mb-6" />
          <p className="font-body text-charcoal/60 max-w-lg mx-auto text-sm leading-relaxed">
            Every dish tells a story — slow-cooked, stone-ground, and served straight from the heart of our kitchen.
          </p>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12 reveal">
          {categories.map(cat => (
            <button
              key={cat}
              id={`category-btn-${cat.toLowerCase()}`}
              onClick={() => setActive(cat)}
              className={`font-body text-sm font-medium px-5 py-2 rounded-full transition-all duration-250
                ${active === cat
                  ? 'bg-spice text-white shadow-glow scale-105'
                  : 'bg-white text-charcoal/70 hover:bg-cream-200 hover:text-spice border border-gray-100'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {loading
            ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
            : filtered.map((item, i) => (
                <div key={item.id} className="reveal" style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
                  <MenuCard item={item} />
                </div>
              ))
          }
        </div>

        {!loading && filtered.length === 0 && (
          <div className="mt-10 rounded-2xl border border-dashed border-spice/30 bg-white p-8 text-center font-body text-sm text-charcoal/55">
            No dishes are available in this category right now.
          </div>
        )}
      </div>
    </section>
  );
}
