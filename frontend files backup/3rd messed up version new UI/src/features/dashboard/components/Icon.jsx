import {
  ArrowRight,
  BadgeCheck,
  Bell,
  Building2,
  CalendarDays,
  CircleHelp,
  Compass,
  LayoutGrid,
  Menu,
  Shield,
  Settings,
  Trophy,
  UserRound,
  Users,
  UsersRound,
  X,
} from 'lucide-react';

const iconMap = {
  approvals: BadgeCheck,
  arrowRight: ArrowRight,
  audit: Shield,
  bell: Bell,
  clubs: UsersRound,
  close: X,
  dashboard: LayoutGrid,
  events: CalendarDays,
  explore: Compass,
  governance: Building2,
  help: CircleHelp,
  leaderboard: Trophy,
  memberships: Users,
  menu: Menu,
  profile: UserRound,
  settings: Settings,
  societies: Building2,
};

function Icon({ name, className }) {
  const LucideIcon = iconMap[name] ?? LayoutGrid;
  return <LucideIcon className={className ?? 'h-5 w-5'} strokeWidth={1.85} />;
}

export default Icon;
