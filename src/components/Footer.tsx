import { MapPin, Mail, Phone } from 'lucide-react';
import fullLogo from '../assets/full_logo.png';
import { Link } from 'react-router-dom';

const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    ),
  },
];

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Shop', to: '/shop' },
  { label: 'Events', to: '/events' },
  { label: 'Contact', to: '/#contact' },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: 'linear-gradient(160deg, #0d2410 0%, #1a3d1f 50%, #0f2813 100%)',
      }}
    >
      {/* Amber top accent line */}
      <div style={{ height: 3, background: 'linear-gradient(90deg, #ffb300, #ff8f00, #ffb300)' }} />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">

          {/* Brand */}
          <div className="space-y-5">
            <div className="inline-block bg-white rounded-2xl px-4 py-2.5 shadow-lg">
              <img src={fullLogo} alt="TechzGreen" className="h-12 w-auto object-contain" />
            </div>
            <p className="text-[#a5d6a7] text-sm leading-relaxed">
              Innovation and sustainability intertwine — transforming plastic waste into purposeful products and fostering a circular economy for Kerala and beyond.
            </p>

            {/* Social icons */}
            <div>
              <p className="text-[#81c784] text-xs font-bold uppercase tracking-widest mb-3">Follow Us</p>
              <div className="flex gap-2.5">
                {socialLinks.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-[#a5d6a7] hover:text-white hover:bg-[#ffb300] transition-all duration-200"
                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <div>
              <h3 className="font-black text-white text-base" style={{ fontFamily: 'Outfit, sans-serif' }}>Quick Links</h3>
              <div className="w-8 h-0.5 bg-[#ffb300] mt-2 rounded-full" />
            </div>
            <ul className="space-y-3">
              {quickLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-[#a5d6a7] hover:text-[#ffb300] text-sm font-medium transition-colors duration-150 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4caf50] group-hover:bg-[#ffb300] transition-colors flex-shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-5" id="contact">
            <div>
              <h3 className="font-black text-white text-base" style={{ fontFamily: 'Outfit, sans-serif' }}>Contact</h3>
              <div className="w-8 h-0.5 bg-[#ffb300] mt-2 rounded-full" />
            </div>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-[rgba(255,179,0,0.15)] flex items-center justify-center flex-shrink-0 border border-[rgba(255,179,0,0.25)]">
                  <MapPin className="w-4 h-4 text-[#ffb300]" />
                </div>
                <span className="text-[#a5d6a7] text-sm leading-relaxed pt-1">
                  JJ Complex, Koonammoochi (P.O),<br />
                  Thrissur, Kerala, India<br />
                  Pin code — 680504
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <div className="w-8 h-8 rounded-lg bg-[rgba(255,179,0,0.15)] flex items-center justify-center flex-shrink-0 border border-[rgba(255,179,0,0.25)]">
                  <Mail className="w-4 h-4 text-[#ffb300]" />
                </div>
                <a
                  href="mailto:techzgreen23@gmail.com"
                  className="text-[#a5d6a7] hover:text-[#ffb300] text-sm transition-colors font-medium"
                >
                  techzgreen23@gmail.com
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <div className="w-8 h-8 rounded-lg bg-[rgba(255,179,0,0.15)] flex items-center justify-center flex-shrink-0 border border-[rgba(255,179,0,0.25)]">
                  <Phone className="w-4 h-4 text-[#ffb300]" />
                </div>
                <a
                  href="tel:+918714985123"
                  className="text-[#a5d6a7] hover:text-[#ffb300] text-sm transition-colors font-medium"
                >
                  +91 87149 85123
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
          <p className="text-[#6a9e6d] text-xs">
            © {new Date().getFullYear()} TechzGreen. All rights reserved.
          </p>
          <p className="text-[#6a9e6d] text-xs italic">
            A Promise For Future 🌿
          </p>
        </div>
      </div>
    </footer>
  );
}
