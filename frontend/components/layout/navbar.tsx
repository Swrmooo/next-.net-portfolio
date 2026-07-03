"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { LanguageDropdown } from "@/components/ui/language-dropdown";
import { useTranslation } from "@/lib/use-translation";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { messages, t } = useTranslation();
  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-amber-200/10 bg-slate-950/85 backdrop-blur">
      <Container>
        <nav className="flex min-h-20 items-center justify-between gap-6">
          <button
            className="cursor-pointer text-xl font-semibold tracking-tight text-amber-100 transition hover:text-amber-200"
            onClick={() => scrollToSection("#home")}
            type="button"
          >
            SB
          </button>

          <div className="hidden items-center gap-7 md:flex">
            {messages.nav.items.map((item) => (
              <button
                className="min-w-24 cursor-pointer text-center text-sm text-slate-300 transition hover:text-amber-100"
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <LanguageDropdown />
            </div>
            <button
              className={buttonVariants({
                variant: "secondary",
                className: "hidden min-w-32 cursor-pointer px-4 py-2.5 sm:inline-flex",
              })}
              onClick={() => scrollToSection("#contact")}
              type="button"
            >
              {t("nav.contact")}
              <Mail size={16} aria-hidden="true" />
            </button>
            <button
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? t("nav.closeMenu") : t("nav.menu")}
              className="inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-amber-200/20 bg-white/[0.03] text-slate-100 transition hover:border-amber-200/45 hover:text-amber-100 md:hidden"
              onClick={() => setIsMenuOpen((current) => !current)}
              type="button"
            >
              {isMenuOpen ? (
                <X size={22} aria-hidden="true" />
              ) : (
                <Menu size={22} aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
      </Container>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="absolute inset-x-0 top-full max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-amber-200/10 bg-slate-950/98 shadow-[0_24px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl md:hidden"
            exit={{ opacity: 0, y: -16 }}
            initial={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <Container className="py-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <LanguageDropdown />
                <button
                  className={buttonVariants({
                    variant: "secondary",
                    className: "min-w-32 cursor-pointer px-4 py-2.5",
                  })}
                  onClick={() => scrollToSection("#contact")}
                  type="button"
                >
                  {t("nav.contact")}
                  <Mail size={16} aria-hidden="true" />
                </button>
              </div>

              <div className="overflow-hidden rounded-lg border border-amber-200/15">
                {messages.nav.items.map((item) => (
                  <button
                    className="flex w-full cursor-pointer items-center justify-between border-b border-amber-200/10 px-5 py-5 text-left text-base font-medium text-slate-100 transition last:border-b-0 hover:bg-amber-200/10 hover:text-amber-100"
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    type="button"
                  >
                    {item.label}
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-200/70" />
                  </button>
                ))}
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
