export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  author: string;
  date?: string;
  category: string[];
  excerpt?: string;
  content?: string;
  image?: string;
  status?: string;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface TournamentInfo {
  id: number;
  type: "game" | "tournament";
  title: string;
  subtitle?: string;
  image: string;
  players: string;
  platform: string;
  rating: string;
  genre: string;
  description: string;
  rules: string[];
  slug: string;
  href: string;
  status: "Racing" | "Action" | "Trivia" | "Puzzle" | "Active" | "Upcoming" | "Playing" | "Finished" | "Coming Soon";
  prizeMoney?: string;
  ticketFee?: string;
  date?: string;
  teams?: string;
  prizes?: { place: string; amount?: string; reward?: string }[];
  practiceAttempts?: number;
  competitionAttempts?: number;
  finalRound?: string;
  videoUrl?: string;
  screenshots?: string[];
  features?: { icon: string; title: string; description: string }[];
  howToPlay?: { step: number; title: string; description: string }[];
  characters?: { name: string; icon: string; description: string }[];
  charactersTitle?: string;
  categories?: string[];
  playUrl?: string;
  isFavorite?: boolean;
  logo?: string;
}

export interface Winner {
  id: number;
  name: string;
  game: string;
  img?: string;
  time: string;
}

export interface Review {
  id: number;
  name: string;
  avatar: string;
  avatarBg: string;
  date: string;
  rating: number;
  text: string;
  helpful: number;
  device: string;
}

export interface Feature {
  id: number;
  title: string;
  desc: string;
  image: string;
}

export interface Statistic {
  id: number;
  label: string;
  value: string;
  prefix?: string;
  suffix?: string;
  icon: string;
  iconColor: string;
  borderColor: string;
  bgClass?: string;
  isHighlighted: boolean;
}
