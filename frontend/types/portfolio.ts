import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";

export type NavItem = {
  label: string;
  href: string;
};

export type Experience = {
  company: string;
  role: string;
  note?: string;
};

export type Project = {
  title: string;
  description: string;
  tags: string[];
};

export type Skill = {
  name: string;
  icon: LucideIcon | IconType;
};
