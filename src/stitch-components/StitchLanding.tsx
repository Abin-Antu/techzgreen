import StitchNavbar from './StitchNavbar';
import StitchHero from './StitchHero';
import StitchRewards from './StitchRewards';
import StitchEvents from './StitchEvents';
import StitchImpact from './StitchImpact';
import StitchFooter from './StitchFooter';

export default function StitchLanding() {
  return (
    <div className="bg-background text-on-background w-full min-h-screen font-body selection:bg-primary-fixed selection:text-on-primary-fixed">
      <StitchNavbar />
      <main className="pt-24">
        <StitchHero />
        <StitchRewards />
        <StitchEvents />
        <StitchImpact />
      </main>
      <StitchFooter />
    </div>
  );
}
