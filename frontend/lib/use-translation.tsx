"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import en from "@/message/en.json";
import th from "@/message/th.json";

export type Locale = "en" | "th";
type Messages = typeof en;
type TranslationValue = {
  locale: Locale;
  messages: Messages;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  isChanging: boolean;
  t: (path: string) => string;
};

const dictionaries: Record<Locale, Messages> = {
  en,
  th,
};

const TranslationContext = createContext<TranslationValue | null>(null);

function readMessage(path: string, messages: Messages) {
  const value = path
    .split(".")
    .reduce<unknown>((current, key) => {
      if (current && typeof current === "object" && key in current) {
        return (current as Record<string, unknown>)[key];
      }

      return undefined;
    }, messages);

  return typeof value === "string" ? value : path;
}

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [isChanging, setIsChanging] = useState(false);
  const switchTimers = useRef<Array<ReturnType<typeof setTimeout>>>([]);

  const clearSwitchTimers = useCallback(() => {
    switchTimers.current.forEach((timer) => clearTimeout(timer));
    switchTimers.current = [];
  }, []);

  const setLocale = useCallback((nextLocale: Locale) => {
    if (nextLocale === locale) {
      return;
    }

    clearSwitchTimers();
    setIsChanging(true);

    const updateTimer = setTimeout(() => {
      setLocaleState(nextLocale);
      document.documentElement.lang = nextLocale;
    }, 160);

    const hideTimer = setTimeout(() => {
      setIsChanging(false);
    }, 620);

    switchTimers.current = [updateTimer, hideTimer];
  }, [clearSwitchTimers, locale]);

  const value = useMemo<TranslationValue>(() => {
    const currentMessages = dictionaries[locale];

    return {
      locale,
      messages: currentMessages,
      setLocale,
      toggleLocale: () => setLocale(locale === "en" ? "th" : "en"),
      isChanging,
      t: (path: string) => readMessage(path, currentMessages),
    };
  }, [isChanging, locale, setLocale]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => clearSwitchTimers, [clearSwitchTimers]);

  return (
    <TranslationContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {isChanging ? (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/80 backdrop-blur-md"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <motion.div
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center gap-4 rounded-lg border border-amber-200/20 bg-slate-950/85 px-8 py-7 shadow-[0_0_60px_rgba(251,191,36,0.16)]"
              exit={{ scale: 0.98, opacity: 0 }}
              initial={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-200/20 border-t-amber-200" />
              <p className="text-sm font-medium text-amber-100">
                {locale === "en" ? "Changing language" : "กำลังเปลี่ยนภาษา"}
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);

  if (!context) {
    throw new Error("useTranslation must be used within TranslationProvider");
  }

  return context;
}
