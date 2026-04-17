import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  ShoppingCart, LayoutDashboard, LogOut, LogIn, Calendar, Home, Store, Star,
  Menu, X, Info, Award, UserPlus,
} from 'lucide-react';
import favicon from '../assets/favicon.png';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profileRole, signOut } = useAuth();
  const { items } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close drawer on route change
  useEffect(() => { setMobileMenuOpen(false); }, [location.pathname]);

  // Lock body scroll while drawer open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const handleLogout = async () => {
    await signOut();
    setMobileMenuOpen(false);
    navigate('/');
  };

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);
  const isActive = (path: string) => location.pathname === path;

  const linkClass = (path: string) =>
    `relative px-3 py-1.5 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer
    ${isActive(path)
      ? 'bg-[#2e7d32] text-white shadow-sm'
      : 'text-[#2d4a30] hover:bg-[rgba(46,125,50,0.1)] hover:text-[#1b5e20]'}`;

  const bottomLinkClass = (path: string) =>
    `flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all text-xs font-bold cursor-pointer
    ${isActive(path) ? 'text-[#2e7d32]' : 'text-[#5f7a60]'}`;

  const drawerLinkClass = (path: string) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-colors
    ${isActive(path)
      ? 'bg-[#2e7d32] text-white'
      : 'text-[#2d4a30] hover:bg-[rgba(46,125,50,0.08)]'}`;

  return (
    <>
      {/* ── Top Navbar ── */}
      <div className="sticky top-3 z-50 px-4">
        <nav className="glass-nav max-w-7xl mx-auto rounded-2xl px-4 sm:px-6">
          <div className="flex justify-between items-center h-14">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-1.5 sm:gap-2 cursor-pointer">
              <img src={favicon} alt="TechzGreen icon" className="h-7 w-7 sm:h-8 sm:w-8 object-contain" />
              <span className="font-black text-base sm:text-lg text-[#1a3d1f] tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Techz<span className="text-[#2e7d32]">Green</span>
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden sm:flex items-center gap-1">
              <Link to="/" className={linkClass('/')}>Home</Link>
              <Link to="/about" className={linkClass('/about')}>About</Link>
              <Link to="/shop" className={linkClass('/shop')}>Shop</Link>
              <Link to="/events" className={linkClass('/events')}>
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />Events</span>
              </Link>
              {user && profileRole === 'user' && (
                <Link to="/rewards" className={linkClass('/rewards')}>Earn Points</Link>
              )}
              {user && (
                <Link to={profileRole === 'admin' ? '/admin' : '/dashboard'} className={linkClass(profileRole === 'admin' ? '/admin' : '/dashboard')}>
                  <span className="flex items-center gap-1.5"><LayoutDashboard className="w-3.5 h-3.5" />Dashboard</span>
                </Link>
              )}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Cart */}
              <Link to="/cart" aria-label="Cart" className="relative p-2.5 rounded-lg hover:bg-[rgba(46,125,50,0.1)] text-[#2d4a30] hover:text-[#1b5e20] transition-colors cursor-pointer">
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#ffb300] text-black text-xs font-black w-4 h-4 rounded-full flex items-center justify-center leading-none">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {/* Desktop: login OR logout */}
              {!user ? (
                <Link to="/login" className="hidden sm:flex btn-accent items-center gap-1.5 text-sm !py-2 !px-4">
                  <LogIn className="w-4 h-4" /> Login / Join
                </Link>
              ) : (
                <button
                  onClick={handleLogout}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-[#c62828] hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              )}

              {/* Mobile hamburger — always visible on mobile */}
              <button
                onClick={() => setMobileMenuOpen(o => !o)}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
                className="sm:hidden p-2.5 rounded-lg text-[#2d4a30] hover:bg-[rgba(46,125,50,0.1)] transition-colors cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* ── Mobile Slide-in Drawer ── */}
      <div
        className={`sm:hidden fixed inset-0 z-40 transition-opacity duration-200 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileMenuOpen(false)}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

        {/* Panel */}
        <aside
          onClick={e => e.stopPropagation()}
          className={`absolute top-0 right-0 h-full w-[82%] max-w-xs bg-white shadow-2xl flex flex-col transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(46,125,50,0.1)]">
            <div className="flex items-center gap-2">
              <img src={favicon} alt="" className="h-7 w-7 object-contain" />
              <span className="font-black text-base text-[#1a3d1f]" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Techz<span className="text-[#2e7d32]">Green</span>
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              className="p-2 rounded-lg hover:bg-gray-100 text-[#2d4a30]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer links */}
          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
            <Link to="/" className={drawerLinkClass('/')}><Home className="w-4 h-4" /> Home</Link>
            <Link to="/about" className={drawerLinkClass('/about')}><Info className="w-4 h-4" /> About</Link>
            <Link to="/shop" className={drawerLinkClass('/shop')}><Store className="w-4 h-4" /> Shop</Link>
            <Link to="/events" className={drawerLinkClass('/events')}><Calendar className="w-4 h-4" /> Events</Link>
            {user && profileRole === 'user' && (
              <Link to="/rewards" className={drawerLinkClass('/rewards')}><Award className="w-4 h-4" /> Earn Points</Link>
            )}
            {user && (
              <Link
                to={profileRole === 'admin' ? '/admin' : '/dashboard'}
                className={drawerLinkClass(profileRole === 'admin' ? '/admin' : '/dashboard')}
              >
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Link>
            )}
          </nav>

          {/* Drawer footer — auth actions */}
          <div className="px-3 py-4 border-t border-[rgba(46,125,50,0.1)] space-y-2">
            {!user ? (
              <>
                <Link to="/login" className="btn-accent w-full flex items-center justify-center gap-2 !py-3">
                  <LogIn className="w-4 h-4" /> Login
                </Link>
                <Link to="/signup" className="btn-primary w-full flex items-center justify-center gap-2 !py-3">
                  <UserPlus className="w-4 h-4" /> Sign Up
                </Link>
              </>
            ) : (
              <>
                <div className="px-4 py-2 text-xs text-[#5f7a60] truncate">
                  Signed in as <span className="font-bold text-[#1a3d1f]">{user.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 text-[#c62828] bg-red-50 hover:bg-red-100 border border-red-200 font-bold py-3 rounded-xl transition-colors cursor-pointer text-sm"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            )}
          </div>
        </aside>
      </div>

      {/* ── Mobile Bottom Nav (quick access for logged-in users) ── */}
      {user && (
        <nav className="fixed bottom-0 left-0 right-0 z-30 sm:hidden">
          <div className="glass-nav mx-3 mb-3 rounded-2xl px-2 py-2">
            <div className="flex justify-around items-center">
              <Link to="/" className={bottomLinkClass('/')}>
                <Home className="w-5 h-5" /> Home
              </Link>
              <Link to="/shop" className={bottomLinkClass('/shop')}>
                <Store className="w-5 h-5" />
                <span className="relative">
                  Shop
                  {cartItemCount > 0 && <span className="absolute -top-1 -right-2 bg-[#ffb300] text-black text-[10px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center leading-none">{cartItemCount}</span>}
                </span>
              </Link>
              <Link to="/events" className={bottomLinkClass('/events')}>
                <Calendar className="w-5 h-5" /> Events
              </Link>
              {profileRole === 'user' && (
                <Link to="/rewards" className={bottomLinkClass('/rewards')}>
                  <Star className="w-5 h-5" /> Points
                </Link>
              )}
              <Link
                to={profileRole === 'admin' ? '/admin' : '/dashboard'}
                className={bottomLinkClass(profileRole === 'admin' ? '/admin' : '/dashboard')}
              >
                <LayoutDashboard className="w-5 h-5" /> Dashboard
              </Link>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
