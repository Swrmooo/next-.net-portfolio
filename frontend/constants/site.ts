import { Database } from "lucide-react";
import { FaCss3Alt, FaGithub, FaHtml5, FaJs } from "react-icons/fa";
import { FaGolang } from "react-icons/fa6";
import {
  SiDotnet,
  SiNextdotjs,
  SiPostgresql,
  SiPostman,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import type { Skill } from "@/types/portfolio";

export const siteConfig = {
  name: "Siwarut Boonpueng",
  email: "siwarut.moo@gmail.com",
  location: "Bangkok, Thailand",
};

export const skills: Skill[] = [
  { name: "HTML", icon: FaHtml5 },
  { name: "CSS", icon: FaCss3Alt },
  { name: "JavaScript", icon: FaJs },
  { name: "React", icon: SiReact },
  { name: "React Native", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Golang", icon: FaGolang },
  { name: ".NET", icon: SiDotnet },
  { name: "SQL", icon: Database },
  { name: "SQL Server", icon: Database },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "GitHub", icon: FaGithub },
  { name: "Postman", icon: SiPostman },
];
