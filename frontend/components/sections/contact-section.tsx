"use client";

import { Mail, MapPin, Send } from "lucide-react";
import { siteConfig } from "@/constants/site";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/section-title";
import { useTranslation } from "@/lib/use-translation";

export function ContactSection() {
  const { t } = useTranslation();

  return (
    <section
      id="contact"
      className="border-t border-amber-200/10 bg-black/15 py-20 sm:py-24"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionTitle
              eyebrow={t("contact.eyebrow")}
              title={t("contact.title")}
              description={t("contact.description")}
            />
            <div className="mt-8 space-y-4 text-sm text-slate-300">
              <p className="flex items-center gap-3">
                <Mail size={18} className="text-amber-200" aria-hidden="true" />
                {siteConfig.email}
              </p>
              <p className="flex items-center gap-3">
                <MapPin
                  size={18}
                  className="text-amber-200"
                  aria-hidden="true"
                />
                {siteConfig.location}
              </p>
            </div>
          </div>

          <Card>
            <form className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  className="rounded-lg border border-amber-200/15 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-amber-200/45"
                  placeholder={t("contact.fields.name")}
                  type="text"
                />
                <input
                  className="rounded-lg border border-amber-200/15 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-amber-200/45"
                  placeholder={t("contact.fields.email")}
                  type="email"
                />
              </div>
              <input
                className="rounded-lg border border-amber-200/15 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-amber-200/45"
                placeholder={t("contact.fields.subject")}
                type="text"
              />
              <textarea
                className="min-h-36 rounded-lg border border-amber-200/15 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-amber-200/45"
                placeholder={t("contact.fields.message")}
              />
              <Button className="w-full sm:w-fit" type="submit">
                {t("contact.submit")}
                <Send size={16} aria-hidden="true" />
              </Button>
            </form>
          </Card>
        </div>
      </Container>
    </section>
  );
}
