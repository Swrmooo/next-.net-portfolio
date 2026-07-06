"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation, type Locale } from "@/lib/use-translation";

const languageOptions: Array<{
  locale: Locale;
  label: string;
  shortLabel: string;
  flag: string;
}> = [
  { locale: "en", label: "English", shortLabel: "EN", flag: "🇬🇧" },
  { locale: "th", label: "ไทย", shortLabel: "TH", flag: "🇹🇭" },
];

export function LanguageDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { locale, setLocale, t } = useTranslation();
  const currentLanguage = languageOptions.find((item) => item.locale === locale);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        aria-expanded={isOpen}
        aria-label={t("nav.language")}
        className="inline-flex h-12 min-w-28 cursor-pointer items-center justify-center gap-2 rounded-full border border-amber-200/20 bg-white/[0.03] px-4 text-sm font-semibold text-slate-100 transition hover:border-amber-200/45 hover:bg-white/[0.06] hover:text-amber-100"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        <span className="text-base leading-none">{currentLanguage?.flag}</span>
        <span>{currentLanguage?.shortLabel}</span>
        <ChevronDown
          aria-hidden="true"
          className={cn("transition-transform duration-200", isOpen && "rotate-180")}
          size={16}
        />
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="absolute right-0 top-14 z-50 w-48 overflow-hidden rounded-lg border border-amber-200/15 bg-slate-950/95 p-2 shadow-[0_22px_80px_rgba(0,0,0,0.42)] backdrop-blur-xl"
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            {languageOptions.map((item) => {
              const isActive = item.locale === locale;

              return (
                <button
                  className={cn(
                    "flex w-full cursor-pointer items-center justify-between rounded-md px-3 py-3 text-left text-sm font-medium text-slate-300 transition",
                    "hover:bg-amber-200/10 hover:text-amber-100",
                    isActive && "bg-amber-200/10 text-amber-100",
                  )}
                  key={item.locale}
                  onClick={() => {
                    setIsOpen(false);
                    setLocale(item.locale);
                  }}
                  type="button"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-lg leading-none">{item.flag}</span>
                    <span>{item.label}</span>
                  </span>
                  {isActive ? <Check size={16} aria-hidden="true" /> : null}
                </button>
              );
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
