import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import MenuCard from '../MenuCard';
import useScrollReveal from '../../hooks/useScrollReveal';

const DUMMY_ITEMS = [
  { id: '1', name: 'Regular Idli (2 Pcs)',    price: 20,  category: 'Idli',      description: 'Nagpur\'s softest steamed rice cakes served hot with sambar and fresh coconut chutney.', image: '/images/idli_platter.png' },
  { id: '2', name: 'Thatte Idli',             price: 60,  category: 'Idli',      description: 'Large, disc-shaped Karnataka-style idli — thick, spongy and served with a generous pour of ghee and podi.', image: '/images/hero_bg.png' },
  { id: '3', name: 'Podi Mini Idli',          price: 60,  category: 'Idli',      description: 'Bite-sized soft mini idlies tossed with spicy podi and ghee.', image: '/images/idli_platter.png' },
  { id: '4', name: 'Masala Dosa',             price: 60,  category: 'Dosa',      description: 'Crispy golden crepe filled with spiced potato bhaji, paired with sambar and chutneys.', image: '/images/masala_dosa.png' },
  { id: '5', name: 'Ghee Podi Masala Dosa',   price: 90,  category: 'Dosa',      description: 'Masala Dosa with a rich layer of ghee and spicy podi.', image: '/images/masala_dosa.png' },
  { id: '6', name: 'Cheese Masala Dosa',      price: 80,  category: 'Dosa',      description: 'Classic Masala Dosa loaded with melted cheese.', image: '/images/masala_dosa.png' },
  { id: '7', name: 'Junction Special Dosa',   price: 100, category: 'Dosa',      description: 'Our signature dosa with a special house blend of fillings and toppings.', image: '/images/masala_dosa.png' },
  { id: '8', name: 'Onion Uttapam',           price: 60,  category: 'Uttapam',   description: 'Thick savory pancake topped with finely chopped onions.', image: '/images/hero_bg.png' },
  { id: '9', name: 'Medu Vada (2 Pcs)',       price: 40,  category: 'Snacks',    description: 'Crispy savory lentil fritters with a fluffy interior, served hot with sambar.', image: '/images/medu_vada.png' },
  { id: '10', name: 'Upma',                   price: 40,  category: 'Snacks',    description: 'Savory semolina porridge cooked with vegetables and spices.', image: '/images/hero_bg.png' },
  { id: '11', name: 'Filter Coffee',          price: 20,  category: 'Beverages', description: 'Freshly brewed South Indian decoction coffee — strong and aromatic.', image: '/images/filter_coffee.png' },
  { id: '12', name: 'Rasam Rice',             price: 60,  category: 'Mini Meals',description: 'Comforting rasam served with steamed rice.', image: '/images/hero_bg.png' },
];

const CATEGORIES = ['All', 'Idli', 'Dosa', 'Uttapam', 'Snacks', 'Beverages', 'Mini Meals'];

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
        setItems(DUMMY_ITEMS);
        setLoading(false);
        return;
      }
      const q = query(collection(db, 'menu_items'), orderBy('category'));
      unsub = onSnapshot(q, (snap) => {
        const arr = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setItems(arr.length ? arr : DUMMY_ITEMS);
        setLoading(false);
      }, () => { setItems(DUMMY_ITEMS); setLoading(false); });
    } catch {
      setItems(DUMMY_ITEMS);
      setLoading(false);
    }
    return unsub;
  }, []);

  const filtered = active === 'All' ? items : items.filter(i => i.category === active);

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
          {CATEGORIES.map(cat => (
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
      </div>
    </section>
  );
}
