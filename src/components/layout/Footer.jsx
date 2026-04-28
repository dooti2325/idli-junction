import { Instagram, Facebook, Twitter, MapPin, Phone, Mail } from 'lucide-react';

const QUICK_LINKS = [
  { label: 'Home',    href: '#home' },
  { label: 'Menu',    href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About',   href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white pt-16 pb-8">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <span className="w-8 h-8 rounded-full bg-orange-gradient flex items-center justify-center text-white text-sm font-display font-bold">IJ</span>
              <span className="font-display text-xl font-bold">Idli Junction</span>
            </div>
            <p className="font-body text-sm text-white/50 leading-relaxed mb-6 max-w-xs">
              South Indian restaurant in Nagpur serving the city's softest idlis, crispy dosas and authentic filter coffee since 2004. Rated 4.5 ⭐ on Google.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" aria-label="Social link"
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-spice hover:bg-spice/10 transition-all duration-250">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-body font-semibold text-xs uppercase tracking-widest text-white/40 mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="font-body text-sm text-white/60 hover:text-spice-light transition-colors duration-200">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body font-semibold text-xs uppercase tracking-widest text-white/40 mb-5">Contact</h4>
            <ul className="space-y-4">
              {[
                { icon: MapPin, text: 'Shop No G-3, Shivpuja Apt,\nSubhash Nagar, Trimurti Nagar,\nNagpur, MH 440022' },
                { icon: Phone,  text: '+91 92095 21933' },
                { icon: Mail,   text: 'instagram: @idli.junction' },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <Icon size={15} className="text-spice mt-0.5 flex-shrink-0" />
                  <span className="font-body text-sm text-white/55 whitespace-pre-line leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider & bottom bar */}
        <div className="border-t border-white/8 pt-7 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-body text-xs text-white/30">
            &copy; {new Date().getFullYear()} Idli Junction. All rights reserved.
          </p>
          <div className="flex gap-5 font-body text-xs text-white/30">
            <a href="#" className="hover:text-white/60 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/60 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
