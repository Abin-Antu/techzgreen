import { Link } from 'react-router-dom';
import { Recycle, Star, Leaf, ArrowRight, Users, Droplet, CheckCircle2 } from 'lucide-react';

const skills = [
  { label: 'Recycled Products', pct: 90, color: '#2e7d32' },
  { label: 'Circular Economy', pct: 93, color: '#2e7d32' },
  { label: 'Sustainable Transformation', pct: 95, color: '#ffb300' },
];

const services = [
  {
    icon: <Recycle className="w-7 h-7 text-[#2e7d32]" />,
    title: 'Recycled Products',
    desc: 'We manufacture a wide range of eco-friendly products — school benches, tables, furniture, outdoor benches, TV units, roofing sheets, flooring panels, ceiling boards, partitions, and custom items like momentos. All products are waterproof, pest-proof, fungus-resistant, high-density, and long-lasting for both indoor and outdoor use.',
  },
  {
    icon: <Leaf className="w-7 h-7 text-[#2e7d32]" />,
    title: 'Circular Economy',
    desc: 'At TechzGreen, our circular economy approach transforms Multi-Layer Plastic (MLP) and other non-valuable plastic waste into high-quality, durable materials. We close the plastic loop — converting what others discard into products that last decades, minimizing landfill burden and environmental harm.',
  },
  {
    icon: <Droplet className="w-7 h-7 text-[#2e7d32]" />,
    title: 'Sustainable Transformation',
    desc: 'Through innovative recycling and upcycling technologies, we turn plastic waste into a resource. Our process delivers environmental impact, sustainable advertising opportunities, and a cleaner planet — proving that waste and value are not opposites.',
  },
  {
    icon: <Users className="w-7 h-7 text-[#2e7d32]" />,
    title: 'Consultation & Guidance',
    desc: 'We provide consultation and technical guidance to companies, institutions, and organizations on managing plastic waste more effectively. Our experts help design and implement sustainable waste management systems — turning environmental responsibility into measurable outcomes.',
  },
];

export default function About() {
  return (
    <div className="fade-in">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-6 sm:pt-10 pb-12 sm:pb-16 lg:pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-5 sm:space-y-6">
              <span className="section-label"><Leaf className="w-3.5 h-3.5" />About Us</span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1a3d1f] leading-tight">
                TechzGreen's Visionary<br />
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #2e7d32, #4caf50)' }}>
                  Journey To A Greener Tomorrow
                </span>
              </h1>
              <p className="text-base sm:text-lg text-[#5f7a60] leading-relaxed max-w-lg">
                At TechzGreen, we transform plastic waste — especially Multi-Layer Plastic (MLP) — into durable, valuable products through innovative recycling and upcycling technologies. Waste becomes a resource. Plastic closes the loop.
              </p>
              <Link to="/signup" className="btn-primary inline-flex items-center gap-2">
                Join the Movement <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Image grid */}
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=600"
                alt="Recycling facility"
                className="rounded-3xl object-cover h-40 sm:h-48 lg:h-56 w-full shadow-xl"
              />
              <img
                src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=600"
                alt="Waste management"
                className="rounded-3xl object-cover h-40 sm:h-48 lg:h-56 w-full shadow-xl mt-8"
              />
              {/* Stat badge */}
              <div className="col-span-2 flex justify-center -mt-4">
                <div className="glass-panel px-4 sm:px-6 py-3 flex items-center gap-3 sm:gap-4 w-fit">
                  <div className="text-center">
                    <p className="text-3xl font-black text-[#2e7d32]" style={{ fontFamily: 'Outfit,sans-serif' }}>32+</p>
                    <p className="text-xs text-[#5f7a60] font-semibold">Years Of Experience</p>
                  </div>
                  <div className="w-px h-10 bg-[rgba(46,125,50,0.2)]" />
                  <div className="text-center">
                    <p className="text-3xl font-black text-[#2e7d32]" style={{ fontFamily: 'Outfit,sans-serif' }}>1200+</p>
                    <p className="text-xs text-[#5f7a60] font-semibold">Community Members</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Who We Are ── */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-[rgba(46,125,50,0.03)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="space-y-5 sm:space-y-6">
              <span className="section-label">Who We Are</span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1a3d1f] leading-tight">
                Sustainability Pioneers: Transforming Plastic Waste into Purposeful Innovation.
              </h2>
              <p className="text-[#5f7a60] leading-relaxed">
                Our mission is to help industries, institutions, and communities implement effective waste management systems — converting non-valuable plastic waste into high-quality, long-lasting materials. By doing this, we contribute to closing the circular loop of plastic and promoting a sustainable future.
              </p>
              <div className="space-y-2">
                {['MLP & plastic waste recycling & upcycling', 'Waterproof, pest-proof, long-lasting products', 'End-to-end circular economy support', 'Consultation & technical guidance for organizations'].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#2e7d32] flex-shrink-0" />
                    <span className="text-[#2d4a30] text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill bars */}
            <div className="space-y-6">
              {skills.map(({ label, pct, color }) => (
                <div key={label}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-bold text-[#1a3d1f]">{label}</span>
                    <span className="text-sm font-black" style={{ color }}>{pct}%</span>
                  </div>
                  <div className="h-3 bg-[rgba(46,125,50,0.1)] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}, ${color}cc)` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="py-12 sm:py-16 lg:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <span className="section-label mb-4 inline-flex"><Leaf className="w-3.5 h-3.5" />A Promise For Future</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1a3d1f] mt-4">Welcome to TechzGreen</h2>
            <p className="text-[#5f7a60] mt-3 max-w-2xl mx-auto">
              At TechzGreen, we transform one of today's most challenging waste streams into beautiful, durable, and meaningful products — proving that sustainability and quality are not a compromise.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="glass-card p-6 sm:p-8">
              <div className="bg-[rgba(46,125,50,0.1)] w-12 h-12 rounded-2xl flex items-center justify-center mb-5 border border-[rgba(46,125,50,0.15)]">
                <Recycle className="w-6 h-6 text-[#2e7d32]" />
              </div>
              <h3 className="text-xl font-bold text-[#1a3d1f] mb-3">Our Mission</h3>
              <p className="text-[#5f7a60] text-sm leading-relaxed">
                To help industries, institutions, and communities implement effective waste management systems — converting non-valuable plastic waste into high-quality, long-lasting materials. Through our solutions, waste becomes a resource, creating environmental impact and a cleaner planet for future generations.
              </p>
            </div>
            <div className="glass-card p-6 sm:p-8">
              <div className="bg-[rgba(255,179,0,0.12)] w-12 h-12 rounded-2xl flex items-center justify-center mb-5 border border-[rgba(255,179,0,0.2)]">
                <Star className="w-6 h-6 text-[#ffb300]" />
              </div>
              <h3 className="text-xl font-bold text-[#1a3d1f] mb-3">Our Vision</h3>
              <p className="text-[#5f7a60] text-sm leading-relaxed">
                A future where plastic never becomes waste. TechzGreen envisions a cleaner, greener Kerala and India where sustainability thrives — where innovation and responsibility go hand in hand, empowering communities and leaving a thriving planet for generations to come.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-[rgba(46,125,50,0.03)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <span className="section-label mb-4 inline-flex">Our Services</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1a3d1f] mt-4">Explore Our Offered Solutions</h2>
            <p className="text-[#5f7a60] mt-3 max-w-xl mx-auto">
              Explore our diverse range of eco-conscious solutions, designed to fit your needs and support sustainable environmental practices.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map(({ icon, title, desc }) => (
              <div key={title} className="glass-card p-6 sm:p-8 flex flex-col sm:flex-row gap-4 sm:gap-6">
                <div className="bg-[rgba(46,125,50,0.08)] w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 border border-[rgba(46,125,50,0.12)]">
                  {icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1a3d1f] mb-2">{title}</h3>
                  <p className="text-[#5f7a60] text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Milestone banner ── */}
      <section className="py-12 sm:py-16 px-4 pb-20 sm:pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="glass-panel-dark p-6 sm:p-8 lg:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/leaves.png')]" />
            <div className="relative z-10">
              <Leaf className="w-12 h-12 text-[#ffb300] mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">
                An Eco-Revolution: Celebrating a Proud Milestone
              </h2>
              <p className="text-[rgba(200,230,201,0.9)] mb-8 max-w-2xl mx-auto">
                Amidst our sustainable journey, we joyously commemorate a significant milestone — an eco-revolution. It symbolizes our commitment to greener innovations, driving us toward a future where sustainability thrives, shaping a better world for all.
              </p>
              <Link to="/signup" className="btn-accent inline-flex items-center gap-2">
                Be Part of the Revolution <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
