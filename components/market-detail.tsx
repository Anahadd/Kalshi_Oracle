import { MARKETS } from "@/app/called-it/data";

interface MarketDetailPanelProps {
  marketIndex: number | null;
  onBack?: () => void;
}

export function MarketDetailPanel({ marketIndex, onBack }: MarketDetailPanelProps) {
  if (marketIndex === null) return null;
  
  const market = MARKETS[marketIndex % MARKETS.length];

  return (
    <div className="w-full h-full flex flex-col items-center justify-end pb-16 pointer-events-none">
        {/* Content Container - Pointer events enabled for interaction */}
        <div className="w-full max-w-2xl px-6 flex flex-col items-center gap-10 pointer-events-auto">
            
            {/* Market Info */}
            <div className="flex flex-col items-center gap-3 text-center">
                <span className="text-white/60 text-sm font-bold tracking-widest uppercase">{market.category}</span>
                <h1 className="text-white text-4xl md:text-6xl font-bold tracking-tight leading-tight">{market.title}</h1>
            </div>

            {/* Mock Timeline / Stats Template */}
            <div className="w-full grid grid-cols-3 gap-4 border-t border-b border-white/10 py-8">
                <div className="flex flex-col items-center gap-2">
                    <span className="text-white/40 text-xs font-medium uppercase tracking-wider">Volume</span>
                    <span className="text-white text-2xl font-mono">$12.5M</span>
                </div>
                 <div className="flex flex-col items-center gap-2 border-l border-white/10">
                    <span className="text-white/40 text-xs font-medium uppercase tracking-wider">Chance</span>
                    <span className="text-[#00D991] text-2xl font-mono">85%</span>
                </div>
                 <div className="flex flex-col items-center gap-2 border-l border-white/10">
                    <span className="text-white/40 text-xs font-medium uppercase tracking-wider">Expires</span>
                    <span className="text-white text-2xl font-mono">Dec 31</span>
                </div>
            </div>

            {/* Back Button */}
            <button 
                onClick={onBack}
                className="group flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all duration-300 cursor-pointer mb-8"
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transform group-hover:-translate-x-1 transition-transform">
                    <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-white text-sm font-bold tracking-widest uppercase">Back to Gallery</span>
            </button>
        </div>
    </div>
  );
}
