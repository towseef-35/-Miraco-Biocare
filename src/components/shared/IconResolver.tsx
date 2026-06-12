import {
  Award,
  Dna,
  FlaskConical,
  GraduationCap,
  Headphones,
  HeartHandshake,
  Lightbulb,
  Microscope,
  Pill,
  Settings,
  ShieldCheck,
  Truck,
  Wrench,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Award,
  Dna,
  FlaskConical,
  GraduationCap,
  Headphones,
  HeartHandshake,
  Lightbulb,
  Microscope,
  Pill,
  Settings,
  ShieldCheck,
  Truck,
  Wrench,
};

interface IconResolverProps {
  name: string;
  className?: string;
}

export function IconResolver({ name, className }: IconResolverProps) {
  const Icon = iconMap[name] || FlaskConical;
  return <Icon className={className} />;
}
