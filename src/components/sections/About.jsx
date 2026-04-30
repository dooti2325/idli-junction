import { Leaf, Clock, Award, Heart } from 'lucide-react';
import useScrollReveal from '../../hooks/useScrollReveal';

const PILLARS = [
  { icon: Leaf, title: 'Farm-Fresh', desc: 'Spices sourced directly from Kerala farms, rice from Kaveri delta.' },
  { icon: Clock, title: 'Slow-Crafted', desc: 'Batter fermented 18 hours for the lightest, softest idlies.' },
  { icon: Award, title: '20+ Years', desc: 'Two decades of perfecting the art of South Indian cooking.' },
  { icon: Heart, title: 'Made with Love', desc: 'Every dish prepared by hands that know tradition by heart.' },
];

export default function About() {
  useScrollReveal();

  return (
    <section id="about" className="py-28 bg-cream overflow-hidden">
      <div className="section-container">
        {/* Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Image side */}
          <div className="relative reveal">
            {/* Background blob */}
            <div className="absolute -top-8 -left-8 w-64 h-64 bg-spice/8 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-gold/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative grid grid-cols-5 gap-4">
              {/* Main large image */}
              <div className="col-span-3 row-span-2">
                <div className="h-[420px] rounded-2xl overflow-hidden shadow-card-hover">
                  <img
                    id="about-img-main"
                    src="/images/Idli junction.jpeg"
                    alt="Idli Junction menu"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Stack of small images */}
              <div className="col-span-2 flex flex-col gap-4">
                <div className="h-[200px] rounded-2xl overflow-hidden shadow-card">
                  <img
                    id="about-img-secondary-1"
                    src="/images/idli_platter.png"
                    alt="Idli platter"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-[200px] rounded-2xl overflow-hidden shadow-card">
                  <img
                    id="about-img-secondary-2"
                    src="/images/masala_dosa.png"
                    alt="Fresh masala dosa"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-5 left-8 bg-spice text-white px-6 py-4 rounded-2xl shadow-float hidden md:block">
              <p className="font-display text-3xl font-bold leading-none">20+</p>
              <p className="font-body text-xs mt-0.5 text-white/80 font-medium">Years of Tradition</p>
            </div>
          </div>

          {/* Text side */}
          <div className="reveal" style={{ transitionDelay: '150ms' }}>
            <p className="section-label mb-3">Our Story</p>
            <h2 className="section-title mb-6 text-balance">
              Tradition on a Plate,<br />
              <span className="italic text-spice">Every Single Day</span>
            </h2>
            <div className="section-divider mb-8" />

            <p className="font-body text-charcoal/65 text-sm leading-relaxed mb-5">
              Founded in 2004, Idli Junction started as a humble tiffin counter in the lanes of the city. Armed with a 60-year-old family recipe and a passion for authenticity, we set out to recreate the flavours of South India's finest kitchens.
            </p>
            <p className="font-body text-charcoal/65 text-sm leading-relaxed mb-10">
              Today, we serve hundreds of families daily — but the recipe hasn't changed. We still stone-grind our batter, hand-pick our spices, and brew our filter coffee one cup at a time. Because great food isn't made in a hurry.
            </p>

            {/* Pillars grid */}
            <div className="grid grid-cols-2 gap-4">
              {PILLARS.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="p-4 bg-white rounded-xl border border-gray-100/80 hover:border-spice/20 hover:shadow-card transition-all duration-300 group">
                  <div className="w-9 h-9 rounded-lg bg-spice-muted flex items-center justify-center mb-3 group-hover:bg-spice group-hover:text-white transition-colors duration-300">
                    <Icon size={18} className="text-spice group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h4 className="font-body font-semibold text-sm text-charcoal mb-1">{title}</h4>
                  <p className="font-body text-xs text-charcoal/50 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials strip */}
        <div className="mt-24 reveal" style={{ transitionDelay: '200ms' }}>
          <p className="section-label text-center mb-10">What Our Guests Say</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Priya Sharma', role: 'Regular customer since 2010', text: '"The masala dosa here is simply life-changing. The batter has that perfect fermented tang I haven\'t found anywhere else in the city."' },
              { name: 'Rajan Iyer', role: 'Food blogger', text: '"A gem that keeps the soul of South Indian food alive. The filter coffee alone is worth the trip — thick, aromatic, and just right."' },
              { name: 'Meera Krishnan', role: 'Brings family every Sunday', text: '"We\'ve tried every idli place in town. Idli Junction wins, hands down. The ghee podi idli is absolutely divine every single time."' },
            ].map(({ name, role, text }, i) => (
              <div key={name} id={`testimonial-${i}`} className="bg-white rounded-2xl p-6 shadow-card border border-gray-100/60 relative overflow-hidden group hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                <div className="absolute top-0 left-0 w-1 h-full bg-orange-gradient rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <p className="font-body text-sm text-charcoal/65 italic leading-relaxed mb-5">{text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-spice-muted flex items-center justify-center font-display font-bold text-spice text-sm">
                    {name[0]}
                  </div>
                  <div>
                    <p className="font-body font-semibold text-sm text-charcoal">{name}</p>
                    <p className="font-body text-xs text-charcoal/45">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
