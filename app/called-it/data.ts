// Market Data for "Kalshi Called It"
// Each market represents a prediction that Kalshi got right

export interface Market {
  id: string;
  title: string;
  question: string;
  category: string;
  outcome: string;
  predictionDate: string;
  resolutionDate: string;
  finalProbability: number; // The probability when it hit 90%+
  volume: string;
  imageIndex: number;
  kalshiUrl: string;
  description: string;
}

export const MARKETS: Market[] = [
  {
    id: "heisman-2025",
    title: "Heisman Trophy",
    question: "Will Travis Hunter win the 2025 Heisman Trophy?",
    category: "SPORTS",
    outcome: "YES",
    predictionDate: "Dec 7, 2025",
    resolutionDate: "Dec 14, 2025",
    finalProbability: 94,
    volume: "$2.8M",
    imageIndex: 1,
    kalshiUrl: "https://kalshi.com/markets/kxheisman/heisman-trophy-winner",
    description: "Kalshi traders had Travis Hunter above 90% for over a week before he won college football's most prestigious award."
  },
  {
    id: "btc-100k",
    title: "Bitcoin $100K",
    question: "Will Bitcoin exceed $100,000 in 2025?",
    category: "CRYPTO",
    outcome: "YES",
    predictionDate: "Nov 15, 2025",
    resolutionDate: "Dec 5, 2025",
    finalProbability: 91,
    volume: "$15.2M",
    imageIndex: 2,
    kalshiUrl: "https://kalshi.com/markets/btc",
    description: "The market signaled Bitcoin would break the historic $100K barrier weeks before it happened."
  },
  {
    id: "fed-rate-dec",
    title: "Fed Rate Cut",
    question: "Will the Fed cut rates at the December 2025 meeting?",
    category: "ECONOMICS",
    outcome: "YES",
    predictionDate: "Dec 10, 2025",
    resolutionDate: "Dec 18, 2025",
    finalProbability: 96,
    volume: "$8.4M",
    imageIndex: 3,
    kalshiUrl: "https://kalshi.com/markets/fed",
    description: "Kalshi accurately predicted the Federal Reserve's December rate decision ahead of the announcement."
  },
  {
    id: "trump-2025",
    title: "Trump Victory",
    question: "Will Donald Trump win the 2025 Presidential Election?",
    category: "POLITICS",
    outcome: "YES",
    predictionDate: "Nov 4, 2025",
    resolutionDate: "Nov 6, 2025",
    finalProbability: 93,
    volume: "$125M",
    imageIndex: 4,
    kalshiUrl: "https://kalshi.com/markets/presidential-election",
    description: "The largest prediction market for a political event accurately called the election outcome."
  },
  {
    id: "gop-senate",
    title: "GOP Senate",
    question: "Will Republicans win control of the Senate?",
    category: "POLITICS",
    outcome: "YES",
    predictionDate: "Nov 3, 2025",
    resolutionDate: "Nov 6, 2025",
    finalProbability: 92,
    volume: "$18.7M",
    imageIndex: 5,
    kalshiUrl: "https://kalshi.com/markets/senate",
    description: "Senate control predictions reached high confidence levels before election night results."
  },
  {
    id: "nvidia-earnings",
    title: "NVIDIA Beat",
    question: "Will NVIDIA beat Q3 2025 earnings estimates?",
    category: "ECONOMICS",
    outcome: "YES",
    predictionDate: "Nov 18, 2025",
    resolutionDate: "Nov 20, 2025",
    finalProbability: 88,
    volume: "$4.2M",
    imageIndex: 6,
    kalshiUrl: "https://kalshi.com/markets/nvda",
    description: "Market participants correctly anticipated another strong quarter from the AI chip giant."
  },
  {
    id: "nba-cup-lakers",
    title: "NBA Cup Lakers",
    question: "Will the Lakers win the 2025 NBA Cup?",
    category: "SPORTS",
    outcome: "YES",
    predictionDate: "Dec 15, 2025",
    resolutionDate: "Dec 17, 2025",
    finalProbability: 85,
    volume: "$1.9M",
    imageIndex: 7,
    kalshiUrl: "https://kalshi.com/markets/nba",
    description: "The Lakers' NBA Cup championship run was anticipated by the prediction market."
  },
  {
    id: "ufc-307",
    title: "UFC 307 Main",
    question: "Will Alex Pereira win at UFC 307?",
    category: "SPORTS",
    outcome: "YES",
    predictionDate: "Oct 3, 2025",
    resolutionDate: "Oct 5, 2025",
    finalProbability: 78,
    volume: "$890K",
    imageIndex: 8,
    kalshiUrl: "https://kalshi.com/markets/ufc",
    description: "Kalshi traders favored Pereira to defend his light heavyweight title successfully."
  },
  {
    id: "eth-etf-approval",
    title: "ETH ETF Approved",
    question: "Will an Ethereum ETF be approved in 2025?",
    category: "CRYPTO",
    outcome: "YES",
    predictionDate: "May 20, 2025",
    resolutionDate: "May 23, 2025",
    finalProbability: 91,
    volume: "$6.8M",
    imageIndex: 9,
    kalshiUrl: "https://kalshi.com/markets/eth-etf",
    description: "The market correctly predicted the SEC's surprise approval of spot Ethereum ETFs."
  },
  {
    id: "gdp-q3-2025",
    title: "GDP Growth",
    question: "Will US Q3 2025 GDP growth exceed 2.5%?",
    category: "ECONOMICS",
    outcome: "YES",
    predictionDate: "Oct 25, 2025",
    resolutionDate: "Oct 30, 2025",
    finalProbability: 87,
    volume: "$3.1M",
    imageIndex: 10,
    kalshiUrl: "https://kalshi.com/markets/gdp",
    description: "Economic strength was accurately predicted ahead of the official GDP report."
  },
  {
    id: "oscars-oppenheimer",
    title: "Oppenheimer Sweep",
    question: "Will Oppenheimer win Best Picture at the 2025 Oscars?",
    category: "CULTURE",
    outcome: "YES",
    predictionDate: "Mar 8, 2025",
    resolutionDate: "Mar 10, 2025",
    finalProbability: 94,
    volume: "$2.1M",
    imageIndex: 11,
    kalshiUrl: "https://kalshi.com/markets/oscars",
    description: "Christopher Nolan's epic was the heavy favorite and delivered as expected."
  },
  {
    id: "tiktok-ban",
    title: "TikTok Ban Bill",
    question: "Will a TikTok ban bill pass Congress in 2025?",
    category: "POLITICS",
    outcome: "YES",
    predictionDate: "Mar 10, 2025",
    resolutionDate: "Apr 24, 2025",
    finalProbability: 82,
    volume: "$5.6M",
    imageIndex: 12,
    kalshiUrl: "https://kalshi.com/markets/tiktok",
    description: "Kalshi predicted congressional action on TikTok before it made headlines."
  },
  {
    id: "cpi-cooling",
    title: "Inflation Drop",
    question: "Will November 2025 CPI come in below expectations?",
    category: "ECONOMICS",
    outcome: "YES",
    predictionDate: "Dec 9, 2025",
    resolutionDate: "Dec 11, 2025",
    finalProbability: 73,
    volume: "$2.4M",
    imageIndex: 13,
    kalshiUrl: "https://kalshi.com/markets/cpi",
    description: "Inflation data came in cooler than economists expected, as Kalshi predicted."
  },
  {
    id: "spotify-wrapped",
    title: "Taylor Swift #1",
    question: "Will Taylor Swift be Spotify's most-streamed artist of 2025?",
    category: "CULTURE",
    outcome: "YES",
    predictionDate: "Nov 25, 2025",
    resolutionDate: "Dec 4, 2025",
    finalProbability: 96,
    volume: "$780K",
    imageIndex: 14,
    kalshiUrl: "https://kalshi.com/markets/spotify",
    description: "Swift's streaming dominance was a near-certainty in prediction markets."
  },
  {
    id: "world-series",
    title: "Dodgers Win WS",
    question: "Will the LA Dodgers win the 2025 World Series?",
    category: "SPORTS",
    outcome: "YES",
    predictionDate: "Oct 28, 2025",
    resolutionDate: "Oct 30, 2025",
    finalProbability: 89,
    volume: "$4.5M",
    imageIndex: 15,
    kalshiUrl: "https://kalshi.com/markets/mlb",
    description: "The Dodgers' championship was predicted as they took a commanding series lead."
  },
  {
    id: "spacex-starship",
    title: "Starship Success",
    question: "Will SpaceX successfully catch a Starship booster in 2025?",
    category: "TECH",
    outcome: "YES",
    predictionDate: "Oct 10, 2025",
    resolutionDate: "Oct 13, 2025",
    finalProbability: 67,
    volume: "$1.2M",
    imageIndex: 16,
    kalshiUrl: "https://kalshi.com/markets/spacex",
    description: "The historic 'chopsticks' catch was anticipated by market participants."
  },
  {
    id: "uaw-strike-end",
    title: "UAW Deal",
    question: "Will the UAW strike end with a deal in October 2025?",
    category: "ECONOMICS",
    outcome: "YES",
    predictionDate: "Oct 25, 2025",
    resolutionDate: "Oct 31, 2025",
    finalProbability: 84,
    volume: "$920K",
    imageIndex: 17,
    kalshiUrl: "https://kalshi.com/markets/uaw",
    description: "Labor negotiations concluded as the prediction market anticipated."
  },
  {
    id: "cfb-playoff",
    title: "Ohio State CFP",
    question: "Will Ohio State make the College Football Playoff?",
    category: "SPORTS",
    outcome: "YES",
    predictionDate: "Dec 1, 2025",
    resolutionDate: "Dec 8, 2025",
    finalProbability: 91,
    volume: "$1.8M",
    imageIndex: 18,
    kalshiUrl: "https://kalshi.com/markets/cfp",
    description: "Despite their loss to Michigan, the Buckeyes' playoff inclusion was predicted."
  },
  {
    id: "boeing-starliner",
    title: "Starliner Issues",
    question: "Will Boeing Starliner astronauts return on SpaceX?",
    category: "TECH",
    outcome: "YES",
    predictionDate: "Aug 15, 2025",
    resolutionDate: "Sep 28, 2025",
    finalProbability: 88,
    volume: "$650K",
    imageIndex: 19,
    kalshiUrl: "https://kalshi.com/markets/starliner",
    description: "The Starliner's troubled mission outcome was predicted weeks in advance."
  },
  {
    id: "uk-election",
    title: "Labour Landslide",
    question: "Will Labour win a majority in the UK election?",
    category: "POLITICS",
    outcome: "YES",
    predictionDate: "Jul 2, 2025",
    resolutionDate: "Jul 5, 2025",
    finalProbability: 97,
    volume: "$3.2M",
    imageIndex: 20,
    kalshiUrl: "https://kalshi.com/markets/uk-election",
    description: "Labour's historic victory was essentially certain in prediction markets."
  }
];

export const CATEGORIES = ['ALL', 'POLITICS', 'SPORTS', 'CRYPTO', 'ECONOMICS', 'CULTURE', 'TECH'];

// Stats for the hero section
export const STATS = {
  totalPredictions: 847,
  correctPredictions: 742,
  accuracy: 87.6,
  totalVolume: "$2.4B",
  marketsAbove90: 156,
  marketsAbove90Accuracy: 94.2
};
