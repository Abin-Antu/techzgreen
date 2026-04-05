export default function StitchFooter() {
  return (
    <>
      {/* StitchFooter */}
      <footer className="bg-zinc-100 dark:bg-zinc-950 w-full py-12 px-8">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
<div className="flex flex-col gap-4">
<div className="text-xl font-bold font-['Manrope'] text-green-800 dark:text-green-400">TechzGreen</div>
<p className="text-zinc-500 dark:text-zinc-400 font-['Inter'] text-sm leading-relaxed">
          Cultivating a circular future through community action and sustainable technology.
        </p>
</div>
<div>
<h4 className="font-bold text-on-surface mb-6 font-headline">Platform</h4>
<ul className="flex flex-col gap-4">
<li><a className="text-zinc-500 dark:text-zinc-400 font-['Inter'] text-sm hover:text-green-700 dark:hover:text-green-300 underline-offset-4 hover:underline transition-all" href="#">How it Works</a></li>
<li><a className="text-zinc-500 dark:text-zinc-400 font-['Inter'] text-sm hover:text-green-700 dark:hover:text-green-300 underline-offset-4 hover:underline transition-all" href="#">Rewards Catalog</a></li>
<li><a className="text-zinc-500 dark:text-zinc-400 font-['Inter'] text-sm hover:text-green-700 dark:hover:text-green-300 underline-offset-4 hover:underline transition-all" href="#">Impact Dashboard</a></li>
</ul>
</div>
<div>
<h4 className="font-bold text-on-surface mb-6 font-headline">Legal &amp; Info</h4>
<ul className="flex flex-col gap-4 text-zinc-500 dark:text-zinc-400 font-['Inter'] text-sm">
<li><a className="hover:text-green-700 dark:hover:text-green-300 underline-offset-4 hover:underline" href="#">Privacy Policy</a></li>
<li><a className="hover:text-green-700 dark:hover:text-green-300 underline-offset-4 hover:underline" href="#">Terms of Service</a></li>
<li><a className="hover:text-green-700 dark:hover:text-green-300 underline-offset-4 hover:underline" href="#">Contact Us</a></li>
<li><a className="hover:text-green-700 dark:hover:text-green-300 underline-offset-4 hover:underline" href="#">Careers</a></li>
</ul>
</div>
<div>
<h4 className="font-bold text-on-surface mb-6 font-headline">Stay Rooted</h4>
<p className="text-zinc-500 dark:text-zinc-400 font-['Inter'] text-sm mb-4">Get the latest eco-tips and events in your inbox.</p>
<div className="flex gap-2">
<input className="bg-surface-container-low border-none rounded-lg text-sm px-4 py-2 w-full focus:ring-1 focus:ring-primary" placeholder="Email address" type="email"/>
<button className="bg-primary text-on-primary p-2 rounded-lg">
<span className="material-symbols-outlined">send</span>
</button>
</div>
</div>
</div>
<div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-4">
<p className="text-zinc-500 dark:text-zinc-400 font-['Inter'] text-sm">© 2024 TechzGreen. Cultivating a circular future.</p>
<div className="flex gap-6">
<a className="text-on-surface-variant hover:text-primary" href="#"><span className="material-symbols-outlined">public</span></a>
<a className="text-on-surface-variant hover:text-primary" href="#"><span className="material-symbols-outlined">eco</span></a>
<a className="text-on-surface-variant hover:text-primary" href="#"><span className="material-symbols-outlined">forum</span></a>
</div>
</div>
</footer>
    </>
  );
}
