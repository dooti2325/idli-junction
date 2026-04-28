import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import useScrollReveal from '../../hooks/useScrollReveal';

const INFO = [
  {
    icon: MapPin,
    label: 'Find Us',
    value: 'Shop No G-3, Shivpuja Apt, Bus Stop,\nPL No 50, Beside Trimurti Nagar,\nSubhash Nagar, Nagpur, Maharashtra 440022',
  },
  {
    icon: Phone,
    label: 'Call Us',
    value: '+91 92095 21933',
    href: 'tel:+919209521933',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+91 92095 21933',
    href: 'https://wa.me/919209521933',
  },
  {
    icon: Mail,
    label: 'Instagram',
    value: '@idli.junction',
    href: 'https://www.instagram.com/idli.junction/',
  },
  {
    icon: Clock,
    label: 'Opening Hours',
    value: 'Mon: 7:00 AM – 11:00 PM\nTue–Thu & Sun: 7:00 AM – 10:30 PM\nFri–Sat: 7:00 AM – 10:00 PM',
  },
];

export default function Contact() {
  useScrollReveal();

  return (
    <section id="contact" className="py-28 bg-white">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <p className="section-label mb-3">We'd Love to See You</p>
          <h2 className="section-title mb-5">Get In Touch</h2>
          <div className="section-divider mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left — Contact info + form */}
          <div className="reveal space-y-8">
            {/* Info cards */}
            <div className="space-y-2">
              {INFO.map(({ icon: Icon, label, value, href }) => ( <div
                    key={label}
                    id={`contact-info-${label.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-cream transition-colors duration-200 group cursor-default"
                  >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-spice"
                    style={{ background: 'var(--color-spice-muted)' }}
                  >
                    <Icon
                      size={18}
                      className="transition-colors duration-300"
                      style={{ color: 'var(--color-spice)' }}
                    />
                  </div>
                  <div>
                    <p className="font-body text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'rgba(28,28,30,0.4)' }}>
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="font-body text-sm whitespace-pre-line hover:text-spice transition-colors"
                        style={{ color: 'var(--color-charcoal)' }}
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="font-body text-sm whitespace-pre-line leading-relaxed" style={{ color: 'var(--color-charcoal)' }}>
                        {value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Rating badge */}
            <div
              className="flex items-center gap-4 p-5 rounded-2xl"
              style={{ background: 'var(--color-cream)', border: '1px solid rgba(232,98,26,0.15)' }}
            >
              <div className="text-center">
                <p className="font-display font-bold" style={{ fontSize: '2.5rem', color: 'var(--color-spice)', lineHeight: 1 }}>4.5</p>
                <div className="flex gap-0.5 mt-1">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i <= 4 ? '#E8621A' : 'none'} stroke="#E8621A" strokeWidth="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  ))}
                </div>
                <p className="font-body text-xs mt-1" style={{ color: 'rgba(28,28,30,0.4)' }}>126 Reviews</p>
              </div>
              <div className="flex-1 border-l pl-5" style={{ borderColor: 'rgba(232,98,26,0.2)' }}>
                <p className="font-body font-semibold text-sm" style={{ color: 'var(--color-charcoal)' }}>
                  "Nagpur's softest idlis"
                </p>
                <p className="font-body text-xs mt-1" style={{ color: 'rgba(28,28,30,0.5)' }}>
                  Rated 4.5 on Google · Loved for fresh taste, reasonable prices & quick service
                </p>
                <p className="font-body text-xs mt-2 font-semibold" style={{ color: 'var(--color-spice)' }}>
                  ₹1 – ₹200 per person
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="rounded-2xl p-6 lg:p-7" style={{ background: 'var(--color-cream)' }}>
              <h3 className="font-display text-xl font-semibold mb-5" style={{ color: 'var(--color-charcoal)' }}>Send us a message</h3>
              <form
                className="space-y-4"
                onSubmit={e => { e.preventDefault(); alert("Message sent! We'll get back to you soon."); }}
              >
                <div className="grid grid-cols-2 gap-4">
                  <input id="contact-name" type="text" required placeholder="Your Name" className="input-premium" />
                  <input id="contact-phone" type="tel" placeholder="Phone Number" className="input-premium" />
                </div>
                <input id="contact-email" type="email" placeholder="Email Address" className="input-premium" />
                <textarea id="contact-message" rows="4" placeholder="Your message…" required className="input-premium resize-none" />
                <button type="submit" className="btn-primary w-full justify-center">Send Message</button>
              </form>
            </div>
          </div>

          {/* Right — Google Map (actual Nagpur location) */}
          <div className="reveal" style={{ transitionDelay: '150ms' }}>
            <div className="rounded-2xl overflow-hidden h-[440px] lg:h-[660px] sticky top-24" style={{ boxShadow: 'var(--shadow-card-hover)' }}>
              <iframe
                title="Idli Junction Nagpur Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.9!2d79.0882!3d21.1458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDA4JzQ0LjkiTiA3OcKwMDUnMTcuNSJF!5e0!3m2!1sen!2sin!4v1703248386419!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'saturate(1.1) contrast(0.95)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
