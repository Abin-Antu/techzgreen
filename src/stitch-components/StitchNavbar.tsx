export default function StitchNavbar() {
  return (
    <>
      {/* StitchNavbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl transition-all duration-300">
<div className="flex justify-between items-center px-8 py-5 max-w-7xl mx-auto">
<div className="text-2xl font-extrabold font-['Manrope'] text-green-800 dark:text-green-400">TechzGreen</div>
<div className="hidden md:flex items-center space-x-10">
<a className="text-green-800 dark:text-green-400 font-bold font-['Manrope'] transition-all duration-300 hover:text-green-700" href="#">Home</a>
<a className="text-zinc-600 dark:text-zinc-400 font-medium font-['Manrope'] transition-all duration-300 hover:text-green-700" href="#">Events</a>
<a className="text-zinc-600 dark:text-zinc-400 font-medium font-['Manrope'] transition-all duration-300 hover:text-green-700" href="#">Rewards</a>
<a className="text-zinc-600 dark:text-zinc-400 font-medium font-['Manrope'] transition-all duration-300 hover:text-green-700" href="#">About</a>
</div>
<div className="flex items-center gap-4">
<button className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-6 py-2.5 rounded-full font-semibold tracking-tight transition-transform active:scale-95 shadow-lg shadow-primary/10">
          Get Started
        </button>
</div>
</div>
</nav>
    </>
  );
}
