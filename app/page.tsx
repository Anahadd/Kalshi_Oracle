import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { ScrollToExplore } from "@/components/scroll-to-explore";
import { MarketCard } from "@/components/market-card";
import { StatsSection } from "@/components/stats-section";
import { SiteFooter } from "@/components/site-footer";
import { MARKETS } from "@/app/called-it/data";

// Take first 8 markets for the homepage showcase
const featuredMarkets = MARKETS.slice(0, 8);

export default function Home() {
  return (
    <main 
      className="bg-black min-h-screen w-full relative selection:bg-[#00D991] selection:text-black"
    >
      {/* Background Texture */}
      <div 
        className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-50"
        style={{ 
          backgroundImage: 'url(/images/kalshi-texture.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 w-full">
        <Navigation />
        <Hero />
        <ScrollToExplore />
        
        {/* Section Divider */}
        <div className="w-full py-20 flex flex-col items-center justify-center">
          <span className="text-white/20 text-sm font-medium uppercase tracking-[0.3em]">
            Featured Predictions
          </span>
        </div>
        
        {/* Featured Markets */}
        <div className="flex flex-col items-center w-full">
          {featuredMarkets.map((market, index) => (
            <MarketCard
              key={market.id}
              market={market}
              index={index}
            />
          ))}
        </div>

        {/* Stats Section */}
        <StatsSection />

        {/* CTA Section */}
        <section className="w-full py-32 px-6 flex flex-col items-center justify-center text-center">
          <h2 className="font-serif text-white text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-8">
            See every prediction
          </h2>
          <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-12">
            Dive into our interactive gallery to explore all {MARKETS.length}+ predictions we got right in 2025.
          </p>
          <a 
            href="/called-it"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#00D991] text-black font-semibold text-sm hover:bg-[#00D991]/90 transition-colors group"
          >
            Open Gallery
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              className="transform group-hover:translate-x-0.5 transition-transform"
            >
              <path 
                d="M5 12h14M12 5l7 7-7 7" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </section>

        {/* Footer */}
        <SiteFooter />
      </div>
    </main>
  );
}
