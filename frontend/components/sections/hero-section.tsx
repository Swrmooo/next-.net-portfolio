"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { siteConfig } from "@/constants/site";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useTranslation } from "@/lib/use-translation";

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-amber-200/10 py-20 sm:py-24 lg:py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_38%,rgba(251,191,36,0.16),transparent_31%),linear-gradient(135deg,rgba(15,23,42,0.35),transparent_45%)]" />
      <Container className="relative grid min-h-[calc(100vh-5rem)] items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.32em] text-amber-200">
            {t("hero.eyebrow")}
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
            {siteConfig.name}
          </h1>
          <p className="mt-5 text-lg font-medium text-amber-100">
            {t("hero.title")}
          </p>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            {t("hero.intro")}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="#projects" className={buttonVariants()}>
              {t("hero.primaryCta")}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              href="#contact"
              className={buttonVariants({ variant: "secondary" })}
            >
              {t("hero.secondaryCta")}
              <Mail size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-8 flex items-center gap-3">
            <Link
              aria-label="GitHub"
              className="rounded-full border border-amber-200/20 p-3 text-slate-300 transition hover:border-amber-200/50 hover:text-amber-100"
              href="https://github.com"
              target="_blank"
            >
              <FaGithub size={18} aria-hidden="true" />
            </Link>
            <Link
              aria-label="Email"
              className="rounded-full border border-amber-200/20 p-3 text-slate-300 transition hover:border-amber-200/50 hover:text-amber-100"
              href={`mailto:${siteConfig.email}`}
            >
              <Mail size={18} aria-hidden="true" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="relative mx-auto flex min-h-[420px] w-full max-w-xl -translate-y-6 items-end justify-center sm:min-h-[560px] lg:min-h-[640px] lg:-translate-y-10"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
        >
          <div className="absolute bottom-10 h-20 w-[115%] rounded-[100%] border-t border-amber-100/50 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.26),rgba(15,23,42,0.08)_36%,transparent_70%)] blur-[1px] sm:bottom-8" />
          <div className="absolute bottom-16 h-px w-[86%] bg-gradient-to-r from-transparent via-amber-100/80 to-transparent shadow-[0_0_32px_rgba(251,191,36,0.8)] sm:bottom-14" />

          <div className="absolute top-8 aspect-square w-[82%] max-w-[520px] rounded-full border border-amber-100/60 shadow-[0_0_70px_rgba(251,191,36,0.16)] sm:top-4">
            <div className="absolute inset-8 rounded-full border border-amber-100/20" />
          </div>

          <Image
            alt={siteConfig.name}
            className="relative z-10 h-auto w-[72%] max-w-[390px] -translate-y-14 object-contain drop-shadow-[0_24px_45px_rgba(0,0,0,0.65)] sm:w-[60%] sm:-translate-y-20 lg:max-w-[430px] lg:-translate-y-24"
            height={1278}
            priority
            sizes="(min-width: 1024px) 430px, (min-width: 640px) 390px, 72vw"
            src="/images/moo.webp"
            width={857}
          />
        </motion.div>
      </Container>
    </section>
  );
}
