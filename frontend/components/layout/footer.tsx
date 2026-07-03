"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { siteConfig } from "@/constants/site";
import { Container } from "@/components/ui/container";
import { useTranslation } from "@/lib/use-translation";

const socialLinks = [
  { label: "GitHub", href: "https://github.com", icon: FaGithub },
  { label: "LinkedIn", href: "https://linkedin.com", icon: FaLinkedin },
  { label: "Email", href: `mailto:${siteConfig.email}`, icon: Mail },
];

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-amber-200/10 py-8">
      <Container className="flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
        <Link
          href="#home"
          className="text-lg font-semibold tracking-tight text-amber-100"
        >
          SB
        </Link>
        <p className="text-sm text-slate-400">
          © 2026 {siteConfig.name}. {t("footer.rights")}
        </p>
        <div className="flex items-center gap-3">
          {socialLinks.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                aria-label={item.label}
                className="rounded-full border border-amber-200/15 p-2 text-slate-300 transition hover:border-amber-200/40 hover:text-amber-100"
                href={item.href}
                key={item.label}
                target={item.href.startsWith("http") ? "_blank" : undefined}
              >
                <Icon size={16} aria-hidden="true" />
              </Link>
            );
          })}
        </div>
      </Container>
    </footer>
  );
}
