export default function StitchRewards() {
  return (
    <>
      {/* StitchRewards */}
      <section className="bg-surface-container-low py-24 px-8">
<div className="max-w-7xl mx-auto">
<div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
<div>
<h2 className="text-4xl md:text-5xl font-extrabold font-headline text-on-surface tracking-tight">Eco-Rewards</h2>
<p className="text-on-surface-variant mt-4 text-lg max-w-xl">A gamified approach to planetary restoration. Every action you take feeds back into the ecosystem.</p>
</div>
<a className="text-primary font-bold flex items-center gap-2 hover:underline underline-offset-8" href="#">
            Explore the Rewards Store
            <span className="material-symbols-outlined">arrow_forward</span>
</a>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]">
{/*  Card 1: Main Feature  */}
<div className="md:col-span-2 bg-surface-container-lowest rounded-3xl p-10 flex flex-col justify-between relative overflow-hidden group">
<div className="z-10">
<span className="bg-tertiary/10 text-tertiary px-4 py-1 rounded-full text-xs font-bold mb-6 inline-block">MOST POPULAR</span>
<h3 className="text-3xl font-extrabold font-headline mb-4">Circular Points System</h3>
<p className="text-on-surface-variant max-w-sm">Scan receipts from partner zero-waste shops, participate in events, and log your compost to earn "Green Credits" automatically.</p>
</div>
<div className="mt-8 flex gap-4 z-10">
<div className="bg-surface-container p-4 rounded-xl flex-1">
<span className="material-symbols-outlined text-primary mb-2">volunteer_activism</span>
<p className="font-bold">Engage</p>
<p className="text-xs text-on-surface-variant">Attend events</p>
</div>
<div className="bg-surface-container p-4 rounded-xl flex-1">
<span className="material-symbols-outlined text-primary mb-2">recycling</span>
<p className="font-bold">Reduce</p>
<p className="text-xs text-on-surface-variant">Minimize waste</p>
</div>
<div className="bg-surface-container p-4 rounded-xl flex-1">
<span className="material-symbols-outlined text-primary mb-2">shopping_bag</span>
<p className="font-bold">Redeem</p>
<p className="text-xs text-on-surface-variant">Eco-discounts</p>
</div>
</div>
<img className="absolute bottom-0 right-0 w-1/2 opacity-20 group-hover:scale-110 transition-transform duration-700" data-alt="abstract tech visualization of connected green nodes and lines representing a digital ecosystem and data flow" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDv7FYwTQK8rKlXJY7Wp71pSXHk5bbjNN7d6DoNIAvyoG_l8t6fYLVGmRr6LDoxBTSJABpYE48Bjc732p68bVLH-W0eFxNcYz4oglwb1yrPgPsGyCnYmwx-S1YQwdlruCOOIDZvjfWZW5RHVY69g7fnTBGz_DWaDDRSv5Gp2IBCtrzzZMfaLWl3ed4dXDaji_Ii0V7dnXf8dSD1IdoIJt4YCQx5LSSuAoL_JF-B9swMHDa3_mLx9Vjz3bRZfDO0u0rgsqtE8vVvWic"/>
</div>
{/*  Card 2: Vertical Small  */}
<div className="bg-primary text-on-primary rounded-3xl p-10 flex flex-col justify-between shadow-2xl shadow-primary/20">
<div>
<span className="material-symbols-outlined text-4xl mb-6">workspace_premium</span>
<h3 className="text-2xl font-bold font-headline mb-4 leading-tight">Elite Steward Tier</h3>
<p className="opacity-80 text-sm">Top 5% of participants gain access to early event registration and exclusive artisan workshops.</p>
</div>
<button className="w-full py-4 bg-on-primary text-primary font-bold rounded-xl active:scale-95 transition-transform">
              Join the Elite
            </button>
</div>
{/*  Card 3: Small Bottom  */}
<div className="bg-surface-container-high rounded-3xl p-10 group overflow-hidden relative">
<h3 className="text-xl font-bold font-headline mb-2">Partner Benefits</h3>
<p className="text-on-surface-variant text-sm">Get up to 40% off at over 200+ sustainable brands globally.</p>
<div className="mt-6 flex -space-x-3">
<div className="w-10 h-10 rounded-full border-2 border-surface-container-high bg-zinc-200"></div>
<div className="w-10 h-10 rounded-full border-2 border-surface-container-high bg-zinc-300"></div>
<div className="w-10 h-10 rounded-full border-2 border-surface-container-high bg-zinc-400"></div>
<div className="w-10 h-10 rounded-full border-2 border-surface-container-high bg-primary-fixed flex items-center justify-center text-[10px] font-bold text-primary">+200</div>
</div>
</div>
{/*  Card 4: Long Bottom  */}
<div className="md:col-span-2 bg-secondary-container text-on-secondary-container rounded-3xl p-10 flex items-center justify-between">
<div className="max-w-md">
<h3 className="text-2xl font-bold font-headline mb-2">Track Your Impact</h3>
<p className="text-sm opacity-90">Real-time CO2 offset dashboard integrated into your rewards profile. See the difference your choices make.</p>
</div>
<div className="w-32 h-32 rounded-full border-8 border-primary/20 flex items-center justify-center">
<span className="text-2xl font-extrabold">92%</span>
</div>
</div>
</div>
</div>
</section>
    </>
  );
}
